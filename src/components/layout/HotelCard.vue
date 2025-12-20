<script setup>
import { RouterLink } from 'vue-router'

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
]
function starCount(starsText) {
  if (!starsText) return 0
  const match = starsText.match(/\d+/) // 抓出數字
  return match ? parseInt(match[0]) : 0
}
</script>

<template>
  <div class="flex flex-col gap-5 w-[894px]">
    <div
      v-for="hotel in HotelResult"
      :key="hotel.id"
      class="bg-white h-[270px] rounded-[40px] border border-gray-200 overflow-hidden flex flex-row"
    >
      <!-- 圖片 -->
      <div class="h-full w-[246px] relative">
        <img :src="hotel.image_url" :alt="hotel.name" class="w-full h-full object-cover" />
        <button
          class="absolute bottom-5 right-5 rounded-[20px] h-[40px] w-[90px] text-xs p-[2px] bg-primary opacity-80 hover:opacity-100 text-white"
        >
          <i class="fa-solid fa-plus"></i>加入比較
        </button>
      </div>

      <!-- 內容 -->
      <div class="flex-1 flex flex-col justify-between p-5 w-full">
        <div class="flex flex-col gap-2.5">
          <h3 class="text-3xl font-bold text-black">
            {{ hotel.name }}
          </h3>

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

          <p class="text-gray-500 text-base">
            {{ hotel.address }}
          </p>

          <p class="text-base text-gray-400">
            {{ hotel.comments }}
          </p>
        </div>

        <!-- 底部 -->
        <div class="flex flex-col items-end gap-2">
          <div class="text-red-500 text-3xl font-bold">NT${{ hotel.price }}</div>
          <div class="flex gap-4">
            <button
              class="bg-primary text-white p-[9px] rounded-[20px] hover:bg-secondary transition flex items-center justify-center"
            >
              <i class="fa-regular fa-heart"></i>
            </button>
            <button
              class="bg-primary text-white px-6 py-2 rounded-[20px] hover:bg-secondary transition"
            >
              查看空房情況
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
