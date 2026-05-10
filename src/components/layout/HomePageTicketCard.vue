<template>
  <RouterLink :to="`/tickets/${id}`" :class="[
    'group relative flex h-[270px] w-[183px] lg:hover:w-[388px] z-[1] lg:hover:z-[20] bg-white rounded-24 lg:hover:rounded-30 overflow-hidden border border-gray-300 transition-all duration-500 ease-in-out cursor-pointer shadow-sm hover:shadow-xl flex-shrink-0',
    expandLeft ? 'lg:hover:-translate-x-[225px]' : '',
  ]">
    <div class="relative h-full w-[183px] flex-shrink-0">
      <img :src="getOptimizedImageUrl(image_url, { w: 600 })" :alt="name" class="h-full w-full object-cover"
        loading="lazy" />
      <div
        class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
        <h3 class="text-white font-bold text-base line-clamp-1 lg:text-lg">{{ name }}</h3>
        <p class="text-white/90 text-sm">NT$ {{ (price || 0).toLocaleString() }} /起</p>
      </div>
    </div>
    <div
      class="flex flex-col flex-1 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 w-full">
      <div class="flex-1">
        <h3 class="text-lg lg:text-xl font-bold text-black">{{ name }}</h3>
        <div class="flex text-dark-300">
          <span v-for="i in 5" :key="i" :class="{ 'text-amber-400': i <= (rating || 5) }">★</span>
        </div>
        <p class="text-dark-500 text-sm leading-relaxed">
          {{ category }}
        </p>
        <p class="text-dark-500 text-sm leading-relaxed">{{ city || address }}{{ address }}</p>
      </div>
      <div class="mt-auto text-nowrap">
        <div class="text-right mb-1 text-xs text-dark-500">
          <span class="text-red-500 font-bold text-lg">NT$ {{ (price || 0).toLocaleString() }}</span>
          /起
        </div>
        <div class="flex justify-end gap-3">
          <button aria-label="加入收藏" name="add-favorite" @click.stop.prevent="onFavoriteClick"
            class="p-2 rounded-full border border-gray-300 hover:bg-main-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-colors"
              :class="isFav ? 'text-red-500 fill-red-500' : 'text-dark-500'" :fill="isFav ? 'currentColor' : 'none'"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button aria-label="前往票券資訊頁" name="details" @click.stop="$emit('details', id)"
            class="h-10 bg-primary hover:bg-main text-white px-6 rounded-full font-medium transition-colors">
            了解更多
          </button>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import { getOptimizedImageUrl } from '@/utils/image'

// 統一命名規範與預設值
interface Props {
  id?: number | string
  name?: string
  image_url?: string
  price?: number
  city?: string
  category?: string
  date?: string
  address?: string
  rating?: number
  expandLeft?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
  name: '卡片名稱',
  image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
  price: 0,
  city: '',
  category: '',
  date: 'YYYY-MM-DD',
  address: '',
  rating: 5,
  expandLeft: false,
})

const favoriteStore = useFavoriteStore()
const authStore = useAuthStore()

const isFav = computed(() => {
  return props.id ? favoriteStore.isFavorite(props.id) : false
})

const onFavoriteClick = async () => {
  if (!authStore.isLoggedIn) {
    alert('請先登入會員以加入收藏')
    return
  }
  if (!props.id) {
    console.warn('Cannot add item with invalid ID to favorites.')
    return
  }
  try {
    await favoriteStore.toggleFavorite({
      id: props.id!,
      name: props.name!,
      imageUrl: props.image_url!,
      price: props.price!,
      city: props.city,
      category: props.category,
      date: props.date,
      address: props.address,
      rating: props.rating,
      type: 'ticket',
    })
  } catch {
    // Error handled in store
  }
}

defineEmits(['compare', 'favorite', 'details'])
</script>
