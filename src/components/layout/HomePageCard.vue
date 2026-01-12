<template>
  <div :class="[
    'group relative flex h-[270px] w-[183px] hover:w-[415px] hover:z-50 bg-white rounded-[20px] hover:rounded-[40px] overflow-hidden border border-gray-300 transition-all duration-500 ease-in-out cursor-pointer shadow-sm hover:shadow-xl flex-shrink-0',
    // 第一張向左展開的關鍵：透過負的 translate 位移
    expandLeft ? 'hover:-translate-x-[232px]' : ''
  ]">
    <div class="relative h-full w-[183px] flex-shrink-0">
      <img :src="imageUrl" :alt="productName" class="h-full w-full object-cover" />
      <div
        class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
        <h3 class="text-white font-bold text-base lg:text-lg">{{ productName }}</h3>
        <p class="text-white/90 text-sm">NT$ {{ (price || 0).toLocaleString() }} /起</p>
      </div>
      <div
        class="absolute bottom-[20px] right-[20px] flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
        <button @click.stop="$emit('compare', id)"
          class="flex items-center gap-1 bg-white/45 backdrop-blur-sm hover:bg-white px-4 py-2 rounded-full text-sm font-medium text-black shadow-sm">
          <span class="text-base">+</span> 加入比較
        </button>
      </div>
    </div>
    <div
      class="flex flex-col flex-1 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 min-w-[232px]">
      <div class="flex-1">
        <h3 class="text-lg lg:text-xl font-bold text-black">{{ productName }}</h3>
        <div class="flex text-zinc-300">
          <span v-for="i in 5" :key="i" :class="{ 'text-amber-400': i <= (rating || 5) }">★</span>
        </div>
        <p class="text-zinc-400 text-sm leading-relaxed">
          {{ venue || address }}
        </p>
      </div>
      <div class="mt-auto">
        <div class="text-right mb-1 text-xs text-dark_500">
          <span class="text-red-500 font-bold text-lg">NT$ {{ (price || 0).toLocaleString() }}</span> /起
        </div>
        <div class="flex justify-end gap-3">
          <button @click.stop="$emit('favorite', id)"
            class="p-2 rounded-full border border-gray-300 hover:bg-zinc-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-zinc-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button @click.stop="$emit('details', id)"
            class="h-10 bg-slate-800 hover:bg-black text-white px-6 rounded-full font-medium transition-colors">
            了解更多
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 統一命名規範與預設值
interface Props {
  id?: number | string;
  productName?: string;
  imageUrl?: string;
  price?: number;
  venue?: string;
  address?: string;
  rating?: number;
  expandLeft?: boolean;
}

withDefaults(defineProps<Props>(), {
  id: 0,
  productName: '商品名稱',
  imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
  price: 0,
  venue: '',
  address: '',
  rating: 5,
  expandLeft: false
});

defineEmits(['compare', 'favorite', 'details']);
</script>
