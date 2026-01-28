<template>
  <main class="min-h-screen mx-auto max-w-[1240px]">
    <div class="mx-5 pt-24 pb-20">
      <section
        class="relative group h-[350px] md:h-[450px] overflow-hidden rounded-[40px] shadow-2xl px-5"
      >
        <div v-for="(img, index) in hotelImages" :key="index">
          <transition name="fade-slide">
            <div v-if="currentSlide === index" class="absolute inset-0">
              <img :src="img.url" class="w-full h-full object-cover" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent flex flex-col justify-end p-10 md:p-14"
              >
                <h3 class="text-white text-3xl font-bold mb-2">{{ img.title }}</h3>
                <p class="text-white/80 text-lg">{{ img.desc }}</p>
              </div>
            </div>
          </transition>
        </div>
        <button
          @click="prevSlide"
          class="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:bg-white/40 shadow-lg"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          @click="nextSlide"
          class="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:bg-white/40 shadow-lg"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          <button
            v-for="(_, index) in hotelImages"
            :key="index"
            @click="currentSlide = index"
            class="w-2.5 h-2.5 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'bg-[#93ACAA] w-8' : 'bg-white/50 hover:bg-white'"
          ></button>
        </div>
      </section>

      <SearchBar mode="redirect" @search="handleSearchSubmit" class="mt-12" />

      <div class="mt-[40px] space-y-[40px]">
        <section v-for="section in sections" :key="section.title">
          <h2 class="text-xl font-bold text-dark mb-5">{{ section.title }}</h2>
          <div
            class="flex flex-row xl:grid xl:grid-cols-6 gap-5 overflow-x-auto pb-10 no-scrollbar"
          >
            <HomePageCard
              v-for="(item, index) in section.data"
              :key="item.id"
              v-bind="item"
              :expand-left="index >= section.data.length - 2"
              @compare="handleWishlist"
            />
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import HomePageCard from '@/components/layout/HomePageCard.vue'
import { useHotelApi } from '@/composables/useHotelApi'
import type { HomePageCardItem } from '@/types/hotel'
import SearchBar from '@/components/layout/SearchBar.vue'

interface SearchPayload {
  keyword: string
  range: [Date, Date]
  rooms: number
  people: number
}

const router = useRouter()
// --- 輪播盒邏輯 ---
const hotelImages = [
  {
    url: 'https://res.cloudinary.com/wantrip/image/upload/v1769506021/%E9%A3%AF%E5%BA%97%E5%A4%96%E8%A7%804_a03gqo.webp',
    title: '頂級海景套房',
    desc: '享受海水與絕美夕陽',
  },
  {
    url: 'https://res.cloudinary.com/wantrip/image/upload/v1769506190/%E9%A3%AF%E5%BA%97%E9%A6%96%E5%9C%964_todrzk.webp',
    title: '森林木屋飯店',
    desc: '沈浸在芬多精的懷抱中',
  },
  {
    url: 'https://res.cloudinary.com/wantrip/image/upload/v1769506091/%E9%A3%AF%E5%BA%97%E9%A6%96%E5%9C%96_dualwy.webp',
    title: '城市綠洲旅店',
    desc: '位於市中心的最便利選擇',
  },
]
const currentSlide = ref(0)
// 修正 TypeScript 型別警告
let slideTimer: ReturnType<typeof setInterval> | null = null

const startTimer = () => {
  slideTimer = setInterval(() => {
    nextSlide()
  }, 5000)
}
const stopTimer = () => {
  if (slideTimer) clearInterval(slideTimer)
}
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % hotelImages.length
}
const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + hotelImages.length) % hotelImages.length
}

// --- 人數需求狀態與邏輯 ---
const isPeoplePickerOpen = ref(false)
const peoplePickerRef = ref<HTMLElement | null>(null)

const handleOutsideClick = (e: MouseEvent) => {
  if (peoplePickerRef.value && !peoplePickerRef.value.contains(e.target as Node)) {
    isPeoplePickerOpen.value = false
  }
}

const { fetchFeaturedHotels, fetchNearbyHotels } = useHotelApi()

const hotHotels = ref<HomePageCardItem[]>([])
const nearHotels = ref<HomePageCardItem[]>([])
const kaohsiungHotels = ref<HomePageCardItem[]>([])

onMounted(async () => {
  startTimer()
  window.addEventListener('click', handleOutsideClick)

  const { data: featured } = await fetchFeaturedHotels()
  hotHotels.value = featured.value

  const { data: nearby } = await fetchNearbyHotels('台北市', 6)
  nearHotels.value = nearby.value

  const { data: kaohsiung } = await fetchNearbyHotels('高雄市', 6)
  kaohsiungHotels.value = kaohsiung.value
})

onUnmounted(() => {
  stopTimer()
  window.removeEventListener('click', handleOutsideClick)
})
const sections = computed(() => [
  { title: '熱門飯店', data: hotHotels.value },
  { title: '附近飯店', data: nearHotels.value },
  { title: '熱門城市', data: kaohsiungHotels.value },
])

const form = reactive({
  destination: '',
  dateRange: '',
  people: '',
})

const range = ref({
  start: new Date(),
  end: new Date(new Date().setDate(new Date().getDate() + 1)),
})

watch(
  range,
  (newRange) => {
    if (newRange?.start && newRange?.end) {
      form.dateRange = `${newRange.start.toLocaleDateString()} - ${newRange.end.toLocaleDateString()}`
    }
  },
  { immediate: true },
)

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const handleSearchSubmit = (searchData: SearchPayload) => {
  // 將資料解構，並手動對應到 URL Query
  router.push({
    path: '/hotels/search',
    query: {
      keyword: searchData.keyword,
      // 使用首頁現有的 formatDate 或是臨時處理成字串
      start_date: formatDate(searchData.range[0]),
      end_date: formatDate(searchData.range[1]),
      adults: String(searchData.people),
      rooms: String(searchData.rooms),
    },
  })
}

const handleWishlist = (id: string | number) => {
  const allItems: HomePageCardItem[] = [
    ...hotHotels.value,
    ...nearHotels.value,
    ...kaohsiungHotels.value,
  ]

  const product = allItems.find((item) => item.id === id)

  if (product) {
    console.log(`用戶收藏了: ${product.name}`)
  }
}

const handleBook = (id: string | number) => {
  router.push(`/product/${id}`)
}
</script>

<style scoped>
/* 輪播切換動畫 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.8s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* 彈出選單動畫 */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* v-calendar 樣式 */
:deep(.vc-teal) {
  --vc-accent-500: #93acaa;
}

:deep(.vc-container) {
  border-radius: 24px;
  border: none;
  box-shadow: 0 20px 40px rgba(47, 61, 77, 0.15);
  padding: 12px;
}

:deep(.vc-title) {
  color: #2f3d4d;
  font-weight: 800;
}

:deep(.vc-highlight-base-middle) {
  background-color: rgba(147, 172, 170, 0.15) !important;
}

/* 佔位圖樣式 */
.checker {
  aspect-ratio: 1 / 1;
  width: 100%;
  background-image:
    linear-gradient(45deg, rgba(47, 61, 77, 0.1) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(47, 61, 77, 0.1) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(47, 61, 77, 0.1) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(47, 61, 77, 0.1) 75%);
  background-size: 28px 28px;
  background-position:
    0 0,
    0 14px,
    14px -14px,
    -14px 0px;
}
</style>
