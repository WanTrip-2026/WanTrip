<script setup lang="ts">
import HotelCard from '../../components/layout/HotelCard.vue'
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

interface PriceRange {
  min: number
  max: number
}
interface FilterMenu {
  key: string
  title: string
  options: string[]
  selected: string[]
}
interface Hotel {
  id: string
  name: string
  star_rating: number
  min_price: number
  facilities?: string[]
  image_url: string
}

type FacilityName = string

const router = useRouter()

// 日期處理 - VueDatePicker 版本
const today = new Date()
today.setHours(0, 0, 0, 0)

const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)
tomorrow.setHours(0, 0, 0, 0)

const range = ref<[Date, Date]>([today, tomorrow])

const formatDate = (date: Date | null): string => {
  if (!date) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 格式化日期範圍顯示
const formatRangeDisplay = (): string => {
  if (!range.value || !Array.isArray(range.value) || range.value.length !== 2) return ''
  const [start, end] = range.value
  if (!start || !end) return ''
  return `${formatDate(start)} - ${formatDate(end)}`
}

function onSearch() {
  goToPage(1)
}

const peoplePickerRef = ref<HTMLElement | null>(null)

const peopleConfig = reactive({
  people: 2,
  rooms: 1,
})

const peopleDisplayText = computed(() => {
  return `${peopleConfig.rooms} 間房 · ${peopleConfig.people} 位旅客`
})

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement

  // VueDatePicker 的彈窗 class
  if (target.closest('.dp__menu') || target.closest('.dp__overlay')) {
    return
  }

  if (target.closest('.search-bar-container')) {
    if (
      activePicker.value === 'people' &&
      peoplePickerRef.value &&
      !peoplePickerRef.value.contains(target)
    ) {
      activePicker.value = 'none'
    }
    return
  }

  activePicker.value = 'none'
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

const facilities = ref<FacilityName[]>([])
const hotels = ref<Hotel[]>([])
const keyword = ref('')
const error = ref<string | null>(null)

const expandedMenus = ref<string[]>([])

const minPrice = 0
const maxPrice = 15000
const step = 500
const priceRange = ref<PriceRange>({ min: minPrice, max: maxPrice })

const currentPage = ref(1)
const itemsPerPage = 8
const totalPages = ref(1)

const activePicker = ref('none')

const togglePicker = (name: string) => {
  if (activePicker.value === name) {
    activePicker.value = 'none'
  } else {
    activePicker.value = name
  }
}

const handleDateChange = (newRange: Date[] | null) => {
  if (!newRange || newRange.length !== 2) return

  const [start, end] = newRange
  if (!start || !end) return

  const startDate = new Date(start)
  const endDate = new Date(end)
  startDate.setHours(0, 0, 0, 0)
  endDate.setHours(0, 0, 0, 0)

  const diffDays = (endDate.getTime() - startDate.getTime()) / 86400000

  if (diffDays < 1) {
    const fixedEnd = new Date(startDate)
    fixedEnd.setDate(startDate.getDate() + 1)
    range.value = [startDate, fixedEnd]
  }
}

const starOptions = computed(() => ['5星級', '4星級', '3星級', '2星級'])

const HotelFiltered = reactive<FilterMenu[]>([
  { key: 'star_rating', title: '星級', options: starOptions.value, selected: [] },
  {
    key: 'reviews',
    title: '評價',
    options: ['好極了: 9分以上', '非常好: 8分以上', '好: 7分以上', '令人愉悅: 6分以上'],
    selected: [],
  },
  { key: 'types', title: '住宿類型', options: [], selected: [] },
  {
    key: 'policies',
    title: '付款政策',
    options: ['免費取消', '立即付款', '延後付款', '到店付款'],
    selected: [],
  },
  { key: 'facilities', title: '設施＆服務', options: [], selected: [] },
  {
    key: 'districts',
    title: '地區',
    options: ['中正區', '中山區', '萬華區', '大同區', '松山區'],
    selected: [],
  },
  {
    key: 'distance',
    title: '距離市中心',
    options: [
      '位於市中心',
      '距市中心1.5公里內',
      '距市中心1.5-3公里內',
      '距市中心3-5公里內',
      '距市中心5公里以上',
    ],
    selected: [],
  },
])

const fetchHotels = async (page = 1, limit = itemsPerPage) => {
  try {
    const apiUrl = import.meta.env.VITE_API_BASE_URL

    const params = new URLSearchParams()

    if (keyword.value.trim()) params.append('keyword', keyword.value.trim())

    // VueDatePicker 格式:陣列 [start, end]
    if (range.value && range.value[0]) {
      params.append('start_date', formatDate(range.value[0]))
    }
    if (range.value && range.value[1]) {
      params.append('end_date', formatDate(range.value[1]))
    }
    params.append('adults', String(peopleConfig.people))
    params.append('rooms', String(peopleConfig.rooms))

    const selectedFacilities = HotelFiltered.find((m) => m.key === 'facilities')?.selected ?? []
    if (selectedFacilities.length > 0) params.append('facility_names', selectedFacilities.join(','))

    const selectedTypes = HotelFiltered.find((m) => m.key === 'types')?.selected ?? []
    if (selectedTypes.length > 0) params.append('types', selectedTypes.join(','))

    const selectedStars = HotelFiltered.find((m) => m.key === 'star_rating')?.selected ?? []
    if (selectedStars.length > 0) {
      const starNums = selectedStars.map((s) => parseInt(s, 10)).filter((n) => Number.isFinite(n))
      if (starNums.length > 0) params.append('star_ratings', starNums.join(','))
    }
    params.append('page', String(page))
    params.append('limit', String(limit))

    const url = `${apiUrl}/hotels?${params.toString()}`
    console.log('[fetchHotels]', url)

    const res = await fetch(`${apiUrl}/hotels?${params.toString()}`)
    if (!res.ok) throw new Error('取得飯店資料失敗')

    const data: { total: number; page: number; limit: number; hotels: Hotel[] } = await res.json()

    hotels.value = (data.hotels ?? []).map((h) => ({
      ...h,
      image_url:
        h.image_url ||
        'https://res.cloudinary.com/wantrip/image/upload/v1767939338/%E9%A3%AF%E5%BA%97%E9%A6%96%E5%9C%96_dualwy.jpg',
    }))

    currentPage.value = data.page
    totalPages.value = Math.max(1, Math.ceil((data.total ?? 0) / (data.limit || limit)))

    error.value = null
  } catch (err) {
    console.error(err)
    error.value = '取得飯店資料時發生錯誤'
    hotels.value = []
    currentPage.value = 1
    totalPages.value = 1
  }
}

onMounted(async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_BASE_URL

    const facilitiesRes = await fetch(`${apiUrl}/facilities`)
    if (!facilitiesRes.ok) throw new Error('取得設施資料失敗')
    facilities.value = await facilitiesRes.json()

    const facilityMenu = HotelFiltered.find((m) => m.key === 'facilities')
    if (facilityMenu) facilityMenu.options = facilities.value

    const typesRes = await fetch(`${apiUrl}/hotel_types`)
    if (!typesRes.ok) throw new Error('取得住宿類型失敗')

    const types: string[] = await typesRes.json()

    const typeMenu = HotelFiltered.find((m) => m.key === 'types')
    if (typeMenu) {
      typeMenu.options = types
    }

    await fetchHotels(1, itemsPerPage)
  } catch (err) {
    console.error(err)
    error.value = '初始化資料時發生錯誤'
  }
})

watch(
  () => HotelFiltered.find((m) => m.key === 'facilities')?.selected,
  () => {
    goToPage(1)
  },
  { deep: true },
)
watch(
  () => HotelFiltered.find((m) => m.key === 'star_rating')?.selected,
  () => {
    goToPage(1)
  },
  { deep: true },
)
watch(
  () => HotelFiltered.find((m) => m.key === 'types')?.selected,
  () => {
    goToPage(1)
  },
  { deep: true },
)

const visiblePagination = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const curr = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)

  const start = Math.max(2, curr - 1)
  const end = Math.min(total - 1, curr + 1)

  if (start > 2) pages.push('...')

  for (let i = start; i <= end; i++) pages.push(i)

  if (end < total - 1) pages.push('...')

  pages.push(total)
  return pages
})

function goToPage(page: number) {
  const p = Math.min(Math.max(page, 1), totalPages.value)
  currentPage.value = p
  fetchHotels(p, itemsPerPage)
}
function firstPage() {
  goToPage(1)
}
function lastPage() {
  goToPage(totalPages.value)
}
function prevPage() {
  goToPage(currentPage.value - 1)
}
function nextPage() {
  goToPage(currentPage.value + 1)
}

watch(
  () => [priceRange.value.min, priceRange.value.max],
  ([min, max]) => {
    if (min < minPrice) priceRange.value.min = minPrice
    if (max > maxPrice) priceRange.value.max = maxPrice
    if (max - min < step) priceRange.value.max = min + step
  },
)

function clearOptions(key: string) {
  const menu = HotelFiltered.find((m) => m.key === key)
  if (menu) menu.selected = []

  if (key === 'facilities' || key === 'star_rating' || key === 'types') goToPage(1)
}

function toggleMenu(key: string) {
  if (expandedMenus.value.includes(key)) {
    expandedMenus.value = expandedMenus.value.filter((k) => k !== key)
  } else {
    expandedMenus.value.push(key)
  }
}

function goToMapSearch() {
  router.push('/hotels/map-search')
}
</script>

<template>
  <main class="max-w-[1200px] mx-auto pt-24 bg-page px-5 lg:px-0">
    <!-- search-bar -->
    <section
      class="max-w-[800px] mx-auto p-2 mb-10 bg-white rounded-[20px] md:rounded-full border border-gray-300 flex flex-col md:flex-row items-center gap-2 sticky shadow-sm z-20 search-bar-container"
    >
      <div
        class="relative w-full rounded-full bg-gray-50 px-6 py-[5px] flex flex-col justify-center border border-gray-300 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all md:h-full flex-1"
      >
        <input
          v-model="keyword"
          type="text"
          placeholder="想住哪～"
          @click.stop="togglePicker('keyword')"
          class="w-full pl-4 px-6 py-3 text-base text-black bg-transparent border-none bg-gray-50 rounded-full outline-none transition-all"
        />
      </div>

      <!-- VueDatePicker -->
      <div class="relative w-full md:h-full flex-1">
        <VueDatePicker
          v-model="range"
          range
          :min-range="1"
          :enable-time-picker="false"
          format="yyyy-MM-dd"
          :min-date="new Date()"
          auto-apply
          hide-input-icon
          :clearable="false"
          @update:model-value="handleDateChange"
          @open="activePicker = 'none'"
        >
          <template #dp-input>
            <div
              class="w-full h-full rounded-full bg-gray-50 px-6 py-3 flex flex-col justify-center border border-gray-300 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
            >
              <p class="text-[10px] font-bold text-primary/70 uppercase">入住 - 退房日期</p>
              <input
                :value="formatRangeDisplay()"
                class="w-full bg-transparent text-sm text-black outline-none pointer-events-none"
                placeholder="點選選擇日期"
                readonly
              />
            </div>
          </template>
        </VueDatePicker>
      </div>

      <div class="relative flex-1" ref="peoplePickerRef">
        <label
          @click="togglePicker('people')"
          class="h-full rounded-full bg-gray-50 px-6 py-3 flex flex-col justify-center border border-gray-300 transition-all hover:ring-2 hover:ring-primary/50 cursor-pointer"
        >
          <p class="text-[10px] font-bold leading-tight text-primary/70 uppercase tracking-wider">
            人數、需求
          </p>
          <div class="min-h-[24px] flex items-center justify-between">
            <span class="text-sm font-medium text-black">{{ peopleDisplayText }}</span>
            <svg
              class="h-4 w-4 text-primary/30 transition-transform duration-300"
              :class="{ 'rotate-180': activePicker === 'people' }"
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
            v-if="activePicker === 'people'"
            @click.stop
            class="absolute top-[calc(100%+12px)] space-y-5 left-0 z-[100] w-[280px] rounded-[20px] bg-white p-6 shadow-2xl ring-1 ring-black/5"
          >
            <!-- 房間數 -->
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-bold text-slate-800">房間</p>
                <p class="text-[10px] text-slate-400">所需的客房數量</p>
              </div>
              <div class="flex items-center gap-3">
                <button
                  @click.stop="peopleConfig.rooms > 1 ? peopleConfig.rooms-- : null"
                  type="button"
                  class="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all"
                >
                  -
                </button>
                <span class="text-sm font-bold w-4 text-center">{{ peopleConfig.rooms }}</span>
                <button
                  @click.stop="peopleConfig.rooms++"
                  type="button"
                  class="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            <!-- 旅客數 -->
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-bold text-slate-800">旅客</p>
                <p class="text-[10px] text-slate-400">總人數</p>
              </div>
              <div class="flex items-center gap-3">
                <button
                  @click.stop="peopleConfig.people > 1 ? peopleConfig.people-- : null"
                  type="button"
                  class="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all"
                >
                  -
                </button>
                <span class="text-sm font-bold w-4 text-center">{{ peopleConfig.people }}</span>
                <button
                  @click.stop="peopleConfig.people++"
                  type="button"
                  class="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="border border-gray-300 rounded-full md:h-full">
        <button
          @click="onSearch"
          class="bg-primary hover:bg-[#6D8FA3] text-white px-6 py-3 rounded-full transition-colors whitespace-nowrap"
        >
          搜尋
        </button>
      </div>
    </section>

    <!-- result-list -->
    <section class="gap-5 m-10 mx-auto flex">
      <aside class="flex flex-col gap-5 w-[285px]">
        <div
          class="relative flex h-[120px] items-center justify-center rounded-[20px] border border-gray-300 overflow-hidden bg-center bg-cover bg-[url('https://res.cloudinary.com/wantrip/image/upload/v1768379566/MapSearch_cezz0b.png')]"
        >
          <div class="absolute inset-0 bg-white/30"></div>
          <button
            @click="goToMapSearch"
            class="relative z-10 flex items-center justify-center rounded-full bg-primary hover:bg-main_800 text-white px-6 py-2 shadow-sm transition"
          >
            地圖找房
          </button>
        </div>

        <div class="rounded-[20px] p-10 bg-white border border-gray-300 shadow-sm">
          <h3 class="font-bold text-xl text-dark mb-[20px]">篩選條件</h3>

          <div class="flex flex-col gap-5">
            <!-- Price Filter -->
            <h4 class="font-medium text-dark">每晚預算<br /></h4>
            <div class="flex flex-col gap-2">
              <div class="relative h-2 w-full bg-main_100 rounded-full">
                <div
                  class="absolute h-2 bg-main_300 rounded-full"
                  :style="{
                    left: `${(priceRange.min / maxPrice) * 100}%`,
                    right: `${100 - (priceRange.max / maxPrice) * 100}%`,
                  }"
                ></div>

                <input
                  type="range"
                  :min="minPrice"
                  :max="maxPrice"
                  :step="step"
                  v-model.number="priceRange.min"
                  class="absolute w-full h-2 bg-transparent pointer-events-none appearance-none"
                />
                <input
                  type="range"
                  :min="minPrice"
                  :max="maxPrice"
                  :step="step"
                  v-model.number="priceRange.max"
                  class="absolute w-full h-2 bg-transparent pointer-events-none appearance-none"
                />
              </div>

              <div class="flex justify-between mt-2">
                <input
                  type="number"
                  v-model.number="priceRange.min"
                  :min="minPrice"
                  :max="maxPrice"
                  :step="step"
                  class="border border-gray-300 rounded-full p-1 w-24 text-dark_900 text-center"
                />
                <input
                  type="number"
                  v-model.number="priceRange.max"
                  :min="minPrice"
                  :max="maxPrice"
                  :step="step"
                  class="border border-gray-300 rounded-full p-1 w-24 text-dark_900 text-center"
                />
              </div>
            </div>

            <!-- Option Filter -->
            <div
              class="border-b-[1px] pb-[20px] border-main_800 border-solid last:border-b-0"
              v-for="HotelMenu in HotelFiltered"
              :key="HotelMenu.key"
            >
              <div class="flex justify-between items-center mb-2">
                <h4 class="font-medium text-base text-dark_900">{{ HotelMenu.title }}</h4>
                <button
                  class="text-xs text-dark_500 hover:text-primary"
                  @click="clearOptions(HotelMenu.key)"
                >
                  清除
                </button>
              </div>

              <div class="space-y-2">
                <label
                  class="flex cursor-pointer text-sm text-dark_900 items-center"
                  v-for="option in HotelMenu.options.slice(
                    0,
                    expandedMenus.includes(HotelMenu.key) ? HotelMenu.options.length : 4,
                  )"
                  :key="option"
                >
                  <input
                    type="checkbox"
                    class="mr-2 text-dark_900 focus:ring-primary"
                    :value="option"
                    v-model="HotelMenu.selected"
                  />
                  {{ option }}
                </label>

                <button
                  v-if="HotelMenu.options.length > 4 && !expandedMenus.includes(HotelMenu.key)"
                  class="text-dark_500 hover:text-primary text-sm mt-1"
                  @click="toggleMenu(HotelMenu.key)"
                >
                  展開更多選項
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div class="flex flex-1 flex-col gap-5">
        <div v-if="error" class="p-4 rounded-xl border border-red-200 bg-red-50 text-red-700">
          {{ error }}
        </div>

        <div class="flex flex-row items-center gap-2">
          <button
            class="rounded-[20px] bg-primary hover:bg-main_800 text-white px-6 py-2 shadow-sm transition"
          >
            價格高到低
          </button>
          <button
            class="rounded-[20px] bg-primary hover:bg-main_800 text-white px-6 py-2 shadow-sm transition"
          >
            價格低到高
          </button>
          <button
            class="rounded-[20px] bg-primary hover:bg-main_800 text-white px-6 py-2 shadow-sm transition"
          >
            熱門高到低
          </button>
          <button
            class="rounded-[20px] bg-primary hover:bg-main_800 text-white px-6 py-2 shadow-sm"
          >
            評價高到低
          </button>
        </div>

        <div class="flex flex-col gap-5 hotel-card rounded-[20px] w-full">
          <HotelCard v-for="hotel in hotels" :key="hotel.id" :hotel="hotel" />
          <div v-if="hotels.length === 0 && !error" class="text-center text-dark_500 py-10">
            找不到符合條件的飯店
          </div>
        </div>

        <div class="flex justify-center gap-2 mt-5 mb-10">
          <button
            class="w-10 h-10 border rounded-full hover:bg-main_100"
            @click="firstPage"
            :disabled="currentPage === 1"
          >
            &lt;&lt;
          </button>

          <button
            class="w-10 h-10 border rounded-full hover:bg-main_100"
            @click="prevPage"
            :disabled="currentPage === 1"
          >
            &lt;
          </button>

          <button
            class="w-10 h-10 border rounded-full hover:bg-main_100"
            v-for="item in visiblePagination"
            :key="item"
            :disabled="item === '...'"
            @click="item !== '...' && goToPage(Number(item))"
            :class="item === currentPage ? 'bg-primary text-white hover:bg-main_800' : ''"
          >
            {{ item }}
          </button>

          <button
            class="w-10 h-10 border rounded-full hover:bg-main_100"
            @click="nextPage"
            :disabled="currentPage === totalPages"
          >
            &gt;
          </button>

          <button
            class="w-10 h-10 border rounded-full"
            @click="lastPage"
            :disabled="currentPage === totalPages"
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background-color: #2f3d4d;
  border-radius: 9999px;
  cursor: pointer;
}

.dp__menu {
  border-radius: 20px !important;
  background-color: #ffffff;
  padding: 24px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05); /
  z-index: 100;
}

.dp__range_start,
.dp__range_end {
  background-color: #2f3d4d !important;
  color: #fff !important;
}
</style>
