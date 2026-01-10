<script setup lang="ts">
import HotelCard from '../../components/layout/HotelCard.vue'
import { ref, reactive, watch, computed, onMounted } from 'vue'

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
  image_url?: string
}

type FacilityName = string

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

// -------------------
// 取得飯店資料（後端分頁）
// -------------------

const fetchHotels = async (page = 1, limit = itemsPerPage) => {
  try {
    const apiUrl = import.meta.env.VITE_API_BASE_URL

    const params = new URLSearchParams()

    // keyword
    if (keyword.value.trim()) params.append('keyword', keyword.value.trim())

    // facilities（後端支援 facility_names=xxx,yyy）
    const selectedFacilities = HotelFiltered.find((m) => m.key === 'facilities')?.selected ?? []
    if (selectedFacilities.length > 0) params.append('facility_names', selectedFacilities.join(','))
    // types（住宿類型）
    const selectedTypes = HotelFiltered.find((m) => m.key === 'types')?.selected ?? []
    if (selectedTypes.length > 0) params.append('types', selectedTypes.join(','))
    //星級
    const selectedStars = HotelFiltered.find((m) => m.key === 'star_rating')?.selected ?? []
    if (selectedStars.length > 0) {
      const starNums = selectedStars
        .map((s) => parseInt(s, 10)) // '5星級' → 5
        .filter((n) => Number.isFinite(n))
      if (starNums.length > 0) params.append('star_ratings', starNums.join(','))
    }
    params.append('page', String(page))
    params.append('limit', String(limit))

    const url = `${apiUrl}/hotels?${params.toString()}`
    console.log('[fetchHotels]', url)

    const res = await fetch(`${apiUrl}/hotels?${params.toString()}`)
    if (!res.ok) throw new Error('取得飯店資料失敗')

    const data: { total: number; page: number; limit: number; hotels: Hotel[] } = await res.json()

    // 後端已經幫你把 image_url 算好、facilities 也整理好了
    hotels.value = (data.hotels ?? []).map((h) => ({
      ...h,
      image_url:
        h.image_url ||
        'https://cdn.hk01.com/di/media/images/3366554/org/1a17ee577918293a276a61cded582477.jpg/CwABjWRXi8m70sf513Oli2_Nrybz9IXncrQxZHK0MWQ?v=w1280r16_9',
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

// -------------------
// 初始化：設施 + 第一頁飯店
// -------------------
onMounted(async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_BASE_URL

    // 設施清單
    const facilitiesRes = await fetch(`${apiUrl}/facilities`)
    if (!facilitiesRes.ok) throw new Error('取得設施資料失敗')
    facilities.value = await facilitiesRes.json()

    const facilityMenu = HotelFiltered.find((m) => m.key === 'facilities')
    if (facilityMenu) facilityMenu.options = facilities.value
    //類型清單
    const typesRes = await fetch(`${apiUrl}/hotel_types`)
    if (!typesRes.ok) throw new Error('取得住宿類型失敗')

    const types: string[] = await typesRes.json()

    const typeMenu = HotelFiltered.find((m) => m.key === 'types')
    if (typeMenu) {
      typeMenu.options = types
    }

    // 第一頁飯店
    await fetchHotels(1, itemsPerPage)
  } catch (err) {
    console.error(err)
    error.value = '初始化資料時發生錯誤'
  }
})

// -------------------
// 監聽：設施勾選 → 回到第 1 頁重抓
// -------------------
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

// -------------------
// 分頁顯示
// -------------------
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

// -------------------
// 分頁方法
// -------------------
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

// -------------------
// 價格範圍監控（目前只做 UI 限制，尚未送後端）
// -------------------
watch(
  () => [priceRange.value.min, priceRange.value.max],
  ([min, max]) => {
    if (min < minPrice) priceRange.value.min = minPrice
    if (max > maxPrice) priceRange.value.max = maxPrice
    if (max - min < step) priceRange.value.max = min + step
  },
)

// -------------------
// 篩選選單方法
// -------------------
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

/**
 * 搜尋按鈕：回到第 1 頁重抓（避免人在第 5 頁搜尋，結果以為壞掉）
 */
function onSearch() {
  goToPage(1)
}
</script>

<template>
  <main class="max-w-[1200px] mx-auto pt-24 bg-page px-5 lg:px-0">
    <!-- search-bar -->
    <section
      class="max-w-[800px] mx-auto p-2 mb-10 bg-white rounded-[20px] md:rounded-full border border-gray-300 flex flex-col md:flex-row items-center gap-2 sticky shadow-sm">
      <div class="relative w-full border border-gray-300 rounded-full md:h-full flex-1">
        <input v-model="keyword" type="text" placeholder="想住哪～"
          class="w-full pl-4 px-6 py-3 text-base text-black border-none bg-gray-50 rounded-full focus:ring-2 focus:ring-primary outline-none transition-all" />
      </div>
      <div class="relative w-full border border-gray-300 rounded-full md:h-full flex-1">
        <input type="text" placeholder="入住及退房日期"
          class="w-full pl-4 px-6 py-3 text-base text-black border-none bg-gray-50 rounded-full focus:ring-2 focus:ring-primary outline-none transition-all" />
      </div>
      <div class="relative w-full border border-gray-300 rounded-full md:h-full flex-1">
        <input type="text" placeholder="2 位成人 · 1 間房"
          class="w-full pl-4 px-6 py-3 text-base text-black border-none bg-gray-50 rounded-full focus:ring-2 focus:ring-primary outline-none transition-all" />
      </div>
      <div class="border border-gray-300 rounded-full md:h-full">
        <button @click="onSearch"
          class="bg-primary hover:bg-[#6D8FA3] text-white px-6 py-3 rounded-full transition-colors whitespace-nowrap">
          搜尋
        </button>
      </div>
    </section>

    <!-- result-list -->
    <section class="gap-5 m-10 mx-auto flex">
      <aside class="flex flex-col gap-5 w-[285px]">
        <div class="rounded-[20px] bg-white h-[200px] overflow-hidden aspect-video">
          <iframe class="w-full h-full border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7188.632859084555!2d121.51760264946732!3d25.05771890815704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a968f68729e7%3A0x6e3f6d2374968eaa!2z5Y-w5YyX5pm26I-v6YWS5bqX!5e0!3m2!1szh-TW!2stw!4v1767279114226!5m2!1szh-TW!2stw"
            loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

        <div class="rounded-[20px] p-10 bg-white border border-gray-300 shadow-sm">
          <h3 class="font-bold text-xl text-dark mb-[20px]">篩選條件</h3>

          <div class="flex flex-col gap-5">
            <!-- Price Filter -->
            <h4 class="font-medium text-dark">每晚預算<br /></h4>
            <div class="flex flex-col gap-2">
              <div class="relative h-2 w-full bg-main_100 rounded-full">
                <div class="absolute h-2 bg-main_300 rounded-full" :style="{
                  left: `${(priceRange.min / maxPrice) * 100}%`,
                  right: `${100 - (priceRange.max / maxPrice) * 100}%`,
                }"></div>

                <input type="range" :min="minPrice" :max="maxPrice" :step="step" v-model.number="priceRange.min"
                  class="absolute w-full h-2 bg-transparent pointer-events-none appearance-none" />
                <input type="range" :min="minPrice" :max="maxPrice" :step="step" v-model.number="priceRange.max"
                  class="absolute w-full h-2 bg-transparent pointer-events-none appearance-none" />
              </div>

              <div class="flex justify-between mt-2">
                <input type="number" v-model.number="priceRange.min" :min="minPrice" :max="maxPrice" :step="step"
                  class="border border-gray-300 rounded-full p-1 w-24 text-dark_900 text-center" />
                <input type="number" v-model.number="priceRange.max" :min="minPrice" :max="maxPrice" :step="step"
                  class="border border-gray-300 rounded-full p-1 w-24 text-dark_900 text-center" />
              </div>
            </div>

            <!-- Option Filter -->
            <div class="border-b-[1px] pb-[20px] border-main_800 border-solid last:border-b-0"
              v-for="HotelMenu in HotelFiltered" :key="HotelMenu.key">
              <div class="flex justify-between items-center mb-2">
                <h4 class="font-medium text-base text-dark_900">{{ HotelMenu.title }}</h4>
                <button class="text-xs text-dark_500 hover:text-primary" @click="clearOptions(HotelMenu.key)">
                  清除
                </button>
              </div>

              <div class="space-y-2">
                <label class="flex cursor-pointer text-sm text-dark_900 items-center" v-for="option in HotelMenu.options.slice(
                  0,
                  expandedMenus.includes(HotelMenu.key) ? HotelMenu.options.length : 4,
                )" :key="option">
                  <input type="checkbox" class="mr-2 text-dark_900 focus:ring-primary" :value="option"
                    v-model="HotelMenu.selected" />
                  {{ option }}
                </label>

                <button v-if="HotelMenu.options.length > 4 && !expandedMenus.includes(HotelMenu.key)"
                  class="text-dark_500 hover:text-primary text-sm mt-1" @click="toggleMenu(HotelMenu.key)">
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
          <button class="rounded-[20px] bg-primary hover:bg-main text-white px-6 py-2 shadow-sm">
            價格高到低
          </button>
          <button class="rounded-[20px] bg-primary hover:bg-main text-white px-6 py-2 shadow-sm">
            價格低到高
          </button>
          <button class="rounded-[20px] bg-primary hover:bg-main text-white px-6 py-2 shadow-sm">
            熱門高到低
          </button>
          <button class="rounded-[20px] bg-primary hover:bg-main text-white px-6 py-2 shadow-sm">
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
          <button class="w-10 h-10 border rounded-full hover:bg-main_100" @click="firstPage"
            :disabled="currentPage === 1">
            &lt;&lt;
          </button>

          <button class="w-10 h-10 border rounded-full hover:bg-main_100" @click="prevPage"
            :disabled="currentPage === 1">
            &lt;
          </button>

          <button class="w-10 h-10 border rounded-full hover:bg-main_100" v-for="item in visiblePagination" :key="item"
            :disabled="item === '...'" @click="item !== '...' && goToPage(Number(item))"
            :class="item === currentPage ? 'bg-primary text-white hover:bg-main_800' : ''">
            {{ item }}
          </button>

          <button class="w-10 h-10 border rounded-full hover:bg-main_100" @click="nextPage"
            :disabled="currentPage === totalPages">
            &gt;
          </button>

          <button class="w-10 h-10 border rounded-full" @click="lastPage" :disabled="currentPage === totalPages">
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
  background-color: #6d8fa3;
  border-radius: 9999px;
  cursor: pointer;
}
</style>
