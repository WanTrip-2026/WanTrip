<template>
  <!-- Page wrapper（不含 navbar / footer） -->
  <main class="min-h-screen max-w-[1240px] mx-auto pt-24 overflow-x-hidden mb-20">
    <div class="mx-5">
      <!-- Banner -->
      <section class="relative pb-32 md:pb-20">
        <div class="relative">
          <div class="relative w-full overflow-hidden rounded-[40px] bg-gray-200 shadow-sm">
            <img
              :src="
                getOptimizedImageUrl(
                  'https://res.cloudinary.com/wantrip/image/upload/v1768481888/IMG_7318_dizpjn.jpg',
                  { w: 1240 },
                )
              "
              class="aspect-[3/4] absolute inset-0 w-full h-full object-cover"
              alt="banner"
              fetchpriority="high"
            />
            <div class="h-[340px] md:h-[420px]"></div>
          </div>

          <!-- Search Bar (floating on banner) -->
          <div class="absolute inset-x-0 bottom-0 z-20 flex justify-center translate-y-1/2">
            <div class="w-full lg:max-w-[1024px]">
              <!-- Tabs -->
              <div
                class="relative w-fit h-11 flex items-center rounded-full border border-gray-300 bg-white p-0.5 mb-2 mx-auto md:mx-0 overflow-hidden"
              >
                <!-- Sliding Background Indicator -->
                <div
                  class="absolute top-0.5 bottom-0.5 left-0.5 w-[96px] rounded-full bg-primary shadow-sm transition-all duration-300 ease-in-out z-0"
                  :style="{ transform: `translateX(${activeTab === 'stay' ? '96px' : '0px'})` }"
                ></div>

                <button
                  name="ticket-tab"
                  type="button"
                  class="relative z-10 h-full rounded-full text-nowrap w-24 text-sm font-semibold transition-colors duration-300 px-4"
                  :class="activeTab === 'package' ? 'text-white' : 'text-dark hover:bg-main_100/50'"
                  @click="activeTab = 'package'"
                >
                  找門票
                </button>
                <button
                  name="hotel-tab"
                  type="button"
                  class="relative z-10 h-full rounded-full text-nowrap w-24 text-sm font-semibold transition-colors duration-300 px-4"
                  :class="activeTab === 'stay' ? 'text-white' : 'text-dark hover:bg-main_100/50'"
                  @click="activeTab = 'stay'"
                >
                  找住宿
                </button>
              </div>

              <SearchBar
                mode="redirect"
                :search-type="activeTab"
                :initial-keyword="hotelConfig.destination"
                :initial-range="hotelConfig.dateRange"
                :initial-people="hotelConfig.guests"
                :initial-destination="ticketConfig.destination"
                :initial-ticket-guests="ticketConfig.guests"
                @search="handleSearch"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- 想去哪裡玩？ -->
      <section class="mt-10">
        <h2 class="mb-5 text-xl font-bold text-dark">想去哪裡玩？</h2>

        <div class="grid grid-cols-6 sm:grid-cols-5 gap-5">
          <button
            name="ticket-region"
            v-for="(r, index) in regions"
            :key="r.key"
            type="button"
            class="relative group overflow-hidden rounded-[20px] bg-white/70 border border-gray-300 transition shadow-sm hover:shadow-xl"
            :class="[index < 3 ? 'col-span-2 sm:col-span-1' : 'col-span-3 sm:col-span-1']"
            @click="onClickRegion(r)"
          >
            <div
              class="h-[110px] w-full aspect-[3/4]"
              :style="{
                backgroundImage: `url(${getOptimizedImageUrl(r.img, { w: 400 })})`,
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
            @book="handleBookHotel"
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
            @book="handleBookHotel"
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
            @book="handleBookTicket"
          />
        </div>
      </section>

      <!-- 關鍵字（全台住宿｜可點選 Toggle） -->
      <section class="my-20">
        <div class="rounded-[20px] bg-white/75 p-5 text-center shadow-sm border border-gray-300">
          <p class="text-2xl font-bold text-dark">大家都在找...</p>
          <div class="mt-5 flex flex-wrap justify-center gap-2">
            <button
              name="keyword-btn"
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
import SearchBar from '@/components/layout/SearchBar.vue'
import { useHotelApi } from '@/composables/useHotelApi'
import { REGIONS, STAY_KEYWORDS, REGION_CITIES } from '@/constants/home'
import type { HomePageCardItem } from '@/types/hotel'
import { getOptimizedImageUrl } from '@/utils/image'

const activeTab = ref('stay')

const router = useRouter()

// Hotel Config
const hotelConfig = reactive({
  destination: '',
  dateRange: [new Date(), new Date(new Date().setDate(new Date().getDate() + 1))],
  guests: { rooms: 1, people: 2 },
})

// Ticket Config
const ticketConfig = reactive({
  destination: '',
  guests: { adults: 2, children: 0, hasPet: false },
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
    featuredHotels.value = featured.value ?? []

    const { data: recommended } = await fetchRecommendedHotels()
    recommendedHotels.value = recommended.value ?? []
  } catch (error) {
    console.error('Error fetching hotels:', error)
  }

  // Fetch Popular Tickets
  try {
    const res = await axios.get(`${API_BASE_URL}/tickets/popular`)
    // Map API data to match TicketCard props if necessary, or ensure TicketCard accepts API structure.
    // TicketHomeView passes the API data directly to HomePageTicketCard.
    // Let's assume HomePageTicketCard handles it (it takes :v-bind="ticket").
    recommendations.value = res.data.map(
      (item: Omit<TicketItem, 'rating'> & { rating: string | number }) => ({
        ...item,
        rating: Number(item.rating),
      }),
    )
  } catch (error) {
    console.error('Error fetching popular tickets:', error)
  }
})

const handleBookHotel = (id: string | number) => router.push(`/hotels/${id}`)
const handleBookTicket = (id: string | number) => router.push(`/tickets/${id}`)

const stayKeywords = STAY_KEYWORDS

const selectedKeywords = reactive(new Set<string>())

function toggleKeyword(k: string) {
  if (selectedKeywords.has(k)) selectedKeywords.delete(k)
  else selectedKeywords.add(k)
}

// Methods
interface SearchPayload {
  destination?: string
  keyword?: string
  range?: Date[]
  guests?: {
    adults: number
    children: number
    hasPet: boolean
  }
  rooms?: number
  people?: number
}

function handleSearch(payload: SearchPayload) {
  // Search logic is handled by SearchBar's redirect mode
  if (activeTab.value === 'package') {
    ticketConfig.destination = payload.destination || ''
    if (payload.guests) {
      Object.assign(ticketConfig.guests, payload.guests)
    }
  } else {
    hotelConfig.destination = payload.keyword || ''
    if (payload.range) hotelConfig.dateRange = payload.range
    hotelConfig.guests.rooms = payload.rooms || 1
    hotelConfig.guests.people = payload.people || 2
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
