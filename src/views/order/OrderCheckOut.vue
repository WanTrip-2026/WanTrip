<script setup lang="ts">
import { computed, reactive, ref, nextTick } from 'vue'
import axios from 'axios'

type PaymentKey = 'atm' | 'credit' | 'applepay' | 'googlepay' | 'linepay' | 'jkopay'

import iconVisa from '@/assets/pay_img/visa-classic-svgrepo-com.svg'
import iconMastercard from '@/assets/pay_img/mastercard-svgrepo-com.svg'
import iconJcb from '@/assets/pay_img/jcb-svgrepo-com.svg'
// import iconAmex from '@/assets/pay_img/amex-svgrepo-com.svg'
import iconApplePay from '@/assets/pay_img/apple-pay-svgrepo-com.svg'
import iconLinePay from '@/assets/pay_img/LINE_Pay_logo_(2019).svg.png'
import iconJkoPay from '@/assets/pay_img/uBKC2XeyRaWsA2sgjVFxTohcqQi6mmypd0MMWxdI.png'

const selectedPayment = ref<PaymentKey | ''>('');
const isProcessing = ref(false);

const product = reactive({
  title: 'WanTrip 精選行程',
  subtitle: '台北一日遊 - 深入在地文化',
  date: '2025/01/02 09:00 - 18:00',
  note: '含免排隊 / 電子憑證',
})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  coupon: '',
})

const price = reactive({
  subtotal: 1200,
  discount: 0,
})

const total = computed(() => Math.max(price.subtotal - price.discount, 0))

const handleCheckout = async () => {
  if (!selectedPayment.value || isProcessing.value) return;

  isProcessing.value = true;

  // 綠界 AIO 支援多種付款方式
  const ecpayMethods = ['credit', 'atm', 'applepay', 'jkopay', '711', 'familymart', 'ipass money'];

  if (ecpayMethods.includes(selectedPayment.value)) {
    await startAioPayment();
  } else if (selectedPayment.value === 'linepay') {
    await startLinePay();
  } else {
    alert('尚不支援此付款方式');
    isProcessing.value = false;
  }
};

const startAioPayment = async () => {
  try {
    isProcessing.value = true;
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const response = await axios.post(`${apiBaseUrl}/payment/get-aio-params`, {
      amount: total.value,
      paymentMethod: selectedPayment.value // 傳送關鍵字如 'credit', 'atm'
    });

    if (!response.data.success) {
      throw new Error(response.data.message || '取得支付參數失敗');
    }

    const params = response.data.data;
    const actionUrl = params.actionUrl;

    const paymentForm = document.createElement('form');
    paymentForm.method = 'POST';
    paymentForm.action = actionUrl;
    paymentForm.style.display = 'none';

    Object.keys(params).forEach(key => {
      if (key !== 'actionUrl') {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = params[key];
        paymentForm.appendChild(input);
      }
    });

    document.body.appendChild(paymentForm);
    paymentForm.submit();

    nextTick(() => {
      if (document.body.contains(paymentForm)) {
        document.body.removeChild(paymentForm);
      }
    });

  } catch (error: any) {
    console.error('綠界結帳失敗:', error);
    alert(error.response?.data?.message || '系統連線異常，請檢查伺服器狀態');
    isProcessing.value = false;
  }
};

const startLinePay = async () => {
  try {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const paymentPayload = {
      amount: total.value,
      productName: product.title,
    };

    const response = await axios.post(`${apiBaseUrl}/payment/linepay/request`, paymentPayload);

    if (response.data.returnCode === '0000') {
      const paymentUrl = response.data.info.paymentUrl.web;
      window.location.href = paymentUrl;
    } else {
      alert(`LINE Pay 請求失敗：${response.data.returnMessage}`);
      isProcessing.value = false;
    }
  } catch (error: any) {
    console.error('Line Pay 請求失敗:', error);
    const errorMsg = error.response?.data?.message || '系統連線異常，請檢查後端是否啟動';
    alert(errorMsg);
    isProcessing.value = false;
  }
};

const paymentOptions: Array<{
  key: PaymentKey
  label: string
  icons: Array<{ src: string; alt: string; large?: boolean }>
}> = [
    {
      key: 'credit',
      label: '信用卡 | ATM轉帳 | Apple Pay | 街口支付',
      icons: [
        { src: iconVisa, alt: 'VISA', large: true },
        { src: iconMastercard, alt: 'Mastercard', large: true },
        { src: iconJcb, alt: 'JCB', large: true },
        // { src: iconAmex, alt: 'AMEX', large: true },
        { src: iconApplePay, alt: 'Apple Pay', large: true },
        { src: iconJkoPay, alt: '街口支付' },
      ],
    },
    { key: 'linepay', label: 'Line Pay', icons: [{ src: iconLinePay, alt: 'LINE Pay' }] },
  ]

function applyCoupon() {
  if (form.coupon.trim().toUpperCase() === 'WANTRIP200') price.discount = 200
  else price.discount = 0
}
</script>

<template>
  <div
    class="fixed top-20 left-0 right-0 z-50 mx-5 rounded-[20px] border border-gray-300 bg-white px-4 py-3 shadow-sm lg:hidden">
    <div class="mx-auto flex max-w-[1200px] justify-between items-start text-sm">
      <div class="flex flex-col gap-1">
        <span class="font-bold text-xl">{{ product.title }}</span>
        <span class="text-dark_700 text-sm">優惠</span>
        <span class="font-bold text-dark text-xl">總價</span>
      </div>
      <div class="flex flex-col items-end self-end gap-1">
        <span class="text-dark_700 text-sm">- NT$ {{ price.discount }}</span>
        <span class="font-bold text-dark text-xl">總價 NT$ {{ total }}</span>
      </div>
    </div>
  </div>

  <div class="w-full min-h-screen">
    <div class="mx-auto max-w-[1240px] px-5 pt-[200px] pb-10 lg:pt-24">
      <div class="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
        <div class="flex flex-col gap-5">
          <section class="rounded-[20px] border border-gray-300 bg-white p-5 shadow-sm">
            <h2 class="text-xl font-semibold text-dark">商品資訊</h2>
            <div class="mt-5 flex gap-5">
              <div
                class="flex h-22 w-[140px] items-center justify-center rounded-[20px] border border-gray-300 bg-black/5 text-sm text-black/40">
                image</div>
              <div class="min-w-0">
                <div class="text-base text-dark font-bold leading-snug">{{ product.title }}</div>
                <div class="mt-1 line-clamp-2 text-sm text-dark_500">{{ product.subtitle }}</div>
                <div class="mt-1 text-sm text-dark_500">{{ product.date }}</div>
                <div class="text-sm text-dark_500">{{ product.note }}</div>
              </div>
            </div>
          </section>

          <section class="rounded-[20px] border border-gray-300 bg-white p-5 shadow-sm">
            <h2 class="text-2xl font-semibold text-dark">訂購人資料</h2>
            <div class="mt-5 grid grid-cols-1 gap-y-5 gap-x-10 md:grid-cols-2">
              <div class="flex flex-col gap-3">
                <label class="text-sm text-black/60">姓名</label>
                <input v-model="form.name" type="text" placeholder="請輸入姓名"
                  class="h-[44px] rounded-[20px] border border-gray-300 px-4 text-sm outline-none focus:border-primary" />
              </div>
              <div class="flex flex-col gap-3">
                <label class="text-sm text-black/60">Email</label>
                <input v-model="form.email" type="email" placeholder="example@email.com"
                  class="h-[44px] rounded-[20px] border border-gray-300 px-4 text-sm outline-none focus:border-primary" />
              </div>
              <div class="flex flex-col gap-3 md:col-span-2">
                <label class="text-sm text-black/60">電話</label>
                <input v-model="form.phone" type="tel" placeholder="09xx-xxx-xxx"
                  class="h-[44px] rounded-[20px] border border-gray-300 px-4 text-sm outline-none focus:border-primary md:max-w-[420px]" />
              </div>
            </div>
          </section>

          <section class="rounded-[20px] border border-gray-300 bg-white p-5 shadow-sm">
            <h2 class="text-2xl font-semibold text-dark">優惠</h2>
            <div class="mt-5 flex flex-col gap-5 md:flex-row md:items-end">
              <div class="flex flex-1 flex-col gap-3">
                <label class="text-sm text-dark">優惠代碼</label>
                <input v-model="form.coupon" type="text" placeholder="輸入優惠碼"
                  class="h-[44px] rounded-[20px] border border-gray-300 px-4 text-sm outline-none focus:border-primary" />
              </div>
              <button type="button" @click="applyCoupon"
                class="h-[44px] rounded-[20px] border border-gray-300 bg-white px-6 text-sm text-dark_700 transition hover:bg-main_100 active:scale-[0.99]">套用</button>
            </div>
            <div class="mt-4 text-sm text-dark_500">範例：輸入 <span class="font-semibold">WANTRIP200</span> 折 200</div>
          </section>

          <section class="rounded-[20px] border border-gray-300 bg-white p-5 shadow-sm">
            <h2 class="text-2xl font-semibold text-dark">選擇付款方式</h2>

            <div class="mt-5 flex flex-col gap-5">
              <label v-for="option in paymentOptions" :key="option.key"
                class="flex h-[60px] cursor-pointer items-center justify-between overflow-hidden rounded-full border border-gray-300 px-4 transition hover:bg-main_100">
                <div class="flex items-center gap-3">
                  <input type="radio" name="pay" :value="option.key" v-model="selectedPayment"
                    class="h-5 w-5 rounded-full accent-black" />
                  <div class="flex flex-col gap-0">
                    <span class="text-base font-medium text-dark_900">{{ option.label }}</span>
                    <p v-if="['credit', 'atm', 'applepay', 'jkopay'].includes(option.key)"
                      class="text-xs text-dark_500 mt-1">
                      由綠界科技 ECPay 提供的安全支付服務
                    </p>
                  </div>
                </div>
                <div class="flex h-full items-center gap-3">
                  <img v-for="icon in option.icons" :key="icon.src" :src="icon.src" :alt="icon.alt"
                    class="block w-auto shrink-0 object-contain" :class="icon.large ? 'h-9' : 'h-4'" />
                </div>
              </label>
            </div>

            <button @click="handleCheckout" :disabled="!selectedPayment || isProcessing"
              class="mt-6 w-full rounded-full bg-primary hover:bg-main py-4 text-white font-bold transition disabled:bg-gray-400 disabled:cursor-not-allowed">
              <span v-if="isProcessing">處理中，請稍候...</span>
              <span v-else>立即結帳</span>
            </button>
          </section>
        </div>

        <aside class="hidden h-fit lg:block lg:sticky lg:top-[100px]">
          <section class="rounded-[20px] border border-black/10 bg-white p-5">
            <h2 class="text-2xl font-semibold text-dark_900">費用明細</h2>
            <div class="mt-5 flex flex-col gap-5 text-sm">
              <div class="flex items-center justify-between">
                <span class="text-dark_700">商品費用</span>
                <span class="font-medium text-dark_700">NT$ {{ price.subtotal }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-black/70">優惠</span>
                <span class="font-medium text-red-700">- NT$ {{ price.discount }}</span>
              </div>
              <div class="my-2 h-px bg-gray-300" />
              <div class="flex items-center justify-between text-2xl">
                <span class="font-semibold text-dark_500">總計</span>
                <span class="font-semibold text-primary">NT$ {{ total }}</span>
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
