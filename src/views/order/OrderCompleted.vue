<script setup lang="ts">
import { computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'

import { useRoute } from 'vue-router'

const route = useRoute()
const orderStore = useOrderStore()

const now = new Date()
const formattedDate = `${now.getFullYear()}年${String(now.getMonth() + 1).padStart(2, '0')}月${String(now.getDate()).padStart(2, '0')}日 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

const queryOrderId = route.query.orderId || route.query.MerchantTradeNo || route.query.order_id
const orderId = queryOrderId
  ? String(queryOrderId)
  : `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${Math.floor(
      Math.random() * 1000000,
    )
      .toString()
      .padStart(6, '0')}`

const order = computed(() => ({
  id: orderId,
  name: orderStore.orderData.title || '高雄洲際酒店',
  amount: orderStore.orderData.price || 50000,
  createdAt: formattedDate,
  telephone: orderStore.orderData.phone || '(07)339-1888',
  address: orderStore.orderData.address || '高雄市前鎮區新光路33號',
  image: orderStore.orderData.image || '/src/assets/hoteldetail_img/Wanhao.jpg',
}))

const formattedAmount = computed(() => `NT$ ${order.value.amount.toLocaleString()}`)
</script>

<template>
  <main class="w-full bg-page pt-32">
    <section class="max-w-[1200px] min-h-screen mx-auto px-10 pb-10">
      <div
        class="mx-auto w-[600px] lg:w-[800px] p-5 lg:p-10 bg-white rounded-[40px] flex flex-col items-center gap-5 lg:gap-10 border border-gray-300 shadow-sm"
      >
        <h3 class="text-4xl font-bold text-black">訂購完成✅</h3>
        <div class="flex flex-col gap-2 items-center lg:flex-row lg:gap-6 lg:justify-start w-full">
          <div class="w-[200px] aspect-[1/1] overflow-hidden">
            <img
              :src="order.image"
              alt="訂購飯店圖"
              class="w-full h-full object-cover rounded-[20px]"
            />
          </div>

          <div
            class="flex flex-col items-center lg:items-stretch flex-nowrap gap-2 text-base text-nowrap"
          >
            <div class="flex flex-nowrap">
              <p class="text-dark_700">訂單編號：</p>
              <p class="text-dark">{{ order.id }}</p>
            </div>

            <div class="flex">
              <dt class="text-dark_700">訂單建立日期：</dt>
              <dd class="text-dark">{{ order.createdAt }}</dd>
            </div>
            <div class="flex flex-col items-center lg:items-stretch gap-1">
              <p class="text-dark text-2xl font-bold">{{ order.name }}</p>
              <p class="text-dark_700 text-base text-wrap">{{ order.address }}</p>
              <p class="text-dark_700 text-base">{{ order.telephone }}</p>
            </div>
            <div class="flex flex-col items-center lg:items-stretch">
              <p class="text-dark_700">總價</p>
              <p class="text-dark font-bold text-xl">{{ formattedAmount }}</p>
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <router-link
            to="/"
            class="rounded-full bg-primary text-white px-12 py-3 inline-block hover:bg-main"
          >
            回到首頁
          </router-link>

          <router-link
            :to="'/orders/confirmation/' + order.id"
            class="rounded-full bg-main_100 text-dark_700 px-12 py-3 inline-block hover:bg-main_300"
          >
            前往訂單
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>
