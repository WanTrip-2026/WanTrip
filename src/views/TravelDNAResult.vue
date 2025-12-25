<template>
  <div
    class="w-full min-h-screen relative bg-page bg-cover bg-center"
    style="background-image: url('/src/assets/traveldna_img/IntroBg.png')"
  >
    <div class="absolute inset-0 w-full h-full bg-primary/50 backdrop-blur-sm"></div>
    <div class="relative z-10 flex flex-col items-center justify-center min-h-screen p-5">
      <div
        class="bg-white/20 backdrop-blur-md rounded-[20px] border border-white/30 p-5 m-24 shadow-xl max-w-md w-full"
      >
        <img
          src="/src/assets/traveldna_img/ResultTest.png"
          alt="Result"
          class="w-full mb-5 mx-auto"
        />
        <p class="text-white text-lg font-bold tracking-wider text-center mb-10 drop-shadow-lg">
          🎫 推薦票券：六福村一日券、 溯溪體驗活動
        </p>
        <div class="flex gap-5 justify-center flex-wrap">
          <button
            class="bg-primary hover:bg-primary_hover text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition"
          >
            儲存結果
          </button>
          <button
            @click="goToIntro"
            class="bg-primary hover:bg-primary_hover text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition"
          >
            再測一次
          </button>
          <button
            class="bg-primary hover:bg-primary_hover text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition"
          >
            邀請朋友測驗
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goToIntro = () => {
  router.push('/travelDNAintro')
}
</script>
