<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps({
  hotel: {
    type: Object,
    required: true,
  },
})

function starCount(stars: number) {
  return stars
}
</script>

<template>
  <div class="flex flex-col w-[894px]">
    <div
      class="bg-white h-[180px] rounded-[20px] border border-gray-200 overflow-hidden flex flex-row"
    >
      <!-- 圖片 -->
      <div class="h-full w-[246px] relative">
        <img
          src="https://images.trvl-media.com/lodging/1000000/30000/25200/25187/adae54af.jpg"
          :alt="hotel.name"
          class="w-full h-full object-cover"
        />
        <button
          class="absolute bottom-5 right-5 rounded-[20px] h-[40px] w-[90px] text-xs p-[2px] bg-primary opacity-80 hover:opacity-100 text-white"
        >
          <i class="fa-solid fa-plus"></i>加入比較
        </button>
      </div>

      <!-- 內容 -->
      <div class="relative flex-1 flex justify-between p-5 w-full">
        <p class="absolute top-5 right-5 p-2 rounded-[20px] bg-primary text-white">
          {{ hotel.star_rating }}
        </p>
        <div class="flex flex-col gap-2">
          <h3 class="text-2xl font-bold text-black">
            {{ hotel.name }}
          </h3>

          <div class="flex flex-col gap-1">
            <div class="flex gap-1">
              <svg
                v-for="(n, index) in starCount(hotel.star_rating)"
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

            <p class="text-gray-500 text-base">{{ hotel.city }}{{ hotel.district }}</p>

            <p class="text-base text-gray-400">6616 則評論</p>
          </div>
        </div>

        <!-- 底部 -->
        <div class="flex flex-col justify-end items-end gap-2">
          <div class="text-red-500 text-2xl font-bold">NT${{ hotel.min_price }}</div>
          <div class="flex gap-4">
            <button
              class="bg-primary text-white p-[9px] rounded-[20px] hover:bg-main_800 transition flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="w-5 h-5 fill-current"
              >
                <path
                  d="M378.9 80c-27.3 0-53 13.1-69 35.2l-34.4 47.6c-4.5 6.2-11.7 9.9-19.4 9.9s-14.9-3.7-19.4-9.9l-34.4-47.6c-16-22.1-41.7-35.2-69-35.2-47 0-85.1 38.1-85.1 85.1 0 49.9 32 98.4 68.1 142.3 41.1 50 91.4 94 125.9 120.3 3.2 2.4 7.9 4.2 14 4.2s10.8-1.8 14-4.2c34.5-26.3 84.8-70.4 125.9-120.3 36.2-43.9 68.1-92.4 68.1-142.3 0-47-38.1-85.1-85.1-85.1zM271 87.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 68.6-42.9 128.9-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.3 9.4-27.5 14.1-43.1 14.1s-30.8-4.7-43.1-14.1C176.4 438 123.2 391.5 79.1 338 42.9 294.1 0 233.7 0 165.1 0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1l15 20.7 15-20.7z"
                />
              </svg>
            </button>
            <RouterLink :to="`/hotels/${hotel.id}`">
              <button
                class="bg-primary text-white px-6 py-2 rounded-[20px] hover:bg-main_800 transition"
              >
                查看空房情況
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
