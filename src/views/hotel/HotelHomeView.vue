<template>
  <main
    class="min-h-screen text-primary mx-5 lg:mx-5"
    style="
      background:
        radial-gradient(ellipse at center, rgba(147, 172, 170, 0.16), rgba(255, 255, 255, 0) 60%),
        linear-gradient(#ffffff, #ffffff);
    "
  >
    <div class="mx-auto w-full max-w-[1200px] pt-[96px] pb-[40px]">
      <section
        class="mb-10 relative group h-[350px] md:h-[450px] overflow-hidden rounded-[20px] shadow-2xl px-5"
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

      <section class="flex justify-center">
        <form class="w-full max-w-4xl" @submit.prevent="onSearch">
          <div class="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              class="h-10 rounded-full border bg-dark_300 border-primary/25 px-8 text-sm font-semibold transition"
              :class="
                activeTab === 'stay'
                  ? 'bg-main_800 text-white'
                  : 'bg-white text-primary/80 hover:bg-primary/5'
              "
              @click="activeTab = 'stay'"
            >
              找住宿
            </button>
            <button
              type="submit"
              class="h-10 rounded-full bg-primary px-7 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary_hover active:scale-[0.98] shadow-sm"
            >
              搜尋
            </button>
          </div>

          <div class="mt-4 flex justify-center">
            <div class="w-full max-w-4xl">
              <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <label
                  class="relative block rounded-[20px] bg-white p-[20px] shadow-[0_10px_25px_rgba(47,61,77,0.08)] ring-1 ring-primary/10 group cursor-pointer transition-all hover:ring-accent/50"
                >
                  <p class="text-xs font-bold text-primary/70">想去哪</p>
                  <div class="relative mt-2">
                    <select
                      v-model="form.destination"
                      class="w-full bg-transparent text-sm outline-none appearance-none cursor-pointer pr-8 font-medium text-primary group-hover:text-main_800 transition-colors"
                    >
                      <option value="" disabled selected>選擇城市、景點</option>
                      <option v-for="city in taiwanCities" :key="city" :value="city">
                        {{ city }}
                      </option>
                    </select>
                    <div
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-primary/30"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </label>

                <DatePicker v-model.range="range" :columns="2" color="teal">
                  <template #default="{ inputValue, inputEvents }">
                    <label
                      class="block rounded-[20px] bg-white p-[20px] shadow-[0_10px_25px_rgba(47,61,77,0.08)] ring-1 ring-primary/10 cursor-pointer transition-all hover:ring-accent/50"
                      v-on="inputEvents.start"
                    >
                      <p class="text-xs font-bold text-primary/70">入住退房日期</p>
                      <input
                        :value="inputValue.start ? `${inputValue.start} - ${inputValue.end}` : ''"
                        class="mt-2 w-full bg-transparent text-sm outline-none pointer-events-none placeholder:text-primary/35 font-medium"
                        placeholder="點選選擇日期"
                        readonly
                      />
                    </label>
                  </template>
                </DatePicker>

                <div class="relative" ref="peoplePickerRef">
                  <label
                    @click="isPeoplePickerOpen = !isPeoplePickerOpen"
                    class="block rounded-[20px] bg-white p-[20px] shadow-[0_10px_25px_rgba(47,61,77,0.08)] ring-1 ring-primary/10 transition-all hover:ring-accent/50 cursor-pointer"
                  >
                    <p class="text-xs font-bold text-primary/70">人數、需求</p>
                    <div class="mt-2 flex items-center justify-between">
                      <span class="text-sm font-medium text-primary">{{ peopleDisplayText }}</span>
                      <svg
                        class="h-4 w-4 text-primary/30 transition-transform duration-300"
                        :class="{ 'rotate-180': isPeoplePickerOpen }"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </label>

                  <transition name="fade">
                    <div
                      v-if="isPeoplePickerOpen"
                      class="absolute top-[calc(100%+8px)] left-0 z-[100] w-full rounded-[30px] bg-white p-6 shadow-2xl ring-1 ring-primary/5"
                    >
                      <div class="space-y-4">
                        <div class="flex items-center justify-between">
                          <span class="text-sm font-bold text-primary">成人</span>
                          <div class="flex items-center gap-3">
                            <button
                              @click.stop="peopleConfig.adults > 1 ? peopleConfig.adults-- : null"
                              type="button"
                              class="w-8 h-8 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary/5"
                            >
                              -
                            </button>
                            <span class="text-sm font-medium w-4 text-center">{{
                              peopleConfig.adults
                            }}</span>
                            <button
                              @click.stop="peopleConfig.adults++"
                              type="button"
                              class="w-8 h-8 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary/5"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-sm font-bold text-primary">孩童</span>
                          <div class="flex items-center gap-3">
                            <button
                              @click.stop="
                                peopleConfig.children > 0 ? peopleConfig.children-- : null
                              "
                              type="button"
                              class="w-8 h-8 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary/5"
                            >
                              -
                            </button>
                            <span class="text-sm font-medium w-4 text-center">{{
                              peopleConfig.children
                            }}</span>
                            <button
                              @click.stop="peopleConfig.children++"
                              type="button"
                              class="w-8 h-8 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary/5"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <label
                          class="flex items-center justify-between pt-2 border-t border-gray-50 cursor-pointer"
                        >
                          <span class="text-sm font-bold text-primary">可帶寵物</span>
                          <input
                            type="checkbox"
                            v-model="peopleConfig.hasPet"
                            class="w-5 h-5 accent-accent cursor-pointer"
                          />
                        </label>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>

      <div class="mt-[40px] space-y-[40px]">
        <section
          v-for="section in [
            { title: '最新消息', data: news, grid: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5' },
            { title: '熱門飯店', data: hotHotels, grid: 'grid-cols-2 md:grid-cols-4' },
            { title: '附近飯店', data: nearHotels, grid: 'grid-cols-2 md:grid-cols-4' },
            {
              title: '熱門城市',
              data: hotCities,
              grid: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5',
            },
          ]"
          :key="section.title"
        >
          <h2 class="text-lg font-black">{{ section.title }}</h2>
          <div :class="'mt-[60px] grid gap-[40px] ' + section.grid">
            <button
              v-for="item in section.data"
              :key="item.id"
              type="button"
              class="group rounded-[20px] bg-white/70 p-[20px] text-left shadow-[0_10px_25px_rgba(47,61,77,0.08)] ring-1 ring-primary/10 transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(47,61,77,0.12)]"
              @click="onClick(section.title, item.id)"
            >
              <div class="checker aspect-square rounded-[20px]" />
            </button>
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
  '基隆市',
  '臺北市',
  '新北市',
  '桃園市',
  '新竹市',
  '苗栗市',
  '臺中市',
  '彰化市',
  '南投市',
  '雲林市',
  '嘉義市',
  '臺南市',
  '高雄市',
  '屏東市',
  '宜蘭市',
  '花蓮市',
  '臺東市',
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

const news = [{ id: 'n1' }, { id: 'n2' }, { id: 'n3' }, { id: 'n4' }, { id: 'n5' }]
const hotHotels = [{ id: 'h1' }, { id: 'h2' }, { id: 'h3' }, { id: 'h4' }]
const nearHotels = [{ id: 'nh1' }, { id: 'nh2' }, { id: 'nh3' }, { id: 'nh4' }]
const hotCities = [{ id: 'c1' }, { id: 'c2' }, { id: 'c3' }, { id: 'c4' }, { id: 'c5' }]

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
