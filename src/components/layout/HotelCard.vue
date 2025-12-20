<script setup>
import { RouterLink } from 'vue-router'

const HotelResult = [
  {
    id: 1,
    name: '高雄洲際酒店',
    image_url: 'https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg',
    address: '台灣高雄市前鎮區新光路33號',
    stars: '五星級',
    comments: '120 則評論',
  },
  {
    id: 2,
    name: '台北晶華酒店',
    image_url: 'https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg',
    address: '台灣台北市中山區中山北路二段39巷3號',
    stars: '五星級',
    comments: '230 則評論',
  },
]
</script>

<template>
  <section class="flex flex-col gap-5">
    <div
      v-for="hotel in HotelResult"
      :key="hotel.id"
      class="bg-white rounded-[40px] h-[270px] w-[894px] border border-gray-200 overflow-hidden flex flex-row"
    >
      <!-- 圖片 -->
      <div class="h-full w-[246px]">
        <img :src="hotel.image_url" :alt="hotel.name" class="w-full h-full object-cover" />
      </div>

      <!-- 內容 -->
      <div class="flex-1 flex flex-col justify-between p-5">
        <div>
          <h3 class="text-xl font-bold">
            {{ hotel.name }}
            <span class="ml-2 text-sm text-yellow-500">{{ hotel.stars }}</span>
          </h3>

          <p class="text-gray-500 mt-1">
            {{ hotel.address }}
          </p>

          <p class="text-sm text-gray-400 mt-1">
            {{ hotel.comments }}
          </p>
        </div>

        <!-- 底部 -->
        <div class="flex flex-col items-end">
          <div>價格資訊</div>
          <div class="flex gap-4">
            <button
              class="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary transition"
            >
              加入收藏
            </button>
            <button
              class="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary transition"
            >
              查看空房情況
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
