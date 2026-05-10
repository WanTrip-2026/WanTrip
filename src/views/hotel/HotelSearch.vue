<script setup lang="ts">
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import HotelCard from '../../components/layout/HotelCard.vue'
import SearchBar from '../../components/layout/SearchBar.vue'
import type { LocationQueryRaw } from 'vue-router'

interface Hotel {
  id: string
  name: string
  star_rating: number
  min_price: number
  facilities?: string[]
  image_url: string
}

interface FilterMenu {
  key: string
  title: string
  options: string[]
  selected: string[]
}

interface RawHotel extends Omit<Hotel, 'image_url'> {
  image_url?: string | null
}

interface SearchPayload {
  keyword: string
  range: [Date, Date]
  rooms: number
  people: number
}

const router = useRouter()
const route = useRoute()

// --- 2. 搜尋與飯店狀態 ---
const keyword = ref('')
const range = ref<[Date, Date] | null>(null)
const peopleConfig = reactive({ people: 2, rooms: 1 })

const hotels = ref<Hotel[]>([])
const error = ref<string | null>(null)
const isLoading = ref(false) // [NEW] Loading state
const facilities = ref<string[]>([]) // 存放 API 抓回的設施清單
const isFilterDrawerOpen = ref(false)
const sortBy = ref('') // 'price_asc' | 'price_desc' | 'star_desc'

// --- 3. 篩選與分頁狀態 ---
const currentPage = ref(1)
const totalPages = ref(1)
const totalHotels = ref(0)
const itemsPerPage = 8
const expandedMenus = ref<string[]>([])
const priceRange = reactive({ min: 14000, max: 30000 })
const minPrice = 14000,
  maxPrice = 30000,
  step = 500

const HotelFiltered = reactive<FilterMenu[]>([
  {
    key: 'star_rating',
    title: '星級',
    options: ['5星級', '4星級', '3星級', '2星級'],
    selected: [],
  },
  { key: 'types', title: '住宿類型', options: [], selected: [] },
  { key: 'facilities', title: '設施＆服務', options: [], selected: [] },
])

// --- 4. 輔助工具函數 ---
const formatDate = (date: Date | null): string => {
  if (!date) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 分頁按鈕計算
const visiblePagination = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const curr = currentPage.value
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    const start = Math.max(2, curr - 1),
      end = Math.min(total - 1, curr + 1)
    if (start > 2) pages.push('...')
    for (let i = start; i <= end; i++) pages.push(i)
    if (end < total - 1) pages.push('...')
    pages.push(total)
  }
  return pages
})

// --- 5. 核心 API 抓取 ---
const fetchHotels = async (page = 1, limit = itemsPerPage) => {
  isLoading.value = true
  try {
    const apiUrl = import.meta.env.VITE_API_BASE_URL
    const params = new URLSearchParams()

    // 搜尋欄參數
    if (keyword.value.trim()) params.append('keyword', keyword.value.trim())
    if (range.value?.[0]) params.append('start_date', formatDate(range.value[0]))
    if (range.value?.[1]) params.append('end_date', formatDate(range.value[1]))
    params.append('adults', String(peopleConfig.people))
    params.append('rooms', String(peopleConfig.rooms))
    // 價格篩選
    params.append('min_price', String(priceRange.min))
    params.append('max_price', String(priceRange.max))

    // 排序
    if (sortBy.value) params.append('sort_by', sortBy.value)

    // 側邊欄篩選參數
    const selectedFacilities = HotelFiltered.find((m) => m.key === 'facilities')?.selected ?? []
    if (selectedFacilities.length > 0) params.append('facility_names', selectedFacilities.join(','))

    const selectedStars = HotelFiltered.find((m) => m.key === 'star_rating')?.selected ?? []
    if (selectedStars.length > 0) {
      const starNums = selectedStars.map((s) => parseInt(s)).filter((n) => !isNaN(n))
      params.append('star_ratings', starNums.join(','))
    }
    const selectedTypes = HotelFiltered.find((m) => m.key === 'types')?.selected ?? []
    if (selectedTypes.length > 0) {
      params.append('types', selectedTypes.join(','))
    }

    params.append('page', String(page))
    params.append('limit', String(limit))

    const res = await fetch(`${apiUrl}/hotels?${params.toString()}`)
    if (!res.ok) throw new Error('取得飯店資料失敗')
    const data: { hotels: RawHotel[]; page: number; total: number } = await res.json()

    hotels.value = (data.hotels ?? []).map(
      (h): Hotel => ({
        ...h,
        image_url:
          h.image_url ||
          'https://res.cloudinary.com/wantrip/image/upload/v1767939338/%E9%A3%AF%E5%BA%97%E9%A6%96%E5%9C%96_dualwy.jpg',
      }),
    )
    currentPage.value = data.page
    totalHotels.value = data.total || 0
    totalPages.value = Math.max(1, Math.ceil((data.total || 0) / limit))
    error.value = null
  } catch (err) {
    console.error(err)
    error.value = '目前無法取得飯店資料，請稍後再試'
    hotels.value = []
  } finally {
    isLoading.value = false
  }
}

// --- 6. 事件處理 ---
const handleGoToDetail = (hotelId: string) => {
  // 檢查日期是否存在，避免網址出現 undefined
  const startDate = range.value?.[0] ? formatDate(range.value[0]) : ''
  const endDate = range.value?.[1] ? formatDate(range.value[1]) : ''

  const routeData = router.resolve({
    path: `/hotels/${hotelId}`,
    query: {
      keyword: keyword.value,
      start_date: startDate,
      end_date: endDate,
      adults: peopleConfig.people,
      rooms: peopleConfig.rooms,
    },
  })

  window.open(routeData.href, '_blank')
}

const handleSearchUpdate = (data: SearchPayload) => {
  // Update internal state
  keyword.value = data.keyword
  range.value = data.range
  peopleConfig.people = data.people
  peopleConfig.rooms = data.rooms

  // Update URL (Trigger watcher to fetch)
  const queryParams: LocationQueryRaw = {
    ...route.query, // Keep existing filters
    keyword: data.keyword,
    adults: String(data.people),
    rooms: String(data.rooms),
  }
  queryParams.page = '1'

  if (data.range && data.range.length === 2 && data.range[0] && data.range[1]) {
    queryParams.start_date = formatDate(data.range[0])
    queryParams.end_date = formatDate(data.range[1])
  } else {
    delete queryParams.start_date
    delete queryParams.end_date
  }

  // Remove empty keyword
  if (!data.keyword) {
    delete queryParams.keyword
  }

  router.replace({ path: route.path, query: queryParams })

  // Note: We don't need to call fetchHotels(1) manually because route watcher will do it
}

const goToPage = (page: number) => {
  const p = Math.min(Math.max(page, 1), totalPages.value)
  const queryParams: LocationQueryRaw = {
    ...route.query,
    page: String(p),
  }
  router.push({ path: route.path, query: queryParams })
}

const clearOptions = (key: string) => {
  const menu = HotelFiltered.find((m) => m.key === key)
  if (menu) menu.selected = []
}

const toggleMenu = (key: string) => {
  if (expandedMenus.value.includes(key)) {
    expandedMenus.value = expandedMenus.value.filter((k) => k !== key)
  } else {
    expandedMenus.value.push(key)
  }
}
const goToMapSearch = () => {
  // 1. 準備搜尋參數
  const queryParams: LocationQueryRaw = {
    keyword: keyword.value || '',
    adults: peopleConfig.people,
    rooms: peopleConfig.rooms,
    min_price: String(priceRange.min),
    max_price: String(priceRange.max),
  }

  // 2. 處理日期
  if (range.value && range.value.length === 2) {
    const [start, end] = range.value
    if (start && end) {
      queryParams.start_date = formatDate(start)
      queryParams.end_date = formatDate(end)
    }
  }

  // 3. 執行跳轉
  router.push({
    path: '/hotels/map-search',
    query: queryParams,
  })
}

// --- 從 URL 解析參數的函式 ---
const initStatesFromUrl = () => {
  const { keyword: urlKeyword, start_date, end_date, adults, rooms, page } = route.query

  keyword.value = urlKeyword ? String(urlKeyword) : ''

  if (start_date && end_date) {
    range.value = [new Date(String(start_date)), new Date(String(end_date))]
  } else {
    range.value = null
  }

  peopleConfig.people = adults ? Number(adults) : 2
  peopleConfig.rooms = rooms ? Number(rooms) : 1

  currentPage.value = page ? Number(page) : 1
}

// --- 7. 生命週期與監聽 ---
onMounted(async () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL

  // A. 先從 URL 抓取搜尋條件並同步到 ref/reactive
  initStatesFromUrl()

  try {
    // B. 同步抓取設施與類型
    const [facRes, typeRes] = await Promise.all([
      fetch(`${apiUrl}/facilities`),
      fetch(`${apiUrl}/hotel_types`),
    ])

    if (facRes.ok) {
      const facs = await facRes.json()
      facilities.value = facs

      const m = HotelFiltered.find((m) => m.key === 'facilities')
      if (m) m.options = facs
    }
    if (typeRes.ok) {
      const types = await typeRes.json()
      const m = HotelFiltered.find((m) => m.key === 'types')
      if (m) m.options = types
    }

    // C. 執行搜尋
  } catch (err) {
    console.error('初始化失敗', err)
  }
})

// 重要：監聽路由變化 (處理在搜尋頁「再次搜尋」的情況)
watch(
  () => route.query,
  () => {
    initStatesFromUrl()
    const page = Number(route.query.page ?? 1)
    fetchHotels(page)
  },
  { immediate: true },
)

// 側邊欄篩選器變動即重新搜尋
watch(
  () => HotelFiltered.map((m) => m.selected),
  () => fetchHotels(1),
  { deep: true },
)

// 監聽價格變動
let timer: ReturnType<typeof setTimeout> | null = null
watch(
  priceRange,
  () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fetchHotels(1)
    }, 500)
  },
  { deep: true },
)
</script>

<template>
  <main class="max-w-[1240px] mx-auto pt-24 mb-40 bg-page px-5">
    <SearchBar mode="emit" :initial-keyword="keyword" :initial-range="range"
      :initial-people="{ rooms: peopleConfig.rooms, people: peopleConfig.people }" @search="handleSearchUpdate" />

    <section class="gap-5 mx-auto flex flex-col lg:flex-row">
      <!-- 桌面版側邊欄 -->
      <aside class="hidden lg:flex flex-col gap-5 w-[285px]">
        <div
          class="relative flex h-[120px] items-center justify-center rounded-20 border border-gray-300 overflow-hidden bg-center bg-cover bg-[url('https://res.cloudinary.com/wantrip/image/upload/v1768379566/MapSearch_cezz0b.png')]">
          <div class="absolute inset-0 bg-white/30"></div>
          <button name="map-search" @click="goToMapSearch"
            class="relative z-10 rounded-full bg-primary hover:bg-main text-white px-6 py-2 shadow-sm transition">
            地圖找房
          </button>
        </div>

        <div class="rounded-20 p-10 bg-white border border-gray-300 shadow-sm">
          <h3 class="font-bold text-xl text-dark mb-[20px]">篩選條件</h3>
          <div class="flex flex-col gap-5">
            <!-- Price Filter -->
            <h4 class="font-medium text-dark">每晚預算</h4>
            <div class="flex flex-col gap-2 border-b pb-5 border-gray-100 last:border-0">
              <div class="relative h-2 w-full bg-main-100 rounded-full">
                <div class="absolute h-2 bg-main-300 rounded-full" :style="{
                  left: `${((priceRange.min - minPrice) / (maxPrice - minPrice)) * 100}%`,
                  right: `${100 - ((priceRange.max - minPrice) / (maxPrice - minPrice)) * 100}%`,
                }"></div>
                <input type="range" :min="minPrice" :max="maxPrice" :step="step" v-model.number="priceRange.min"
                  class="absolute w-full h-2 bg-transparent pointer-events-none appearance-none" />
                <input type="range" :min="minPrice" :max="maxPrice" :step="step" v-model.number="priceRange.max"
                  class="absolute w-full h-2 bg-transparent pointer-events-none appearance-none" />
              </div>
              <div class="flex justify-between mt-2">
                <span class="text-xs text-gray-500">${{ priceRange.min }}</span>
                <span class="text-xs text-gray-500">${{ priceRange.max }}</span>
              </div>
            </div>

            <div v-for="menu in HotelFiltered" :key="menu.key" class="border-b pb-5 border-gray-100 last:border-0">
              <div class="flex justify-between items-center mb-2">
                <h4 class="font-medium text-dark-900">{{ menu.title }}</h4>
                <button name="clear-options" @click="clearOptions(menu.key)"
                  class="text-xs text-gray-400 hover:text-primary">
                  清除
                </button>
              </div>
              <div class="space-y-2">
                <label v-for="option in menu.options.slice(
                  0,
                  expandedMenus.includes(menu.key) ? menu.options.length : 4,
                )" :key="option" class="flex items-center text-sm cursor-pointer">
                  <input type="checkbox" :value="option" v-model="menu.selected"
                    class="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                  {{ option }}
                </label>
                <button name="expand-more" v-if="menu.options.length > 4 && !expandedMenus.includes(menu.key)"
                  @click="toggleMenu(menu.key)" class="text-xs text-primary mt-2">
                  展開更多
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div class="flex flex-1 flex-col gap-5">
        <div
          class="lg:hidden relative flex h-[120px] items-center justify-center rounded-20 border border-gray-300 overflow-hidden bg-center bg-cover bg-[url('https://res.cloudinary.com/wantrip/image/upload/v1768379566/MapSearch_cezz0b.png')]">
          <div class="absolute inset-0 bg-white/30"></div>
          <button name="map-search" @click="goToMapSearch"
            class="relative z-10 rounded-full bg-primary hover:bg-main text-white px-6 py-2 shadow-sm transition">
            地圖找房
          </button>
        </div>
        <h3 class="text-black text-xl">
          <span v-if="keyword" class="mr-2 text-gray-500"> 搜尋: {{ keyword }} </span>
          找到 <span class="text-red-500 font-bold">{{ totalHotels }}</span> 間飯店
        </h3>

        <div class="flex flex-row items-center gap-2 overflow-x-auto scrollbar-hide">
          <button name="filter-drawer" @click="isFilterDrawerOpen = true"
            class="lg:hidden flex items-center gap-2 rounded-20 bg-primary border border-gray-300 text-white px-4 py-2 shadow-sm transition whitespace-nowrap">
            <font-awesome-icon icon="sliders" />
            篩選
          </button>
          <button name="price-high-to-low" @click="
            () => {
              sortBy = 'price_desc'
              fetchHotels(1)
            }
          " :class="[
            'rounded-full px-6 py-2 shadow-sm font-bold transition whitespace-nowrap border',
            sortBy === 'price_desc'
              ? 'bg-primary text-white border-primary hover:bg-main'
              : 'bg-white text-dark border-gray-300 hover:bg-main-100',
          ]">
            價格高到低
          </button>
          <button name="price-low-to-high" @click="
            () => {
              sortBy = 'price_asc'
              fetchHotels(1)
            }
          " :class="[
            'rounded-full px-6 py-2 shadow-sm font-bold transition whitespace-nowrap border',
            sortBy === 'price_asc'
              ? 'bg-primary text-white border-primary hover:bg-main'
              : 'bg-white text-dark border-gray-300 hover:bg-main-100',
          ]">
            價格低到高
          </button>
          <button name="popular-high-to-low" @click="
            () => {
              sortBy = 'star_desc'
              fetchHotels(1)
            }
          " :class="[
            'rounded-full px-6 py-2 shadow-sm font-bold transition whitespace-nowrap border',
            sortBy === 'star_desc'
              ? 'bg-primary text-white border-primary hover:bg-main'
              : 'bg-white text-dark border-gray-300 hover:bg-main-100',
          ]">
            星級高到低
          </button>
        </div>

        <div v-if="error" class="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
          {{ error }}
        </div>

        <div class="flex flex-col gap-5">
          <!-- Loading Skeleton -->
          <template v-if="isLoading">
            <div v-for="i in 4" :key="i"
              class="animate-pulse bg-white rounded-20 border border-gray-200 overflow-hidden flex flex-col sm:flex-row shadow-sm">
              <div class="h-[200px] sm:h-auto sm:w-[280px] bg-gray-200 flex-shrink-0"></div>
              <div class="flex-1 p-5 flex flex-col gap-3">
                <div class="h-5 bg-gray-200 rounded-full w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded-full w-1/4"></div>
                <div class="h-3 bg-gray-200 rounded-full w-1/3"></div>
                <div class="h-3 bg-gray-200 rounded-full w-1/2"></div>
                <div class="mt-auto flex justify-between items-center">
                  <div class="h-6 bg-gray-200 rounded-full w-24"></div>
                  <div class="h-10 bg-gray-200 rounded-full w-24"></div>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <div v-for="hotel in hotels" :key="hotel.id" @click="handleGoToDetail(hotel.id)" class="cursor-pointer">
              <HotelCard :hotel="hotel" :search-params="{
                start_date: range?.[0] ? formatDate(range[0]) : '',
                end_date: range?.[1] ? formatDate(range[1]) : '',
                adults: peopleConfig.people,
                rooms: peopleConfig.rooms,
              }" />
            </div>
            <div v-if="hotels.length === 0 && !error" class="text-center py-20 text-gray-400">
              沒有符合條件的飯店，試著調整篩選條件吧！<br />
              我們會繼續努力開發的(๑•́ ₃ •̀๑)
            </div>
          </template>
        </div>

        <div class="flex justify-center items-center gap-2 mt-10 mb-20">
          <button name="previous-page" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
            class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 disabled:opacity-30">
            &lt;
          </button>
          <button name="switch-page" v-for="p in visiblePagination" :key="p"
            @click="typeof p === 'number' && goToPage(p)" :class="[
              'w-10 h-10 rounded-full border transition',
              p === currentPage
                ? 'bg-primary text-white border-primary'
                : 'border-gray-200 hover:bg-gray-50',
              p === '...' ? 'border-transparent pointer-events-none' : '',
            ]">
            {{ p }}
          </button>
          <button name="next-page" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
            class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 disabled:opacity-30">
            &gt;
          </button>
        </div>
      </div>
    </section>

    <!-- 行動版篩選 Drawer -->
    <Teleport to="body">
      <div v-if="isFilterDrawerOpen" class="fixed inset-0 z-[100] lg:hidden">
        <!-- Backdrop -->
        <Transition enter-active-class="transition-opacity ease-out duration-300" enter-from-class="opacity-0"
          enter-to-class="opacity-100" leave-active-class="transition-opacity ease-in duration-200"
          leave-from-class="opacity-100" leave-to-class="opacity-0">
          <div v-if="isFilterDrawerOpen" @click="isFilterDrawerOpen = false"
            class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </Transition>

        <!-- Drawer Content -->
        <Transition enter-active-class="transition-transform ease-out duration-300" enter-from-class="-translate-x-full"
          enter-to-class="translate-x-0" leave-active-class="transition-transform ease-in duration-200"
          leave-from-class="translate-x-0" leave-to-class="-translate-x-full">
          <div v-if="isFilterDrawerOpen"
            class="absolute top-0 left-0 h-[calc(100%-40px)] w-[80%] m-5 rounded-20 bg-white/65 backdrop-blur-sm shadow-xl flex flex-col p-5 overflow-y-auto scrollbar-hide">
            <div class="flex items-center justify-between mb-6">
              <h3 class="font-bold text-xl text-dark">篩選條件</h3>
              <button @click="isFilterDrawerOpen = false" class="text-dark-500 text-2xl">
                &times;
              </button>
            </div>

            <div class="flex flex-col gap-6">
              <!-- Price Filter -->
              <div class="text-dark">
                <h4 class="font-medium text-dark mb-4">每晚預算</h4>
                <div class="flex flex-col gap-2">
                  <div class="relative h-2 w-full bg-main-100 rounded-full">
                    <div class="absolute h-2 bg-main-300 rounded-full" :style="{
                      left: `${((priceRange.min - minPrice) / (maxPrice - minPrice)) * 100}%`,
                      right: `${100 - ((priceRange.max - minPrice) / (maxPrice - minPrice)) * 100}%`,
                    }"></div>
                    <input type="range" :min="minPrice" :max="maxPrice" :step="step" v-model.number="priceRange.min"
                      class="absolute w-full h-2 bg-transparent pointer-events-none appearance-none" />
                    <input type="range" :min="minPrice" :max="maxPrice" :step="step" v-model.number="priceRange.max"
                      class="absolute w-full h-2 bg-transparent pointer-events-none appearance-none" />
                  </div>
                  <div class="flex justify-between mt-2">
                    <span class="text-xs text-dark">${{ priceRange.min }}</span>
                    <span class="text-xs text-dark">${{ priceRange.max }}</span>
                  </div>
                </div>
              </div>

              <div v-for="menu in HotelFiltered" :key="menu.key" class="border-t pt-6 border-gray-300">
                <div class="flex justify-between items-center mb-4">
                  <h4 class="font-medium text-dark">{{ menu.title }}</h4>
                  <button name="clear-options" @click="clearOptions(menu.key)"
                    class="text-xs text-dark hover:text-primary">
                    清除
                  </button>
                </div>
                <div class="space-y-3">
                  <label v-for="option in menu.options" :key="option"
                    class="flex items-center text-sm text-dark cursor-pointer">
                    <input type="checkbox" :value="option" v-model="menu.selected"
                      class="mr-2 rounded border-gray-300 text-dark focus:ring-dark h-4 w-4" />
                    {{ option }}
                  </label>
                </div>
              </div>
            </div>

            <button name="filter-complete" @click="isFilterDrawerOpen = false"
              class="mt-8 mb-4 w-full bg-primary text-white py-3 rounded-full font-bold shadow-md hover:bg-main transition">
              完成
            </button>
          </div>
        </Transition>
      </div>
    </Teleport>
  </main>
</template>

<style scoped>
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background-color: #2f3d4d;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
}

input[type='range']::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background-color: #2f3d4d;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  border: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
