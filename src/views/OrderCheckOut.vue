<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import iconVisa from '@/assets/pay_img/visa-classic-svgrepo-com.svg'
import iconMastercard from '@/assets/pay_img/mastercard-svgrepo-com.svg'
import iconJcb from '@/assets/pay_img/jcb-svgrepo-com.svg'
import iconAmex from '@/assets/pay_img/amex-svgrepo-com.svg'
import iconApplePay from '@/assets/pay_img/apple-pay-svgrepo-com.svg'
import iconGooglePay from '@/assets/pay_img/google-pay-svgrepo-com.svg'
import iconLinePay from '@/assets/pay_img/LINE_Pay_logo_(2019).svg.png'
import iconJkoPay from '@/assets/pay_img/uBKC2XeyRaWsA2sgjVFxTohcqQi6mmypd0MMWxdI.png'

type PaymentKey = 'atm' | 'credit' | 'applepay' | 'googlepay' | 'linepay' | 'jkopay'

const product = reactive({
  title: 'Title',
  subtitle: '商品名稱',
  date: '2025/01/02 XX:00 - XX:00',
  note: '含免排隊 / 電子憑證',
})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  coupon: '',
})

const selectedPayment = ref<PaymentKey>('atm')

const price = reactive({
  subtotal: 1200,
  discount: 0,
})

const total = computed(() => Math.max(price.subtotal - price.discount, 0))

function applyCoupon() {
  if (form.coupon.trim().toUpperCase() === 'WANTRIP200') price.discount = 200
  else price.discount = 0
}

function submitOrder() {
  const payload = {
    product,
    form,
    payment: selectedPayment.value,
    total: total.value,
  }
  console.log('[checkout submit]', payload)
  alert('已送出（示範）')
}
</script>

<template>
  <div class="w-full min-h-screen bg-[#f7fbfb]">
    <div class="max-w-[1200px] mx-auto px-4 pt-[100px] pb-[40px]">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        <!-- Left -->
        <div class="flex flex-col gap-10">
          <!-- 商品資訊 -->
          <section class="bg-white rounded-[20px] border border-black/10 p-5">
            <h2 class="text-[24px] font-semibold">商品資訊</h2>

            <div class="mt-[20px] flex gap-5">
              <div
                class="w-[140px] h-[88px] rounded-[20px] border border-black/10 bg-black/5 flex items-center justify-center text-black/40 text-sm"
              >
                image
              </div>

              <div class="min-w-0">
                <div class="font-semibold text-[16px] leading-snug">
                  {{ product.title }}
                </div>

                <div class="text-[13px] text-black/60 mt-1 line-clamp-2">
                  {{ product.subtitle }}
                </div>

                <div class="text-[12px] text-black/50 mt-2">
                  {{ product.date }}
                </div>

                <div class="text-[12px] text-black/50">
                  {{ product.note }}
                </div>
              </div>
            </div>
          </section>

          <!-- 訂購人資料 -->
          <section class="bg-white rounded-[20px] border border-black/10 p-5">
            <h2 class="text-[24px] font-semibold">訂購人資料</h2>

            <div class="mt-[20px] grid grid-cols-1 md:grid-cols-2 gap-10">
              <div class="flex flex-col gap-3">
                <label class="text-[12px] text-black/60">姓名</label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="請輸入姓名"
                  class="h-[44px] rounded-[20px] border border-black/15 px-4 outline-none focus:border-black/40"
                />
              </div>

              <div class="flex flex-col gap-3">
                <label class="text-[12px] text-black/60">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="example@email.com"
                  class="h-[44px] rounded-[20px] border border-black/15 px-4 outline-none focus:border-black/40"
                />
              </div>

              <div class="flex flex-col gap-3 md:col-span-2">
                <label class="text-[12px] text-black/60">電話</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="09xx-xxx-xxx"
                  class="h-[44px] rounded-[20px] border border-black/15 px-4 outline-none focus:border-black/40 md:max-w-[420px]"
                />
              </div>
            </div>
          </section>

          <!-- 優惠 -->
          <section class="bg-white rounded-[20px] border border-black/10 p-5">
            <h2 class="text-[24px] font-semibold">優惠</h2>

            <div class="mt-[20px] flex flex-col md:flex-row gap-4 md:items-end">
              <div class="flex-1 flex flex-col gap-3">
                <label class="text-[12px] text-black/60">優惠代碼</label>
                <input
                  v-model="form.coupon"
                  type="text"
                  placeholder="輸入優惠碼"
                  class="h-[44px] rounded-[20px] border border-black/15 px-4 outline-none focus:border-black/40"
                />
              </div>

              <button
                type="button"
                @click="applyCoupon"
                class="h-[44px] px-6 rounded-[20px] border border-black/20 bg-white hover:bg-black/5 active:scale-[0.99] transition"
              >
                套用
              </button>
            </div>

            <div class="mt-4 text-[12px] text-black/50">
              範例：輸入 <span class="font-semibold">WANTRIP200</span> 折 200
            </div>
          </section>

          <section class="bg-white rounded-[20px] border border-black/10 p-5">
            <h2 class="text-[24px] font-semibold">選擇付款方式</h2>

            <div class="mt-[20px] flex flex-col gap-4">
              <!-- ATM -->
              <label class="pay-row">
                <div class="flex items-center gap-3">
                  <input
                    type="radio"
                    name="pay"
                    value="atm"
                    v-model="selectedPayment"
                    class="accent-black"
                  />
                  <span class="text-[14px] font-medium">ATM轉帳</span>
                </div>
                <div class="pay-right"></div>
              </label>

              <!-- 信用卡 -->
              <label class="pay-row">
                <div class="flex items-center gap-3">
                  <input
                    type="radio"
                    name="pay"
                    value="credit"
                    v-model="selectedPayment"
                    class="accent-black"
                  />
                  <span class="text-[14px] font-medium">信用卡</span>
                </div>

                <div class="pay-right">
                  <img :src="iconVisa" alt="VISA" class="pay-icon pay-icon--lg" />
                  <img
                    :src="iconMastercard"
                    alt="Mastercard"
                    class="pay-icon pay-icon--lg"
                  />
                  <img :src="iconJcb" alt="JCB" class="pay-icon pay-icon--lg" />
                  <img :src="iconAmex" alt="AMEX" class="pay-icon pay-icon--lg" />
                </div>
              </label>

              <!-- Apple Pay -->
              <label class="pay-row">
                <div class="flex items-center gap-3">
                  <input
                    type="radio"
                    name="pay"
                    value="applepay"
                    v-model="selectedPayment"
                    class="accent-black"
                  />
                  <span class="text-[14px] font-medium">Apple Pay</span>
                </div>

                <div class="pay-right">
                  <img :src="iconApplePay" alt="Apple Pay" class="pay-icon pay-icon--lg" />
                </div>
              </label>

              <!-- Google Pay -->
              <label class="pay-row">
                <div class="flex items-center gap-3">
                  <input
                    type="radio"
                    name="pay"
                    value="googlepay"
                    v-model="selectedPayment"
                    class="accent-black"
                  />
                  <span class="text-[14px] font-medium">Google Pay</span>
                </div>

                <div class="pay-right">
                  <img
                    :src="iconGooglePay"
                    alt="Google Pay"
                    class="pay-icon pay-icon--lg"
                  />
                </div>
              </label>

              <!-- Line Pay -->
              <label class="pay-row">
                <div class="flex items-center gap-3">
                  <input
                    type="radio"
                    name="pay"
                    value="linepay"
                    v-model="selectedPayment"
                    class="accent-black"
                  />
                  <span class="text-[14px] font-medium">Line Pay</span>
                </div>

                <div class="pay-right">
                  <img :src="iconLinePay" alt="LINE Pay" class="pay-icon" />
                </div>
              </label>

              <!-- 街口支付 -->
              <label class="pay-row">
                <div class="flex items-center gap-3">
                  <input
                    type="radio"
                    name="pay"
                    value="jkopay"
                    v-model="selectedPayment"
                    class="accent-black"
                  />
                  <span class="text-[14px] font-medium">街口支付</span>
                </div>

                <div class="pay-right">
                  <img :src="iconJkoPay" alt="街口支付" class="pay-icon" />
                </div>
              </label>
            </div>
          </section>

          <!-- 送出 -->
          <div class="flex justify-end">
            <button
              type="button"
              @click="submitOrder"
              class="h-[48px] px-8 rounded-full bg-primary text-white hover:opacity-90 active:scale-[0.99] transition"
            >
              確認付款
            </button>
          </div>
        </div>

        <!-- 費用明細 -->
        <aside class="lg:sticky lg:top-[100px] h-fit">
          <section class="bg-white rounded-[20px] border border-black/10 p-5">
            <h2 class="text-[24px] font-semibold">費用明細</h2>

            <div class="mt-[20px] flex flex-col gap-4 text-[14px]">
              <div class="flex items-center justify-between">
                <span class="text-black/70">商品費用</span>
                <span class="font-medium">NT$ {{ price.subtotal }}</span>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-black/70">優惠</span>
                <span class="font-medium text-black/70">- NT$ {{ price.discount }}</span>
              </div>

              <div class="h-px bg-black/10 my-2" />

              <div class="flex items-center justify-between text-[24px]">
                <span class="font-semibold">總計</span>
                <span class="font-semibold">NT$ {{ total }}</span>
              </div>

              <div class="text-[12px] text-black/50 mt-2">
                訂單總額包含（如適用）稅金 / 服務費 / 平台費等。
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pay-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 60px;
  padding: 0 16px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);

  cursor: pointer;
  transition: background 0.2s;
}

.pay-row:hover {
  background: rgba(0, 0, 0, 0.05);
}

.pay-right {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
}


.pay-icon {
  height: 16px;
  width: auto;
  display: block;
  object-fit: contain;
  flex-shrink: 0;
}

.pay-icon--lg {
  height: 36px;
}
</style>

