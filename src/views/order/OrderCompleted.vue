<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { supabase } from '@/utils/supabaseClient'
import { getOrderById, type Order } from '@/services/orderApi'
import Redenvelop from '@/components/layout/RedEnvelope.vue'

const route = useRoute()
const now = new Date()
const formattedDate = `${now.getFullYear()}年${String(now.getMonth() + 1).padStart(2, '0')}月${String(now.getDate()).padStart(2, '0')}日 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

// Get Order ID from query
const queryOrderId = route.query.orderId || route.query.MerchantTradeNo || route.query.order_id
const orderId = queryOrderId
  ? String(queryOrderId)
  : `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${Math.floor(
    Math.random() * 1000000,
  )
    .toString()
    .padStart(6, '0')}`

const isVerifying = ref(false)
const verificationError = ref('')
const fetchedOrder = ref<Order | null>(null)

const order = computed(() => {
  // Priority: 1. Fetched from API (Real) 2. Store (Just paid) 3. Mock (Fallback)
  if (fetchedOrder.value) {
    const d = new Date(fetchedOrder.value.created_at)
    return {
      id: fetchedOrder.value.order_id || fetchedOrder.value.id,
      name: fetchedOrder.value.hotel_name || fetchedOrder.value.title || '旅宿行程',
      amount: fetchedOrder.value.price,
      createdAt: `${d.getFullYear()}年${String(d.getMonth() + 1).padStart(2, '0')}月${String(d.getDate()).padStart(2, '0')}日`,
      telephone: fetchedOrder.value.hotel_phone || '無聯絡電話',
      address: fetchedOrder.value.address || `${fetchedOrder.value.city ?? ''}${fetchedOrder.value.district ?? ''}`,
      image: fetchedOrder.value.image_url || fetchedOrder.value.image,
      roomType: fetchedOrder.value.room_type || fetchedOrder.value.subtitle || '未知房型',
    }
  }

  return {
    id: orderId,
    status: 'processing', // 👈 關鍵
    createdAt: formattedDate,
  }
})

const formattedAmount = computed(() => `NT$ ${Number(order.value.amount || 0).toLocaleString()}`)

onMounted(async () => {
  const transactionId = route.query.transactionId

  // 1. If Line Pay callback (transactionId present), confirm payment
  if (transactionId) {
    isVerifying.value = true
    try {
      console.log('Confirming Line Pay...', transactionId)
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
      const res = await axios.post(`${apiBaseUrl}/payment/linepay/confirm`, {
        transactionId,
        orderId: orderId,
        // amount is inferred by backend from temp storage
      })

      if (res.data.returnCode === '0000') {
        console.log('Line Pay Confirmed!')
      } else {
        throw new Error(res.data.returnMessage || 'Line Pay Confirmation Failed')
      }
    } catch (err: unknown) {
      console.error('Payment Confirmation Error:', err)
      verificationError.value = (err instanceof Error ? err.message : String(err)) || '付款確認失敗，請聯繫客服'
    } finally {
      isVerifying.value = false
    }
  }

  // 2. Fetch Order Data to ensure we display real data
  try {
    console.log('[OrderCompleted] Getting session...')
    // Create a timeout promise
    const timeout = new Promise<{ data: { session: null }; error: null }>((resolve) => {
      setTimeout(() => {
        console.warn('[OrderCompleted] Session timeout, proceeding without token')
        resolve({ data: { session: null }, error: null })
      }, 3000)
    })

    // Race getSession against timeout
    const sessionRes = (await Promise.race([supabase.auth.getSession(), timeout])) as {
      data: { session: { access_token: string } | null }
      error: Error | null
    }

    const { data: sessionData, error: sessionError } = sessionRes
    if (sessionError) console.error('[OrderCompleted] Session error:', sessionError)

    const token = sessionData?.session?.access_token
    console.log('[OrderCompleted] Token available:', !!token)

    if (orderId) {
      // Wait a bit if we just confirmed, to ensure DB propagation
      if (transactionId) await new Promise((r) => setTimeout(r, 1000))

      // Try fetching with token if available, otherwise undefined (public access enabled)
      const data = await getOrderById(orderId, token ?? undefined)
      console.log('[OrderCompleted] Fetched Data:', data)
      if (data && (data.id || data.order_id)) {
        fetchedOrder.value = data
      }
    } else {
      console.warn('[OrderCompleted] No orderId, skipping fetch')
    }
  } catch (e) {
    console.warn('Failed to fetch order details:', e)
  }
})
</script>

<template>
  <main class="w-full bg-page pt-32">
    <section class="max-w-[1240px] min-h-screen mx-auto px-5">
      <div
        class="mx-auto max-w-[800px] p-5 lg:p-10 mb-10 lg:mb-0 bg-white rounded-30 flex flex-col items-center gap-5 lg:gap-10 border border-gray-300 shadow-sm">
        <h3 class="text-4xl font-bold text-black">訂購完成！</h3>
        <div v-if="order.status === 'processing'" class="flex flex-col items-center gap-4">
          <p class="text-xl font-bold text-dark">訂單處理中，請稍候…</p>
        </div>
        <div v-else class="flex flex-col gap-5 items-center lg:flex-row lg:gap-10 justify-center w-full">
          <Redenvelop />
          <div class="w-[200px] aspect-[1/1] overflow-hidden">
            <img :src="order.image" alt="訂購飯店圖" class="w-full h-full object-cover rounded-10" />
          </div>

          <div class="flex flex-col items-center lg:items-stretch flex-nowrap gap-2 text-nowrap">
            <div class="flex flex-col items-center lg:items-stretch">
              <div class="flex flex-nowrap text-xs">
                <dt class="text-dark-700">訂單編號：</dt>
                <dd class="text-dark">{{ order.id }}</dd>
              </div>
              <div class="flex flex-nowrap text-xs">
                <dt class="text-dark-700">訂單建立日期：</dt>
                <dd class="text-dark">{{ order.createdAt }}</dd>
              </div>
            </div>

            <div class="flex flex-col items-center lg:items-stretch">
              <p class="text-dark text-xl font-bold">
                {{ order.name }}
              </p>
              <p v-if="(fetchedOrder?.quantity ?? 1) > 1" class="text-dark text-base font-bold">
                <span class="text-dark font-bold">{{ order.roomType }}</span>* {{ fetchedOrder?.quantity }} 間
              </p>
            </div>
            <div class="flex flex-col items-center lg:items-stretch">
              <p class="text-dark-700 font-bold text-base">總價</p>
              <p class="font-bold text-xl text-red-500">{{ formattedAmount }}</p>
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <router-link to="/"
            class="rounded-full text-nowrap bg-primary text-white px-6 md:px-12 py-3 inline-block hover:bg-main">
            回到首頁
          </router-link>

          <router-link :to="'/orders/confirmation/' + order.id"
            class="rounded-full text-nowrap bg-main-100 text-dark-700 px-6 md:px-12 py-3 inline-block hover:bg-main-300">
            前往訂單
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>
