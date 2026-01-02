<script setup>
import HotelCard from '@/components/layout/HotelCard.vue'
import { ref, reactive, watch, computed } from 'vue'

const minPrice = 0
const maxPrice = 15000
const step = 500

// import { RouterLink } from 'vue-router'
const priceRange = ref({
  min: minPrice,
  max: maxPrice,
})

// 確認價錢範圍的最小.最大值
watch(
  () => [priceRange.value.min, priceRange.value.max],
  ([min, max]) => {
    if (min < minPrice) priceRange.value.min = minPrice
    if (max > maxPrice) priceRange.value.max = maxPrice

    if (max - min < step) {
      priceRange.value.max = min + step
    }
  },
)

const HotelFiltered = reactive([
  { title: '星級', options: ['五星級', '四星級', '三星級'], selected: [] },
  {
    title: '評價',
    options: ['好極了: 9分以上', '非常好: 8分以上', '好: 7分以上', '令人愉悅: 6分以上'],
    selected: [],
  },
  { title: '住宿類型', options: ['飯店', '旅館', '民宿', '度假村'], selected: [] },
  { title: '付款政策', options: ['免費取消', '立即付款', '延後付款', '到店付款'], selected: [] },
  {
    title: '設施＆服務',
    options: [
      '健身房',
      '游泳池',
      'SPA服務',
      '停車場',
      '24小時櫃檯服務',
      '可帶寵物',
      '浴缸',
      '山景',
      '夜景',
    ],
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

const expandedMenus = ref([]) // 儲存哪些 option 已展開

function clearOptions(title) {
  const menu = HotelFiltered.find((m) => m.title === title)
  if (menu) {
    menu.selected = [] // 清空勾選
  }
}

function toggleMenu(title) {
  if (expandedMenus.value.includes(title)) {
    expandedMenus.value = expandedMenus.value.filter((t) => t !== title)
  } else {
    expandedMenus.value.push(title)
  }
}

const HotelResult = ref([
  {
    id: 1,
    name: '高雄洲際酒店',
    image_url: 'https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg',
    address: '台灣高雄市前鎮區新光路33號',
    stars: '5',
    comments: '120 則評論',
    rating: '9.1',
    price: '5000',
  },
  {
    id: 2,
    name: '台北晶華酒店',
    image_url: 'https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg',
    address: '台灣台北市中山區中山北路二段39巷3號',
    stars: '4',
    comments: '230 則評論',
    rating: '9.5',
    price: '4000',
  },
  {
    id: 3,
    name: '台北晶華酒店',
    image_url: 'https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg',
    address: '台灣台北市中山區中山北路二段39巷3號',
    stars: '4',
    comments: '230 則評論',
    rating: '9.5',
    price: '4000',
  },
  {
    id: 4,
    name: '台北晶華酒店',
    image_url: 'https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg',
    address: '台灣台北市中山區中山北路二段39巷3號',
    stars: '4',
    comments: '230 則評論',
    rating: '9.5',
    price: '4000',
  },
  {
    id: 5,
    name: '台北晶華酒店',
    image_url: 'https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg',
    address: '台灣台北市中山區中山北路二段39巷3號',
    stars: '4',
    comments: '230 則評論',
    rating: '9.5',
    price: '4000',
  },
  {
    id: 6,
    name: '台北晶華酒店',
    image_url: 'https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg',
    address: '台灣台北市中山區中山北路二段39巷3號',
    stars: '4',
    comments: '230 則評論',
    rating: '9.5',
    price: '4000',
  },
  {
    id: 7,
    name: '台北晶華酒店',
    image_url: 'https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg',
    address: '台灣台北市中山區中山北路二段39巷3號',
    stars: '4',
    comments: '230 則評論',
    rating: '9.5',
    price: '4000',
  },
  {
    id: 8,
    name: '台北晶華酒店',
    image_url: 'https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg',
    address: '台灣台北市中山區中山北路二段39巷3號',
    stars: '4',
    comments: '230 則評論',
    rating: '9.5',
    price: '4000',
  },
  {
    id: 9,
    name: '台北晶華酒店',
    image_url: 'https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg',
    address: '台灣台北市中山區中山北路二段39巷3號',
    stars: '4',
    comments: '230 則評論',
    rating: '9.5',
    price: '4000',
  },
  {
    id: 10,
    name: '台北晶華酒店',
    image_url: 'https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg',
    address: '台灣台北市中山區中山北路二段39巷3號',
    stars: '4',
    comments: '230 則評論',
    rating: '9.5',
    price: '4000',
  },
])

//切換頁數

const currentPage = ref(1)
const itemsPerPage = 8

const totalPages = computed(() => Math.ceil(HotelResult.value.length / itemsPerPage))
const pagedHotels = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return HotelResult.value.slice(start, start + itemsPerPage)
})

function goToPage(page) {
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
      class="max-w-[800px] mx-auto w-full p-2.5 mb-10 bg-white rounded-[20px] md:rounded-full border border-gray-300 flex flex-col md:flex-row items-center gap-5 sticky"
    >
      <div class="relative w-full h-12 md:h-full flex-1">
        <input
          type="text"
          placeholder="目的地"
          class="h-10 w-full pl-4 md:pl-10 pr-4 text-sm md:text-base border-none bg-gray-50 md:bg-transparent rounded-xl md:rounded-full focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>
      <div class="hidden md:block w-[1px] h-8 bg-gray-200"></div>
      <div class="relative w-full h-12 md:h-full flex-1">
        <input
          type="text"
          placeholder="入住及退房日期"
          class="h-10 w-full pl-4 md:pl-10 pr-4 text-sm md:text-base border-none bg-gray-50 md:bg-transparent rounded-xl md:rounded-full focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>
      <div class="hidden md:block w-[1px] h-8 bg-gray-200"></div>
      <div class="relative w-full h-12 md:h-full flex-1">
        <input
          type="text"
          placeholder="2 位成人 · 1 間房"
          class="h-10 w-full pl-4 md:pl-10 pr-4 text-sm md:text-base border-none bg-gray-50 md:bg-transparent rounded-xl md:rounded-full focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>
      <div class="w-full md:w-auto h-12 md:h-full">
        <button
          class="h-10 w-full md:w-auto bg-primary hover:bg-[#6D8FA3] text-white py-1 px-7 rounded-xl md:rounded-full transition-colors whitespace-nowrap"
        >
          搜尋
        </button>
      </div>
    </section>
    <!-- result-list -->
    <section class="gap-[20px] m-[40px] mx-auto flex">
      <aside class="flex flex-col gap-5 w-[285px]">
        <div class="rounded-[20px] bg-white h-[200px] overflow-hidden aspect-video">
          <iframe
            class="w-full h-full border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7188.632859084555!2d121.51760264946732!3d25.05771890815704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a968f68729e7%3A0x6e3f6d2374968eaa!2z5Y-w5YyX5pm26I-v6YWS5bqX!5e0!3m2!1szh-TW!2stw!4v1767279114226!5m2!1szh-TW!2stw"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div class="rounded-[20px] p-10 bg-white">
          <h3 class="font-bold text-xl mb-[20px]">篩選條件</h3>
          <div class="flex flex-col gap-5">
            <!-- Price Filter -->
            <h4 class="font-medium">每晚預算<br /></h4>
            <div class="flex flex-col gap-2">
              <!-- 滑桿 -->
              <div class="relative h-2 w-full bg-gray-300 rounded-full">
                <!-- 已選範圍 -->
                <div
                  class="absolute h-2 bg-gray-700 rounded-full"
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
                  class="border rounded p-1 w-[100px] text-center"
                />
                <input
                  type="number"
                  v-model.number="priceRange.max"
                  :min="minPrice"
                  :max="maxPrice"
                  :step="step"
                  class="border rounded p-1 w-[100px] text-center"
                />
              </div>
            </div>

            <!-- Option Filter -->
            <div
              class="border-b-[1px] pb-[20px] border-secondary border-solid last:border-b-0"
              v-for="HotelMenu in HotelFiltered"
              :key="HotelMenu.title"
            >
              <div class="flex justify-between items-center mb-2">
                <h4 class="font-medium text-base">{{ HotelMenu.title }}</h4>
                <button
                  class="text-xs text-gray-500 hover:text-primary"
                  @click="clearOptions(HotelMenu.title)"
                >
                  清除
                </button>
              </div>
              <div class="space-y-2">
                <label
                  class="flex cursor-pointer text-sm items-center"
                  v-for="option in HotelMenu.options.slice(
                    0,
                    expandedMenus.includes(HotelMenu.title) ? HotelMenu.options.length : 4,
                  )"
                  :key="option"
                >
                  <input
                    type="checkbox"
                    class="mr-2 focus:ring-primary"
                    :value="option"
                    v-model="HotelMenu.selected"
                  />
                  {{ option }}
                </label>
                <button
                  v-if="HotelMenu.options.length > 4 && !expandedMenus.includes(HotelMenu.title)"
                  class="text-black text-sm mt-1"
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
        <div class="flex flex-row items-center gap-2.5 h-12">
          <button class="rounded-full bg-secondary h-full w-full font-bold">價格高到低</button>
          <button class="rounded-full bg-secondary h-full w-full font-bold">價格低到高</button>
          <button class="rounded-full bg-secondary h-full w-full font-bold">熱門高到低</button>
          <button class="rounded-full bg-secondary h-full w-full font-bold">評價高到低</button>
        </div>
        <div class="flex flex-col gap-5 hotel-card rounded-[20px] w-full">
          <HotelCard v-for="hotel in pagedHotels" :key="hotel.id" :hotel="hotel" />
        </div>
        <div class="flex justify-center gap-2 mt-5 mb-10">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            class="px-3 py-1 border rounded-full text-gray-500 hover:text-black"
            :class="{
              'bg-primary text-white': currentPage === page,
              'text-gray-500 hover:text-black': currentPage !== page,
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
  background-color: #6d8fa3; /* primary色號 */
  border-radius: 9999px;
  cursor: pointer;
}
</style>
