<script setup lang="ts">
import TicketCard from '@/components/layout/TicketCard.vue'
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '@/utils/supabaseClient'
import type { Attraction } from '@/types/database'

const route = useRoute()

// Local interface extending DB attraction with UI fields
interface AttractionWithImages extends Attraction {
  attraction_images: { image_url: string }[]
}

interface AttractionWithUI extends Attraction {
  image_url: string
  comments_count: number
}

const attractions = ref<AttractionWithUI[]>([])
const loading = ref<boolean>(true)
const errorMsg = ref<string>('')
const searchInput = ref<string>('')
const router = useRouter()

const fetchAttractions = async (): Promise<void> => {
  loading.value = true
  errorMsg.value = ''

  const keyword = route.query.keyword as string
  const city = (route.query.city as string) || (route.query.destination as string)
  const category = route.query.category as string

  let query = supabase
    .from('attractions')
    .select('*, attraction_images(image_url)')

  if (keyword) {
    query = query.ilike('name', `%${keyword}%`)
  }
  if (city && city !== '選擇城市' && city !== '全部城市') {
    query = query.eq('city', city)
  }
  if (category) {
    // Try to match category as a string or within an array
    query = query.or(`category.cs.{${category}},category.ilike.%${category}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Fetch attractions error:', error)
    errorMsg.value = error.message
  } else {
    console.log('Raw data from Supabase:', data)
    const mappedData: AttractionWithUI[] = (data as unknown as AttractionWithImages[] ?? []).map((item: AttractionWithImages) => ({
      ...item,
      image_url: item.attraction_images?.[0]?.image_url || 'https://placehold.co/300x200?text=No+Image',
      comments_count: 0
    }))
    console.log('Mapped attractions:', mappedData)
    attractions.value = mappedData

    // Update selectedCity if filtering by city
    if (city && city !== '選擇城市' && city !== '全部城市') {
      selectedCity.value = city
    }
  }
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
      city: city
    }
  })
}
const cityAreaMap: Record<string, string[]> = {
  台北市: ['中正區', '大同區', '中山區', '松山區', '大安區', '萬華區', '信義區', '士林區', '北投區', '內湖區', '南港區', '文山區'],
  新北市: ['板橋區', '三重區', '中和區', '永和區', '新莊區', '新店區'],
  台中市: ['中區', '東區', '南區', '西區', '北區'],
  台南市: ['中西區', '東區', '南區', '北區'],
  高雄市: ['新興區', '前金區', '苓雅區', '鹽埕區'],
}

const areaOptions = computed<string[]>(() => {
  return cityAreaMap[selectedCity.value] ?? []
})

const ticketFiltered = computed(() => [
  {
    title: '景點類型',
    options: [
      '觀光導覽',
      '歷史景點',
      '展覽與文化組織',
      '休閒活動',
      '戶外活動',
      '公園與樂園',
      '大自然與野生動物',
    ],
  },
  {
    title: '地區',
    options: areaOptions.value,
  },
  {
    title: '景點評分',
    options: ['4.5 +', '4.0'],
  },
  {
    title: '門票供應情況',
    options: ['即日可用', '明日可用', '免費入場'],
  },
])

// 切換頁數
const currentPage = ref<number>(1)
const itemsPerPage = 9

const totalPages = computed<number>(() =>
  Math.ceil(attractions.value.length / itemsPerPage),
)

const pagedattraction = computed<AttractionWithUI[]>(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return attractions.value.slice(start, start + itemsPerPage)
})

function goToPage(page: number): void {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
// 從 query 取得搜尋條件（未來可做過濾）
// searchKeyword and searchCity removed as they were unused

function onLocalSearch() {
  router.push({
    path: '/tickets/search',
    query: {
      ...route.query,
      keyword: searchInput.value || undefined
    }
  })
}
</script>

<template>
  <main class="max-w-[1240px] mx-auto w-full bg-page pt-24 min-h-screen">
    <div class="mx-5">
      <section
        class="max-w-[800px] border border-gray-300 p-2 mx-auto bg-white rounded-full flex flex-row justify-between gap-2 shadow-sm">
        <div class="relative flex-auto h-full focus:border focus:border-primary" @mouseenter="isOpen = true"
          @mouseleave="isOpen = false">
          <div
            class="rounded-full border border-gray-300 px-6 py-3 flex items-center justify-center text-dark_500 hover:text-primary bg-white cursor-pointer"
            @click="isOpen = !isOpen">
            {{ selectedCity || '選擇城市' }}
          </div>

          <div v-if="isOpen"
            class="absolute top-full left-0 w-full overflow-hidden px-5 bg-white/80 backdrop-blur-lg border border-white/25 z-10 rounded-[20px] shadow-md">
            <template v-for="group in cities" :key="group.label">
              <!-- group 標題 -->
              <div class="px-6 py-2 text-sm text-primary border-b border-gray-300 font-bold text-center">
                {{ group.label }}
              </div>

              <!-- 城市 grid，每排 3 個 -->
              <div class="grid grid-cols-3 py-2">
                <div v-for="city in group.cities" :key="city"
                  class="px-4 py-2 text-dark hover:bg-main_100 hover:font-bold cursor-pointer whitespace-nowrap text-center rounded-full"
                  @click="selectCity(city)">
                  {{ city }}
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="flex-auto">
          <label class="text-dark_500 rounded-full"></label>
          <input v-model="searchInput" type="text" placeholder="搜尋目的地/當地體驗"
            @keyup.enter="onLocalSearch"
            class="w-full border text-center text-black border-gray-300 rounded-full px-6 py-3 focus:ring-2 focus:ring-primary outline-none" />
        </div>

        <div class="text-dark_500 rounded-full flex-none">
          <button
            @click="onLocalSearch"
            class="text-center bg-primary hover:bg-main text-white font-bold px-6 py-3 rounded-full transition-colors text-nowrap">
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
              <div class="border-b-[1px] pb-5 border-gray-300 border-solid last:border-b-0"
                v-for="TicketMenu in ticketFiltered" :key="TicketMenu.title">
                <h4 class="font-medium mb-2 text-base text-dark">{{ TicketMenu.title }}</h4>
                <div class="space-y-2">
                  <label class="flex cursor-pointer text-dark text-sm items-center" v-for="option in TicketMenu.options.slice(
                    0,
                    expandedMenus.includes(TicketMenu.title) ? TicketMenu.options.length : 4,
                  )" :key="option">
                    <input type="checkbox" class="mr-2 w-5 h-5 cursor-pointer focus:ring-primary" />
                    {{ option }}
                  </label>
                  <button v-if="
                    TicketMenu.options.length > 5 && !expandedMenus.includes(TicketMenu.title)
                  " class="text-dark_500 text-sm mt-1" @click="expandedMenus.push(TicketMenu.title)">
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
             <div v-else-if="!loading && attractions.length === 0" class="col-span-full p-10 text-center text-gray-500 bg-gray-50 rounded">
               <p class="text-xl font-bold mb-2">沒有找到相關體驗 (No Results)</p>
               <p>請嘗試調整搜尋條件或是確認資料庫是否有資料。</p>
             </div>
            <TicketCard v-for="attraction in pagedattraction" :key="attraction.id" :ticket="attraction" />
          </div>
          <div class="flex justify-center gap-2 mt-5 mb-10">
            <button v-for="page in totalPages" :key="page"
              class="w-10 h-10 border rounded-full text-dark_500 bg-main_100 hover:text-primary hover:bg-main-300"
              :class="{ 'bg-primary text-white': currentPage === page }" @click="goToPage(page)">
              {{ page }}
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
