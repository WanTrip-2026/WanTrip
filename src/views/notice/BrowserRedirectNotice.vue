<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const isVisible = ref(false);
const STORAGE_KEY = 'wantrip_redirect_notice_dismissed';

const isTestMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('test') === '1';

// 判斷是否為 In-App Browser (LINE, IG, FB)
const checkInAppBrowser = () => {
  const nav = navigator as Navigator & { vendor?: string };
  const win = window as Window & { opera?: string };
  const ua = nav.userAgent || nav.vendor || win.opera || '';
  return /Line|Instagram|FBAN|FBAV/i.test(ua);
};

const handleClose = () => {
  // 記錄使用者已關閉，下次不再顯示
  localStorage.setItem(STORAGE_KEY, 'true');

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
  const isDismissed = localStorage.getItem(STORAGE_KEY) === 'true';

  // 如果是測試模式，或者是在 In-App Browser 且尚未被關閉過
  if (isTestMode || (checkInAppBrowser() && !isDismissed)) {
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
       class="notice-container fixed bottom-[86px] left-1/2 -translate-x-1/2 w-[calc(100%-40px)] md:max-w-[500px] z-[9999]
              bg-white/80 backdrop-blur-sm rounded-[32px] p-5 shadow-2xl">

    <div class="flex flex-col items-start gap-4">
      <p class="text-gray-800 text-base leading-relaxed m-0 text-left">
        若您需登入會員與購物車結帳，建議開啟預設瀏覽器享有更好的購物體驗！
      </p>

      <button
        @click="handleClose"
        class="text-white bg-primary px-6 py-2 font-bold text-base rounded-full hover:bg-main transition-colors"
      >
        關閉
      </button>
    </div>
  </div>
</template>
