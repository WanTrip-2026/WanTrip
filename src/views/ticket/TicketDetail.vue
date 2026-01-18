<template>
  <div class="min-h-screen max-w-[1240px] mx-auto pt-24 pb-20">
    <!-- <div class="mx-5 text-sm text-dark_500 space-x-1 py-2">
      <RouterLink to="/" class="hover:underline underline-offset-2">首頁</RouterLink> >
      <RouterLink to="/" class="hover:underline underline-offset-2">體驗</RouterLink> >
      <RouterLink to="/" class="hover:underline underline-offset-2">景點門票</RouterLink> >
      <RouterLink to="/" class="hover:underline underline-offset-2">詳細資訊</RouterLink>
    </div> -->

    <div class="mx-5 mb-8">
      <div class="grid grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr_1fr_1fr] gap-2.5 mb-10">
        <div class="relative h-[400px] rounded-[20px] overflow-hidden">
          <img :src="attractionImages[0]?.image_url || '/src/assets/hoteldetail_img/Wanhao.jpg'" class="absolute inset-0 w-full h-full object-cover" />
        </div>

        <div class="grid grid-rows-2 gap-2.5 h-[400px]">
          <div class="relative rounded-[20px] overflow-hidden">
            <img :src="attractionImages[1]?.image_url || '/src/assets/hoteldetail_img/Wanhao2.jpg'" class="absolute inset-0 w-full h-full object-cover" />
          </div>

          <div class="relative rounded-[20px] overflow-hidden">
            <img :src="attractionImages[2]?.image_url || '/src/assets/hoteldetail_img/Wanhao3.jpg'" class="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>

        <div class="grid grid-rows-2 gap-2.5 h-[400px]">
          <div class="relative rounded-[20px] overflow-hidden">
            <img :src="attractionImages[3]?.image_url || '/src/assets/hoteldetail_img/Wanhao4.jpg'" class="absolute inset-0 w-full h-full object-cover" />
          </div>

          <div class="relative rounded-[20px] overflow-hidden">
            <img :src="attractionImages[4]?.image_url || '/src/assets/hoteldetail_img/Wanhao5.jpg'" class="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>

        <div class="grid grid-rows-2 gap-2.5 h-[400px]">
          <div class="relative rounded-[20px] overflow-hidden">
            <img :src="attractionImages[5]?.image_url || '/src/assets/hoteldetail_img/Wanhao6.jpg'" class="absolute inset-0 w-full h-full object-cover" />
          </div>

          <div class="relative rounded-[20px] overflow-hidden">
            <img :src="attractionImages[6]?.image_url || '/src/assets/hoteldetail_img/Wanhao7.jpg'" class="absolute inset-0 w-full h-full object-cover" />
            <div
              class="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-bold cursor-pointer transition-all hover:bg-black/40">
              查看全部照片
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[1200px] mx-auto px-5 lg:px-0 grid grid-cols-1 lg:grid-cols-12 gap-5 relative">
      <div class="col-span-12 lg:col-span-8 space-y-5">
        <section class="bg-white p-5 rounded-[20px] shadow-sm border border-gray-300">
          <h2 class="text-xl line-clamp-2 md:text-2xl font-bold text-dark_900 mb-4">
            {{ ticketIntro.title }}
          </h2>
          <div class="flex flex-wrap items-center text-sm text-dark_500 mb-4 gap-2">
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
            <h4 class="font-bold text-dark_900 mb-3">行程特色</h4>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <li v-for="(feature, index) in ticketIntro.highlights" :key="index"
                class="flex items-start text-dark_600">
                <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </section>

        <section class="bg-white p-5 rounded-[20px] shadow-sm border border-gray-300">
          <h3 class="text-xl font-bold text-dark_900">詳細說明</h3>
          <hr class="border-gray-300 my-2" />

          <div class="space-y-6 mt-4">
            <div v-for="detail in ticketDetail" :key="detail.id">
              <div v-if="detail.type === 'text'" class="prose max-w-none text-dark_700 text-sm leading-relaxed">
                <p class="whitespace-pre-line">{{ detail.content }}</p>
              </div>
              <div v-else-if="detail.type === 'image'" class="overflow-hidden rounded-[10px]">
                <img :src="detail.url" class="w-full h-auto object-cover" loading="lazy" />
              </div>
              <div v-else-if="detail.type === 'image-caption'" class="space-y-2">
                <div class="overflow-hidden rounded-[10px]">
                  <img :src="detail.url" class="w-full h-auto object-cover" loading="lazy" />
                </div>
                <p class="text-xs md:text-sm text-dark_700">
                  {{ detail.caption }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="bg-white p-5 rounded-[20px] shadow-sm border border-gray-300">
          <h3 class="text-xl font-bold text-dark_900">使用說明與注意事項</h3>
          <hr class="border-gray-300 my-2" />
          <div class="space-y-6 mt-4 text-sm text-dark_700">
            <div v-for="(policy, index) in policies" :key="index">
              <h4 class="font-bold text-dark_700 mb-2">{{ policy.title }}</h4>
              <p v-if="policy.type === 'text'">
                {{ policy.content }}
              </p>
              <ul v-else-if="policy.type === 'list'" :class="[
                'list-disc list-inside space-y-1',
                policy.highlight ? 'bg-main_100 p-5 rounded-[10px] border border-white-300' : '',
              ]">
                <li v-for="(item, i) in policy.items" :key="i">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section class="bg-white p-5 rounded-[20px] shadow-sm border border-gray-300">
          <h3 class="text-xl font-bold text-dark_900 mb-2">常見問題</h3>
          <div class="space-y-2.5">
            <div v-for="(faq, index) in faqs" :key="index" class="border rounded-lg overflow-hidden">
              <button @click="toggleFaq(index)"
                class="w-full flex justify-between items-center px-5 py-4 bg-main_100 hover:bg-main_200 transition text-left">
                <span class="font-medium text-dark_900">{{ faq.question }}</span>
                <span class="text-dark_700 transform transition-transform duration-200"
                  :class="{ 'rotate-180': activeIndex === index }">▼</span>
              </button>
              <div v-show="activeIndex === index" class="px-5 py-4 bg-white text-md text-dark_700">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </section>

        <section class="mt-10">
          <h3 class="font-bold text-2xl mb-5 text-dark">熱門體驗</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
            <RouterLink v-for="recommend in recommendations" :key="recommend.id" :to="`/tickets/${recommend.id}`"
              class="group bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div class="h-32 bg-dark_100 overflow-hidden">
                <img :src="recommend.imageUrl" :alt="recommend.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div class="p-5">
                <div class="text-sm font-bold truncate mb-1 text-dark_900 group-hover:text-main_800 transition-colors">
                  {{ recommend.name }}
                </div>
                <div class="text-xs text-dark_700 font-medium">TWD {{ recommend.price }} 起</div>
              </div>
            </RouterLink>
          </div>
        </section>
      </div>

      <div
        class="fixed bottom-[84px] left-0 right-0 bg-white rounded-[20px] z-50 p-5 mx-5 border border-white-300 lg:relative lg:bottom-auto lg:left-auto lg:w-full lg:right-auto lg:z-0 lg:p-0 lg:mr-5 lg:ml-0 lg:col-span-4 lg:border-0 lg:bg-transparent">
        <div
          class="lg:sticky lg:top-[96px] bg-white lg:rounded-[20px] lg:shadow-sm lg:border lg:border-gray-300 lg:p-5">
          <div class="mb-4 flex flex-row gap-2 lg:gap-5 lg:flex-col">
            <h2 class="w-full text-lg line-clamp-1 lg:line-clamp-2 md:text-xl font-bold text-dark">
              {{ ticketIntro.title }}
            </h2>
            <div>
              <span class="text-xs lg:text-sm text-dark_500 line-through text-nowrap">TWD 1,200</span>
              <div class="flex items-end gap-1 lg:gap-2">
                <span class="text-lg lg:text-2xl font-bold text-red-500 text-nowrap">TWD 880</span>
                <span class="text-sm text-dark_500 mb-0.5 lg:mb-1 text-nowrap">/ 每人</span>
              </div>
            </div>
          </div>
          <div class="flex flex-row items-stretch gap-5 text-nowrap lg:gap-2.5 lg:flex-col">
            <div class="p-3 w-full border rounded-[10px] hover:border-[#365475] cursor-pointer transition">
              <div class="text-xs text-dark_700 mb-1">選擇日期</div>
              <div class="font-medium text-dark">2023-12-25 (週一)</div>
            </div>
            <div class="p-3 w-full border rounded-[10px] hover:border-[#365475] cursor-pointer transition">
              <div class="text-xs text-dark_700 mb-1">選擇方案</div>
              <div class="font-medium text-dark">成人票 x 2</div>
            </div>
            <div class="flex-shrink-0">
              <button type="submit" @click="onSearch"
                class="h-full flex items-center justify-center lg:w-full bg-primary hover:bg-main text-white font-bold py-3 px-6 rounded-[10px] transition duration-200 shadow-md">
                立即預訂
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabaseClient'
import type { Attraction, AttractionImage } from '@/types/database'

const route = useRoute()
const attraction = ref<Attraction | null>(null)
const attractionImages = ref<AttractionImage[]>([])
const loading = ref<boolean>(true)
const errorMsg = ref<string>('')

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

  try {
    // Fetch Attraction Details
    const { data: attractionData, error: attractionError } = await supabase
      .from('attractions')
      .select('*')
      .eq('id', id)
      .single()

    if (attractionError) throw attractionError

    attraction.value = attractionData

    // Map to ticketIntro
    if (attractionData) {
      ticketIntro.value = {
        title: attractionData.name,
        rating: attractionData.rating || 0,
        reviewCount: Math.floor(Math.random() * 1000) + 100, // Placeholder
        soldCount: (Math.floor(Math.random() * 5000) + 500).toString(), // Placeholder
        status: '隨訂隨用',
        highlights: attractionData.highlights || [],
      }
    }

    // Fetch Images
    const { data: imagesData, error: imagesError } = await supabase
      .from('attraction_images')
      .select('*')
      .eq('attraction_id', id)

    if (imagesError) throw imagesError

    attractionImages.value = imagesData || []

    // Update ticketDetail content
    const details = []
    if (attractionData?.description) {
       details.push({
         id: 1,
         type: 'text',
         content: attractionData.description
       })
    }
    if (attractionData?.detail) {
        details.push({
            id: 2,
            type: 'text',
            content: attractionData.detail
        })
    }
    ticketDetail.value = details

    // Fetch Recommendations based on category
    if (attractionData?.category) {
      const category = Array.isArray(attractionData.category) ? attractionData.category[0] : attractionData.category
      const { data: recData } = await supabase
        .from('attractions')
        .select('*, attraction_images(image_url)')
        .contains('category', [category])
        .neq('id', id)
        .limit(4)

      if (recData) {
        recommendations.value = recData.map(item => mapItem(item as AttractionWithImages))
      }
    }

  } catch (error: any) {
    errorMsg.value = error.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAttractionData()
})

interface TicketItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  venue: string;
  category: string;
  date: string;
  address: string;
  rating: number;
  description: string;
}

const mapItem = (item: AttractionWithImages): TicketItem => ({
  id: item.id,
  name: item.name || '',
  imageUrl: item.attraction_images?.[0]?.image_url || 'https://placehold.co/400x300?text=No+Image',
  price: item.price || 0,
  venue: item.city || '',
  category: Array.isArray(item.category) ? (item.category[0] || '') : (item.category || ''),
  date: item.created_at || '2026-01-01',
  address: item.address || '',
  rating: item.rating || 0,
  description: item.intro || item.description || ''
})

// Define AttractionWithImages locally or import if possible
interface AttractionWithImages extends Attraction {
  attraction_images: { image_url: string }[]
}

const router = useRouter()
function onSearch() {
  router.push('/orders/checkout')
}

// ticketIntro is defined above

interface Policy {
  title: string
  content?: string
  items?: string[]
  type: 'text' | 'list'
  highlight: boolean
}

const ticketDetail = ref<{ id: number; type: string; content?: string; url?: string; caption?: string }[]>([])

const policies = ref<Policy[]>([
  {
    title: '【兌換方式】',
    content: '請出示訂單編號至1樓櫃檯更換正式門票。',
    type: 'text',
    highlight: false,
  },
  {
    title: '【退改政策】',
    items: [
      '如需更改日期，請於出發前 3 天聯繫客服。',
      '出發前 24 小時內取消，將收取 100% 手續費。',
      '若因不可抗力因素（如颱風）導致活動取消，將全額退款。',
    ],
    type: 'list',
    highlight: true,
  },
  {
    title: '【注意事項】',
    items: [
      '禁止攜帶危險物品及外食入場。',
      '場內禁止吸菸，違者將依相關法規處罰。',
      '若患有心臟病、高血壓等疾病，請自行斟酌身體狀況。',
      '兒童需由成人全程陪同。',
    ],
    type: 'list',
    highlight: false,
  },
])

const faqs = ref([
  { question: '問題一', answer: '回答...' },
  { question: '問題二', answer: '回答...' },
  { question: '問題三', answer: '回答...' },
])

const activeIndex = ref<number | null>(null)

const toggleFaq = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const recommendations = ref<TicketItem[]>([])
</script>
