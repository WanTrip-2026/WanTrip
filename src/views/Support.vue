<template>
  <section class="min-h-screen bg-page pt-[96px] pb-10">
    <main class="max-w-[1200px] mx-auto flex flex-col gap-10 px-5 lg:px-0 mb-8">
      <div class="bg-primary text-white p-10 text-2xl font-bold">
        歡迎來到幫助中心，我們可以如何幫助您？
      </div>
      <div class="bg-white p-5 rounded-[20px] shadow-sm border border-gray-300">
        <h3 class="text-xl font-bold text-gray-900 mb-5">熱門常見問題</h3>
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
            <div v-show="activeIndex === index" class="p-5 bg-white text-sm text-gray-700">
              {{ faq.answer }}
            </div>
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
              @click="toggleFaq(index)"
              class="w-full flex justify-between items-center p-5 bg-[#EEF2F7] hover:bg-[#98BAE3] transition text-left"
            >
              <span class="font-medium text-gray-800">{{ paymentfaq.question }}</span>
              <span
                class="text-gray-400 transform transition-transform duration-200"
                :class="{ 'rotate-180': activeIndex === index }"
                >▼</span
              >
            </button>
            <div v-show="activeIndex === index" class="p-5 bg-white text-sm text-gray-700">
              {{ paymentfaq.answer }}
            </div>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const faqs = ref([
  { question: '無法登入 WanTrip ，怎麼辦？', answer: '回答...' },
  { question: '找不到訂單怎麼辦？', answer: '回答...' },
  { question: '問題三', answer: '回答...' },
])

const paymentfaqs = ref([
  { question: '在 WanTrip 付款是否安全？', answer: '回答...' },
  { question: '若付款方式已停用或信用卡失效，退款怎麼處理？', answer: '回答...' },
])

const activeIndex = ref<number | null>(null)

const toggleFaq = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<style>
body {
  background-color: #f8fdff;
}
</style>
