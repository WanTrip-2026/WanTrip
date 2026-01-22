<script setup lang="ts">
import { computed, reactive, ref, nextTick } from 'vue'
import axios from 'axios'
import { PAYMENT_OPTIONS, ECPAY_METHODS, type PaymentKey } from '@/constants/payment'
import { useOrderStore } from '@/stores/orderStore'
import { useAuthStore } from '@/stores/auth'

import { supabase } from '@/utils/supabaseClient'
import { isValidEmail, isValidPhone } from '@/utils/validators'

const orderStore = useOrderStore()
const authStore = useAuthStore()
const { orderData } = orderStore

const selectedPayment = ref<PaymentKey | ''>('')
const isProcessing = ref(false)
const errorMessage = ref('')

const product = reactive({
  title: orderData.title || '',
  subtitle: orderData.subtitle || '',
  date: orderData.date || '',
  note: orderData.note || '',
  image: orderData.image || '',
  price: orderData.price || 0,
  address: orderData.address || '',
  phone: orderData.phone || '',
  hotel_id: orderData.hotel_id || '',
  type: orderData.type || 'hotel',
  city: orderData.city || '台北',
  category: orderData.category || '',
  highlights: orderData.highlights || [],
  attraction_id: orderData.attraction_id || '',
})
const peopleNum = computed(() => {
  const n = Number(orderData.peopleNum ?? orderData.quantity ?? 1)
  return Number.isFinite(n) && n > 0 ? n : 1
})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  coupon: '',
})

const discount = ref(0)
const subtotal = computed(() => Number(product.price || 0) * peopleNum.value)
const total = computed(() => Math.max(subtotal.value - discount.value, 0))

const handleCheckout = async () => {
  if (!form.name || !form.email || !form.phone) {
    alert('請完整填寫訂購人資料')
    return
  }

  if (!isValidEmail(form.email)) {
    alert('請輸入有效的 Email 格式')
    return
  }

  if (!isValidPhone(form.phone)) {
    alert('請輸入有效的電話號碼格式 (例如: 0912-345-678 或 0912345678)')
    return
  }

  if (!selectedPayment.value || isProcessing.value) return

  isProcessing.value = true

  // 綠界 AIO 支援多種付款方式
  const ecpayMethods = ECPAY_METHODS

  if (ecpayMethods.includes(selectedPayment.value)) {
    await startAioPayment()
  } else if (selectedPayment.value === 'linepay') {
    await startLinePay()
  } else {
    alert('尚不支援此付款方式')
    isProcessing.value = false
  }
}

const generateOrderId = () => {
  const now = new Date()
  return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${Math.floor(
    Math.random() * 1000000,
  )
    .toString()
    .padStart(6, '0')}`
}

const createOrderPayload = (orderId: string) => {
  // Determine dates based on product type
  let checkIn = '2025-12-31'
  let checkOut = '2026-01-01'

  if (product.type === 'attraction' && product.date) {
    // product.date is formatted as YYYY/MM/DD from TicketDetail
    checkIn = product.date.replace(/\//g, '-')

    // Add 1 day for checkOut to satisfy DB constraint (check_out > check_in)
    const d = new Date(checkIn)
    d.setDate(d.getDate() + 1)
    checkOut = d.toISOString().slice(0, 10)
  }

  const payload = {
    user_id: authStore.user?.id,
    order_id: orderId,
    title: product.title,
    subtitle: product.subtitle,
    date: product.date,
    note: product.note,
    price: product.price,
    image: product.image,
    checkInDate: checkIn,
    checkOutDate: checkOut,
    roomType: product.subtitle,
    peopleNum: peopleNum.value,
    userInfo: {
      name: form.name,
      email: form.email,
      phone: form.phone,
    },
    hotelName: product.title,
    orderAmount: total.value, // Use calculated total
    address: product.address,
    phone: product.phone,
    hotel_id: product.type === 'attraction' ? null : product.hotel_id,
    attraction_id: product.type === 'attraction' ? product.attraction_id : null,
  }
  return payload
}

const startAioPayment = async () => {
  try {
    isProcessing.value = true
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
    const orderId = generateOrderId()

    // Payload generation (moved here)
    const orderPayload = createOrderPayload(orderId)

    // Note: Removed createOrder call here. Order will be created by backend after payment.

    const response = await axios.post(`${apiBaseUrl}/payment/get-aio-params`, {
      amount: total.value,
      paymentMethod: selectedPayment.value, // 傳送關鍵字如 'credit', 'atm'
      userId: authStore.user?.id, // 傳送會員 ID
      orderId: orderId,
      ...orderPayload, // Pass the full payload to backend for temp storage
    })

    if (!response.data.success) {
      throw new Error(response.data.message || '取得支付參數失敗')
    }

    const params = response.data.data
    const actionUrl = params.actionUrl

    const paymentForm = document.createElement('form')
    paymentForm.method = 'POST'
    paymentForm.action = actionUrl
    paymentForm.style.display = 'none'

    Object.keys(params).forEach((key) => {
      if (key !== 'actionUrl') {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = params[key]
        paymentForm.appendChild(input)
      }
    })

    document.body.appendChild(paymentForm)
    paymentForm.submit()

    nextTick(() => {
      if (document.body.contains(paymentForm)) {
        document.body.removeChild(paymentForm)
      }
    })
  } catch (error: unknown) {
    console.error('綠界結帳失敗:', error)
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.error) {
        errorMessage.value = JSON.stringify(error.response.data.error, null, 2)
      } else {
        errorMessage.value = error.message
        if (error.response) {
          errorMessage.value += '\nServer Details: ' + JSON.stringify(error.response.data, null, 2)
        }
      }
    } else if (error instanceof Error) {
      errorMessage.value = error.message + (error.stack ? '\n' + error.stack : '')
    } else {
      errorMessage.value = '發生未知異常'
    }
    // alert(errorMessage.value) // Optional: keep alert or rely on UI
    isProcessing.value = false
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const startLinePay = async () => {
  try {
    isProcessing.value = true
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
    const orderId = generateOrderId()

    // Payload generation
    const orderPayload = createOrderPayload(orderId)

    // Note: Removed createOrder call.

    const paymentPayload = {
      amount: total.value,
      productName: product.title,
      userId: authStore.user?.id,
      orderId: orderId,
      ...orderPayload, // Pass payload to backend
    }

    const response = await axios.post(`${apiBaseUrl}/payment/linepay/request`, paymentPayload)

    if (response.data.returnCode === '0000') {
      const paymentUrl = response.data.info.paymentUrl.web
      window.location.href = paymentUrl
    } else {
      alert(`LINE Pay 請求失敗：${response.data.returnMessage}`)
      isProcessing.value = false
    }
  } catch (error: unknown) {
    console.error('Line Pay 請求失敗:', error)
    let errorMsg = '系統連線異常，請檢查後端是否啟動'
    if (axios.isAxiosError(error)) {
      errorMsg = error.response?.data?.message || `連線失敗 (${error.status || '連線逾時'})`
    } else if (error instanceof Error) {
      errorMsg = error.message
    }

    alert(errorMsg)
    isProcessing.value = false
  }
}

const paymentOptions = PAYMENT_OPTIONS

function applyCoupon() {
  const code = form.coupon.trim().toUpperCase()
  if (code === '') return

  if (code === 'WANTRIP200') {
    discount.value = 200
  } else {
    discount.value = 0
    alert('無效的折扣碼，請重新確認')
  }
}
</script>

<template>
  <div
    class="fixed top-20 left-0 right-0 z-50 mx-5 rounded-[20px] border border-gray-300 bg-white px-4 py-3 shadow-sm lg:hidden"
  >
    <div class="mx-auto flex max-w-[1200px] justify-between items-start text-sm">
      <div class="flex flex-col gap-1">
        <span class="font-bold text-xl">{{ product.title }}</span>
        <span class="text-dark_700 text-sm">優惠</span>
        <span class="font-bold text-dark text-xl">總價</span>
      </div>
      <div class="flex flex-col items-end self-end gap-1">
        <span class="text-red-500 text-sm">- NT$ {{ discount }}</span>
        <span class="font-bold text-dark text-xl">總價 NT$ {{ total }}</span>
      </div>
    </div>
  </div>

  <div class="w-full min-h-screen">
    <div class="mx-auto max-w-[1240px] px-5 pt-[200px] pb-24 lg:pt-24">
      <!-- Error Display -->
      <div
        v-if="errorMessage"
        class="mb-5 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
      >
        <p class="font-bold">訂單建立失敗 / Order Creation Failed</p>
        <pre class="mt-2 text-sm whitespace-pre-wrap">{{ errorMessage }}</pre>
      </div>

      <div class="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
        <div class="flex flex-col gap-5">
          <section class="rounded-[20px] border border-gray-300 bg-white p-5 shadow-sm">
            <h2 class="text-xl font-semibold text-dark">商品資訊</h2>
            <div class="mt-5 flex gap-5">
              <div
                class="flex h-22 w-[140px] items-center justify-center rounded-[10px] border border-gray-300 bg-black/5 text-sm text-black/40 overflow-hidden"
              >
                <img
                  v-if="product.image"
                  :src="product.image"
                  alt="商品圖片"
                  class="w-full h-full object-cover"
                />
                <span v-else>image</span>
              </div>
              <div class="min-w-0">
                <div class="text-base text-dark font-bold leading-snug">{{ product.title }}</div>

                <!-- Hotel View -->
                <div v-if="product.type === 'hotel'" class="mt-1">
                  <div class="line-clamp-2 text-sm text-dark_500">{{ product.subtitle }}</div>
                  <div class="mt-1 text-sm text-dark_500">{{ product.date }}</div>
                  <div class="mt-1 text-sm text-dark_500">{{ product.note }}</div>
                </div>

                <!-- Attraction View -->
                <div v-else class="mt-1 flex flex-col gap-1">
                  <div class="text-sm text-dark_500">
                    {{ product.city }} |
                    {{
                      Array.isArray(product.category)
                        ? product.category.join(', ')
                        : product.category
                    }}
                  </div>
                  <div class="text-sm text-dark_500 mt-1">{{ product.subtitle }}</div>
                  <!-- Ticket Name -->
                  <div class="text-sm text-dark_500">{{ product.date }}</div>

                  <div
                    v-if="product.highlights && product.highlights.length > 0"
                    class="mt-1.5 flex flex-wrap gap-1.5"
                  >
                    <span
                      v-for="(tag, i) in product.highlights.slice(0, 3)"
                      :key="i"
                      class="px-2 py-0.5 bg-gray-100 text-gray-600 text-sm rounded-md border border-gray-200"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="rounded-[20px] border border-gray-300 bg-white p-5 shadow-sm">
            <h2 class="text-xl font-semibold text-dark">訂購人資料</h2>
            <div class="mt-5 grid grid-cols-1 gap-y-5 gap-x-10 md:grid-cols-2">
              <div class="flex flex-col gap-3">
                <label class="text-sm text-black/60"
                  >姓名 <span class="text-red-500">*</span></label
                >
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="請輸入姓名"
                  class="h-[44px] rounded-full border border-gray-300 px-4 text-sm outline-none focus:border-primary"
                />
              </div>
              <div class="flex flex-col gap-3">
                <label class="text-sm text-black/60"
                  >Email <span class="text-red-500">*</span></label
                >
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="example@email.com"
                  class="h-[44px] rounded-full border border-gray-300 px-4 text-sm outline-none focus:border-primary"
                />
              </div>
              <div class="flex flex-col gap-3 md:col-span-2">
                <label class="text-sm text-black/60"
                  >電話 <span class="text-red-500">*</span></label
                >
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="09xx-xxx-xxx"
                  class="h-[44px] rounded-full border border-gray-300 px-4 text-sm outline-none focus:border-primary md:max-w-[420px]"
                />
              </div>
            </div>
          </section>

          <section class="rounded-[20px] border border-gray-300 bg-white p-5 shadow-sm">
            <h2 class="text-xl font-semibold text-dark">優惠</h2>
            <div class="mt-5 flex flex-col gap-2 md:flex-row md:items-end">
              <div class="flex flex-1 flex-col gap-2">
                <label class="text-sm text-dark">優惠代碼</label>
                <input
                  v-model="form.coupon"
                  type="text"
                  placeholder="輸入優惠碼"
                  class="h-11 rounded-full border border-gray-300 px-4 text-sm outline-none focus:border-primary"
                />
              </div>
              <button
                type="button"
                @click="applyCoupon"
                class="h-11 rounded-full border bg-primary px-6 text-sm text-white transition hover:bg-main active:scale-[0.99]"
              >
                套用
              </button>
            </div>
          </section>

          <section class="rounded-[20px] border border-gray-300 bg-white p-5 shadow-sm">
            <h2 class="text-xl font-semibold text-dark">選擇付款方式</h2>

            <div class="mt-5 flex flex-col gap-4">
              <label
                v-for="option in paymentOptions"
                :key="option.key"
                class="flex h-[60px] cursor-pointer items-center justify-between overflow-hidden rounded-full border border-gray-300 px-4 transition hover:bg-main_100"
              >
                <div class="flex items-center gap-4">
                  <input
                    type="radio"
                    name="pay"
                    :value="option.key"
                    v-model="selectedPayment"
                    class="h-5 w-5 rounded-full accent-primary active:scale-[0.99]"
                  />
                  <div class="flex flex-col gap-0">
                    <span class="text-base font-medium text-dark_900 line-clamp-1">{{ option.label }}</span>
                    <p
                      v-if="['credit', 'atm', 'applepay', 'jkopay'].includes(option.key)"
                      class="text-xs text-dark_500 mt-1"
                    >
                      由綠界科技 ECPay 提供的安全支付服務
                    </p>
                  </div>
                </div>
                <div class="flex h-full items-center gap-3">
                  <img
                    v-for="icon in option.icons"
                    :key="icon.src"
                    :src="icon.src"
                    :alt="icon.alt"
                    class="block w-auto object-contain"
                    :class="icon.large ? 'h-7 sm:h-9' : 'h-3 sm:h-4'"
                  />
                </div>
              </label>
            </div>
            <div class="w-full">
              <button
                @click="handleCheckout"
                :disabled="!selectedPayment || isProcessing"
                class="mt-5 rounded-full float-right bg-primary hover:bg-main h-11 px-8 text-white font-bold transition disabled:bg-gray-400 disabled:cursor-not-allowed active:scale-[0.99]"
              >
                <span v-if="isProcessing">處理中，請稍候...</span>
                <span v-else>立即結帳</span>
              </button>
            </div>
          </section>
        </div>

        <aside class="hidden h-fit lg:block lg:sticky lg:top-[96px]">
          <section class="rounded-[20px] border border-gray-300 bg-white p-5 shadow-sm">
            <h2 class="text-xl font-semibold text-primary">費用明細</h2>
            <div class="mt-5 flex flex-col gap-5 text-sm">
              <div class="flex items-center justify-between">
                <span class="text-dark_500">商品費用</span>
                <span class="font-medium text-dark">NT$ {{ subtotal }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-dark_500">優惠</span>
                <span class="font-medium text-red-500">- NT$ {{ discount }}</span>
              </div>
              <div class="my-2 h-px bg-gray-300"></div>
              <div class="flex items-center justify-between text-2xl">
                <span class="font-semibold text-primary">總計</span>
                <span class="font-bold text-dark">NT$ {{ total }}</span>
              </div>
              <div class="text-sm text-black/50">
                訂單總額包含（如適用）稅金 / 服務費 / 平台費等。
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  </div>
</template>
