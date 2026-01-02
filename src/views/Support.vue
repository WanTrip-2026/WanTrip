<template>
  <section class="min-h-screen bg-page pt-[96px] pb-10">
    <header class="bg-primary text-white p-10 text-2xl font-bold mb-10">
      <h1 class="max-w-[1200px] mx-auto">歡迎來到幫助中心，我們可以如何幫助您？</h1>
    </header>
    <main class="max-w-[1200px] mx-auto flex flex-col gap-10 mb-8">
      <div class="bg-white p-5 rounded-[20px] shadow-sm border border-gray-300 lg:mx-0 mx-5">
        <h3 class="text-xl font-bold text-gray-900 mb-5">常見問題</h3>
        <div class="flex flex-col gap-5 space-y-2.5">
          <div v-for="(faq, index) in faqs" :key="index" class="border rounded-lg overflow-hidden">
            <button
              @click="toggleFaq(index)"
              class="w-full flex justify-between items-center p-5 bg-[#EEF2F7] hover:bg-[#98BAE3] transition text-left"
            >
              <span class="font-medium text-gray-800">{{ faq.question }}</span>
              <span
                class="text-gray-400 transform transition-transform duration-200"
                :class="{ 'rotate-180': activeIndex === index }"
                >▼</span
              >
            </button>
            <div
              v-show="activeIndex === index"
              class="p-5 bg-white text-sm text-gray-700"
              v-html="faq.answer"
            ></div>
          </div>
        </div>
      </div>
      <div class="bg-white p-5 rounded-[20px] shadow-sm border border-gray-300">
        <h3 class="text-xl font-bold text-gray-900 mb-5">付款問題</h3>
        <div class="flex flex-col gap-5 space-y-2.5">
          <div
            v-for="(paymentfaq, index) in paymentfaqs"
            :key="index"
            class="border rounded-lg overflow-hidden"
          >
            <button
              @click="togglePaymentFaq(index)"
              class="w-full flex justify-between items-center p-5 bg-[#EEF2F7] hover:bg-[#98BAE3] transition text-left"
            >
              <span class="font-medium text-gray-800">{{ paymentfaq.question }}</span>
              <span
                class="text-gray-400 transform transition-transform duration-200"
                :class="{ 'rotate-180': activePaymentFaqIndex === index }"
                >▼</span
              >
            </button>
            <div
              v-show="activePaymentFaqIndex === index"
              class="p-5 bg-white text-sm text-gray-700"
              v-html="paymentfaq.answer"
            ></div>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const faqs = ref([
  {
    question: '無法登入 WanTrip ，怎麼辦？',
    answer: `別擔心，我們整理了常見登入問題與對應解法：<br/>
    1. 請確認您輸入的帳號是否正確（手機號碼、Email 或第三方帳號）。<br/>
    2. 若忘記密碼，可點選<a href="/profile" class="text-primary underline font-bold hover:text-secondary">這裡重設密碼</a>。<br/>
    3. 如果仍無法登入，請清除瀏覽器快取或嘗試不同瀏覽器。<br/>
    <br/>
    若以上方法都無效，歡迎聯絡我們的客服團隊，我們會盡快協助您！<br/>`,
  },
  {
    question: '找不到訂單怎麼辦？',
    answer: `別擔心，您可以在登入後：<br/>
    1. 前往<a href="/profile" class="text-primary underline font-bold hover:text-secondary">我的訂單</a>頁面查詢已付款的訂單。<br/>
    2. 確認訂單是否使用其他帳號或電子郵件下單。<br/>
    3. 若訂單仍未找到，請準備訂單號或付款憑證聯絡客服。<br/>
    <br/>
    我們會協助您追蹤訂單並解決問題！<br/>`,
  },
  {
    question: '信箱/郵件沒有收到訂單資訊怎麼辦？',
    answer: `建議：<br/>
1.檢查垃圾信夾與容量<br/>
2.確認訂單郵箱正確<br/>
3.將 Wantrip 郵件加入白名單<br/>
<br/>
若仍未收到，聯絡線上客服重新發送。<br/>`,
  },
])

const paymentfaqs = ref([
  {
    question: '在 WanTrip 付款是否安全？',
    answer: `在 WanTrip 付款是安全的，我們採用國際認證的加密技術來保護您的資料與交易安全。<br/>
    我們合作的支付平台皆符合 PCI-DSS 標準，確保您的信用卡資訊不會外洩。<br/>
    <br/>
    若您有任何疑慮，歡迎聯絡客服，我們將提供詳細說明。<br/>`,
  },
  {
    question: '若付款方式已停用或信用卡失效，退款怎麼處理？',
    answer: `若付款方式已停用或信用卡失效，我們會嘗試將退款退回原付款方式。<br/>
    若退款失敗，系統會通知您更新有效付款資訊，或者提供其他退款方式。<br/>
    <br/>
    請確保您聯絡資料正確，我們會盡快完成退款處理。<br/>`,
  },
])

const activeIndex = ref<number | null>(null)
const activePaymentFaqIndex = ref<number | null>(null)

const toggleFaq = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
const togglePaymentFaq = (index: number) => {
  activePaymentFaqIndex.value = activePaymentFaqIndex.value === index ? null : index
}
</script>

<style>
body {
  background-color: #f8fdff;
}
</style>
