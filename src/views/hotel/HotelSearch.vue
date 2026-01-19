<script setup lang="ts">
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import HotelCard from '../../components/layout/HotelCard.vue'
import SearchBar from '../../components/layout/SearchBar.vue'

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
const facilities = ref<string[]>([]) // 存放 API 抓回的設施清單

// --- 3. 篩選與分頁狀態 ---
const currentPage = ref(1)
const totalPages = ref(1)
const itemsPerPage = 8
const expandedMenus = ref<string[]>([])
const priceRange = reactive({ min: 0, max: 15000 })
const minPrice = 0,
  maxPrice = 15000,
  step = 500

const HotelFiltered = reactive<FilterMenu[]>([
  {
    key: 'star_rating',
    title: '星級',
    options: ['5星級', '4星級', '3星級', '2星級'],
    selected: [],
  },
  { key: 'reviews', title: '評價', options: ['9分以上', '8分以上', '7分以上'], selected: [] },
  { key: 'types', title: '住宿類型', options: [], selected: [] },
  { key: 'policies', title: '付款政策', options: ['免費取消', '到店付款'], selected: [] },
  { key: 'facilities', title: '設施＆服務', options: [], selected: [] },
  { key: 'districts', title: '地區', options: ['中正區', '中山區', '萬華區'], selected: [] },
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
  try {
    const apiUrl = import.meta.env.VITE_API_BASE_URL
    const params = new URLSearchParams()

    // 搜尋欄參數
    if (keyword.value.trim()) params.append('keyword', keyword.value.trim())
    if (range.value?.[0]) params.append('start_date', formatDate(range.value[0]))
    if (range.value?.[1]) params.append('end_date', formatDate(range.value[1]))
    params.append('adults', String(peopleConfig.people))
    params.append('rooms', String(peopleConfig.rooms))

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
    totalPages.value = Math.max(1, Math.ceil((data.total || 0) / limit))
    error.value = null
  } catch (err) {
    console.error(err)
    error.value = '目前無法取得飯店資料，請稍後再試'
    hotels.value = []
  }
}

// --- 6. 事件處理 ---
const handleGoToDetail = (hotelId: string) => {
  // 檢查日期是否存在，避免網址出現 undefined
  const startDate = range.value?.[0] ? formatDate(range.value[0]) : ''
  const endDate = range.value?.[1] ? formatDate(range.value[1]) : ''

  router.push({
    path: `/hotels/${hotelId}`,
    query: {
      keyword: keyword.value,
      start_date: startDate,
      end_date: endDate,
      adults: peopleConfig.people,
      rooms: peopleConfig.rooms,
    },
  })
}

const handleSearchUpdate = (data: SearchPayload) => {
  keyword.value = data.keyword
  range.value = data.range
  peopleConfig.people = data.people
  peopleConfig.rooms = data.rooms
  fetchHotels(1)
}

const goToPage = (page: number) => {
  const p = Math.min(Math.max(page, 1), totalPages.value)
  currentPage.value = p
  fetchHotels(p)
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

const goToMapSearch = () => router.push('/hotels/map-search')

// --- 從 URL 解析參數的函式 ---
const initStatesFromUrl = () => {
  const { keyword: urlKeyword, start_date, end_date, adults, rooms } = route.query

  if (urlKeyword) {
    keyword.value = String(urlKeyword)
  }

  if (start_date && end_date) {
    range.value = [new Date(String(start_date)), new Date(String(end_date))]
  }

  if (adults) peopleConfig.people = Number(adults)
  if (rooms) peopleConfig.rooms = Number(rooms)
}

// --- 7. 生命週期與監聽 ---
onMounted(async () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL

  // A. 先從 URL 抓取搜尋條件並同步到 ref/reactive
  initStatesFromUrl()

  try {
    // B. 同步抓取設施與類型 (你原本的邏輯)
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
    await fetchHotels(1)
  } catch (err) {
    console.error('初始化失敗', err)
  }
})

// 重要：監聽路由變化 (處理在搜尋頁「再次搜尋」的情況)
watch(
  () => route.query,
  () => {
    initStatesFromUrl()
    fetchHotels(1)
  },
)

// 側邊欄篩選器變動即重新搜尋 (你原本的邏輯)
watch(
  () => HotelFiltered.map((m) => m.selected),
  () => fetchHotels(1),
  { deep: true },
)
</script>

<template>
  <main class="max-w-[1200px] mx-auto pt-24 bg-page px-5 lg:px-0">
    <SearchBar
      mode="emit"
      :initial-keyword="keyword"
      :initial-range="range"
      :initial-people="{ rooms: peopleConfig.rooms, people: peopleConfig.people }"
      @search="handleSearchUpdate"
    />

    <section class="gap-5 m-10 mx-auto flex">
      <aside class="flex flex-col gap-5 w-[285px]">
        <div
          class="relative flex h-[120px] items-center justify-center rounded-[20px] border border-gray-300 overflow-hidden bg-center bg-cover bg-[url('https://res.cloudinary.com/wantrip/image/upload/v1768379566/MapSearch_cezz0b.png')]"
        >
          <div class="absolute inset-0 bg-white/30"></div>
          <button
            @click="goToMapSearch"
            class="relative z-10 rounded-full bg-primary hover:bg-main_800 text-white px-6 py-2 shadow-sm transition"
          >
            地圖找房
          </button>
        </div>

        <div class="rounded-[20px] p-10 bg-white border border-gray-300 shadow-sm">
          <h3 class="font-bold text-xl text-dark mb-[20px]">篩選條件</h3>
          <div class="flex flex-col gap-5">
            <!-- Price Filter -->
            <h4 class="font-medium text-dark">每晚預算</h4>
            <div class="flex flex-col gap-2 border-b pb-5 border-gray-100 last:border-0">
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
                <span class="text-xs text-gray-500">${{ priceRange.min }}</span>
                <span class="text-xs text-gray-500">${{ priceRange.max }}</span>
              </div>
            </div>

            <div
              v-for="menu in HotelFiltered"
              :key="menu.key"
              class="border-b pb-5 border-gray-100 last:border-0"
            >
              <div class="flex justify-between items-center mb-2">
                <h4 class="font-medium text-dark_900">{{ menu.title }}</h4>
                <button
                  @click="clearOptions(menu.key)"
                  class="text-xs text-gray-400 hover:text-primary"
                >
                  清除
                </button>
              </div>
              <div class="space-y-2">
                <label
                  v-for="option in menu.options.slice(
                    0,
                    expandedMenus.includes(menu.key) ? menu.options.length : 4,
                  )"
                  :key="option"
                  class="flex items-center text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    :value="option"
                    v-model="menu.selected"
                    class="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  {{ option }}
                </label>
                <button
                  v-if="menu.options.length > 4 && !expandedMenus.includes(menu.key)"
                  @click="toggleMenu(menu.key)"
                  class="text-xs text-primary mt-2"
                >
                  展開更多
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div class="flex flex-1 flex-col gap-5">
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

        <div v-if="error" class="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
          {{ error }}
        </div>

        <div class="flex flex-col gap-5">
          <div
            v-for="hotel in hotels"
            :key="hotel.id"
            @click="handleGoToDetail(hotel.id)"
            class="cursor-pointer"
          >
            <HotelCard :hotel="hotel" />
          </div>
          <div v-if="hotels.length === 0 && !error" class="text-center py-20 text-gray-400">
            沒有符合條件的飯店，試著調整篩選條件吧！
          </div>
        </div>

        <div class="flex justify-center items-center gap-2 mt-10 mb-20">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 disabled:opacity-30"
          >
            &lt;
          </button>
          <button
            v-for="p in visiblePagination"
            :key="p"
            @click="typeof p === 'number' && goToPage(p)"
            :class="[
              'w-10 h-10 rounded-full border transition',
              p === currentPage
                ? 'bg-primary text-white border-primary'
                : 'border-gray-200 hover:bg-gray-50',
              p === '...' ? 'border-transparent pointer-events-none' : '',
            ]"
          >
            {{ p }}
          </button>
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 disabled:opacity-30"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* 這裡只放頁面必要的特殊樣式 */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background-color: #2f3d4d;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
}
</style>
