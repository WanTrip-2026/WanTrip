<template>
  <div class="flex gap-5 h-[270px]">
    <div
      v-for="hotel in HotelResult"
      :key="hotel.id"
      class="group relative flex items-stretch rounded-[40px] border border-gray-200 overflow-hidden transition-all duration-300"
      :class="{ 'w-[183px]': !hovered[hotel.id], 'w-[643px]': hovered[hotel.id] }"
      @mouseenter="hovered[hotel.id] = true"
      @mouseleave="hovered[hotel.id] = false"
    >
      <!-- 圖片 -->
      <div
        class="relative flex-shrink-0 h-full transition-all duration-300"
        :class="{ 'w-[183px]': !hovered[hotel.id], 'w-[246px]': hovered[hotel.id] }"
      >
        <img
          :src="hotel.image_url"
          :alt="hotel.name"
          class="w-full h-full object-cover rounded-l-[40px]"
        />
        <button
          class="absolute bottom-5 right-5 rounded-[20px] h-[40px] w-[90px] text-xs p-[2px] bg-primary opacity-80 hover:opacity-100 text-white"
        >
          <i class="fa-solid fa-plus"></i>加入比較
        </button>
      </div>

      <!-- 內容 -->
      <div
        class="flex-1 bg-white p-5 flex flex-col justify-between transition-all duration-300 overflow-hidden"
      >
        <h3 class="text-3xl font-bold">{{ hotel.name }}</h3>
        <div class="flex gap-1">
          <svg
            v-for="(n, index) in starCount(hotel.stars)"
            :key="index"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            class="w-5 h-5 text-yellow-400"
            fill="currentColor"
          >
            <path
              d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"
            />
          </svg>
        </div>
        <p class="text-base text-gray-500">{{ hotel.address }}</p>
        <p class="text-base text-gray-400">
          {{ hotel.comments }}
        </p>
        <div class="flex flex-col justify-between items-end gap-2">
          <div class="text-red-500 font-bold text-2xl">NT${{ hotel.price }}</div>
          <div class="flex gap-4">
            <button
              class="bg-primary text-white p-[9px] rounded-[20px] hover:bg-secondary transition flex items-center justify-center"
            >
              <i class="fa-regular fa-heart"></i>
            </button>
            <button class="bg-primary text-white px-4 py-1 rounded-[20px] hover:bg-secondary">
              查看空房情況
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const HotelResult = [
  {
    id: 1,
    name: '高雄洲際酒店',
    image_url: 'https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg',
    address: '台灣高雄市前鎮區新光路33號',
    stars: '5星級',
    comments: '120 則評論',
    price: '5,000',
  },
  {
    id: 2,
    name: '台北晶華酒店',
    image_url: 'https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg',
    address: '台灣台北市中山區中山北路二段39巷3號',
    stars: '4星級',
    comments: '230 則評論',
    price: '4,000',
  },
  {
    id: 3,
    name: '高雄第三酒店',
    image_url: 'https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg',
    address: '台灣高雄市前鎮區新光路33號',
    stars: '5星級',
    comments: '120 則評論',
    price: '5,000',
  },
  {
    id: 4,
    name: '高雄第四酒店',
    image_url: 'https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg',
    address: '台灣高雄市前鎮區新光路33號',
    stars: '5星級',
    comments: '120 則評論',
    price: '5,000',
  },
  {
    id: 5,
    name: '高雄第五酒店',
    image_url: 'https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg',
    address: '台灣高雄市前鎮區新光路33號',
    stars: '5星級',
    comments: '120 則評論',
    price: '5,000',
  },
]

function starCount(starsText) {
  if (!starsText) return 0
  const match = starsText.match(/\d+/) // 抓出數字
  return match ? parseInt(match[0]) : 0
}
// hover 狀態追蹤
const hovered = reactive({})
</script>
