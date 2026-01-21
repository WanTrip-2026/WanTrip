<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getOrderById, type Order } from '@/services/orderApi'

const route = useRoute()
const order = ref<Order | null>(null)
const errorMsg = ref('')

onMounted(async () => {
  const id = route.params.id as string

  if (!id) {
    errorMsg.value = '無效的訂單編號'
    return
  }

  try {
    order.value = await getOrderById(id)
  } catch (e: unknown) {
    console.error('[OrderConfirmation] Error:', e)

    if (e instanceof Error) {
      errorMsg.value = e.message
    } else {
      errorMsg.value = '無法讀取訂單'
    }
  }
})

const isTicket = computed(() => {
  if (!order.value) return false
  // Detect if it's a ticket by presence of attraction_id OR if hotel_id is null
  return !!order.value.attraction_id || !order.value.hotel_id
})

const mapUrl = computed(() => {
  if (!order.value) return ''

  if (order.value.latitude != null && order.value.longitude != null) {
    return `https://maps.google.com/maps?q=${order.value.latitude},${order.value.longitude}&z=15&output=embed`
  }

  // Fallback to address
  const fullAddress = [order.value.city, order.value.district, order.value.address]
    .filter(Boolean)
    .join('')

  if (fullAddress) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&z=15&output=embed`
  }

  return ''
})
</script>
<template>
  <main class="min-h-screen text-primary max-w-[1240px] mx-auto pt-24 pb-24">
    <div class="mx-5" v-if="order">
      <section class="bg-white rounded-[20px] shadow-sm border border-gray-300 p-5 lg:p-10 mb-10">
        <div class="flex flex-col md:flex-row justify-between items-start gap-8">
          <div class="flex flex-col sm:flex-row gap-6 items-center text-center sm:text-left">
            <div class="h-24 md:h-32 rounded-[20px] overflow-hidden shrink-0 aspect-[4/3]">
              <img :src="order.image_url || order.image" class="w-full h-full object-cover" />
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold mb-2">
                {{ order.hotel_name || order.title }}
              </h1>

              <div class="mt-4">
                <span class="text-xs md:text-sm font-bold">總價</span>
                <span class="text-xl md:text-2xl font-black ml-2 text-dark"
                  >NT$ {{ order.price.toLocaleString() }}</span
                >
              </div>
            </div>
          </div>
          <div
            class="w-full md:w-auto text-left md:text-right text-xs text-dark_700 space-y-1 border-t md:border-t-0 pt-4 md:pt-0"
          >
            <p>
              訂單編號 <span class="text-dark_900 font-mono">{{ order.order_id || order.id }}</span>
            </p>
            <p>
              訂單日期
              <span class="text-dark_900 font-mono">{{
                new Date(order.created_at).toLocaleDateString()
              }}</span>
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-[40px] mt-[40px]">
          <template v-if="!isTicket">
            <div class="rounded-[20px] border border-gray-300 p-5 md:p-6">
              <p class="text-xs font-bold text-main_800 mb-2">入住</p>
              <p class="text-lg md:text-xl font-bold">
                {{ order.check_in_date || order.date?.split(' ')[0] }}
              </p>
            </div>
            <div class="rounded-[20px] border border-gray-300 p-5 md:p-6">
              <p class="text-xs font-bold text-main_800 mb-2">退房</p>
              <p class="text-lg md:text-xl font-bold">{{ order.check_out_date || '-' }}</p>
            </div>
          </template>
          <template v-else>
            <div
              class="rounded-[20px] border border-gray-300 p-5 md:p-6 sm:col-span-2 md:col-span-2"
            >
              <p class="text-xs font-bold text-main_800 mb-2">日期</p>
              <p class="text-lg md:text-xl font-bold">
                {{ order.check_in_date || order.date?.split(' ')[0] }}
              </p>
            </div>
          </template>

          <div class="rounded-[20px] bg-main_100 p-5 md:p-6 sm:col-span-2 md:col-span-1">
            <p class="text-xs font-bold text-main_800 mb-2">{{ isTicket ? '方案' : '房型' }}</p>
            <p class="text-lg md:text-xl font-bold">{{ order.room_type || order.subtitle }}</p>
          </div>
        </div>
      </section>

      <div
        class="grid grid-cols-1 lg:grid-cols-3 gap-5 p-5 lg:p-10 bg-white border border-gray-300 rounded-[20px] shadow-sm"
      >
        <div class="lg:col-span-2 space-y-10 md:space-y-14">
          <section>
            <h2 class="text-lg md:text-xl font-black mb-10">訂購人資訊</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <div class="space-y-1">
                <p class="text-dark_700 text-xs uppercase">姓名</p>
                <p class="font-bold text-base">{{ (order as any).contact_name || 'N/A' }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-dark_700 text-xs uppercase">電子郵件</p>
                <p class="font-bold text-base break-all">{{ order.contact_email || 'N/A' }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-dark_700 text-xs uppercase">電話</p>
                <p class="font-bold text-base">{{ (order as any).contact_phone || 'N/A' }}</p>
              </div>
              <div class="space-y-1">
                <!-- Status -->
                <p class="text-dark_700 text-xs uppercase">狀態</p>
                <p class="font-bold text-base">{{ order.status }}</p>
              </div>
            </div>
          </section>

          <section>
            <!-- Map placeholder or functional map if implemented -->
            <!-- Functional Map -->
            <div
              v-if="mapUrl"
              class="w-full aspect-video rounded-[20px] bg-page flex items-center justify-center border border-gray-300 overflow-hidden"
            >
              <iframe
                width="100%"
                height="100%"
                style="border: 0"
                loading="lazy"
                allowfullscreen
                :src="mapUrl"
              ></iframe>
            </div>
            <div
              v-else
              class="w-full aspect-video rounded-[20px] bg-gray-100 flex items-center justify-center border border-gray-300 text-gray-400"
            >
              暫無地圖資訊
            </div>
          </section>
        </div>

        <div class="space-y-5">
          <!-- Keep facilities static for now as they are not in order object -->
          <template v-if="!isTicket">
            <section class="rounded-[20px] border border-gray-300 p-5">
              <h3 class="font-bold mb-4 text-dark">房間設施</h3>
              <p class="text-sm leading-relaxed text-dark_700">
                牙刷、牙膏、洗手乳、沐浴乳、洗髮乳、冷氣、暖氣、浴缸、乾濕分離浴室、香皂、浴帽、梳子、毛巾、浴巾、拋棄式拖鞋、吹風機、冰箱、水、茶包、濾掛式咖啡、杯子、無線網路、有線網路插槽、110V插座、USB插座、Netflix、Disney+
              </p>
            </section>

            <section class="rounded-[20px] bg-main_100 p-5">
              <h3 class="font-bold mb-4 text-dark">住宿付費提供</h3>
              <p class="text-sm text-dark_700">洗衣機、冰箱內飲料(瓶裝水免費)</p>
            </section>
          </template>

          <section class="rounded-[20px] border border-gray-300 p-5 bg-white shadow-sm">
            <!-- Keep Transport links -->
            <div class="flex items-center gap-5 mb-8">
              <!-- <img src="../assets/logoIcon.svg" alt="WanTrip Logo" class="w-20 h-20" />  Use text if img missing -->
              <h3 class="font-bold text-xl text-dark tracking-wide">交通訂票</h3>
            </div>

            <div class="space-y-3">
              <a
                href="https://irs.thsrc.com.tw/IMINT/"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center justify-between p-4 rounded-xl border border-primary/5 bg-main_100 hover:bg-white hover:border-main_800/50 hover:shadow-md transition-all duration-300"
              >
                <div class="flex items-center gap-4">
                  <span class="text-2xl">🚄</span>
                  <div>
                    <p class="font-semibold text-primary/80">台灣高鐵 THSRC</p>
                    <p class="text-xs text-primary/40">Online Booking</p>
                  </div>
                </div>
              </a>

              <a
                href="https://www.railway.gov.tw/tra-tip-web/tip/tip001/tip121/query"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center justify-between p-4 rounded-xl border border-primary/5 bg-main_100 hover:bg-white hover:border-main_800/50 hover:shadow-md transition-all duration-300"
              >
                <div class="flex items-center gap-4">
                  <span class="text-2xl">🚇</span>
                  <div>
                    <p class="font-semibold text-primary/80">台灣鐵路 TRA</p>
                    <p class="text-xs text-primary/40">Online Booking</p>
                  </div>
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>

      <div class="mt-[60px] flex flex-col sm:flex-row justify-center gap-4">
        <router-link
          to="/profile"
          class="w-full sm:w-auto bg-primary text-white px-12 py-3 rounded-full font-bold hover:bg-main transition-all active:scale-95 shadow-sm text-center"
        >
          回到訂單列表
        </router-link>
        <router-link
          to="/"
          class="w-full sm:w-auto bg-white border border-gray-300 text-dark px-12 py-3 rounded-full font-bold hover:bg-gray-50 transition-all active:scale-95 shadow-sm text-center"
        >
          回到首頁
        </router-link>
      </div>
    </div>
    <div v-else class="text-center py-20">
      <p v-if="errorMsg" class="text-red-500 text-xl">{{ errorMsg }}</p>
      <p v-else>讀取訂單資料中...</p>
    </div>
  </main>
</template>
