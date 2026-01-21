<script setup lang="ts">
import TicketCard from '@/components/layout/TicketCard.vue'
import { ref, reactive, computed, onMounted, watch } from 'vue' // Added reactive
import { useRouter, useRoute } from 'vue-router'
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
const searchInput = ref<string>('')
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
    const params: any = {}
    if (keyword) params.keyword = keyword

    // Logic: cities param takes precedence, or falls back to single city
    if (cities) {
      params.cities = cities
    } else if (city && city !== '選擇城市' && city !== '全部城市') {
      params.city = city
    }

    if (category) params.category = category

    // Note: We do NOT send districts to backend, so we get all data for the city/keyword.
    // We filter districts client-side to ensure sidebar options reflect available data.

    const response = await axios.get(`${API_BASE_URL}/tickets/search`, { params })

    const rawData = response.data.map((item: any) => ({
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

    // Update selectedCity if filtering by city
    if (city && city !== '選擇城市' && city !== '全部城市') {
      selectedCity.value = city
    }
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
    // Simple logic: if '4.5 +' selected, show > 4.5
    const minRating = selectedRatings.includes('4.5 +')
      ? 4.5
      : selectedRatings.includes('4.0')
        ? 4.0
        : 0
    if (minRating > 0) {
      result = result.filter((item) => (item.rating || 0) >= minRating)
    }
  }

  // Availability Filter
  const selectedAvailability = ticketFiltered.find((m) => m.key === 'availability')?.selected ?? []
  if (selectedAvailability.length > 0) {
    if (selectedAvailability.includes('免費入場')) {
      result = result.filter((item) => item.price === 0)
    }
    // Note: '即日可用' and '明日可用' would require real-time schedule data availability, which is likely not available in this simple UI object
  }

  attractions.value = result
  // Reset page when filters change
  currentPage.value = 1
}

// Watch for route changes to re-fetch
watch(() => route.query, fetchAttractions, { deep: true })

onMounted(() => {
  if (route.query.keyword) {
    searchInput.value = route.query.keyword as string
  }
  fetchAttractions()
})

// City Selection Logic
const selectedCity = ref<string>('選擇城市')
const isOpen = ref<boolean>(false)
const expandedMenus = ref<string[]>([])

const cities = [
  {
    label: '熱門城市',
    cities: ['台北市', '新北市', '台中市', '台南市', '高雄市'],
  },
  {
    label: '其他城市',
    cities: [
      '基隆市',
      '新竹市',
      '新竹縣',
      '苗栗縣',
      '彰化縣',
      '南投縣',
      '雲林縣',
      '嘉義市',
      '嘉義縣',
      '屏東縣',
      '宜蘭縣',
      '花蓮縣',
      '台東縣',
    ],
  },
  {
    label: '離島地區',
    cities: ['澎湖縣', '金門縣', '連江縣'],
  },
]
function selectCity(city: string): void {
  selectedCity.value = city
  isOpen.value = false
  router.push({
    path: '/tickets/search',
    query: {
      ...route.query,
      city: city,
    },
  })
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
    options: ['4.5 +', '4.0'],
    selected: [],
  },
  {
    key: 'availability',
    title: '門票供應情況',
    options: ['即日可用', '明日可用', '免費入場'],
    selected: [],
  },
])

// Removed watch(selectedCity) for cityAreaMap as it overwrites dynamic options

// Watch route query to update category filter selection
watch(
  () => route.query.category,
  (newCategory) => {
    if (newCategory) {
      const categoryMenu = ticketFiltered.find((m) => m.key === 'categories')
      if (categoryMenu) {
        if (!categoryMenu.selected.includes(newCategory as string)) {
          if (categoryMenu.options.includes(newCategory as string)) {
            categoryMenu.selected = [newCategory as string]
          }
        }
      }
    }
  },
  { immediate: true },
)

// Watch filters to trigger client-side filtering ONLY (Debounced)
// Note: If only districts change, we don't need to re-fetch.
// But we need to distinguish.
// For MVP simplicity: If filters change, we can just applyClientSideFilters.
// But some filters might eventually need server support (like complex text search within results?).
// With current approach, 'districts' and 'ratings' are client side.
// 'categories' is mixed (sidebar vs route).
// If user clicks sidebar category, it updates `ticketFiltered`. Should we update Route? Or just filter?
// Usually sidebar -> update Route.
// But current implementation of filter watcher called `fetchAttractions`.
// Let's change the watcher to apply filters client side if possible, or fetch.
// Actually, `ticketFiltered` changes -> applyClientSideFilters is enough for district/rating.
// For 'categories', if it's purely client side now? Backend supports it.
// If I make specific watchers it's cleaner.

watch(
  ticketFiltered,
  (newVal) => {
    // If district or rating changes, just filter client side.
    // If category changes? Backend supports 'category' param.
    // If we want to support multiple categories client side over the fetched data?
    // Let's stick to client-side for everything for now to match 'districts' logic.
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

function onLocalSearch() {
  router.push({
    path: '/tickets/search',
    query: {
      ...route.query,
      keyword: searchInput.value || undefined,
    },
  })
}
</script>

<template>
  <main class="max-w-[1240px] mx-auto w-full bg-page pt-24 min-h-screen">
    <div class="mx-5">
      <section
        class="max-w-[800px] border border-gray-300 p-2 mx-auto bg-white rounded-full flex flex-row justify-between gap-2 shadow-sm"
      >
        <div
          class="relative flex-auto h-full focus:border focus:border-primary"
          @mouseenter="isOpen = true"
          @mouseleave="isOpen = false"
        >
          <div
            class="rounded-full border border-gray-300 px-6 py-3 flex items-center justify-center text-dark_500 hover:text-primary bg-white cursor-pointer"
            @click="isOpen = !isOpen"
          >
            {{ selectedCity || '選擇城市' }}
          </div>

          <div
            v-if="isOpen"
            class="absolute top-full left-0 w-full overflow-hidden px-5 bg-white/80 backdrop-blur-lg border border-white/25 z-10 rounded-[20px] shadow-md"
          >
            <template v-for="group in cities" :key="group.label">
              <!-- group 標題 -->
              <div
                class="px-6 py-2 text-sm text-primary border-b border-gray-300 font-bold text-center"
              >
                {{ group.label }}
              </div>

              <!-- 城市 grid，每排 3 個 -->
              <div class="grid grid-cols-3 py-2">
                <div
                  v-for="city in group.cities"
                  :key="city"
                  class="px-4 py-2 text-dark hover:bg-main_100 hover:font-bold cursor-pointer whitespace-nowrap text-center rounded-full"
                  @click="selectCity(city)"
                >
                  {{ city }}
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="flex-auto">
          <label class="text-dark_500 rounded-full"></label>
          <input
            v-model="searchInput"
            type="text"
            placeholder="搜尋目的地/當地體驗"
            @keyup.enter="onLocalSearch"
            class="w-full border text-center text-black border-gray-300 rounded-full px-6 py-3 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div class="text-dark_500 rounded-full flex-none">
          <button
            @click="onLocalSearch"
            class="text-center bg-primary hover:bg-main text-white font-bold px-6 py-3 rounded-full transition-colors text-nowrap"
          >
            搜尋
          </button>
        </div>
      </section>

      <section class="gap-5 mt-10 mx-auto flex">
        <aside class="hidden shadow-sm lg:flex flex-col gap-5 w-[285px]">
          <div class="rounded-[20px] p-10 bg-white border">
            <h3 class="font-bold text-xl text-dark mb-5">篩選條件</h3>
            <div class="flex flex-col gap-5">
              <!-- Option Filter -->
              <div
                class="border-b-[1px] pb-5 border-gray-300 border-solid last:border-b-0"
                v-for="TicketMenu in ticketFiltered"
                :key="TicketMenu.title"
              >
                <div class="flex justify-between items-center mb-2">
                  <h4 class="font-medium text-base text-dark">{{ TicketMenu.title }}</h4>
                  <button
                    @click="TicketMenu.selected = []"
                    :disabled="TicketMenu.selected.length === 0"
                    class="text-xs text-gray-400 hover:text-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    清除
                  </button>
                </div>
                <div class="space-y-2">
                  <label
                    class="flex cursor-pointer text-dark text-sm items-center"
                    v-for="option in TicketMenu.options.slice(
                      0,
                      expandedMenus.includes(TicketMenu.title) ? TicketMenu.options.length : 4,
                    )"
                    :key="option"
                  >
                    <input
                      type="checkbox"
                      class="mr-2 w-5 h-5 cursor-pointer focus:ring-primary"
                      :value="option"
                      v-model="TicketMenu.selected"
                    />
                    {{ option }}
                  </label>
                  <button
                    v-if="
                      TicketMenu.options.length > 5 && !expandedMenus.includes(TicketMenu.title)
                    "
                    class="text-dark_500 text-sm mt-1"
                    @click="expandedMenus.push(TicketMenu.title)"
                  >
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
          <div class="flex flex-row flex-nowrap items-center gap-2">
            <button class="rounded-[20px] bg-primary hover:bg-main text-white h-10 px-4 font-bold">
              最多人推薦
            </button>
            <button class="rounded-[20px] bg-primary hover:bg-main text-white h-10 px-4 font-bold">
              好評優惠
            </button>
            <button class="rounded-[20px] bg-primary hover:bg-main text-white h-10 px-4 font-bold">
              最低價
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div v-if="errorMsg" class="col-span-full p-4 text-red-700 bg-red-100 rounded">
              {{ errorMsg }}
            </div>
            <div
              v-else-if="!loading && attractions.length === 0"
              class="col-span-full p-10 text-center text-gray-500 bg-gray-50 rounded"
            >
              <p class="text-xl font-bold mb-2">沒有找到相關體驗</p>
              <p>我們會繼續努力開發的(๑•́ ₃ •̀๑)</p>
            </div>
            <TicketCard
              v-for="attraction in pagedattraction"
              :key="attraction.id"
              :ticket="attraction"
            />
          </div>
          <div class="flex justify-center gap-2 mt-5 mb-10">
            <button
              v-for="page in totalPages"
              :key="page"
              class="w-10 h-10 border rounded-full text-dark_500 bg-main_100 hover:text-primary hover:bg-main-300"
              :class="{
                'bg-primary text-white hover:bg-main hover:text-white': currentPage === page,
              }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
