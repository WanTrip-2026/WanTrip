<script setup lang="ts">
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
  if (!authStore.isLoggedIn) return false
  return favoriteStore.isFavorite(props.ticket.id)
})

const onFavoriteClick = async () => {
  if (!authStore.isLoggedIn) {
    authStore.openLoginModal()
    return
  }
  try {
    await favoriteStore.toggleFavorite({
      id: props.ticket.id,
      name: props.ticket.name,
      imageUrl: props.ticket.image_url || '',
      price: props.ticket.price,
      city: props.ticket.city,
      type: 'ticket',
      rating: props.ticket.rating,
    })
  } catch {
    // API error
  }
}
</script>

<template>
  <div>
    <div
      class="min-w-[280px] rounded-20 border bg-white border-gray-300 transition-all shadow-sm hover:shadow-lg overflow-hidden">
      <RouterLink :to="`/tickets/${props.ticket.id}`" class="w-full h-full flex flex-col">
        <div class="w-full">
          <img :src="props.ticket.image_url" :alt="props.ticket.name" class="w-full h-40 object-cover" />
        </div>

        <!-- 內容 -->
        <div class="flex-1 flex flex-col justify-between px-5 py-2.5 w-full">
          <div class="flex flex-col gap-1">
            <div class="flex flex-row gap-1 items-center justify-between">
              <h3 class="text-lg font-bold text-dark w-[80%] line-clamp-1">
                {{ props.ticket.name }}
              </h3>
              <button name="add-favorite" @click.stop.prevent="onFavoriteClick"
                class="relative z-10 p-2 rounded-full border border-gray-300 hover:bg-main-100 transition-colors bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-colors"
                  :class="isFav ? 'text-red-500 fill-red-500' : 'text-dark-500'" :fill="isFav ? 'currentColor' : 'none'"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <!-- <p class="text-sm text-dark-500 line-clamp-1">
              {{ props.ticket.comments_count }} 則評論
            </p> -->

            <p class="text-white text-sm flex flex-wrap gap-1">
              <span v-if="props.ticket.city" class="bg-main rounded-full px-3 py-1.5">
                {{ props.ticket.city }}
              </span>
              <template v-if="Array.isArray(props.ticket.category)">
                <span v-for="(cat, index) in props.ticket.category" :key="index"
                  class="bg-main rounded-full px-3 py-1.5">
                  {{ cat }}
                </span>
              </template>
              <span v-else-if="props.ticket.category" class="bg-main rounded-full px-3 py-1.5">
                {{ props.ticket.category }}
              </span>
            </p>

            <p class="text-dark-500 text-sm mt-1">
              <span class="text-dark text-lg font-bold">NT${{ props.ticket.price }}</span>
              起
            </p>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
