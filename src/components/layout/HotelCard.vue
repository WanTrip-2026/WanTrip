<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCompareStore } from '@/stores/compareStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useAuthStore } from '@/stores/auth'

type HotelCard = {
  id: string
  name: string
  star_rating: number
  min_price: number
  city?: string
  district?: string
  image_url?: string
  types?: string[]
  facilities?: string[]
  distance?: number | null
  rules?: string[]
}

const props = defineProps<{
  hotel: HotelCard
  searchParams?: {
    start_date: string
    end_date: string
    adults: number
    rooms: number
  }
  isCompact?: boolean
}>()

const compareStore = useCompareStore()

function starCount(stars: number) {
  return stars
}

// 是否已加入比較：用 store getter（你前面已加 isInCompare 的話）
const isInCompare = computed(() => compareStore.isInCompare(props.hotel.id))

// 按鈕：已加入→移除；未加入→加入
function toggleCompare() {
  // 已加入就移除
  if (isInCompare.value) {
    compareStore.removeHotel(props.hotel.id)
    return
  }

  const result = compareStore.addHotel({
    ...props.hotel,
    types: props.hotel.types ?? [],
    facilities: props.hotel.facilities ?? [],
    rules: props.hotel.rules ?? [],
    distance: props.hotel.distance ?? undefined,
  })
  if (!result.ok) {
    if (result.reason === 'full') alert('最多只能加入 5 間飯店比較')
    // duplicate 理論上不會發生（因為 isInCompare 先擋了）
  }
}

const favoriteStore = useFavoriteStore()

const isFav = computed(() => {
  return favoriteStore.isFavorite(props.hotel.id)
})

const authStore = useAuthStore()

const onFavoriteClick = async () => {
  if (!authStore.isLoggedIn) {
    alert('請先登入會員以加入收藏')
    return
  }
  try {
    await favoriteStore.toggleFavorite({
      id: props.hotel.id,
      name: props.hotel.name,
      imageUrl: props.hotel.image_url || '',
      price: props.hotel.min_price,
      city: props.hotel.city,
      type: 'hotel', // distinguishing type
      rating: props.hotel.star_rating,
    })
  } catch {
    // If API fails or something else
  }
}
</script>

<template>
  <div class="flex flex-col w-full">
    <div
      class="bg-white rounded-[20px] border border-gray-200 overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-md transition-shadow"
    >
      <!-- 圖片 -->
      <div
        class="relative flex-shrink-0"
        :class="isCompact ? 'h-[160px] aspect-[16/9] sm:aspect-[2/3]' : 'h-[200px] aspect-[16/9] sm:aspect-[4/3]'"
      >
        <img :src="hotel.image_url" :alt="hotel.name" class="w-full h-full object-cover" />
        <button
          @click.stop="toggleCompare"
          class="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 rounded-full sm:rounded-[20px] h-[40px] w-[110px] text-sm transition-all shadow-lg"
          :class="[
            isInCompare
              ? 'bg-white backdrop-blur-sm text-red-500 hover:bg-white/65 cursor-pointer'
              : 'bg-white/90 backdrop-blur-sm text-primary hover:bg-white cursor-pointer',
            isCompact ? 'sm:scale-75 sm:origin-center sm:bottom-1.5 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto' : '',
          ]"
        >
          <template v-if="isInCompare">取消比較</template>
          <template v-else>加入比較</template>
        </button>
      </div>

      <!-- 內容 -->
      <div class="relative flex-1 flex flex-col sm:flex-row justify-between p-5 w-full">
        <div class="flex flex-col gap-1">
          <h3 class="text-base sm:text-lg font-bold text-black line-clamp-1">
            {{ hotel.name }}
          </h3>

          <div class="flex flex-col">
            <div class="flex items-center">
              <div class="flex text-yellow-500">
                <svg
                  v-for="(n, index) in starCount(hotel.star_rating)"
                  :key="index"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  class="w-5 h-5"
                  fill="currentColor"
                >
                  <path
                    d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"
                  />
                </svg>
              </div>
              <p class="ml-1 text-[10px] sm:text-xs text-dark_700">
                {{ hotel.star_rating }} 顆星
              </p>
            </div>

            <p class="text-gray-500 text-xs sm:text-sm">{{ hotel.city }}{{ hotel.district }}</p>

            <p class="text-[10px] sm:text-sm text-gray-400">6616 則評論</p>
            <div v-if="isCompact" class="text-red-500 text-base sm:text-lg font-bold mt-1">
              NT${{ hotel.min_price.toLocaleString() }}
            </div>
          </div>
        </div>

        <!-- 底部 -->
        <div class="flex flex-row sm:flex-col justify-between sm:justify-end items-center sm:items-end gap-2 border-t sm:border-0 pt-3 sm:pt-0">
          <div v-if="!isCompact" class="text-red-500 text-lg sm:text-xl font-bold">
            NT${{ hotel.min_price.toLocaleString() }}
          </div>
          <div class="flex gap-2 sm:gap-4">
            <button
              @click.stop.prevent="onFavoriteClick"
              class="p-2 rounded-full border border-gray-300 hover:bg-main_100 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 sm:h-6 sm:w-6 transition-colors"
                :class="isFav ? 'text-red-500 fill-red-500' : 'text-dark_500'"
                :fill="isFav ? 'currentColor' : 'none'"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <RouterLink
              v-if="!isCompact"
              target="_blank"
              :to="{
                path: `/hotels/${hotel.id}`,
                query: {
                  keyword: hotel.name,
                  start_date: searchParams?.start_date,
                  end_date: searchParams?.end_date,
                  adults: searchParams?.adults,
                  rooms: searchParams?.rooms,
                },
              }"
            >
              <button
                class="bg-primary text-white px-4 sm:px-6 py-2 rounded-full sm:rounded-[20px] text-sm sm:text-base hover:bg-main transition shadow-sm"
              >
                查看詳情
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
