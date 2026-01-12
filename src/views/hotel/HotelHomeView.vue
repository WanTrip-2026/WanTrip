<template>
  <main class="min-h-screen mx-auto max-w-[1240px]">
    <div class="mx-5 pt-24 pb-20">
      <section class="relative group h-[350px] md:h-[450px] overflow-hidden rounded-[40px] shadow-2xl px-5">
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
        <form class="w-full max-w-4xl" @submit.prevent="onSearch">
          <div class="mt-4 flex justify-center">
            <div class="w-full max-w-4xl">
              <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <label
                  class="relative block rounded-[20px] bg-white p-[20px] shadow-lg border border-gray-300 group cursor-pointer transition-all hover:border-primary">
                  <p class="text-xs font-bold text-dark_500">想去哪裡？</p>
                  <div class="relative mt-2">
                    <select v-model="form.destination"
                      class="w-full bg-transparent text-sm outline-none appearance-none cursor-pointer pr-8 font-medium text-primary group-hover:text-main_800 transition-colors">
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

                <DatePicker v-model.range="range" :columns="2" color="teal">
                  <template #default="{ inputValue, inputEvents }">
                    <label
                      class="block rounded-[20px] bg-white p-5 shadow-lg border border-gray-300 cursor-pointer transition-all hover:border-primary"
                      v-on="inputEvents.start">
                      <p class="text-xs font-bold text-dark_500">入住退房日期</p>
                      <input :value="inputValue.start ? `${inputValue.start} - ${inputValue.end}` : ''"
                        class="mt-2 w-full bg-transparent text-sm outline-none pointer-events-none text-black placeholder:text-primary/35 font-medium"
                        placeholder="點選選擇日期" readonly />
                    </label>
                  </template>
                </DatePicker>

                <div class="relative" ref="peoplePickerRef">
                  <label @click="isPeoplePickerOpen = !isPeoplePickerOpen"
                    class="block h-full rounded-[20px] bg-white p-[20px] shadow-lg border border-gray-300 transition-all hover:border-primary cursor-pointer">
                    <p class="text-xs font-bold text-dark_500">人數、需求</p>
                    <div class="mt-2 flex items-center justify-between">
                      <span class="text-sm font-medium text-primary">{{ peopleDisplayText }}</span>
                      <svg class="h-4 w-4 text-primary/30 transition-transform duration-300"
                        :class="{ 'rotate-180': isPeoplePickerOpen }" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </label>

                  <transition name="fade">
                    <div v-if="isPeoplePickerOpen"
                      class="absolute top-[calc(100%+8px)] left-0 z-[100] w-full rounded-[20px] bg-white p-6 shadow-2xl ring-1 ring-primary/5">
                      <div class="space-y-4">
                        <div class="flex items-center justify-between">
                          <span class="text-sm font-bold text-primary">成人</span>
                          <div class="flex items-center gap-3">
                            <button @click.stop="peopleConfig.adults > 1 ? peopleConfig.adults-- : null" type="button"
                              class="w-8 h-8 rounded-full border border-gray-300 text-dark flex items-center justify-center hover:bg-main_100">
                              -
                            </button>
                            <span class="text-sm font-medium w-4 text-center text-dark">{{
                              peopleConfig.adults
                            }}</span>
                            <button @click.stop="peopleConfig.adults++" type="button"
                              class="w-8 h-8 rounded-full border border-gray-300 text-dark flex items-center justify-center hover:bg-main_100">
                              +
                            </button>
                          </div>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-sm font-bold text-primary">孩童</span>
                          <div class="flex items-center gap-3">
                            <button @click.stop="
                              peopleConfig.children > 0 ? peopleConfig.children-- : null
                              " type="button"
                              class="w-8 h-8 rounded-full border border-gray-300 text-dark flex items-center justify-center hover:bg-main_100">
                              -
                            </button>
                            <span class="text-sm font-medium w-4 text-center text-dark">{{
                              peopleConfig.children
                            }}</span>
                            <button @click.stop="peopleConfig.children++" type="button"
                              class="w-8 h-8 rounded-full border border-gray-300 text-dark flex items-center justify-center hover:bg-main_100">
                              +
                            </button>
                          </div>
                        </div>
                        <label class="flex items-center justify-between pt-2 cursor-pointer">
                          <span class="text-sm font-bold text-primary">可帶寵物</span>
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
              class="h-10 rounded-full bg-primary px-7 text-sm font-semibold text-white transition-all duration-300 hover:bg-main active:scale-[0.98] shadow-sm">
              搜尋
            </button>
          </div>
        </form>
      </section>

      <div class="mt-[40px] space-y-[40px]">
        <section v-for="section in [
          { title: '最新消息', data: news },
          { title: '熱門飯店', data: hotHotels },
          { title: '附近飯店', data: nearHotels },
          { title: '熱門城市', data: hotCities },
        ]" :key="section.title">
          <h2 class="text-xl font-bold text-dark mb-5">{{ section.title }}</h2>
          <div class="flex flex-row xl:grid xl:grid-cols-6 gap-5 overflow-x-auto pb-10 no-scrollbar">
            <HomePageCard v-for="(item, index) in section.data" :key="item.id" v-bind="item"
              :expand-left="index >= section.title.length - 2" @compare="handleWishlist" @book="handleBook" />
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

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
    title: '頂級海景套房',
    desc: '享受無邊際泳池與絕美夕陽',
  },
  {
    url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200',
    title: '森林木屋飯店',
    desc: '沈浸在芬多精的懷抱中',
  },
  {
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200',
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

const news = [{ id: 'n1' }, { id: 'n2' }, { id: 'n3' }, { id: 'n4' }, { id: 'n5' }, { id: 'n6' }]
const hotHotels = [{ id: 'h1' }, { id: 'h2' }, { id: 'h3' }, { id: 'h4' }, { id: 'h5' }, { id: 'h6' }]
const nearHotels = [{ id: 'nh1' }, { id: 'nh2' }, { id: 'nh3' }, { id: 'nh4' }, { id: 'nh5' }, { id: 'nh6' }]
const hotCities = [{ id: 'c1' }, { id: 'c2' }, { id: 'c3' }, { id: 'c4' }, { id: 'c5' }, { id: 'c6' }]

const handleWishlist = (id: string | number) => {
  const allItems = [...news, ...hotHotels, ...nearHotels, ...hotCities];
  const product = allItems.find(item => item.id === id);
  if (product) {
    console.log(`用戶收藏了: ${product.name}`);
  }
};

const handleBook = (id: string | number) => {
  router.push(`/product/${id}`);
};

function onSearch() {
  console.log('[Hotel Search Submit]', { tab: activeTab.value, ...form, ...peopleConfig })

  // 跳轉到 /hotels/search
  router.push('/hotels/search')
}
function onClick(type: string, id: string) {
  console.log('[Click]', { type, id })
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
