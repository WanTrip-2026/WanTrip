<template>
  <div class="w-full min-h-screen relative">
    <img
      src="/src/assets/traveldna_img/IntroBg.png"
      alt="Intro Background"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 w-full h-full bg-primary/50 backdrop-blur-sm"></div>
    <div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
      <h1 class="text-white text-4xl md:text-5xl font-bold text-center mb-5 drop-shadow-lg">
        ✨ 旅行 DNA ✨
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
