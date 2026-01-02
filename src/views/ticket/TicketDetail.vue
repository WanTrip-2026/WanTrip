<template>
  <div class="min-h-screen bg-page pt-[96px] pb-10">
    <div class="max-w-[1200px] mx-auto p-5 text-sm text-gray-500 space-x-1">
      <RouterLink to="/" class="hover:underline underline-offset-2">首頁</RouterLink> >
      <RouterLink to="/" class="hover:underline underline-offset-2">體驗</RouterLink> >
      <RouterLink to="/" class="hover:underline underline-offset-2">景點門票</RouterLink> >
      <RouterLink to="/" class="hover:underline underline-offset-2">詳細資訊</RouterLink>
    </div>

    <div class="max-w-[1200px] mx-auto px-5 lg:px-0 mb-8">
      <div class="grid grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr_1fr_1fr] gap-[10px] mb-[40px]">
        <div class="relative h-[400px] rounded-[20px] overflow-hidden">
          <img
            src="/src/assets/hoteldetail_img/Wanhao.jpg"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div class="grid grid-rows-2 gap-[10px] h-[400px]">
          <div class="relative rounded-[20px] overflow-hidden">
            <img
              src="/src/assets/hoteldetail_img/Wanhao2.jpg"
              class="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div class="relative rounded-[20px] overflow-hidden">
            <img
              src="/src/assets/hoteldetail_img/Wanhao3.jpg"
              class="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        <div class="grid grid-rows-2 gap-[10px] h-[400px]">
          <div class="relative rounded-[20px] overflow-hidden">
            <img
              src="/src/assets/hoteldetail_img/Wanhao4.jpg"
              class="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div class="relative rounded-[20px] overflow-hidden">
            <img
              src="/src/assets/hoteldetail_img/Wanhao5.jpg"
              class="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        <div class="grid grid-rows-2 gap-[10px] h-[400px]">
          <div class="relative rounded-[20px] overflow-hidden">
            <img
              src="/src/assets/hoteldetail_img/Wanhao6.jpg"
              class="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div class="relative rounded-[20px] overflow-hidden">
            <img
              src="/src/assets/hoteldetail_img/Wanhao7.jpg"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-black/40"
            >
              查看全部照片
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="max-w-[1200px] mx-auto px-5 lg:px-0 grid grid-cols-1 lg:grid-cols-12 gap-5 relative"
    >
      <div class="col-span-12 lg:col-span-8 space-y-5">
        <section class="bg-white p-5 rounded-[20px] shadow-sm border border-gray-300">
          <h2 class="text-2xl line-clamp-2 md:text-3xl font-bold text-gray-900 mb-4">
            {{ ticketIntro.title }}
          </h2>
          <div class="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-2">
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
            <h4 class="font-bold text-gray-900 mb-3">行程特色</h4>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <li
                v-for="(feature, index) in ticketIntro.highlights"
                :key="index"
                class="flex items-start text-gray-600"
              >
                <svg
                  class="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </section>

        <section class="bg-white p-5 rounded-[20px] shadow-sm border border-gray-300">
          <h3 class="text-xl font-bold text-gray-900">詳細說明</h3>
          <hr class="border-gray-300 my-2" />

          <div class="space-y-6 mt-4">
            <div v-for="detail in ticketDetail" :key="detail.id">
              <div
                v-if="detail.type === 'text'"
                class="prose max-w-none text-gray-600 text-sm leading-relaxed"
              >
                <p class="whitespace-pre-line">{{ detail.content }}</p>
              </div>
              <div v-else-if="detail.type === 'image'" class="overflow-hidden rounded-[10px]">
                <img :src="detail.url" class="w-full h-auto object-cover" loading="lazy" />
              </div>
              <div v-else-if="detail.type === 'image-caption'" class="space-y-2">
                <div class="overflow-hidden rounded-[10px]">
                  <img :src="detail.url" class="w-full h-auto object-cover" loading="lazy" />
                </div>
                <p class="text-xs md:text-sm text-gray-500">
                  {{ detail.caption }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="bg-white p-5 rounded-[20px] shadow-sm border border-gray-300">
          <h3 class="text-xl font-bold text-gray-900">使用說明與注意事項</h3>
          <hr class="border-gray-300 my-2" />
          <div class="space-y-6 mt-4 text-sm text-gray-600">
            <div v-for="(policy, index) in policies" :key="index">
              <h4 class="font-bold text-gray-800 mb-2">{{ policy.title }}</h4>
              <p v-if="policy.type === 'text'">
                {{ policy.content }}
              </p>
              <ul
                v-else-if="policy.type === 'list'"
                :class="[
                  'list-disc list-inside space-y-1',
                  policy.highlight ? 'bg-[#EEF2F7] p-5 rounded-[10px] border border-white-300' : '',
                ]"
              >
                <li v-for="(item, i) in policy.items" :key="i">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section class="bg-white p-5 rounded-[20px] shadow-sm border border-gray-300">
          <h3 class="text-xl font-bold text-gray-900 mb-2">常見問題</h3>
          <div class="space-y-2.5">
            <div
              v-for="(faq, index) in faqs"
              :key="index"
              class="border rounded-lg overflow-hidden"
            >
              <button
                @click="toggleFaq(index)"
                class="w-full flex justify-between items-center p-5 bg-[#EEF2F7] hover:bg-[#98BAE3] transition text-left"
              >
                <span class="font-medium text-gray-800">{{ faq.question }}</span>
                <span
                  class="text-gray-400 transform transition-transform duration-200"
                  :class="{ 'rotate-180': activeIndex === index }"
                  >▼</span
                >
              </button>
              <div v-show="activeIndex === index" class="p-5 bg-white text-sm text-gray-700">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 class="font-bold text-2xl mb-2 text-primary">熱門體驗</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
            <RouterLink
              v-for="recommend in recommendations"
              :key="recommend.id"
              :to="`/ticket/${recommend.id}`"
              class="group bg-white rounded-[20px] shadow-sm overflow-hidden border hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div class="h-32 bg-gray-100 overflow-hidden">
                <img
                  :src="recommend.img"
                  :alt="recommend.title"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div class="p-5">
                <div
                  class="text-sm font-bold truncate mb-1 text-gray-800 group-hover:text-[#365475] transition-colors"
                >
                  {{ recommend.title }}
                </div>
                <div class="text-xs text-gray-500 font-medium">TWD {{ recommend.price }} 起</div>
              </div>
            </RouterLink>
          </div>
        </section>
      </div>

      <div
        class="fixed bottom-[84px] left-0 right-0 bg-white rounded-[20px] z-50 p-5 mx-5 border border-white-300 lg:relative lg:bottom-auto lg:left-auto lg:w-full lg:right-auto lg:z-0 lg:p-0 lg:mr-5 lg:ml-0 lg:col-span-4 lg:border-0 lg:bg-transparent"
      >
        <div
          class="lg:sticky lg:top-[96px] bg-white lg:rounded-[20px] lg:shadow-sm lg:border lg:border-gray-300 lg:p-5"
        >
          <div class="mb-4 flex flex-row gap-2 lg:gap-5 lg:flex-col">
            <h2
              class="w-full text-lg lg:text-2xl line-clamp-1 lg:line-clamp-2 md:text-xl font-bold text-black"
            >
              {{ ticketIntro.title }}
            </h2>
            <div>
              <span class="text-xs lg:text-sm text-gray-500 line-through text-nowrap"
                >TWD 1,200</span
              >
              <div class="flex items-end gap-1 lg:gap-2">
                <span class="text-lg lg:text-2xl font-bold text-red-500 text-nowrap">TWD 880</span>
                <span class="text-sm text-gray-500 mb-0.5 lg:mb-1 text-nowrap">/ 每人</span>
              </div>
            </div>
          </div>
          <div class="flex flex-row items-stretch gap-5 text-nowrap lg:gap-2.5 lg:flex-col">
            <div
              class="p-3 w-full border rounded-[10px] hover:border-[#365475] cursor-pointer transition"
            >
              <div class="text-xs text-gray-700 mb-1">選擇日期</div>
              <div class="font-medium text-black">2023-12-25 (週一)</div>
            </div>
            <div
              class="p-3 w-full border rounded-[10px] hover:border-[#365475] cursor-pointer transition"
            >
              <div class="text-xs text-gray-700 mb-1">選擇方案</div>
              <div class="font-medium text-black">成人票 x 2</div>
            </div>
            <div class="flex-shrink-0">
              <button
                type="submit"
                @click="onSearch"
                class="h-full flex items-center justify-center lg:w-full bg-primary hover:bg-[#365475] text-white font-bold py-3 px-6 rounded-[10px] transition duration-200 shadow-md"
              >
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
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
function onSearch() {
  router.push('/orders/checkout')
}

const ticketIntro = {
  title: '[限時優惠] 台北極致景觀體驗 | 雲端漫步與特色下午茶套餐',
  rating: 4.9,
  reviewCount: 1234,
  soldCount: '10,000+',
  status: '隨訂隨用',
  highlights: [
    '體驗全台最高樓層景觀，俯瞰城市美景',
    '專業導覽解說，深入了解建築歷史',
    '獨家贈送精美紀念品與電子證書',
    '親子友善設施，適合全家同遊',
  ],
}

const ticketDetail = [
  {
    id: 1,
    type: 'text',
    content: '這是一個純文字區塊。體驗全台最高樓層景觀...',
  },
  {
    id: 2,
    type: 'image',
    url: 'https://placehold.co/800x400/f1f5f9/94a3b8?text=Pure+Image',
  },
  {
    id: 3,
    type: 'text',
    content: '這是一個純文字區塊。體驗全台最高樓層景觀...',
  },
  {
    id: 4,
    type: 'image-caption',
    url: 'https://placehold.co/800x400/334155/f8fafc?text=Image+with+Caption',
    caption: 'img+text這是位於 89 樓的觀景台實景，天氣晴朗時可遠眺至淡水河口。',
  },
]

const policies = ref([
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

const recommendations = ref([
  {
    id: 1,
    title: '台北 101 觀景台門票',
    price: '400',
    img: 'https://placehold.co/300x200/e2e8f0/94a3b8?text=Taipei+101',
  },
  {
    id: 2,
    title: '故宮博物院電子門票',
    price: '350',
    img: 'https://placehold.co/300x200/e2e8f0/94a3b8?text=Museum',
  },
  {
    id: 3,
    title: '北投溫泉大眾池體驗',
    price: '520',
    img: 'https://placehold.co/300x200/e2e8f0/94a3b8?text=Hot+Spring',
  },
  {
    id: 4,
    title: '九份接駁專車',
    price: '600',
    img: 'https://placehold.co/300x200/e2e8f0/94a3b8?text=Jiufen',
  },
])
</script>

<style>
body {
  background-color: #f8fdff;
}
</style>
