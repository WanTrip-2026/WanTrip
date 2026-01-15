<script setup lang="ts">
import { reactive, ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import { useRouter } from 'vue-router'
import HomePageCard from '@/components/layout/HomePageCard.vue'

const router = useRouter()
const activeTab = ref<'stay'>('stay')

// --- 輪播盒邏輯 ---
const hotelImages = [
  {
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200',
    title: '頂級海景',
    desc: '享受絕美夕陽',
  },
  {
    url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200',
    title: '森林風景區',
    desc: '沈浸在芬多精的懷抱中',
  },
  {
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200',
    title: '城市綠洲',
    desc: '位於市中心的大型公園',
  },
]
const currentSlide = ref(0)
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

const peopleConfig = reactive({
  adults: 2,
  children: 0,
  hasPet: false,
})

const peopleDisplayText = computed(() => {
  let text = `${peopleConfig.adults} 位成人`
  if (peopleConfig.children > 0) text += `｜${peopleConfig.children} 位孩童`
  if (peopleConfig.hasPet) text += `｜帶寵物`
  return text
})

const handleOutsideClick = (e: MouseEvent) => {
  if (peoplePickerRef.value && !peoplePickerRef.value.contains(e.target as Node)) {
    isPeoplePickerOpen.value = false
  }
}

interface Experience {
  id: number
  image: string
  title: string
  rating: number
  reviews: number
}

interface Section {
  title: string
  variant: 'landscape' | 'portrait' | 'region'
  items: Experience[]
}

const sections = ref<Section[]>([])
const isLoading = ref(true)
const isticketSection = (sectionTitle: string) => sectionTitle === '人氣地區'

onMounted(() => {
  setTimeout(() => {
    sections.value = [
      { title: '門票分類', variant: 'region', items: mockItems(4) },
      { title: '熱門景點', variant: 'landscape', items: mockItems(8) },
      { title: '特色體驗', variant: 'portrait', items: mockItems(4) },
      { title: '推薦門票', variant: 'landscape', items: mockItems(8) },
    ]
    isLoading.value = false
  }, 1000)
})

function mockItems(count: number): Experience[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800',
    title: `示範景點 ${i + 1}`,
    rating: 4.7,
    reviews: 33715,
  }))
}

onMounted(() => {
  startTimer()
  window.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  stopTimer()
  window.removeEventListener('click', handleOutsideClick)
})

const taiwanCities = [
  '基隆',
  '臺北',
  '新北',
  '桃園',
  '新竹',
  '苗栗',
  '臺中',
  '彰化',
  '南投',
  '雲林',
  '嘉義',
  '臺南',
  '高雄',
  '屏東',
  '宜蘭',
  '花蓮',
  '臺東',
  '澎湖',
  '金門',
  '馬祖',
]

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

function onSearch() {
  console.log('[Ticket Search Submit]', { tab: activeTab.value, ...form, ...peopleConfig })

  // 跳轉到 /tickets/search
  router.push('/tickets/search')
}
function onClick(type: string, id: string) {
  console.log('[Click]', { type, id })
}

const ticketClassify = [
  {
    key: 'amusement-park',
    label: '遊樂園',
    img: 'https://res.cloudinary.com/wantrip/image/upload/v1767452852/%E5%9F%8E%E5%B8%82-tp_zyi27w.jpg',
  },
  {
    key: 'meuseum',
    label: '博物館',
    img: 'https://res.cloudinary.com/wantrip/image/upload/v1767445157/640x480_image636446327579990356_qeu0ii.jpg',
  },
  {
    key: 'tourism-factory',
    label: '觀光工廠',
    img: 'https://res.cloudinary.com/wantrip/image/upload/v1767445160/%E7%86%B1%E9%96%80%E5%9F%8E%E5%B8%821_ybmlyx.jpg',
  },

  {
    key: 'zoo/aquarium',
    label: '動物園/水族館',
    img: 'https://res.cloudinary.com/wantrip/image/upload/v1767445159/%E5%9F%8E%E5%B8%821_bl2w6i.jpg',
  },
  {
    key: 'exhibition',
    label: '展覽',
    img: 'https://res.cloudinary.com/wantrip/image/upload/v1767452852/%E5%9F%8E%E5%B8%82-%E5%B3%B6_qnxq42.jpg',
  },
]

const tickets = ref([
  { id: 1, name: '2026 台北跨年晚會', price: 0, venue: '台北市民廣場', date: '2025-12-31', category: '節慶', imageUrl: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400', description: '全台最強卡司陪你迎接新的一年。' },
  { id: 2, name: '張學友 60+ 巡迴演唱會', price: 5800, venue: '台北小巨蛋', date: '2026-03-15', category: '演唱會', imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400', description: '經典歌神再次降臨，不容錯過的視聽盛宴。' },
  { id: 3, name: '吉卜力展覽：宮崎駿世界', price: 450, venue: '華山1914文創園區', date: '2026-02-10', category: '展覽', imageUrl: 'https://images.unsplash.com/photo-1544943962-d26b73887014?w=400', description: '走進夢幻的手繪世界，重溫經典動畫瞬間。' },
  { id: 4, name: '台大藝術祭開幕音樂會', price: 1200, venue: '台大體育館', date: '2026-04-20', category: '音樂', imageUrl: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=400', description: '校園最盛大的藝術節，集結各類新銳樂團。' },
  { id: 5, name: '2026 台灣燈會在桃園', price: 0, venue: '桃園青埔', date: '2026-02-15', category: '民俗', imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd458ad20?w=400', description: '炫爛燈飾閃耀桃園，體驗最傳統的元宵氛圍。' },
  { id: 6, name: '世界棒球經典賽 A 組', price: 3200, venue: '台中洲際棒球場', date: '2026-03-08', category: '體育', imageUrl: 'https://images.unsplash.com/photo-1508344928928-7165bdd36701?w=400', description: '熱血沸騰的國際大賽，為台灣英雄加油！' },
]);

const handleWishlist = (id) => console.log('收藏門票 ID:', id);
const handleBook = (id) => console.log('購票 ID:', id);
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

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<template>
  <main class="pb-20 pt-24 max-w-[1240px] px-5 mx-auto">
    <section class="relative group h-[350px] md:h-[450px] overflow-hidden rounded-[40px] shadow-2xl">
      <div v-for="(img, index) in hotelImages" :key="index">
        <transition name="fade-slide">
          <div v-if="currentSlide === index" class="absolute inset-0">
            <img :src="img.url" class="w-full h-full object-cover" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent flex flex-col justify-end p-10 md:p-14">
              <h3 class="text-white text-3xl font-bold mb-2">{{ img.title }}</h3>
              <p class="text-white/80 text-lg">{{ img.desc }}</p>
            </div>
          </div>
        </transition>
      </div>
      <button @click="prevSlide"
        class="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:bg-white/40 shadow-lg">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button @click="nextSlide"
        class="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:bg-white/40 shadow-lg">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        <button v-for="(_, index) in hotelImages" :key="index" @click="currentSlide = index"
          class="w-2.5 h-2.5 rounded-full transition-all duration-300"
          :class="currentSlide === index ? 'bg-[#93ACAA] w-8' : 'bg-white/50 hover:bg-white'"></button>
      </div>
    </section>
    <section class="flex justify-center">
      <form class="w-full max-w-2xl" @submit.prevent="onSearch">
        <div class="mt-4 flex justify-center">
          <div class="w-full max-w-4xl">
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label
                class="relative block rounded-[20px] bg-white p-5 shadow-lg border border-gray-300 group cursor-pointer transition-all hover:border-primary">
                <p class="text-xs font-bold text-dark_500">想去哪裡？</p>
                <div class="relative mt-2">
                  <select v-model="form.destination"
                    class="w-full bg-transparent text-sm outline-none appearance-none cursor-pointer pr-8 font-medium text-primary group-hover:text-main_800  transition-colors">
                    <option value="" disabled selected>選擇城市、景點</option>
                    <option v-for="city in taiwanCities" :key="city" :value="city">
                      {{ city }}
                    </option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-primary/30">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </label>

              <div class="relative" ref="peoplePickerRef">
                <label @click="isPeoplePickerOpen = !isPeoplePickerOpen"
                  class="block h-full rounded-[20px] bg-white p-5 shadow-lg border border-gray-300 transition-all hover:border-primary cursor-pointer">
                  <p class="text-xs font-bold text-dark_500">人數、需求</p>
                  <div class="mt-2 flex items-center justify-between">
                    <span class="text-sm font-medium text-black">{{ peopleDisplayText }}</span>
                    <svg class="h-4 w-4 text-primary/30 transition-transform duration-300"
                      :class="{ 'rotate-180': isPeoplePickerOpen }" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </label>

                <transition name="fade">
                  <div v-if="isPeoplePickerOpen"
                    class="absolute top-[calc(100%+8px)] left-0 z-[100] w-full rounded-[20px] bg-white p-5 shadow-2xl border border-gray-300">
                    <div class="space-y-4">
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-bold text-black">成人</span>
                        <div class="flex items-center gap-3">
                          <button @click.stop="peopleConfig.adults > 1 ? peopleConfig.adults-- : null" type="button"
                            class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-black hover:bg-main hover:text-white">
                            -
                          </button>
                          <span class="text-sm font-medium w-4 text-center text-black">{{
                            peopleConfig.adults
                            }}</span>
                          <button @click.stop="peopleConfig.adults++" type="button"
                            class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-black hover:bg-main hover:text-white">
                            +
                          </button>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-bold text-black">孩童</span>
                        <div class="flex items-center gap-3">
                          <button @click.stop="
                            peopleConfig.children > 0 ? peopleConfig.children-- : null
                            " type="button"
                            class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-black hover:bg-main hover:text-white">
                            -
                          </button>
                          <span class="text-sm font-medium w-4 text-center text-black">{{
                            peopleConfig.children
                            }}</span>
                          <button @click.stop="peopleConfig.children++" type="button"
                            class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-black hover:bg-main hover:text-white">
                            +
                          </button>
                        </div>
                      </div>
                      <label class="flex items-center justify-between pt-2 cursor-pointer">
                        <span class="text-sm font-bold text-black">可帶寵物</span>
                        <input type="checkbox" v-model="peopleConfig.hasPet"
                          class="w-5 h-5 accent-primary cursor-pointer" />
                      </label>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-3 mt-5">
          <button type="submit"
            class="h-10 rounded-full bg-primary px-8 text-sm font-semibold text-white transition-all duration-300 hover:bg-main active:scale-[0.98] shadow-sm">
            搜尋
          </button>
        </div>
      </form>
    </section>

    <template v-if="isLoading">
      <section v-for="n in 2" :key="n" class="mb-10">
        <div class="h-6 w-32 bg-gray-200 rounded mb-10 animate-pulse"></div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="i in 4" :key="i" class="bg-gray-200 rounded-[20px] aspect-[4/3] animate-pulse" />
        </div>

        <div class="mt-5 flex justify-center">
          <div class="h-[44px] w-[120px] bg-gray-200 rounded-full animate-pulse" />
        </div>
      </section>
    </template>

    <section class="mt-10">
      <h2 class="mb-5 text-xl font-bold text-dark">想去哪裡玩？</h2>
      <div class="grid grid-cols-5 gap-5">
        <button v-for="tc in ticketClassify" :key="tc.key" type="button"
          class="relative group overflow-hidden rounded-[20px] bg-white/70 border border-gray-300 transition shadow-sm hover:shadow-lg"
          @click="onClickRegion(tc)">
          <div class="h-[110px] w-full aspect-[3/4]" :style="{
            backgroundImage: `url(${tc.img})`,
            backgroundSize: 'cover',
          }"></div>

          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-xl font-black text-white drop-shadow-sm">{{ tc.label }}</span>
          </div>
        </button>
      </div>
    </section>

    <section class="mt-10">
      <h2 class="mb-5 text-xl font-bold text-dark">熱門景點</h2>
      <div class="flex flex-row xl:grid xl:grid-cols-6 gap-5 overflow-x-auto pb-10 no-scrollbar">
        <HomePageCard v-for="(ticket, index) in tickets" :key="ticket.id" v-bind="ticket"
          :expand-left="index >= tickets.length - 2" @compare="handleWishlist" @book="handleBook" />
      </div>
    </section>

    <section class="mt-10">
      <h2 class="mb-5 text-xl font-bold text-dark">評價最高</h2>
      <div class="flex flex-row xl:grid xl:grid-cols-6 gap-5 overflow-x-auto pb-10 no-scrollbar">
        <HomePageCard v-for="(ticket, index) in tickets" :key="ticket.id" v-bind="ticket"
          :expand-left="index >= tickets.length - 2" @compare="handleWishlist" @book="handleBook" />
      </div>
    </section>
  </main>
</template>
