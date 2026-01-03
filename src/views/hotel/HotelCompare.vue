<template>
  <main class="max-w-[1200px] mx-auto py-5 mt-24 mb-10">
    <div class="grid grid-cols-2 gap-5 mx-5 lg:mx-0">
      <template v-if="isLoading">
        <div v-for="n in 2" :key="n" class="animate-pulse space-y-5">
          <div class="w-full h-12 bg-main_100 rounded-[20px]"></div>
          <div class="w-full aspect-[4/3] bg-main_100 rounded-[20px]"></div>
          <div class="h-10 bg-main_100 rounded-[20px]"></div>
        </div>
      </template>

      <template v-else>
        <div v-for="hotel in hotels" :key="hotel.id" class="flex flex-col space-y-2">
          <RouterLink to=""
            class="w-full px-6 py-3 rounded-[20px] text-center text-white text-lg font-bold shadow-sm bg-main hover:bg-main_800 transition-all">
            選擇住宿
          </RouterLink>

          <div class="w-full aspect-[16/9] bg-main_100 rounded-[20px] overflow-hidden border border-gray-300 shadow-sm">
            <img :src="hotel.image || 'https://via.placeholder.com/400x300?text=No+Image'"
              class="w-full h-full object-cover" alt="Hotel Photo" />
          </div>

          <div class="bg-main_100 p-5 rounded-[20px] text-center w-full font-bold text-xl text-dark_900 shadow-sm">
            {{ hotel.name }}
          </div>

          <div class="bg-main_100 p-5 rounded-[20px] text-center text-dark_700 w-full shadow-sm">
            {{ hotel.type }}
          </div>

          <div class="bg-main_100 p-5 rounded-[20px] min-h-[220px] shadow-sm">
            <p class="font-bold mb-2 text-center text-dark_700">設施 & 服務</p>
            <ul class="space-y-1">
              <li v-for="feature in hotel.features" :key="feature" class="text-dark_500"> - {{ feature }}</li>
            </ul>
          </div>

          <div class="bg-main_100 p-5 rounded-[20px] text-center min-h-[100px] flex flex-col justify-center shadow-sm">
            <p class="font-bold text-dark_700">交通資訊</p>
            <p class="text-sm">距離市中心 {{ hotel.distance }} km</p>
          </div>

          <div class="bg-main_100 p-5 rounded-[20px] min-h-[80px] shadow-sm">
            <div v-for="rule in hotel.rules" :key="rule"
              class="bg-main_100 rounded-[20px] text-center text-sm text-dark_500">
              {{ rule }}
            </div>
          </div>

          <div class="bg-main_100 p-5 rounded-[20px] text-center shadow-sm">
            <p class="font-bold text-dark_700">價格</p>
            <p class="text-2xl font-bold text-red-500">NT$ {{ formatPrice(hotel.price) }} <span
                class="text-dark_500 text-sm">起</span></p>
          </div>

          <RouterLink to=""
            class="w-full bg-primary hover:bg-main transition-all py-3 rounded-[20px] text-white text-center font-bold shadow-sm">
            立即預訂
          </RouterLink>
        </div>
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'


interface Hotel {
  id: number
  name: string
  type: string
  distance: number
  price: number
  features: string[]
  rules: string[]
  image: string
}


const hotels = ref<Hotel[]>([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    // 模擬 API 請求
    await new Promise((resolve) => setTimeout(resolve, 1000))

    hotels.value = [
      {
        id: 1,
        name: '飯店名稱 A',
        type: '住宿類型(2人房2床)',
        distance: 1.2,
        price: 1234,
        features: ['免費 Wi-Fi', '游泳池', '健身房'],
        rules: ['不允許攜帶寵物', '全館禁菸'],
        image:
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800',
      },
      {
        id: 2,
        name: '飯店名稱 B',
        type: '商務單人房',
        distance: 0.5,
        price: 2100,
        features: ['早餐供應', '免費停車'],
        rules: ['全館禁菸'],
        image:
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800',
      },
    ]
  } finally {
    isLoading.value = false
  }
})

const formatPrice = (price: number): string => {
  return price?.toLocaleString() ?? '0'
}
</script>
