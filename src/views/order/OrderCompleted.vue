<script setup>
import { computed } from 'vue'

const order = {
  id: '202512310936001',
  name: '高雄洲際酒店',
  amount: 50000,
  createdAt: '2025年12月31日 09:36:50',
  telephone: '(07)339-1888',
  address: '高雄市前鎮區新光路33號',
}
const formattedAmount = computed(() => `NT$ ${order.amount.toLocaleString()}`)
</script>

<template>
  <main class="w-full bg-page pt-24">
    <section class="max-w-[1200px] mx-auto pb-10">
      <div
        class="mx-auto w-[600px] lg:w-[800px] p-5 lg:p-10 bg-white rounded-[20px] flex flex-col items-center gap-5 lg:gap-10 border border-grey-300"
      >
        <h3 class="text-4xl font-bold text-black">訂購完成✅</h3>
        <div class="flex flex-col gap-2 items-center lg:flex-row lg:gap-6 lg:justify-start w-full">
          <div class="w-[200px] aspect-[1/1] overflow-hidden">
            <img
              src="/src/assets/hoteldetail_img/Wanhao.jpg"
              alt="訂購飯店圖"
              class="w-full h-full object-cover rounded-[10px]"
            />
          </div>

          <div
            class="flex flex-col items-center lg:items-stretch flex-nowrap gap-2 text-base text-nowrap"
          >
            <div class="flex flex-nowrap">
              <p class="text-gray-700">訂單編號：</p>
              <p>{{ order.id }}</p>
            </div>

            <div class="flex">
              <dt class="text-gray-700">訂單建立日期：</dt>
              <dd>{{ order.createdAt }}</dd>
            </div>
            <div class="flex flex-col items-center lg:items-stretch gap-1">
              <p class="text-black text-2xl font-bold">{{ order.name }}</p>
              <p class="text-gray-700 text-base">{{ order.address }}</p>
              <p class="text-gray-700 text-base">{{ order.telephone }}</p>
            </div>
            <div class="flex flex-col items-center lg:items-stretch">
              <p>總價</p>
              <p class="text-black font-bold text-xl">NT {{ formattedAmount }}</p>
            </div>
          </div>
        </div>
        <div class="flex gap-2.5">
          <router-link
            to="/"
            class="rounded-full bg-primary text-white px-12 py-3 inline-block hover:bg-secondary"
          >
            回到首頁
          </router-link>

          <router-link
            to="/orders"
            class="rounded-full bg-gray-500 text-white px-12 py-3 inline-block hover:bg-gray-500/50"
          >
            前往訂單
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>
