<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const isVisible = ref(false);

// 判斷是否為 In-App Browser (LINE, IG, FB)
const checkInAppBrowser = () => {
  const nav = navigator as Navigator & { vendor?: string };
  const win = window as Window & { opera?: string };
  const ua = nav.userAgent || nav.vendor || win.opera || '';
  return /Line|Instagram|FBAN|FBAV/i.test(ua);
};

const handleClose = () => {
  gsap.to(".notice-container", {
    y: 50,
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      isVisible.value = false;
    }
  });
};

onMounted(() => {
  if (checkInAppBrowser()) {
    isVisible.value = true;
    // 進場動畫：從下方彈入
    setTimeout(() => {
      gsap.from(".notice-container", {
        y: 100,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    }, 100);
  }
});
</script>

<template>
  <div v-if="isVisible"
       class="notice-container fixed bottom-10 left-1/2 -translate-x-1/2 w-[92%] max-w-[500px] z-[9999]
              bg-white border-2 border-[#f07d85] rounded-lg p-5 shadow-2xl">

    <div class="flex flex-col items-start gap-4">
      <p class="text-gray-800 text-[15px] leading-relaxed m-0 text-left">
        若您需登入會員與購物車結帳，建議開啟預設瀏覽器享有更好的購物體驗！
      </p>

      <button
        @click="handleClose"
        class="text-gray-900 font-bold text-sm underline underline-offset-4 hover:text-gray-600 transition-colors"
      >
        關閉
      </button>
    </div>
  </div>
</template>
