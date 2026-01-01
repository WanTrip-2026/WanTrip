<script setup>
import HotelCard from '../components/layout/HotelCard.vue'
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

// const currentPage = ref(1)
// const itemsPerPage = 8

// // 計算總頁數，根據 hotelCards 的數量
// const totalPages = computed(() => Math.ceil(hotelCards.length / itemsPerPage))

// // 根據當前頁數來顯示對應的項目
// const pagedHotelCards = computed(() => {
//   const start = (currentPage.value - 1) * itemsPerPage
//   return hotelCards.slice(start, start + itemsPerPage)
// })

// // 切換頁數
// function goToPage(page) {
//   if (page >= 1 && page <= totalPages.value) {
//     currentPage.value = page
//   }
// }
</script>

<template>
  <!-- <Navbar class="relative top-0" /> -->
  <main class="max-w-[1200px] mx-auto pt-24 bg-page px-5 lg:px-0">
    <!-- search-bar -->
    <section
      class="max-w-[800px] h-20 p-2.5 mb-10 mx-auto bg-secondary rounded-full flex flex-row items-center gap-5 sticky"
    >
      <div class="h-full w-full">
        <label class="rounded-full"></label>
        <input
          type="text"
          placeholder="目的地"
          class="h-full w-full border text-center border-gray-300 rounded-full focus:ring-primary focus:border-primary outline-none"
        />
      </div>
      <div class="h-full w-full">
        <label class="text-gray-500 rounded-full"></label>
        <input
          type="text"
          placeholder="入住及退房日期"
          class="h-full w-full border text-center border-gray-300 rounded-full focus:ring-primary focus:border-primary outline-none"
        />
      </div>
      <div class="h-full w-full">
        <label class="text-gray-500 rounded-full"></label>
        <input
          type="text"
          placeholder="房間及房客"
          class="h-full w-full border text-center border-gray-300 rounded-full focus:ring-primary focus:border-primary outline-none"
        />
      </div>
      <div class="text-gray-500 rounded-full h-full">
        <button
          class="h-full bg-primary hover:bg-#6D8FA3 text-white font-bold py-4 px-7 rounded-full transition-colors whitespace-nowrap"
        >
          搜尋
        </button>
      </div>
    </section>
    <!-- result-list -->
    <section class="gap-[20px] m-[40px] mx-auto flex">
      <aside class="flex flex-col gap-5 w-[285px]">
        <div class="rounded-[20px] bg-white min-h-[200px] flex justify-center items-center">
          地圖找房功能
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
                  style="pointer-events: all"
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
                  v-if="HotelMenu.options.length > 5 && !expandedMenus.includes(HotelMenu.title)"
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
        <div class="hotel-card rounded-[20px] w-full">
          <HotelCard />
        </div>
      </div>
      <!-- <div class="flex justify-center gap-2 mt-5 mb-10">
        <button
          v-for="page in totalPages"
          :key="page"
          class="px-3 py-1 border rounded-full text-gray-500 hover:text-black"
          :class="{ 'bg-primary text-white': currentPage === page }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div> -->
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
