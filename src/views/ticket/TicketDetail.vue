<template>
  <div class="min-h-screen max-w-[1240px] mx-auto pt-24 pb-5">
    <!-- <div class="mx-5 text-sm text-dark-500 space-x-1 py-2">
      <RouterLink to="/" class="hover:underline underline-offset-2">首頁</RouterLink> >
      <RouterLink to="/" class="hover:underline underline-offset-2">體驗</RouterLink> >
      <RouterLink to="/" class="hover:underline underline-offset-2">景點門票</RouterLink> >
      <RouterLink to="/" class="hover:underline underline-offset-2">詳細資訊</RouterLink>
    </div> -->

    <div class="mx-5 mb-8">
      <div class="grid gap-2.5 mb-10 grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        <div class="relative h-[300px] lg:h-[400px] rounded-30 overflow-hidden col-span-2 lg:col-span-1 lg:row-span-2">
          <div v-show="!imageLoadStatus[0]" class="absolute inset-0 w-full h-full bg-gray-200 animate-pulse z-10"></div>
          <img v-if="attractionImages[0]?.image_url || loading" :src="attractionImages[0]?.image_url"
            fetchpriority="high" @load="onImageLoad(0)"
            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            :class="{ 'opacity-0': !imageLoadStatus[0], 'opacity-100': imageLoadStatus[0] }" />
        </div>
        <div class="grid grid-rows-2 gap-2.5 h-[300px] lg:h-[400px]">
          <div class="relative rounded-30 overflow-hidden">
            <div v-show="!imageLoadStatus[1]" class="absolute inset-0 w-full h-full bg-gray-200 animate-pulse z-10">
            </div>
            <img :src="attractionImages[1]?.image_url" @load="onImageLoad(1)"
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              :class="{ 'opacity-0': !imageLoadStatus[1], 'opacity-100': imageLoadStatus[1] }" />
          </div>
          <div class="relative rounded-30 overflow-hidden">
            <div v-show="!imageLoadStatus[2]" class="absolute inset-0 w-full h-full bg-gray-200 animate-pulse z-10">
            </div>
            <img :src="attractionImages[2]?.image_url" @load="onImageLoad(2)"
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              :class="{ 'opacity-0': !imageLoadStatus[2], 'opacity-100': imageLoadStatus[2] }" />
          </div>
        </div>
        <div class="grid grid-rows-2 gap-2.5 h-[300px] lg:h-[400px]">
          <div class="relative rounded-30 overflow-hidden">
            <div v-show="!imageLoadStatus[3]" class="absolute inset-0 w-full h-full bg-gray-200 animate-pulse z-10">
            </div>
            <img :src="attractionImages[3]?.image_url" @load="onImageLoad(3)"
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              :class="{ 'opacity-0': !imageLoadStatus[3], 'opacity-100': imageLoadStatus[3] }" />
          </div>
          <div class="relative rounded-30 overflow-hidden">
            <div v-show="!imageLoadStatus[4]" class="absolute inset-0 w-full h-full bg-gray-200 animate-pulse z-10">
            </div>
            <img :src="attractionImages[4]?.image_url" @load="onImageLoad(4)"
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              :class="{ 'opacity-0': !imageLoadStatus[4], 'opacity-100': imageLoadStatus[4] }" />
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[1200px] mx-auto px-5 lg:px-0 grid grid-cols-1 lg:grid-cols-12 gap-5 relative">
      <div class="col-span-12 lg:col-span-8 space-y-5 mb-[300px] lg:mb-0">
        <section class="bg-white p-5 rounded-30 shadow-sm border border-gray-300">
          <h2 class="text-xl line-clamp-2 md:text-2xl font-bold text-dark-900 mb-4">
            {{ ticketIntro.title }}
          </h2>
          <div class="flex flex-wrap items-center text-sm text-dark-500 mb-4 gap-2">
            <span class="flex items-center">
              <span class="text-yellow-400 mr-1">★</span>
              {{ ticketIntro.rating }} ({{ ticketIntro.reviewCount }} 評價)
            </span>
            <span class="md:inline">|</span>
            <span>已售出 {{ ticketIntro.soldCount }}</span>
            <span class="md:inline">|</span>
            <span class="font-medium">{{ ticketIntro.status }}</span>
          </div>
          <hr class="border-gray-300 my-4" />
          <div>
            <h4 class="font-bold text-dark-900 mb-3">行程特色</h4>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <li v-for="(feature, index) in ticketIntro.highlights" :key="index"
                class="flex items-start text-dark-600">
                <svg class="w-5 h-5 text-dark-700 mr-2 flex-shrink-0" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </section>

        <section class="bg-white p-5 rounded-30 shadow-sm border border-gray-300">
          <h3 class="text-xl font-bold text-dark-900">詳細說明</h3>
          <hr class="border-gray-300 my-2" />

          <div class="space-y-6 mt-4">
            <div v-for="detail in ticketDetail" :key="detail.id">
              <div v-if="detail.type === 'text'" class="prose max-w-none text-dark-700 text-sm leading-relaxed">
                <p class="whitespace-pre-line">{{ detail.content }}</p>
              </div>
              <div v-else-if="detail.type === 'image'" class="overflow-hidden rounded-10">
                <img :src="detail.url" class="w-full h-auto object-cover" loading="lazy" />
              </div>
              <div v-else-if="detail.type === 'image-caption'" class="space-y-2">
                <div class="overflow-hidden rounded-10">
                  <img :src="detail.url" class="w-full h-auto object-cover" loading="lazy" />
                </div>
                <p class="text-xs md:text-sm text-dark-700">
                  {{ detail.caption }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="bg-white p-5 rounded-30 shadow-sm border border-gray-300">
          <h3 class="text-xl font-bold text-dark-900">使用說明與注意事項</h3>
          <hr class="border-gray-300 my-2" />
          <div class="space-y-6 mt-4 text-sm text-dark-700">
            <div v-for="(policy, index) in policies" :key="index">
              <h4 class="font-bold text-dark-700 mb-2">{{ policy.title }}</h4>
              <p v-if="policy.type === 'text'">
                {{ policy.content }}
              </p>
              <ul v-else-if="policy.type === 'list'" :class="[
                'list-disc list-inside space-y-1',
                policy.highlight ? 'bg-main-100 p-5 rounded-10 border border-white-300' : '',
              ]">
                <li v-for="(item, i) in policy.items" :key="i">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section class="bg-white p-5 rounded-30 shadow-sm border border-gray-300">
          <h3 class="text-xl font-bold text-dark-900 mb-2">常見問題</h3>
          <div class="space-y-2.5">
            <div v-for="(faq, index) in faqs" :key="index" class="border rounded-lg overflow-hidden">
              <button name="toggle-faq" @click="toggleFaq(index)"
                class="w-full flex justify-between items-center px-5 py-4 bg-main-100 hover:bg-main-200 transition text-left">
                <span class="font-medium text-dark-900">{{ faq.question }}</span>
                <span class="text-dark-700 transform transition-transform duration-200"
                  :class="{ 'rotate-180': activeIndex === index }">▼</span>
              </button>
              <div v-show="activeIndex === index" class="px-5 py-4 bg-white text-md text-dark-700">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </section>

        <section class="mt-10">
          <h3 class="font-bold text-2xl mb-5 text-dark">熱門體驗</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
            <RouterLink v-for="recommend in recommendations" :key="recommend.id" :to="`/tickets/${recommend.id}`"
              class="group bg-white rounded-20 shadow-sm overflow-hidden border border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div class="h-32 bg-dark-100 overflow-hidden">
                <img :src="recommend.image_url" :alt="recommend.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div class="p-5">
                <div class="text-sm font-bold truncate mb-1 text-dark-900 group-hover:text-main-800 transition-colors">
                  {{ recommend.name }}
                </div>
                <div class="text-xs text-dark-700 font-medium">
                  TWD {{ Math.floor(recommend.price).toLocaleString() }} 起
                </div>
              </div>
            </RouterLink>
          </div>
        </section>
      </div>

      <div
        class="fixed bottom-[94px] left-0 right-0 bg-white rounded-30 z-50 px-4 py-3 mx-4 border border-gray-300 lg:relative lg:bottom-auto lg:left-auto lg:w-full lg:right-auto lg:z-0 lg:p-0 lg:mr-5 lg:ml-0 lg:col-span-4 lg:border-0 lg:bg-transparent lg:rounded-none">
        <div class="lg:sticky lg:top-[96px] bg-white lg:rounded-30 lg:shadow-sm lg:border lg:border-gray-300 lg:p-5">
          <!-- Header: Title and Price -->
          <div class="mb-3 flex flex-col gap-1 lg:gap-2">
            <!-- Toggle Button (Mobile/Tablet Only) -->
            <div class="flex flex-row justify-between items-center">
              <h2 class="w-full line-clamp-1 lg:line-clamp-2 text-base md:text-xl font-bold text-dark">
                {{ ticketIntro.title }}
              </h2>
              <button name="toggle-booking" @click="isBookingExpanded = !isBookingExpanded"
                class="lg:hidden w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-primary text-white shadow-md hover:bg-main transition-all">
                <svg class="w-3.5 h-3.5 transition-transform rotate-180 duration-300"
                  :class="{ 'rotate-0': isBookingExpanded }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-lg md:text-xl font-bold text-red-500">
                TWD {{ Math.floor(displayPrice).toLocaleString() }}
              </span>
              <span v-if="displayPrice > 0" class="text-xs md:text-sm text-dark-500 line-through">
                TWD {{ Math.floor(displayPrice * 1.5).toLocaleString() }}
              </span>
              <span v-if="totalPrice === 0" class="text-xs md:text-sm text-dark-500">起</span>
            </div>
          </div>

          <!-- Controls: Date, Plans, and Button -->
          <div v-if="displayPrice === 0 && tickets.length > 0" class="mt-2">
            <div class="w-full rounded-10 border border-gray-300 bg-main-100 p-3 text-dark">
              <div class="font-bold text-sm">此地點為免費入場</div>
              <div class="text-xs text-dark-600 mt-1">無需選擇日期與方案，可直接前往。</div>
            </div>
          </div>
          <Transition v-else enter-active-class="transition-all duration-1000 ease-out"
            leave-active-class="transition-all duration-800 ease-in"
            enter-from-class="opacity-0 max-h-0 overflow-hidden" enter-to-class="opacity-100 max-h-[600px]"
            leave-from-class="opacity-100 max-h-[600px]" leave-to-class="opacity-0 max-h-0 overflow-hidden">
            <div v-show="isBookingExpanded" class="flex flex-col gap-2 lg:!gap-3 lg:!block">
              <DatePicker v-model="selectedDate" :min-date="minDate" color="teal" :masks="{ input: 'YYYY-MM-DD' }">
                <template #default="{ inputValue, inputEvents }">
                  <div
                    class="px-3 py-2 w-full border rounded-10 hover:border-primary cursor-pointer transition flex flex-col justify-center"
                    v-on="inputEvents">
                    <div class="text-xs text-dark-700 mb-0.5 font-bold">選擇日期</div>
                    <div class="font-medium text-dark text-sm">
                      {{ inputValue || '請選擇日期' }}
                    </div>
                  </div>
                </template>
              </DatePicker>

              <div class="relative group mt-0 lg:mt-2">
                <div class="w-full border rounded-10 transition hover:border-primary px-3 py-2.5">
                  <div class="text-xs text-dark-700 mb-2 font-bold">選擇方案</div>

                  <div v-if="tickets.length === 0" class="text-sm text-dark-500">
                    目前無可用方案
                  </div>

                  <div v-else class="space-y-3">
                    <div v-for="t in tickets" :key="t.id" class="flex items-center justify-between gap-3">
                      <div class="flex flex-col min-w-0">
                        <span class="font-bold text-dark text-sm truncate">{{ t.name }}</span>
                        <span class="text-xs text-dark-500 font-medium">NT$ {{ Math.floor(t.price).toLocaleString()
                          }}</span>
                      </div>
                      <div class="flex items-center gap-2 shrink-0">
                        <button name="quantity-minus" @click="decreaseQuantity(t.id)"
                          class="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-dark-500 hover:bg-gray-100 disabled:opacity-50 transition text-sm"
                          :disabled="t.quantity <= 0">
                          -
                        </button>
                        <span class="w-4 text-center text-sm font-bold">{{ t.quantity }}</span>
                        <button name="quantity-plus" @click="increaseQuantity(t.id)"
                          class="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-dark-500 hover:bg-gray-100 transition text-sm">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <div v-if="totalPrice > 0" class="pt-2">
            <button name="checkout" type="submit" @click="handleBooking"
              class="w-full h-10 flex items-center justify-center bg-primary hover:bg-main text-white font-bold rounded-full md:rounded-10 transition duration-200 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
              :disabled="totalPrice === 0">
              立即預訂
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed, watch } from 'vue' // Added watch
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import type { Attraction, AttractionImage, Ticket } from '@/types/database'
import { useOrderStore } from '@/stores/orderStore'
import { useAuthStore } from '@/stores/auth'
import { format } from 'date-fns'
import { POLICIES, DINING_FAQS, DEFAULT_FAQS, type Policy } from '@/constants/ticket'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const orderStore = useOrderStore()

const attraction = ref<Attraction | null>(null)
const attractionImages = ref<AttractionImage[]>([])
const loading = ref<boolean>(true)
const errorMsg = ref<string>('')
interface TicketWithQuantity extends Ticket {
  quantity: number
}

const tickets = ref<TicketWithQuantity[]>([])
const selectedDate = ref<Date>(new Date())
const minDate = new Date()
minDate.setHours(0, 0, 0, 0)
const isBookingExpanded = ref<boolean>(false)

// Image loading tracking
const imageLoadStatus = ref<boolean[]>(new Array(7).fill(false))

const onImageLoad = (index: number) => {
  imageLoadStatus.value[index] = true
}

// Reset image status when ID changes
watch(
  () => route.params.id,
  () => {
    imageLoadStatus.value = new Array(7).fill(false)
    fetchAttractionData()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
)

const totalPrice = computed(() => {
  return tickets.value.reduce((sum, t) => sum + t.price * t.quantity, 0)
})

const displayPrice = computed(() => {
  if (totalPrice.value > 0) return totalPrice.value
  if (tickets.value.length === 0) return 0

  // Find minimum price among all tickets
  return Math.min(...tickets.value.map((t) => t.price))
})

const increaseQuantity = (id: string | number) => {
  const ticket = tickets.value.find((t) => t.id === id)
  if (ticket) ticket.quantity++
}

const decreaseQuantity = (id: string | number) => {
  const ticket = tickets.value.find((t) => t.id === id)
  if (ticket && ticket.quantity > 0) ticket.quantity--
}

// Reactive object for the top section
const ticketIntro = ref({
  title: '',
  rating: 0,
  reviewCount: 0,
  soldCount: '0',
  status: '隨訂隨用',
  highlights: [] as string[],
})

const fetchAttractionData = async () => {
  const id = route.params.id
  if (!id) return

  loading.value = true
  tickets.value = []
  imageLoadStatus.value = new Array(7).fill(false) // Reset on fetch

  try {
    const apiUrl = import.meta.env.VITE_API_BASE_URL
    const res = await fetch(`${apiUrl}/tickets/${id}`)

    if (!res.ok) {
      throw new Error('Failed to fetch ticket details')
    }

    const data = await res.json()
    const {
      attraction: attractionData,
      images,
      tickets: ticketsData,
      recommendations: recData,
    } = data

    attraction.value = attractionData

    // Set FAQs based on category
    const category = Array.isArray(attractionData.category)
      ? attractionData.category.join('')
      : attractionData.category || ''

    if (category.includes('餐券')) {
      faqs.value = DINING_FAQS
    } else {
      faqs.value = DEFAULT_FAQS
    }

    attractionImages.value = images || []
    tickets.value = (ticketsData as Ticket[]).map((t) => ({ ...t, quantity: 0 })) || []
    recommendations.value = recData || []

    // Map to ticketIntro
    if (attractionData) {
      ticketIntro.value = {
        title: attractionData.name,
        rating: attractionData.rating || 0,
        reviewCount: Math.floor(Math.random() * 1000) + 100, // Placeholder
        soldCount: (Math.floor(Math.random() * 5000) + 500).toString(), // Placeholder
        status: '隨訂隨用',
        highlights: (() => {
          if (Array.isArray(attractionData.highlights)) return attractionData.highlights
          if (typeof attractionData.highlights === 'string') {
            try {
              const parsed = JSON.parse(attractionData.highlights)
              return Array.isArray(parsed) ? parsed : [attractionData.highlights]
            } catch {
              return []
            }
          }
          return []
        })(),
      }
    }

    // Update ticketDetail content
    const details = []
    if (attractionData?.description) {
      details.push({
        id: 1,
        type: 'text',
        content: attractionData.description,
      })
    }
    if (attractionData?.detail) {
      details.push({
        id: 2,
        type: 'text',
        content: attractionData.detail,
      })
    }
    ticketDetail.value = details
  } catch (error: unknown) {
    console.error(error)
    errorMsg.value = error instanceof Error ? error.message : String(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAttractionData()
})

interface TicketItem {
  id: number | string
  name: string
  image_url: string
  price: number
  city: string
  category: string
  date: string
  address: string
  rating: number
  description: string
}

// Ensure AttractionWithImages interface is available if needed, though backend returns flattened structure for recommendations

function handleBooking() {
  // Auto-expand if collapsed on mobile/tablet
  if (!isBookingExpanded.value && window.innerWidth < 1024) {
    isBookingExpanded.value = true
    return
  }
  onSearch()
}

function onSearch() {
  if (!authStore.isLoggedIn) {
    alert('請先登入會員')
    authStore.openLoginModal()
    return
  }

  const selectedTickets = tickets.value.filter((t) => t.quantity > 0)

  if (selectedTickets.length === 0 || !attraction.value) {
    alert('請至少選擇一張票券')
    return
  }

  // Aggregate selection
  const subtitle = selectedTickets.map((t) => `${t.name} x${t.quantity}`).join(', ')
  const dateStr = format(selectedDate.value, 'yyyy/MM/dd')

  // Total price is already computed in totalPrice

  // Calculate total tickets
  const totalTickets = selectedTickets.reduce((sum, t) => sum + t.quantity, 0)

  orderStore.setOrder({
    type: 'attraction',
    title: attraction.value.name,
    subtitle: subtitle,
    date: dateStr,
    note: '隨買隨用', // Or pull from policy
    price: totalPrice.value,
    image: attractionImages.value[0]?.image_url || '',
    city: attraction.value.city,
    category: attraction.value.category || '',
    highlights: ticketIntro.value.highlights,
    address: attraction.value.address || '',
    attraction_id: attraction.value.id,
    hotel_id: '', // Ensure hotel_id is empty for attractions to avoid backend confusion
    roomQuantity: 1, // [FIX] Reset multiplier to 1 as price is already total
    peopleCount: totalTickets, // [FIX] Set people count to total tickets
  })

  router.push('/orders/checkout')
}

// ticketIntro is defined above

const ticketDetail = ref<
  { id: number; type: string; content?: string; url?: string; caption?: string }[]
>([])

const policies = ref<Policy[]>(POLICIES)

const faqs = ref<{ question: string; answer: string }[]>([])

const activeIndex = ref<number | null>(null)

const toggleFaq = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const recommendations = ref<TicketItem[]>([])
</script>
