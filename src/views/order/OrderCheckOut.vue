<script setup lang="ts">
import { computed, reactive, ref, nextTick } from 'vue'
import axios from 'axios'
import { PAYMENT_OPTIONS, ECPAY_METHODS, type PaymentKey } from '@/constants/payment'
import { useOrderStore } from '@/stores/orderStore'
import { useAuthStore } from '@/stores/auth'

import { isValidEmail, isValidPhone } from '@/utils/validators'

interface Room {
  id: string
  status?: string
  maxAvailable?: number
}

const orderStore = useOrderStore()
const authStore = useAuthStore()
// const { orderData } = orderStore // [FIX] Removed destructuring to avoid stale reference

const selectedPayment = ref<PaymentKey | ''>('')
const isProcessing = ref(false)
const errorMessage = ref('')

const product = reactive({
  title: orderStore.orderData.title || '',
  subtitle: orderStore.orderData.subtitle || '',
  date: orderStore.orderData.date || '',
  note: orderStore.orderData.note || '',
  image: orderStore.orderData.image || '',
  price: orderStore.orderData.price || 0,
  address: orderStore.orderData.address || '',
  phone: orderStore.orderData.phone || '',
  hotel_id: orderStore.orderData.hotel_id || '',
  room_id: orderStore.orderData.room_id || '',
  type: orderStore.orderData.type || 'hotel',
  city: orderStore.orderData.city || '台北',
  category: orderStore.orderData.category || '',
  highlights: orderStore.orderData.highlights || [],
  attraction_id: orderStore.orderData.attraction_id || '',
})
const roomQuantity = computed(() => {
  const data = orderStore.orderData
  const n = Number(data.roomQuantity ?? 1)
  return Number.isFinite(n) && n > 0 ? n : 1
})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  coupon: '',
})

const discount = ref(0) // Coupon discount

const nights = computed(() => {
  if (product.type !== 'hotel' || !product.date) return 1
  const parts = product.date.split(' - ')
  if (parts.length !== 2) return 1
  const start = new Date(parts[0] || '')
  const end = new Date(parts[1] || '')
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 1
})

const subtotal = computed(() => {
  const price = Number(product.price || 0)
  const count = roomQuantity.value
  if (product.type === 'hotel') {
    return price * count * nights.value
  }
  return price * count
})

const longStayDiscount = computed(() => {
  if (product.type !== 'hotel') return 0
  const n = nights.value
  const basePrice = subtotal.value
  if (n >= 6) return Math.round(basePrice * 0.2) // 20% off for 6+ nights
  if (n >= 4) return Math.round(basePrice * 0.15) // 15% off for 4-5 nights
  if (n >= 2) return Math.round(basePrice * 0.1) // 10% off for 2-3 nights
  return 0
})

const total = computed(() => Math.max(subtotal.value - discount.value - longStayDiscount.value, 0))

const checkInventory = async (): Promise<boolean> => {
  if (product.type !== 'hotel' || !product.hotel_id || !product.room_id || !product.date)
    return true

  try {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
    // Parse dates
    let sDate = '',
      eDate = ''
    const parts = product.date.split(' - ')
    if (parts.length === 2) {
      sDate = parts[0] || ''
      eDate = parts[1] || ''
    } else {
      return true // Cannot validate without dates
    }

    const res = await axios.get(`${apiBaseUrl}/hotels/${product.hotel_id}/rooms`, {
      params: {
        start_date: sDate,
        end_date: eDate,
        rooms: roomQuantity.value, // Check if we have enough rooms
        adults: 0, // We only care about room quantity for inventory
      },
    })

    const rooms = res.data
    const targetRoom = rooms.find((r: Room) => r.id === product.room_id)

    if (!targetRoom) {
      alert('無法取得房型資訊，請稍後再試')
      return false
    }

    if (
      targetRoom.status === 'sold_out' ||
      (targetRoom.maxAvailable !== undefined && targetRoom.maxAvailable < roomQuantity.value)
    ) {
      const left = targetRoom.maxAvailable ?? 0
      alert(
        `庫存不足！該房型僅剩 ${left} 間，您預訂了 ${roomQuantity.value} 間。請調整數量或選擇其他房型。`,
      )
      return false
    }

    return true
  } catch (err) {
    console.error('Inventory check failed', err)
    // Decide whether to block or allow if check fails. Usually safe to allow unless critical?
    // User requested explicit check. Let's warn but maybe not hard block if API error?
    // Or block to be safe. "驗證庫存失敗，請重試"
    alert('無法驗證庫存狀態，請稍後再試')
    return false
  }
}

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

  // [NEW] Inventory Check
  if (product.type === 'hotel') {
    isProcessing.value = true
    const hasStock = await checkInventory()
    isProcessing.value = false
    if (!hasStock) return
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
const copyCoupon = async () => {
  try {
    await navigator.clipboard.writeText('WANTRIP200')
    // 你可以換成 toast / alert
    alert('優惠碼已複製！')
  } catch (err) {
    console.error('複製失敗', err)
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
  let checkIn = ''
  let checkOut = ''

  if (product.type === 'hotel' && product.date) {
    // Hotel date format: "YYYY-MM-DD - YYYY-MM-DD"
    const parts = product.date.split(' - ')
    if (parts.length === 2) {
      checkIn = parts[0] || ''
      checkOut = parts[1] || ''
    } else {
      // Fallback
      const today = new Date()
      checkIn = today.toISOString().slice(0, 10)
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      checkOut = tomorrow.toISOString().slice(0, 10)
    }
  } else if (product.type === 'attraction' && product.date) {
    // product.date is formatted as YYYY/MM/DD from TicketDetail
    checkIn = product.date.replace(/\//g, '-')

    // Add 1 day for checkOut to satisfy DB constraint (check_out > check_in)
    const d = new Date(checkIn)
    d.setDate(d.getDate() + 1)
    checkOut = d.toISOString().slice(0, 10)
  }

  // Ensure valid fallbacks if parsing failed entirely
  if (!checkIn) checkIn = new Date().toISOString().slice(0, 10)
  if (!checkOut) {
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
    coupon: form.coupon.trim().toUpperCase(),
    image: product.image,
    checkInDate: checkIn,
    checkOutDate: checkOut,
    room_id: product.type === 'hotel' ? product.room_id : null,
    roomType: product.subtitle,
    peopleNum: roomQuantity.value, // Map to backend field
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
      <div class="flex flex-col gap-2">
        <span class="font-bold text-xl">{{ product.title }} </span>

        <span class="text-dark_700 text-sm"
          >原價
          <span class="text-sm text-dark_500">
            / {{ roomQuantity }} 間 x {{ nights }} 晚 x NT$ {{ product.price.toLocaleString() }}
          </span></span
        >
        <span class="text-dark_700 text-sm">續住優惠</span>
        <span class="text-dark_700 text-sm">折扣碼優惠</span>
        <span class="font-bold text-dark text-xl">總計</span>
      </div>
      <div class="flex flex-col items-end self-end gap-2">
        <span class="font-bold text-dark text-sm"> NT$ {{ subtotal.toLocaleString() }}</span>
        <span class="font-bold text-red-500 text-sm"
          >- NT$ {{ longStayDiscount.toLocaleString() }}</span
        >
        <span class="font-bold text-red-500 text-sm">- NT$ {{ discount.toLocaleString() }}</span>
        <span class="font-bold text-dark text-xl border-t pt-1">
          NT$ {{ total.toLocaleString() }}</span
        >
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
              <div class="flex flex-col gap-3">
                <label class="text-sm text-black/60">
                  電話 <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="09xxxxxxxx"
                  class="h-[44px] w-full rounded-full border border-gray-300 px-4 text-sm outline-none focus:border-primary"
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
            <div>
              <p class="w-full m-2 text-sm text-dark_500">
                輸入優惠碼
                <span
                  class="cursor-pointer select-all font-semibold text-primary underline underline-offset-2 hover:opacity-80"
                  @click="copyCoupon"
                >
                  WANTRIP200</span
                >，立即折扣200元
              </p>
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
                    <span class="text-base font-medium text-dark_900 line-clamp-1">{{
                      option.label
                    }}</span>
                    <p
                      v-if="['credit', 'atm', 'applepay', 'jkopay'].includes(option.key)"
                      class="text-xs text-dark_500 mt-1"
                    >
                      由綠界科技 ECPay 提供的安全支付服務
                    </p>
                  </div>
                </div>

                <div class="flex h-full items-center lg:justify-end gap-3">
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
              <div
                v-if="product.type === 'hotel'"
                class="text-sm text-black/40 mb-1 flex items-center justify-end"
              >
                {{ roomQuantity }} 間 x {{ nights }} 晚 x NT$ {{ product.price.toLocaleString() }}
              </div>
              <div class="flex items-center justify-between">
                <span class="text-dark_500">原價</span>
                <span class="font-medium text-dark text-right">
                  NT$ {{ subtotal.toLocaleString() }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-dark_500">續住優惠</span>
                <span class="font-medium text-red-500"
                  >- NT$ {{ longStayDiscount.toLocaleString() }}</span
                >
              </div>
              <div class="flex items-center justify-between">
                <span class="text-dark_500">折扣碼優惠</span>
                <span class="font-medium text-red-500">- NT$ {{ discount.toLocaleString() }}</span>
              </div>
              <div class="my-2 h-px bg-gray-300"></div>
              <div class="flex items-center justify-between text-2xl">
                <span class="font-semibold text-primary">總計</span>
                <span class="font-bold text-dark">NT$ {{ total.toLocaleString() }}</span>
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
