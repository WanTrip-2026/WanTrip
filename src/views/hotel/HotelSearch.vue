<script setup lang="ts">
import HotelCard from '../../components/layout/HotelCard.vue'
import { ref, reactive, watch, computed, onMounted } from 'vue'

interface PriceRange {
  min: number
  max: number
}

interface FilterMenu {
  title: string
  options: string[]
  selected: string[]
}

interface Hotel {
  id: string
  name: string
  min_price: number
  facilities?: Facility[]
}

interface Facility {
  id: string
  name: string
}

const facilities = ref<Facility[]>([])

const hotels = ref<Hotel[]>([])
const error = ref<string | null>(null)

const HotelFiltered = reactive<FilterMenu[]>([
  { title: '星級', options: ['五星級', '四星級', '三星級'], selected: [] },
  {
    title: '評價',
    options: ['好極了: 9分以上', '非常好: 8分以上', '好: 7分以上', '令人愉悅: 6分以上'],
    selected: [],
  },
  { title: '住宿類型', options: ['飯店', '旅館', '民宿', '度假村'], selected: [] },
  { title: '付款政策', options: ['免費取消', '立即付款', '延後付款', '到店付款'], selected: [] },
  {
    //從資料庫代入
    title: '設施＆服務',
    options: [],
    selected: [],
  },
  { title: '地區', options: ['中正區', '中山區', '萬華區', '大同區', '松山區'], selected: [] },
  {
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

onMounted(async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_BASE_URL

    // 同時請求飯店 & 設施
    const [hotelsRes, facilitiesRes] = await Promise.all([
      fetch(`${apiUrl}/hotels`),
      fetch(`${apiUrl}/facilities`),
    ])

    if (!hotelsRes.ok) throw new Error('取得飯店資料失敗')
    if (!facilitiesRes.ok) throw new Error('取得設施資料失敗')

    const hotelsData = await hotelsRes.json()
    const facilitiesData = await facilitiesRes.json()

    // 飯店資料
    hotels.value = hotelsData

    // 「設施＆服務」篩選
    const facilityMenu = HotelFiltered.find((menu) => menu.title === '設施＆服務')

    if (facilityMenu) {
      facilityMenu.options = facilitiesData.map(
        (facility: { id: string; name: string }) => facility.name,
      )
    }

    error.value = null
  } catch (err) {
    console.error(err)
    error.value = '初始化資料時發生錯誤'
  }
})

watch(
  () => HotelFiltered.find((m) => m.title === '設施＆服務')?.selected,
  async (selectedNames) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL
    const params = new URLSearchParams()

    if (selectedNames && selectedNames.length > 0) {
      // 把名稱對應到 id
      const selectedIds = selectedNames
        .map((name) => facilities.value.find((f) => f.name === name)?.id)
        .filter(Boolean) // 過濾 undefined

      if (selectedIds.length > 0) {
        params.append('facility_ids', selectedIds.join(','))
      }
    }

    const res = await fetch(`${apiUrl}/hotels?${params}`)
    hotels.value = await res.json()
    currentPage.value = 1
  },
  { deep: true },
)

const minPrice = 0
const maxPrice = 15000
const step = 500

// import { RouterLink } from 'vue-router'
const priceRange = ref<PriceRange>({
  min: minPrice,
  max: maxPrice,
})

// 確認價錢範圍的最小.最大值
watch(
  () => [priceRange.value.min, priceRange.value.max] as [number, number],
  ([min, max]) => {
    if (min < minPrice) priceRange.value.min = minPrice
    if (max > maxPrice) priceRange.value.max = maxPrice

    if (max - min < step) {
      priceRange.value.max = min + step
    }
  },
)

const expandedMenus = ref<string[]>([]) // 儲存哪些 option 已展開

function clearOptions(title: string) {
  const menu = HotelFiltered.find((m) => m.title === title)
  if (menu) {
    menu.selected = [] // 清空勾選
  }
}

function toggleMenu(title: string) {
  if (expandedMenus.value.includes(title)) {
    expandedMenus.value = expandedMenus.value.filter((t) => t !== title)
  } else {
    expandedMenus.value.push(title)
  }
}

//切換頁數

const currentPage = ref(1)
const itemsPerPage = 8

const totalPages = computed(() => Math.ceil(hotels.value.length / itemsPerPage))
const pagedHotels = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return hotels.value.slice(start, start + itemsPerPage)
})

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<template>
  <!-- <Navbar class="relative top-0" /> -->
  <main class="max-w-[1200px] mx-auto pt-24 bg-page px-5 lg:px-0">
    <!-- search-bar -->
    <section
      class="max-w-[800px] mx-auto p-2 mb-10 bg-white rounded-[20px] md:rounded-full border border-gray-300 flex flex-col md:flex-row items-center gap-2 sticky shadow-sm"
    >
      <div class="relative w-full border border-gray-300 rounded-full md:h-full flex-1">
        <input
          type="text"
          placeholder="目的地"
          class="w-full pl-4 px-6 py-3 text-base md:text-base border-none bg-gray-50 md:bg-transparent rounded-full focus:ring-2 focus:border-primary outline-none transition-all"
        />
      </div>
      <div class="relative w-full border border-gray-300 rounded-full md:h-full flex-1">
        <input
          type="text"
          placeholder="入住及退房日期"
          class="w-full pl-4 px-6 py-3 text-base md:text-base border-none bg-gray-50 md:bg-transparent rounded-full focus:ring-2 focus:border-primary outline-none transition-all"
        />
      </div>
      <div class="relative w-full border border-gray-300 rounded-full md:h-full flex-1">
        <input
          type="text"
          placeholder="2 位成人 · 1 間房"
          class="w-full pl-4 px-6 py-3 text-base md:text-base border-none bg-gray-50 md:bg-transparent rounded-full focus:ring-2 focus:border-primary outline-none transition-all"
        />
      </div>
      <div class="border border-gray-300 rounded-full md:h-full">
        <button
          class="bg-primary hover:bg-[#6D8FA3] text-white px-6 py-3 rounded-full transition-colors whitespace-nowrap"
        >
          搜尋
        </button>
      </div>
    </section>
    <!-- result-list -->
    <section class="gap-5 m-10 mx-auto flex">
      <aside class="flex flex-col gap-5 w-[285px]">
        <div class="rounded-[20px] bg-white h-[200px] overflow-hidden aspect-video">
          <iframe
            class="w-full h-full border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7188.632859084555!2d121.51760264946732!3d25.05771890815704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a968f68729e7%3A0x6e3f6d2374968eaa!2z5Y-w5YyX5pm26I-v6YWS5bqX!5e0!3m2!1szh-TW!2stw!4v1767279114226!5m2!1szh-TW!2stw"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div class="rounded-[20px] p-10 bg-white border border-gray-300 shadow-sm">
          <h3 class="font-bold text-xl text-dark mb-[20px]">篩選條件</h3>
          <div class="flex flex-col gap-5">
            <!-- Price Filter -->
            <h4 class="font-medium text-dark">每晚預算<br /></h4>
            <div class="flex flex-col gap-2">
              <!-- 滑桿 -->
              <div class="relative h-2 w-full bg-main_100 rounded-full">
                <!-- 已選範圍 -->
                <div
                  class="absolute h-2 bg-main_300 rounded-full"
                  :style="{
                    left: `${(priceRange.min / maxPrice) * 100}%`,
                    right: `${100 - (priceRange.max / maxPrice) * 100}%`,
                  }"
                ></div>

                <!-- 左滑塊 -->
                <input
                  type="range"
                  :min="minPrice"
                  :max="maxPrice"
                  :step="step"
                  v-model.number="priceRange.min"
                  class="absolute w-full h-2 bg-transparent pointer-events-none appearance-none"
                />

                <!-- 右滑塊 -->
                <input
                  type="range"
                  :min="minPrice"
                  :max="maxPrice"
                  :step="step"
                  v-model.number="priceRange.max"
                  class="absolute w-full h-2 bg-transparent pointer-events-none appearance-none"
                />
              </div>
              <!-- 顯示數值 -->
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
              :key="HotelMenu.title"
            >
              <div class="flex justify-between items-center mb-2">
                <h4 class="font-medium text-base text-dark_900">{{ HotelMenu.title }}</h4>
                <button
                  class="text-xs text-dark_500 hover:text-primary"
                  @click="clearOptions(HotelMenu.title)"
                >
                  清除
                </button>
              </div>
              <div class="space-y-2">
                <label
                  class="flex cursor-pointer text-sm text-dark_900 items-center"
                  v-for="option in HotelMenu.options.slice(
                    0,
                    expandedMenus.includes(HotelMenu.title) ? HotelMenu.options.length : 4,
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
                  v-if="HotelMenu.options.length > 4 && !expandedMenus.includes(HotelMenu.title)"
                  class="text-dark_500 hover:text-primary text-sm mt-1"
                  @click="toggleMenu(HotelMenu.title)"
                >
                  展開更多選項
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div class="flex flex-1 flex-col gap-5">
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
          <HotelCard v-for="hotel in pagedHotels" :key="hotel.id" :hotel="hotel" />
        </div>
        <div class="flex justify-center gap-2 mt-5 mb-10">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            class="w-10 h-10 border rounded-full"
            :class="{
              'bg-primary text-white': currentPage === page,
              'text-dark_700 hover:bg-main_100': currentPage !== page,
            }"
          >
            {{ page }}
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
  /* primary色號 */
  border-radius: 9999px;
  cursor: pointer;
}
</style>
