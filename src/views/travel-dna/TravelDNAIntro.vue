<template>
  <div
    class="fixed inset-0 z-0 bg-page bg-cover bg-center"
    style="
      background-image: url('https://res.cloudinary.com/wantrip/image/upload/f_auto,q_90,w_2560,dpr_2/v1769236224/IntroBg_fji07v');
    "
  >
    <div class="absolute inset-0 w-full h-full bg-primary/50 backdrop-blur-sm"></div>
    <div class="relative z-10 flex flex-col items-center justify-center h-screen px-4">
      <h1 class="text-white text-4xl md:text-5xl font-bold text-center mb-5 drop-shadow-lg">
        ✨ 旅遊 DNA ✨
      </h1>
      <p class="text-white text-lg font-bold tracking-wider text-center mb-20 drop-shadow-lg">
        看看你的旅行基因會化身為誰！
      </p>

      <button
        @click="goToTravelDNA"
        class="bg-primary hover:bg-main text-white px-12 py-4 rounded-full text-xl font-bold shadow-lg transition animate-bounce"
      >
        ✈️ 出發 GoGo!
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const goToTravelDNA = () => {
  router.push('/travel-dna')
}
</script>

<style scoped></style>
