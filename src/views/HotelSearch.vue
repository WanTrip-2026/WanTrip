<script setup>
import Navbar from '../components/layout/Navbar.vue'
import HotelCard from '../components/layout/HotelCard.vue'
import { ref } from 'vue'

// import Footer from '../components/layout/Footer.vue'
// import { RouterLink } from 'vue-router'

const HotelFiltered = [
  { title: '星級', options: ['五星級', '四星級', '三星級'] },
  {
    title: '評價',
    options: ['好極了: 9分以上', '非常好: 8分以上', '好: 7分以上', '令人愉悅: 6分以上'],
  },
  { title: '住宿類型', options: ['飯店', '旅館', '民宿', '度假村'] },
  { title: '付款政策', options: ['免費取消', '立即付款', '延後付款', '到店付款'] },
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
  },
  { title: '地區', options: ['中正區', '中山區', '萬華區', '大同區', '松山區'] },
  {
    title: '距離市中心',
    options: [
      '位於市中心',
      '距市中心1.5公里內',
      '距市中心1.5-3公里內',
      '距市中心3-5公里內',
      '距市中心5公里以上',
    ],
  },
]
const expandedMenus = ref([]) // 儲存哪些 option 已展開
</script>

<template>
  <!-- <Navbar class="relative top-0" /> -->
  <main class="max-w-[1200px] mx-auto">
    <!-- search-bar -->
    <section
      class="max-w-[800px] h-[80px] p-2.5 mt-10 mb-10 mx-auto bg-secondary rounded-full flex flex-row items-center gap-5 sticky"
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
          class="h-full bg-primary hover:bg-#6D8FA3 text-white font-bold py-15px px-[30px] rounded-full transition-colors text-nowrap"
        >
          搜尋
        </button>
      </div>
    </section>
    <!-- result-list -->
    <section class="gap-[20px] m-[40px] mx-auto flex">
      <aside class="flex flex-col gap-5 w-[285px]">
        <!-- 思考：1.太多的項目要怎麼開啟下拉 2.清除按鈕 -->
        <div class="rounded-[20px] bg-accent h-40 flex justify-center items-center">
          地圖找房功能
        </div>
        <div class="rounded-[20px] p-10 bg-accent">
          <h3 class="font-bold text-xl mb-[20px]">篩選條件</h3>
          <div class="flex flex-col gap-5">
            <!-- Price Filter -->
            <div>
              <h4 class="font-medium">
                每晚價格
                <p>(TWD 1 - 15000)</p>
              </h4>
              <input
                v-model.number="Price"
                type="range"
                min="0"
                max="15000"
                step="500"
                class="w-full accent-secondary"
              />
            </div>
            <!-- Option Filter -->
            <div
              class="border-b-[1px] pb-[20px] border-secondary border-solid last:border-b-0"
              v-for="HotelMenu in HotelFiltered"
              :key="HotelMenu.title"
            >
              <h4 class="font-medium mb-2 text-base">{{ HotelMenu.title }}</h4>
              <div class="space-y-2">
                <label
                  class="flex cursor-pointer text-[14px] items-center"
                  v-for="option in HotelMenu.options.slice(
                    0,
                    expandedMenus.includes(HotelMenu.title) ? HotelMenu.options.length : 4,
                  )"
                  :key="option"
                >
                  <input type="checkbox" class="mr-2 focus:ring-primary" />
                  {{ option }}
                </label>
                <button
                  v-if="HotelMenu.options.length > 5 && !expandedMenus.includes(HotelMenu.title)"
                  class="text-black text-sm mt-1"
                  @click="expandedMenus.push(HotelMenu.title)"
                >
                  展開更多選項
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div class="flex flex-1 flex-col gap-5">
        <div class="flex flex-row items-center gap-5 h-[80px]">
          <button class="rounded-full bg-secondary h-[60px] w-full font-bold">價格高到低</button>
          <button class="rounded-full bg-secondary h-[60px] w-full font-bold">價格低到高</button>
          <button class="rounded-full bg-secondary h-[60px] w-full font-bold">熱門高到低</button>
          <button class="rounded-full bg-secondary h-[60px] w-full font-bold">評價高到低</button>
          <button class="rounded-full bg-secondary h-[60px] w-full font-bold">排序方式</button>
        </div>
        <div class="hotel-card rounded-[20px] w-full"><HotelCard class="w-full" /></div>
      </div>
    </section>
  </main>
</template>

<style></style>
