<template>
  <div class="max-w-[1200px] mx-auto p-5 mt-24 mb-10">
    <div class="grid grid-cols-2 gap-5">

      <template v-if="isLoading">
        <div v-for="n in 2" :key="n" class="animate-pulse space-y-5">
          <div class="w-full h-12 bg-gray-200 rounded-[20px]"></div>
          <div class="w-full aspect-[4/3] bg-gray-200 rounded-[20px]"></div>
          <div class="h-10 bg-gray-200 rounded-[20px]"></div>
        </div>
      </template>

      <template v-else>
        <div v-for="hotel in hotels" :key="hotel.id" class="flex flex-col space-y-2">
          <button
            class="w-full px-6 py-3 rounded-[20px] text-center text-white text-lg font-bold bg-secondary hover:brightness-95 transition-all">選擇住宿</button>

          <div class="w-full aspect-[4/3] bg-gray-100 rounded-[20px] overflow-hidden border border-gray-100">
            <img :src="hotel.image || 'https://via.placeholder.com/400x300?text=No+Image'"
              class="w-full h-full object-cover" alt="Hotel Photo">
          </div>

          <div class="bg-gray-100 p-5 rounded-[20px] text-center w-full font-bold text-xl">
            {{ hotel.name }}
          </div>

          <div class="bg-gray-100 p-5 rounded-[20px] text-center w-full">
            {{ hotel.type }}
          </div>

          <div class="bg-gray-100 p-5 rounded-[20px] min-h-[220px]">
            <p class="font-bold mb-2 text-center text-gray-700">設施 & 服務</p>
            <ul class="space-y-1">
              <li v-for="feature in hotel.features" :key="feature">· {{ feature }}</li>
            </ul>
          </div>

          <div class="bg-gray-100 p-5 rounded-[20px] text-center min-h-[100px] flex flex-col justify-center">
            <p class="font-bold text-gray-700">交通資訊</p>
            <p class="text-sm">距離市中心 {{ hotel.distance }} km</p>
          </div>

          <div v-for="(rule, index) in hotel.rules" :key="index"
            class="bg-gray-100 p-3 rounded-[20px] text-center text-sm text-gray-500">
            {{ rule }}
          </div>

          <div class="bg-gray-100 p-5 rounded-[20px] text-center">
            <p class="font-bold">價格</p>
            <p class="text-2xl font-bold text-red-500">NT$ {{ formatPrice(hotel.price) }} 起</p>
          </div>

          <button
            class="w-full bg-primary hover:bg-opacity-90 transition-all py-3 rounded-[20px] text-white font-bold shadow-md">
            立即預訂
          </button>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 1. 改用 ref，未來 API 回傳後更新此變數
const hotels = ref([]);
const isLoading = ref(true); // 預留加載狀態

onMounted(async () => {
  // 模擬 API 請求延遲
  setTimeout(() => {
    hotels.value = [
      {
        id: 1,
        name: '飯店名稱 A',
        type: '住宿類型(2人房2床)',
        distance: 1.2,
        price: 1234,
        features: ['免費 Wi-Fi', '游泳池', '健身房'],
        rules: ['不允許攜帶寵物', '全館禁菸'], // 改成陣列
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800'
      },
      {
        id: 1,
        name: '飯店名稱 A',
        type: '住宿類型',
        distance: 1.2,
        price: 1234,
        features: ['免費 Wi-Fi', '游泳池', '健身房'],
        rules: ['不允許攜帶寵物', '全館禁菸'], // 改成陣列
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800'
      }
    ];
    isLoading.value = false;
  }, 1000);
});

const formatPrice = (price) => {
  return price?.toLocaleString();
};
</script>
