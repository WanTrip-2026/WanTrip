<template>
  <div class="w-full min-h-screen relative">
    <img
      src="/src/assets/traveldna_img/IntroBg.png"
      alt="Intro Background"
      class="absolute top-0 left-0 w-full h-full object-cover"
    />
    <div class="absolute top-0 left-0 w-full h-full bg-black/30"></div>
    <div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
      <h1 class="text-white text-5xl font-bold text-center mb-6">旅行 DNA</h1>
      <p class="text-white/80 text-lg font-bold text-center max-w-xl mb-10">
        看看你的旅行基因會化身為誰！
      </p>

      <button
        @click="goToTravelDNA"
        class="bg-primary hover:bg-primary_hover text-white px-12 py-4 rounded-full text-xl font-bold shadow-lg transition"
      >
        🚀 出發 GoGo!
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const goToTravelDNA = () => {
  router.push('/travelDNA') // 按鈕跳轉到測驗頁
}
</script>

<style scoped>
/* 如果需要可額外調整按鈕陰影或字體 */
</style>
