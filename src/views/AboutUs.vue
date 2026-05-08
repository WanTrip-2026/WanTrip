<template>
  <div class="relative min-h-screen bg-white">
    <div class="absolute top-0 left-0 w-full h-[500px] overflow-hidden">
      <video autoplay muted loop playsinline class="w-full h-full object-cover">
        <source src="https://res.cloudinary.com/wantrip/video/upload/v1769573809/614834964.757857_2_ezwlv3.mov"
          type="video/mp4" />
      </video>
      <div class="absolute inset-0 bg-black/10"></div>
    </div>

    <main class="relative z-10 mx-auto max-w-[1240px] px-5">
      <div class="pt-32 pb-20">
        <section class="flex justify-center animate-hero-in mb-32">
          <div
            class="bg-white/10 backdrop-blur-2xl border border-white/30 p-10 md:p-16 rounded-30 shadow-2xl text-center max-w-3xl w-full">
            <h1 class="text-white text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
              WanTrip
            </h1>
            <p class="text-white/95 text-xl md:text-2xl tracking-[0.25em] leading-relaxed">
              重新發現這片土地<br class="md:hidden" />
              <span class="mt-2 block">找回旅行的初心</span>
            </p>
          </div>
        </section>

        <section v-appear class="flex justify-center mb-16">
          <div class="w-full text-center bg-white/40 backdrop-blur-md p-10 md:p-20">
            <h2 class="text-3xl md:text-4xl font-bold text-primary mb-10">
              關於 WanTrip
              <span class="block w-12 h-1 bg-accent rounded-full mx-auto mt-4"></span>
            </h2>
            <div class="space-y-8">
              <p class="text-2xl md:text-3xl text-primary font-semibold leading-relaxed mb-24">
                懂你的每一次出發，無論遠方或家鄉。
              </p>
              <div class="bg-white/50 p-10 my-20 rounded-30 shadow-inner shadow-primary/25 max-w-4xl mx-auto">
                <p class="text-lg text-gray-600 leading-relaxed tracking-wider">
                  在 <span class="text-primary font-bold text-xl mx-1">WanTrip</span> 的心中，<br class="hidden md:block">
                  旅行從來不只是「一個房門號碼」或「一張入場票券」，而是那些閃閃發光的時刻。<br class="hidden md:block">
                  我們深知每一段旅程都承載著您的期待與夢想。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section v-appear class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-40">
          <div
            class="group relative h-[500px] md:h-[550px] overflow-hidden rounded-30 shadow-2xl border border-white/10">
            <img src="https://res.cloudinary.com/wantrip/image/upload/v1768478823/%E6%AD%A6%E5%B6%BA3_ba69ea.jpg"
              alt="山間美景" class="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              loading="lazy" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10">
              <div
                class="self-start px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm mb-4 border border-white/30">
                🗺️ 台灣之美</div>
              <h3 class="text-white text-3xl font-bold mb-4">旅行不一定要遠行</h3>
              <p class="text-white/70 text-lg font-light">可能是花蓮山海間的一抹晨曦，或台南巷弄裡的百年茶香。我們致力挖掘台灣每一處角落的溫度。</p>
            </div>
          </div>
          <div
            class="group relative h-[500px] md:h-[550px] overflow-hidden rounded-30 shadow-2xl border border-white/10">
            <img
              src="https://res.cloudinary.com/wantrip/image/upload/v1767682689/%E9%A3%AF%E5%BA%97%E5%A4%96%E8%A7%80_y7xe12.jpg"
              alt="飯店度假" class="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              loading="lazy" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10">
              <div
                class="self-start px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm mb-4 border border-white/30">
                ✨ 溫柔對待</div>
              <h3 class="text-white text-3xl font-bold mb-4">每一種旅行，都值得被珍惜</h3>
              <p class="text-white/70 text-lg font-light">無論是環島冒險，還是飯店度假。我們準備了多樣選擇，成就您專屬的回憶。</p>
            </div>
          </div>
        </section>

        <section v-appear class="pb-20">
          <div class="flex flex-col items-center mb-16">
            <h2 class="text-3xl font-bold text-primary mb-4">核心團隊</h2>
            <div class="w-12 h-1 bg-accent rounded-full"></div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="member in team" :key="member.name"
              class="bg-white p-8 rounded-20 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-50 group text-center">
              <div class="relative w-32 h-32 mx-auto mb-6">
                <div
                  class="absolute inset-0 bg-primary/20 rounded-full rotate-6 group-hover:rotate-12 transition-transform duration-500">
                </div>
                <img :src="member.avatar"
                  class="relative w-full h-full object-cover rounded-full border-4 border-white shadow-lg" />
              </div>
              <div class="flex justify-center mb-1">
                <div class="inline-flex items-center gap-2">
                  <h4 class="text-xl font-bold text-primary">{{ member.name }}</h4>

                  <a v-if="member.github" :href="member.github" target="_blank" rel="noopener noreferrer"
                    class="text-primary hover:text-main transition-colors duration-300 flex items-center">
                    <font-awesome-icon :icon="['fab', 'github']" class="text-lg" />
                  </a>
                </div>
              </div>
              <p class="text-primary/60 font-bold text-xs tracking-widest mb-4 uppercase">{{ member.role }}</p>
              <p class="text-gray-500 text-sm leading-relaxed">{{ member.bio }}</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface TeamMember {
  name: string
  role: string
  avatar: string
  bio: string
  github?: string
}

const observerMap = new WeakMap<HTMLElement, IntersectionObserver>();

const vAppear = {
  mounted: (el: HTMLElement) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)';

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    // 將 observer 存入 WeakMap，以 el 為 key
    observerMap.set(el, observer);
    observer.observe(el);
  },

  beforeUnmount: (el: HTMLElement) => {
    // 從 WeakMap 取得對應的 observer 並斷開連線
    const observer = observerMap.get(el);
    if (observer) {
      observer.disconnect();
      observerMap.delete(el);
    }
  },
}

const team = ref<TeamMember[]>([
  { name: '陳仟龍', github: 'https://github.com/chenchienlung/', role: 'Founder', avatar: 'https://res.cloudinary.com/wantrip/image/upload/w_200,c_fill,f_auto,q_auto/v1769568878/%E9%99%B3%E4%BB%9F%E9%BE%8D_%E4%B8%BB%E9%AB%94_1_1_svb7iu', bio: '專注於創造讓人一眼心動的視覺旅遊體驗與細節。' },
  { name: '彭奕翔', github: 'https://github.com/andypeng1416', role: 'Founder', avatar: 'https://res.cloudinary.com/wantrip/image/upload/w_200,c_fill,f_auto,q_auto/v1769568087/18_%E5%BD%AD%E5%A5%95%E7%BF%94_zcleku.webp', bio: '擅長挖掘巷弄美食與在地職人的動人生活美學。' },
  { name: '莊珈毓', github: 'https://github.com/B616G', role: 'Founder', avatar: 'https://res.cloudinary.com/wantrip/image/upload/w_200,c_fill,f_auto,q_auto/v1769568087/S__115097610_cfnchp.webp', bio: '用技術連結每一份對旅行的熱情，讓預約更簡單。' },
  { name: '顏文琳', github: 'https://github.com/yencarol', role: 'Founder', avatar: 'https://res.cloudinary.com/wantrip/image/upload/w_200,c_fill,f_auto,q_auto/v1769568087/S__106119214_p5sgmm.webp', bio: '資深旅行家，熱愛台灣每一寸土地的溫度與故事。' },
])
</script>

<style scoped>
.animate-hero-in {
  animation: heroUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes heroUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
