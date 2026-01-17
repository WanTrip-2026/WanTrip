<script setup lang="ts">
// 帶入假資料
const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
})

import { computed } from 'vue'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useAuthStore } from '@/stores/auth'

const favoriteStore = useFavoriteStore()
const authStore = useAuthStore()

const isFav = computed(() => {
  return favoriteStore.isFavorite(props.ticket.id)
})

const onFavoriteClick = async () => {
  if (!authStore.isLoggedIn) {
     alert('請先登入會員以加入收藏')
     return
  }
  try {
    await favoriteStore.toggleFavorite({
        id: props.ticket.id,
        name: props.ticket.name,
        imageUrl: props.ticket.image_url || '',
        price: props.ticket.price,
        city: props.ticket.city, // Assuming ticket has city or similar?
        type: 'ticket',
        rating: 4.5 // Mock rating? Ticket might not have star_rating
    })
  } catch {
    // API error
  }
}
</script>

<template>
  <div>
    <div
      class="w-[280px] rounded-[20px] border bg-white border-gray-300 transition-all shadow-sm hover:shadow-lg overflow-hidden">
      <RouterLink :to="`/tickets/${props.ticket.id}`" class="w-full h-full flex flex-col gap-2">
        <div class="w-full">
          <img :src="props.ticket.image_url" :alt="props.ticket.name" class="w-full h-full object-cover" />
        </div>

        <!-- 內容 -->
        <div class="flex-1 flex flex-col justify-between px-4 py-2 w-full">
          <div class="flex flex-col gap-1">
          <div class="flex flex-row gap-1 items-baseline justify-between">
              <h3 class="text-xl font-bold text-dark w-[80%] line-clamp-1">
                {{ props.ticket.name }}
              </h3>
               <button @click.stop.prevent="onFavoriteClick"
                class="relative z-10 p-2 rounded-full border border-gray-300 hover:bg-main_100 transition-colors bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-colors"
                  :class="isFav ? 'text-red-500 fill-red-500' : 'text-dark_500'" :fill="isFav ? 'currentColor' : 'none'"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <div class="flex flex-row justify-between items-center">
               <p class="text-sm text-dark_500 line-clamp-1">
                 {{ props.ticket.comments }}
               </p>
            </div>

            <p class="text-dark_700 text-sm flex gap-2 mt-2">
              <span class="bg-main_300 border border-primary/60 rounded-[20px] px-2 py-1"
                v-for="(opt, index) in props.ticket.option" :key="index">
                {{ opt }}
              </span>
            </p>

            <p class="text-dark_500 text-sm mt-1">
              <span class="text-dark text-xl font-bold">NT${{ props.ticket.price }}</span>
              起
            </p>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
