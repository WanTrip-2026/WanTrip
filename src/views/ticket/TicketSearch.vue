<script setup lang="ts">
import TicketCard from '@/components/layout/TicketCard.vue'
import SearchBar from '@/components/layout/SearchBar.vue'
import { ref, reactive, computed, onMounted, watch } from 'vue' // Added reactive
import { useRouter, useRoute, type LocationQueryRaw } from 'vue-router'
import axios from 'axios'
import type { Attraction } from '@/types/database'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

const route = useRoute()

interface AttractionWithUI extends Attraction {
  image_url: string
  comments_count: number
}

const allAttractions = ref<AttractionWithUI[]>([]) // Store all fetched data
const attractions = ref<AttractionWithUI[]>([]) // Displayed (filtered) data
const loading = ref<boolean>(true)
const errorMsg = ref<string>('')
const router = useRouter()

interface FilterMenu {
  key: string
  title: string
  options: string[]
  selected: string[]
}

const fetchAttractions = async (): Promise<void> => {
  loading.value = true
  errorMsg.value = ''

  const keyword = route.query.keyword as string
  const city = (route.query.city as string) || (route.query.destination as string)
  const cities = route.query.cities as string // Support multiple cities
  const category = route.query.category as string

  try {
    const params: Record<string, string> = {}
    if (keyword) params.keyword = keyword

    // Logic: cities param takes precedence, or falls back to single city
    if (cities) {
      params.cities = cities
    } else if (city && city !== '選擇城市' && city !== '全部城市') {
      params.city = city
    }

    if (category) {
      params.category = category
      // Sync UI state with URL param if not already synced
      const categoryMenu = ticketFiltered.find((m) => m.key === 'categories')
      if (categoryMenu && !categoryMenu.selected.includes(category)) {
        categoryMenu.selected = [category]
      }
    }

    // 保留 URL 上的 keyword / city / destination，搜尋結果頁 SearchBar 才能與首頁／體驗首頁帶入的條件一致顯示。

    // Note: We do NOT send districts to backend, so we get all data for the city/keyword.
    // We filter districts client-side to ensure sidebar options reflect available data.

    const response = await axios.get(`${API_BASE_URL}/tickets/search`, { params })

    const rawData = response.data.map((item: Record<string, unknown>) => ({
      ...item,
      image_url: item.image_url || 'https://placehold.co/300x200?text=No+Image',
      price: item.price || 0,
      comments_count: 0,
    }))

    allAttractions.value = rawData

    // 1. Dynamic District Options
    // Extract unique districts from the fetched data
    const districtsSet = new Set<string>()
    rawData.forEach((item: AttractionWithUI) => {
      if (item.district) districtsSet.add(item.district)
    })
    const validDistricts = Array.from(districtsSet).sort()

    const districtMenu = ticketFiltered.find((m) => m.key === 'districts')
    if (districtMenu) {
      districtMenu.options = validDistricts
    }

    // 2. Update Display List
    applyClientSideFilters()
  } catch (err: unknown) {
    console.error('Fetch attractions error:', err)
    errorMsg.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}

const applyClientSideFilters = () => {
  let result = [...allAttractions.value]

  // District Filter
  const selectedDistricts = ticketFiltered.find((m) => m.key === 'districts')?.selected ?? []
  if (selectedDistricts.length > 0) {
    result = result.filter((item) => selectedDistricts.includes(item.district))
  }

  // Category Filter
  const selectedCategories = ticketFiltered.find((m) => m.key === 'categories')?.selected ?? []
  if (selectedCategories.length > 0) {
    result = result.filter((item) => {
      const cat = item.category
      if (Array.isArray(cat)) {
        return cat.some((c) => selectedCategories.includes(c))
      } else if (typeof cat === 'string') {
        return selectedCategories.includes(cat) || selectedCategories.some((c) => cat.includes(c))
      }
      return false
    })
  }

  // Rating Filter (Placeholder logic for now, as backend doesn't seem to support it yet or it was client side)
  const selectedRatings = ticketFiltered.find((m) => m.key === 'ratings')?.selected ?? []

  if (selectedRatings.length > 0) {
    result = result.filter((item) => {
      const rating = item.rating ?? 0

      return selectedRatings.some((range) => {
        switch (range) {
          case '4.5+':
            return rating >= 4.5
          case '4.0-4.5':
            return rating >= 4.0 && rating < 4.5
          case '3.5-4.0':
            return rating >= 3.5 && rating < 4.0
          default:
            return true
        }
      })
    })
  }

  // Availability Filter
  const selectedAvailability = ticketFiltered.find((m) => m.key === 'availability')?.selected ?? []
  if (selectedAvailability.length > 0) {
    if (selectedAvailability.includes('免費入場')) {
      result = result.filter((item) => item.price === 0)
    }
    // Note: '即日可用' and '明日可用' would require real-time schedule data availability, which is likely not available in this simple UI object
  }

  // Sorting
  if (currentSort.value === 'price-desc') {
    result.sort((a, b) => b.price - a.price)
  } else if (currentSort.value === 'price-asc') {
    result.sort((a, b) => a.price - b.price)
  }

  attractions.value = result
  // Reset page when filters change
  currentPage.value = 1
}

// Sorting logic
const currentSort = ref<string>('')

const setSort = (sortType: string) => {
  if (currentSort.value === sortType) {
    currentSort.value = ''
  } else {
    currentSort.value = sortType
  }
  applyClientSideFilters()
}

// Watch for route changes to re-fetch
watch(() => route.query, fetchAttractions, { deep: true })

onMounted(() => {
  fetchAttractions()
})

const expandedMenus = ref<string[]>([])
const isFilterDrawerOpen = ref(false)

/** 與 SearchBar（package）同步：URL → 表單初始值 */
const initialTicketKeyword = computed(() => (route.query.keyword as string) || '')

const initialTicketDestination = computed(() => {
  const raw = (route.query.city as string) || (route.query.destination as string) || ''
  if (!raw || raw === '選擇城市' || raw === '全部城市') return ''
  return raw
})

interface TicketSearchBarPayload {
  destination: string
  keyword: string
}

function handleTicketSearch(payload: TicketSearchBarPayload): void {
  const queryParams = { ...route.query } as LocationQueryRaw

  const kw = payload.keyword?.trim() ?? ''
  if (kw) {
    queryParams.keyword = kw
  } else {
    delete queryParams.keyword
  }

  const dest = payload.destination?.trim() ?? ''
  if (dest && dest !== '選擇城市' && dest !== '全部城市') {
    queryParams.city = dest
    queryParams.destination = dest
  } else {
    delete queryParams.city
    delete queryParams.destination
  }

  router.replace({ path: '/tickets/search', query: queryParams })
}

const ticketFiltered = reactive<FilterMenu[]>([
  {
    key: 'categories',
    title: '景點類型',
    options: [
      '觀光導覽',
      '歷史景點',
      '展覽與文化組織',
      '休閒活動',
      '戶外活動',
      '公園與樂園',
      '大自然與野生動物',
      '餐券',
    ],
    selected: [],
  },
  {
    key: 'districts',
    title: '地區',
    options: [], // Dynamic now
    selected: [],
  },
  {
    key: 'ratings',
    title: '景點評分',
    options: ['4.5+', '4.0-4.5', '3.5-4.0'],
    selected: [],
  },
  {
    key: 'availability',
    title: '門票供應情況',
    options: ['即日可用', '明日可用', '免費入場'],
    selected: [],
  },
])

watch(
  ticketFiltered,
  () => {
    applyClientSideFilters()
  },
  { deep: true },
)

// 切換頁數
const currentPage = ref<number>(1)
const itemsPerPage = 9

const totalPages = computed<number>(() => Math.ceil(attractions.value.length / itemsPerPage))

const pagedattraction = computed<AttractionWithUI[]>(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return attractions.value.slice(start, start + itemsPerPage)
})

function goToPage(page: number): void {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function clearOptions(key: string) {
  const item = ticketFiltered.find((m) => m.key === key)
  if (item) {
    item.selected = []
  }

  // Sync URL for categories
  if (key === 'categories') {
    const newQuery = { ...route.query }
    delete newQuery.category
    router.push({ path: '/tickets/search', query: newQuery })
  }
}
</script>

<template>
  <main class="max-w-[1240px] mx-auto w-full bg-page pt-24 min-h-screen px-5">
    <div class="mx-auto">
      <SearchBar mode="emit" search-type="package" :initial-keyword="initialTicketKeyword"
        :initial-destination="initialTicketDestination" @search="handleTicketSearch" />

      <section class="gap-5 mt-10 mx-auto flex">
        <aside class="hidden shadow-sm md:flex flex-col gap-5 w-[285px]">
          <div class="rounded-20 p-10 bg-white border">
            <h3 class="font-bold text-xl text-dark mb-5">篩選條件</h3>
            <div class="flex flex-col gap-5">
              <!-- Option Filter -->
              <div class="border-b-[1px] pb-5 border-gray-300 border-solid last:border-b-0"
                v-for="TicketMenu in ticketFiltered" :key="TicketMenu.title">
                <div class="flex justify-between items-center mb-2">
                  <h4 class="font-medium text-base text-dark">{{ TicketMenu.title }}</h4>
                  <button @click="clearOptions(TicketMenu.key)" :disabled="TicketMenu.selected.length === 0"
                    class="text-xs text-gray-400 hover:text-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                    清除
                  </button>
                </div>
                <div class="space-y-2">
                  <label class="flex cursor-pointer text-dark text-sm items-center" v-for="option in TicketMenu.options.slice(
                    0,
                    expandedMenus.includes(TicketMenu.title) ? TicketMenu.options.length : 4,
                  )" :key="option">
                    <input type="checkbox" class="mr-2 w-5 h-5 cursor-pointer focus:ring-primary" :value="option"
                      v-model="TicketMenu.selected" />
                    {{ option }}
                  </label>
                  <button v-if="
                    TicketMenu.options.length > 5 && !expandedMenus.includes(TicketMenu.title)
                  " class="text-dark-500 text-sm mt-1" @click="expandedMenus.push(TicketMenu.title)">
                    查看更多選項
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div class="flex flex-1 flex-col gap-5">
          <h3 class="text-black text-xl">
            <span v-if="route.query.category" class="mr-2 text-gray-500">
              分類: {{ route.query.category }}
            </span>
            找到 <span class="text-red-500 font-bold">{{ attractions.length }}</span> 項當地體驗
          </h3>
          <div class="flex flex-row items-center gap-2 overflow-x-auto scrollbar-hide">
            <button @click="isFilterDrawerOpen = true"
              class="md:hidden flex items-center gap-2 rounded-full bg-primary text-white border border-gray-300 px-4 py-2 shadow-sm transition whitespace-nowrap">
              <font-awesome-icon icon="sliders" class="text-white" />
              篩選
            </button>
            <button @click="setSort('price-desc')" class="rounded-full h-10 px-4 font-bold transition-colors border"
              :class="currentSort === 'price-desc'
                ? 'bg-primary text-white border-primary hover:bg-main'
                : 'bg-white text-dark border-gray-300 hover:bg-main-100'
                ">
              價格高到低
            </button>
            <button @click="setSort('price-asc')" class="rounded-full h-10 px-4 font-bold transition-colors border"
              :class="currentSort === 'price-asc'
                ? 'bg-primary text-white border-primary hover:bg-main'
                : 'bg-white text-dark border-gray-300 hover:bg-main-100'
                ">
              價格低到高
            </button>
          </div>
          <div class="xl:grid xl:grid-cols-3 flex flex-col w-full gap-5">
            <div v-if="errorMsg" class="col-span-full p-4 text-red-700 bg-red-100 rounded">
              {{ errorMsg }}
            </div>
            <!-- Loading Skeleton -->
            <template v-else-if="loading">
              <div v-for="i in 6" :key="i"
                class="animate-pulse rounded-20 overflow-hidden border border-gray-200 bg-white shadow-sm">
                <div class="h-[200px] bg-gray-200"></div>
                <div class="p-4 flex flex-col gap-2">
                  <div class="h-4 bg-gray-200 rounded-full w-3/4"></div>
                  <div class="h-3 bg-gray-200 rounded-full w-1/2"></div>
                  <div class="flex justify-between items-center mt-2">
                    <div class="h-3 bg-gray-200 rounded-full w-1/3"></div>
                    <div class="h-8 bg-gray-200 rounded-full w-20"></div>
                  </div>
                </div>
              </div>
            </template>
            <div v-else-if="attractions.length === 0"
              class="col-span-full p-10 text-center text-gray-500 bg-gray-50 rounded">
              <p class="text-xl font-bold mb-2">沒有找到相關體驗</p>
              <p>我們會繼續努力開發的(๑•́ ₃ •̀๑)</p>
            </div>
            <TicketCard class="w-full" v-for="attraction in pagedattraction" :key="attraction.id"
              :ticket="attraction" />
          </div>
          <div class="flex justify-center gap-2 mt-5 mb-10">
            <button v-for="page in totalPages" :key="page"
              class="w-10 h-10 border rounded-full text-dark-500 bg-main-100 hover:text-primary hover:bg-main-300"
              :class="{
                'bg-primary text-white hover:bg-main hover:text-white': currentPage === page,
              }" @click="goToPage(page)">
              {{ page }}
            </button>
          </div>
        </div>
      </section>

      <!-- Mobile Filter Drawer -->
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
          <Transition enter-active-class="transition-transform ease-out duration-300"
            enter-from-class="-translate-x-full" enter-to-class="translate-x-0"
            leave-active-class="transition-transform ease-in duration-200" leave-from-class="translate-x-0"
            leave-to-class="-translate-x-full">
            <div v-if="isFilterDrawerOpen"
              class="absolute top-0 left-0 h-[calc(100%-40px)] w-[80%] m-5 rounded-20 bg-white/65 backdrop-blur-sm shadow-xl flex flex-col p-5 overflow-y-auto scrollbar-hide">
              <div class="flex items-center justify-between mb-6">
                <h3 class="font-bold text-xl text-dark">篩選條件</h3>
                <button @click="isFilterDrawerOpen = false" class="text-dark-500 text-2xl">
                  &times;
                </button>
              </div>

              <div class="flex flex-col gap-6">
                <div v-for="TicketMenu in ticketFiltered" :key="TicketMenu.key"
                  class="border-t pt-6 border-gray-300 first:border-t-0 first:pt-0">
                  <div class="flex justify-between items-center mb-4">
                    <h4 class="font-medium text-dark">{{ TicketMenu.title }}</h4>
                    <button @click="clearOptions(TicketMenu.key)" :disabled="TicketMenu.selected.length === 0"
                      class="text-xs text-dark hover:text-primary disabled:opacity-50">
                      清除
                    </button>
                  </div>
                  <div class="space-y-3">
                    <label v-for="option in TicketMenu.options" :key="option"
                      class="flex items-center text-sm text-dark cursor-pointer">
                      <input type="checkbox" :value="option" v-model="TicketMenu.selected"
                        class="mr-2 rounded border-gray-300 text-dark focus:ring-dark h-4 w-4" />
                      {{ option }}
                    </label>
                  </div>
                </div>
              </div>

              <button @click="isFilterDrawerOpen = false"
                class="mt-8 mb-4 w-full bg-primary text-white py-3 rounded-full font-bold shadow-md hover:bg-main transition">
                完成
              </button>
            </div>
          </Transition>
        </div>
      </Teleport>
    </div>
  </main>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
