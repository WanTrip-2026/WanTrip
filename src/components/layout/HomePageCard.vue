<template>
  <RouterLink
    :to="`/hotels/${id}`"
    :class="[
      'group relative flex h-[270px] w-[183px] hover:w-[415px] z-[1] hover:z-[50] bg-white rounded-[20px] hover:rounded-[30px] overflow-hidden border border-gray-300 transition-all duration-500 ease-in-out cursor-pointer shadow-sm hover:shadow-xl flex-shrink-0',
      expandLeft ? 'hover:-translate-x-[232px]' : '',
    ]"
  >
    <div class="relative h-full w-[183px] flex-shrink-0">
      <img :src="imageUrl" :alt="name" class="h-full w-full object-cover" />
      <div
        class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300"
      >
        <h3 class="text-white font-bold text-base line-clamp-1 lg:text-lg">{{ name }}</h3>
        <p class="text-white/90 text-sm">NT$ {{ (price || 0).toLocaleString() }} /起</p>
      </div>
      <div
        class="absolute bottom-[20px] right-[20px] flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
      >
        <button
          @click.stop.prevent="toggleCompare"
          class="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
          :class="
            isInCompare
              ? 'bg-dark_300 text-black cursor-not-allowed'
              : 'bg-white/45 backdrop-blur-sm hover:bg-white text-black'
          "
        >
          <template v-if="isLoading">處理中...</template>
          <template v-else-if="isInCompare">已加入</template>
          <template v-else>加入比較</template>
        </button>
      </div>
    </div>
    <div
      class="flex flex-col flex-1 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 min-w-[232px]"
    >
      <div class="flex-1">
        <h3 class="text-lg lg:text-xl font-bold text-black">{{ name }}</h3>
        <div class="flex text-dark_300">
          <span v-for="i in 5" :key="i" :class="{ 'text-amber-400': i <= (rating || 5) }">★</span>
        </div>
        <p class="text-dark_500 text-sm leading-relaxed">
          {{ venue || address }}
        </p>
      </div>
      <div class="mt-auto">
        <div class="text-right mb-1 text-xs text-dark_500">
          <span class="text-red-500 font-bold text-lg"
            >NT$ {{ (price || 0).toLocaleString() }}</span
          >
          /起
        </div>
        <div class="flex justify-end gap-3">
          <button @click.stop.prevent="onFavoriteClick"
            class="p-2 rounded-full border border-gray-300 hover:bg-main_100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-colors"
              :class="isFav ? 'text-red-500 fill-red-500' : 'text-dark_500'" :fill="isFav ? 'currentColor' : 'none'"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button
            class="h-10 bg-primary hover:bg-main text-white px-6 rounded-full font-medium transition-colors"
          >
            了解更多
          </button>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCompareStore } from '@/stores/compareStore'
import { RouterLink, useRouter } from 'vue-router';
import { useFavoriteStore } from '@/stores/favoriteStore';

// 統一命名規範與預設值
interface Props {
  id?: number | string
  name?: string
  imageUrl?: string
  price?: number
  venue?: string
  category?: string
  date?: string
  address?: string
  rating?: number
  expandLeft?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
  name: '卡片名稱',
  imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
  price: 0,
  venue: '',
  category: '',
  date: 'YYYY-MM-DD',
  address: '',
  rating: 5,
  expandLeft: false,
})

defineEmits(['favorite', 'details'])

const compareStore = useCompareStore()

// 是否已加入比較
const isInCompare = computed(() => compareStore.isInCompare(String(props.id)))

// 按鈕：已加入→移除；未加入→加入
const isLoading = ref(false)

async function toggleCompare() {
  const hotelId = String(props.id)

  // 已加入就移除
  if (isInCompare.value) {
    compareStore.removeHotel(hotelId)
    return
  }

  isLoading.value = true
  try {
    const result = await compareStore.fetchAndAddHotel(hotelId)
    if (!result.ok) {
      if (result.reason === 'full') alert('最多只能加入 5 間飯店比較')
      if (result.reason === 'error') alert('加入失敗，請稍後再試')
    }
  } finally {
    isLoading.value = false
const router = useRouter()
const favoriteStore = useFavoriteStore()

const isFav = computed(() => {
  return favoriteStore.isFavorite(Number(props.id))
})}

const onFavoriteClick = async () => {
  try {
    await favoriteStore.toggleFavorite({
        id: Number(props.id),
        name: props.name,
        imageUrl: props.imageUrl,
        price: props.price,
        venue: props.venue,
        category: props.category,
        date: props.date,
        address: props.address,
        rating: props.rating
    })
  } catch {
    router.push('/login')
  }
}}
</script>
