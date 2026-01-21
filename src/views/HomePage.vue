<template>
  <!-- Page wrapper（不含 navbar / footer） -->
  <main class="min-h-screen max-w-[1240px] mx-auto pt-24 overflow-x-hidden mb-20">
    <div class="mx-5">
      <!-- Banner -->
      <section class="relative pb-32 md:pb-20">
        <div class="relative">
          <div class="relative w-full overflow-hidden rounded-[40px] bg-gray-200 shadow-sm">
            <img
              src="https://res.cloudinary.com/wantrip/image/upload/v1767445158/%E5%9F%8E%E5%B8%82_luoarw.jpg"
              class="aspect-[3/4] absolute inset-0 w-full h-full object-fill"
              alt="banner"
            />
            <div class="h-[340px] md:h-[420px]"></div>
          </div>

          <!-- Search Bar (floating on banner) -->
          <div class="absolute inset-x-0 bottom-0 z-20 flex justify-center translate-y-1/2">
            <form
              class="w-full lg:max-w-[1024px] rounded-[28px] md:rounded-full border border-gray-300 bg-white shadow-sm p-2"
              @submit.prevent="onSearch"
            >
              <div class="flex flex-col gap-2 md:flex-row md:items-center">
                <!-- Tabs -->
                <div
                  class="h-11 flex items-center rounded-full border border-gray-300 bg-dark_100 p-0.5"
                >
                  <button
                    type="button"
                    class="h-full rounded-full text-nowrap w-full text-sm font-semibold transition px-4"
                    :class="
                      activeTab === 'package'
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-dark hover:bg-main_100'
                    "
                    @click="activeTab = 'package'"
                  >
                    找門票
                  </button>
                  <button
                    type="button"
                    class="h-full rounded-full text-nowrap w-full text-sm font-semibold transition px-4"
                    :class="
                      activeTab === 'stay'
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-dark hover:bg-main_100'
                    "
                    @click="activeTab = 'stay'"
                  >
                    找住宿
                  </button>
                </div>

                <!-- Fields -->
                <div class="grid flex-1 grid-cols-1 gap-2 md:grid-cols-3">
                  <label
                    class="h-11 flex items-center rounded-full border border-gray-300 bg-white p-1"
                  >
                    <span class="ml-2 mr-1 text-sm text-nowrap font-semibold text-primary/80"
                      >想去哪裡</span
                    >
                    <input
                      v-model="form.destination"
                      class="w-full h-full px-4 bg-transparent text-sm text-nowrap outline-none rounded-full transition text-black focus:bg-dark_100 placeholder:text-dark_500"
                      placeholder="輸入城市、景點"
                    />
                  </label>

                  <label
                    class="h-11 flex items-center rounded-full border border-gray-300 bg-white p-1"
                  >
                    <span class="ml-2 mr-1 text-sm text-nowrap font-semibold text-primary/80"
                      >入住/退房日期</span
                    >
                    <input
                      v-model="form.dateRange"
                      class="w-full h-full px-4 bg-transparent text-sm text-nowrap outline-none rounded-full transition text-black focus:bg-dark_100 placeholder:text-dark_500"
                      placeholder="選擇日期"
                    />
                  </label>

                  <label
                    class="h-11 flex items-center rounded-full border border-gray-300 bg-white p-1"
                  >
                    <span class="ml-2 mr-1 text-sm text-nowrap font-semibold text-primary/80"
                      >人數/需求</span
                    >
                    <input
                      v-model="form.people"
                      class="w-full h-full px-4 bg-transparent text-sm text-nowrap outline-none rounded-full transition text-black focus:bg-dark_100 placeholder:text-dark_500"
                      placeholder="2 人｜1 間｜可帶寵物"
                    />
                  </label>
                </div>

                <!-- Submit -->
                <button
                  type="submit"
                  class="h-11 rounded-full bg-primary px-6 text-md font-semibold text-white transition hover:bg-main"
                >
                  搜尋
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <!-- 想去哪裡玩？ -->
      <section class="mt-10">
        <h2 class="mb-5 text-xl font-bold text-dark">想去哪裡玩？</h2>

        <div class="grid grid-cols-5 gap-5">
          <button
            v-for="r in regions"
            :key="r.key"
            type="button"
            class="relative group overflow-hidden rounded-[20px] bg-white/70 border border-gray-300 transition shadow-sm hover:shadow-xl"
            @click="onClickRegion(r)"
          >
            <div
              class="h-[110px] w-full aspect-[3/4]"
              :style="{
                backgroundImage: `url(${r.img})`,
                backgroundSize: 'cover',
              }"
            ></div>

            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-xl font-black text-white drop-shadow-sm">{{ r.label }}</span>
            </div>
          </button>
        </div>
      </section>

      <!-- 熱門飯店（第一排） -->
      <section class="mt-20">
        <h2 class="mb-5 text-xl font-bold text-dark">熱門飯店</h2>
        <div class="flex flex-row xl:grid xl:grid-cols-6 gap-5 overflow-x-auto pb-10 no-scrollbar">
          <HomePageCard
            v-for="(hotel, index) in hotHotelsA"
            :key="hotel.id"
            v-bind="hotel"
            :expand-left="index >= hotHotelsA.length - 2"
            @compare="handleWishlist"
            @book="handleBook"
          />
        </div>
      </section>

      <!-- 熱門飯店（第二排） -->
      <section class="mt-20">
        <h2 class="mb-5 text-xl font-bold text-dark">推薦飯店</h2>
        <div
          class="flex flex-row xl:grid xl:grid-cols-6 gap-5 overflow-x-auto pb-10 no-scrollbar text-nowrap"
        >
          <HomePageCard
            v-for="(hotel, index) in hotHotelsB"
            :key="hotel.id"
            v-bind="hotel"
            :expand-left="index >= hotHotelsB.length - 2"
            @compare="handleWishlist"
            @book="handleBook"
          />
        </div>
      </section>

      <section class="mt-20">
        <h2 class="font-bold text-xl mb-5 text-dark">熱門體驗</h2>
        <div
          class="flex flex-row xl:grid xl:grid-cols-6 gap-5 overflow-x-auto pb-10 no-scrollbar text-nowrap"
        >
          <HomePageTicketCard
            v-for="(recommend, index) in recommendations"
            :key="recommend.id"
            v-bind="recommend"
            :expand-left="index >= recommendations.length - 2"
            @compare="handleWishlist"
            @book="handleBook"
          />
        </div>
      </section>

      <!-- 關鍵字（全台住宿｜可點選 Toggle） -->
      <section class="my-20">
        <div class="rounded-[20px] bg-white/75 p-5 text-center shadow-sm border border-gray-300">
          <p class="text-2xl font-bold text-dark">大家都在找...</p>
          <div class="mt-5 flex flex-wrap justify-center gap-2">
            <button
              v-for="k in stayKeywords"
              :key="k"
              type="button"
              class="rounded-full px-4 py-1 text-sm font-semibold border transition"
              :class="
                selectedKeywords.has(k)
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-gray-100 text-primary/80 border-primary/10 hover:bg-main_100'
              "
              @click="toggleKeyword(k)"
            >
              {{ k }}
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

import { reactive, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import HomePageCard from '@/components/layout/HomePageCard.vue'
import HomePageTicketCard from '@/components/layout/HomePageTicketCard.vue'
import { useHotelApi } from '@/composables/useHotelApi'
import { REGIONS, STAY_KEYWORDS, REGION_CITIES } from '@/constants/home'
import type { HomePageCardItem } from '@/types/hotel'

const activeTab = ref('stay')

const router = useRouter()

const form = reactive({
  destination: '',
  dateRange: '',
  people: '',
})

const regions = REGIONS

const { fetchFeaturedHotels, fetchRecommendedHotels } = useHotelApi()

const featuredHotels = ref<HomePageCardItem[]>([])
const hotHotelsA = computed(() => featuredHotels.value.slice(0, 6))

const recommendedHotels = ref<HomePageCardItem[]>([])
const hotHotelsB = computed(() => recommendedHotels.value.slice(0, 6))

onMounted(async () => {
  try {
    const { data: featured } = await fetchFeaturedHotels()
    featuredHotels.value = featured.value

    const { data: recommended } = await fetchRecommendedHotels()
    recommendedHotels.value = recommended.value
  } catch (error) {
    console.error('Error fetching hotels:', error)
  }

  // Fetch Popular Tickets
  try {
    const res = await axios.get(`${API_BASE_URL}/tickets/popular`)
    // Map API data to match TicketCard props if necessary, or ensure TicketCard accepts API structure.
    // TicketHomeView passes the API data directly to HomePageTicketCard.
    // Let's assume HomePageTicketCard handles it (it takes :v-bind="ticket").
    recommendations.value = res.data
  } catch (error) {
    console.error('Error fetching popular tickets:', error)
  }
})

const handleWishlist = (id: string | number) => {
  const product = hotHotelsA.value.find((t) => t.id === id)
  console.log(`用戶收藏了: ${product?.name}`)
}

const handleBook = (id: string | number) => {
  router.push(`/tickets/${id}`)
}

const stayKeywords = STAY_KEYWORDS

const selectedKeywords = reactive(new Set<string>())

function toggleKeyword(k: string) {
  if (selectedKeywords.has(k)) selectedKeywords.delete(k)
  else selectedKeywords.add(k)
  console.log('[Stay Keyword Toggle]', Array.from(selectedKeywords))
}

// Methods
function onSearch() {
  console.log('[Home Search]', { tab: activeTab.value, ...form })
  if (activeTab.value === 'package') {
    router.push({
      path: '/tickets/search',
      query: {
        destination: form.destination,
      },
    })
  } else {
    router.push({
      path: '/hotels/search',
      query: {
        destination: form.destination,
      },
    })
  }
}

const regionCities = REGION_CITIES

function onClickRegion(region: { key: string }) {
  const cities = regionCities[region.key]
  if (cities) {
    router.push({
      path: '/tickets/search',
      query: {
        cities: cities.join(','),
      },
    })
  } else {
    // Fallback or default behavior
    console.log('Unknown region:', region.key)
  }
}

interface TicketItem {
  id: number | string
  name: string
  imageUrl: string
  price: number
  venue: string
  category: string
  date: string
  address: string
  rating: number
  description: string
}

const recommendations = ref<TicketItem[]>([])
</script>
