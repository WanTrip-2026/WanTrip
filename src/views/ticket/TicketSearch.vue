<script setup>
import TicketCard from '@/components/layout/TicketCard.vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const selectedCity = ref('選擇城市')
const isOpen = ref(false)
const expandedMenus = ref([])

const cities = [
  {
    label: '熱門城市',
    cities: ['台北市', '新北市', '台中市', '台南市', '高雄市'],
  },
  {
    label: '其他城市',
    cities: [
      '基隆市',
      '新竹市',
      '新竹縣',
      '苗栗縣',
      '彰化縣',
      '南投縣',
      '雲林縣',
      '嘉義市',
      '嘉義縣',
      '屏東縣',
      '宜蘭縣',
      '花蓮縣',
      '台東縣',
    ],
  },
  {
    label: '離島地區',
    cities: ['澎湖縣', '金門縣', '連江縣'],
  },
]
function selectCity(city) {
  selectedCity.value = city
  isOpen.value = false
}
const cityAreaMap = {
  台北市: [
    '中正區',
    '大同區',
    '中山區',
    '松山區',
    '大安區',
    '萬華區',
    '信義區',
    '士林區',
    '北投區',
    '內湖區',
    '南港區',
    '文山區',
  ],

  新北市: [
    '板橋區',
    '三重區',
    '中和區',
    '永和區',
    '新莊區',
    '新店區',
    '樹林區',
    '鶯歌區',
    '三峽區',
    '淡水區',
    '汐止區',
    '瑞芳區',
    '土城區',
    '蘆洲區',
    '五股區',
    '泰山區',
    '林口區',
    '深坑區',
    '石碇區',
    '坪林區',
    '三芝區',
    '石門區',
    '八里區',
    '平溪區',
    '雙溪區',
    '貢寮區',
    '金山區',
    '萬里區',
    '烏來區',
  ],

  桃園市: ['桃園區', '中壢區', '平鎮區', '八德區', '楊梅區', '蘆竹區', '復興區'],

  台中市: [
    '中區',
    '東區',
    '南區',
    '西區',
    '北區',
    '太平區',
    '烏日區',
    '豐原區',
    '后里區',
    '石岡區',
    '東勢區',
    '新社區',
    '潭子區',
    '大雅區',
    '神岡區',
    '大甲區',
    '外埔區',
  ],

  台南市: [
    '中西區',
    '東區',
    '南區',
    '北區',
    '安平區',
    '安南區',
    '永康區',
    '歸仁區',
    '新化區',
    '左鎮區',
    '白河區',
    '六甲區',
    '安定區',
  ],

  高雄市: [
    '新興區',
    '前金區',
    '苓雅區',
    '鹽埕區',
    '鼓山區',
    '旗津區',
    '前鎮區',
    '三民區',
    '楠梓區',
    '小港區',
    '左營區',
    '仁武區',
    '岡山區',
    '湖內區',
    '鳳山區',
  ],

  基隆市: ['仁愛區', '信義區', '中正區', '中山區', '安樂區', '暖暖區', '七堵區'],

  新竹市: ['東區', '北區', '香山區'],

  新竹縣: [
    '竹北市',
    '竹東鎮',
    '新埔鎮',
    '關西鎮',
    '湖口鄉',
    '北埔鄉',
    '寶山鄉',
    '尖石鄉',
    '五峰鄉',
  ],

  苗栗縣: ['苗栗市', '頭份市', '苑裡鎮', '南庄鄉', '三義鄉', '泰安鄉'],

  彰化縣: ['彰化市', '鹿港鎮', '秀水鄉', '花壇鄉', '員林市', '溪湖鎮', '田中鎮', '溪州鄉'],

  南投縣: ['南投市', '埔里鎮', '草屯鎮', '竹山鎮', '集集鎮'],

  雲林縣: ['斗六市', '斗南鎮', '虎尾鎮', '西螺鎮', '元長鄉'],

  嘉義市: ['東區', '西區'],

  嘉義縣: ['太保市', '朴子市', '布袋鎮', '民雄鄉', '六腳鄉', '東石鄉', '大埔鄉', '阿里山鄉'],

  屏東縣: ['屏東市', '潮州鎮', '東港鎮', '恆春鎮', '萬丹鄉', '獅子鄉', '牡丹鄉'],

  宜蘭縣: ['宜蘭市', '羅東鎮', '蘇澳鎮', '頭城鎮', '礁溪鄉', '壯圍鄉'],

  花蓮縣: ['花蓮市', '鳳林鎮', '玉里鎮', '新城鄉', '吉安鄉', '壽豐鄉'],

  台東縣: [
    '臺東市',
    '成功鎮',
    '關山鎮',
    '卑南鄉',
    '鹿野鄉',
    '池上鄉',
    '長濱鄉',
    '綠島鄉',
    '蘭嶼鄉',
    '金峰鄉',
    '達仁鄉',
  ],

  澎湖縣: ['馬公市', '湖西鄉', '白沙鄉', '七美鄉'],
  金門縣: ['金城鎮', '金沙鎮', '金湖鎮', '金寧鄉'],
  連江縣: ['南竿鄉', '北竿鄉', '莒光鄉', '東引鄉'],
}

const areaOptions = computed(() => {
  return cityAreaMap[selectedCity.value] ?? []
})

const ticketFiltered = computed(() => [
  {
    title: '景點類型',
    options: [
      '觀光導覽',
      '歷史景點',
      '展覽與文化組織',
      '休閒活動',
      '戶外活動',
      '公園與樂園',
      '大自然與野生動物',
    ],
  },
  {
    title: '地區',
    options: areaOptions.value,
  },
  { title: '景點評分', options: ['4.5 +', '4.0'] },
  { title: '門票供應情況', options: ['即日可用', '明日可用', '免費入場'] },
])
// 假資料
const tickets = [
  {
    id: 1,
    name: '台北故宮博物館',
    image_url:
      'https://ak-d.tripcdn.com/images/fd/tg/g4/M01/72/7D/CggYHFY7F7iAF6-bAAtq3wFHDJY069_C_568_320.jpg_.webp?_fr=wc',
    option: ['台北市', '觀光導覽'],
    comments: '120 則評論',
    price: '5000',
  },
  {
    id: 2,
    name: '台北植物園',
    image_url:
      'https://ak-d.tripcdn.com/images/fd/tg/g4/M01/72/7D/CggYHFY7F7iAF6-bAAtq3wFHDJY069_C_568_320.jpg_.webp?_fr=wc',
    option: ['台北市', '觀光導覽'],
    comments: '230 則評論',
    price: '4000',
  },
  {
    id: 3,
    name: '台北兒童樂園',
    image_url:
      'https://ak-d.tripcdn.com/images/fd/tg/g4/M01/72/7D/CggYHFY7F7iAF6-bAAtq3wFHDJY069_C_568_320.jpg_.webp?_fr=wc',
    option: ['台北市', '歷史景點'],
    comments: '230 則評論',
    price: '4000',
  },
  {
    id: 4,
    name: '台北動物園',
    image_url:
      'https://ak-d.tripcdn.com/images/fd/tg/g4/M01/72/7D/CggYHFY7F7iAF6-bAAtq3wFHDJY069_C_568_320.jpg_.webp?_fr=wc',
    option: ['台北市', '歷史景點'],
    comments: '230 則評論',
    price: '4000',
  },
  {
    id: 5,
    name: '台北101',
    image_url:
      'https://ak-d.tripcdn.com/images/fd/tg/g4/M01/72/7D/CggYHFY7F7iAF6-bAAtq3wFHDJY069_C_568_320.jpg_.webp?_fr=wc',
    option: ['台北市', '觀光導覽'],
    comments: '500 則評論',
    price: '6000',
  },
  {
    id: 6,
    name: '士林夜市',
    image_url:
      'https://ak-d.tripcdn.com/images/fd/tg/g4/M01/72/7D/CggYHFY7F7iAF6-bAAtq3wFHDJY069_C_568_320.jpg_.webp?_fr=wc',
    option: ['台北市', '美食'],
    comments: '300 則評論',
    price: '3000',
  },
  {
    id: 7,
    name: '貓空纜車',
    image_url:
      'https://ak-d.tripcdn.com/images/fd/tg/g4/M01/72/7D/CggYHFY7F7iAF6-bAAtq3wFHDJY069_C_568_320.jpg_.webp?_fr=wc',
    option: ['台北市', '戶外活動'],
    comments: '150 則評論',
    price: '2500',
  },
  {
    id: 8,
    name: '圓山大飯店',
    image_url:
      'https://ak-d.tripcdn.com/images/fd/tg/g4/M01/72/7D/CggYHFY7F7iAF6-bAAtq3wFHDJY069_C_568_320.jpg_.webp?_fr=wc',
    option: ['台北市', '觀光導覽'],
    comments: '100 則評論',
    price: '4500',
  },
  {
    id: 9,
    name: '淡水老街',
    image_url:
      'https://ak-d.tripcdn.com/images/fd/tg/g4/M01/72/7D/CggYHFY7F7iAF6-bAAtq3wFHDJY069_C_568_320.jpg_.webp?_fr=wc',
    option: ['新北市', '歷史景點'],
    comments: '200 則評論',
    price: '3500',
  },
  {
    id: 10,
    name: '北投溫泉',
    image_url:
      'https://ak-d.tripcdn.com/images/fd/tg/g4/M01/72/7D/CggYHFY7F7iAF6-bAAtq3wFHDJY069_C_568_320.jpg_.webp?_fr=wc',
    option: ['台北市', '休閒活動'],
    comments: '180 則評論',
    price: '4000',
  },
  // 可以再加更多資料測試
]

const currentPage = ref(1)
const itemsPerPage = 9

// 切換頁數
const totalPages = computed(() => Math.ceil(tickets.length / itemsPerPage))

const pagedTickets = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return tickets.slice(start, start + itemsPerPage)
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
// 從 query 取得搜尋條件（未來可做過濾）
const route = useRoute()
const searchKeyword = route.query.keyword || ''
const searchCity = route.query.city || ''
</script>

<template class="bg-page">
  <main class="max-w-[1240px] mx-auto w-full bg-page pt-24 min-h-screen">
    <div class="mx-5">
      <section
        class="max-w-[800px] h-16 border border-gray-300 p-2 mx-auto bg-white rounded-full flex flex-row justify-between gap-2">
        <div class="relative flex-auto h-full focus:border focus:border-primary" @mouseenter="isOpen = true"
          @mouseleave="isOpen = false">
          <div
            class="w-full h-full rounded-full border border-gray-300 flex items-center justify-center text-dark_500 hover:text-primary bg-white cursor-pointer"
            @click="isOpen = !isOpen">
            {{ selectedCity || '選擇城市' }}
          </div>

          <div v-if="isOpen"
            class="absolute top-full left-0 w-full overflow-hidden bg-white/50 backdrop-blur-md border border-white/50 z-10 rounded-[20px] shadow-lg">
            <template v-for="group in cities" :key="group.label">
              <!-- group 標題 -->
              <div class="px-4 py-2 text-sm text-white bg-primary font-bold text-center">
                {{ group.label }}
              </div>

              <!-- 城市 grid，每排 3 個 -->
              <div class="grid grid-cols-3 gap-2 p-5">
                <div v-for="city in group.cities" :key="city"
                  class="px-4 py-2 hover:bg-main_100/50 hover:font-bold cursor-pointer whitespace-nowrap text-center rounded-full"
                  @click="selectCity(city)">
                  {{ city }}
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="flex-auto h-full">
          <label class="text-gray-500 rounded-full"></label>
          <input type="text" placeholder="搜尋目的地/當地體驗"
            class="h-full w-full border text-center border-gray-300 rounded-full focus:border focus:border-primary outline-none" />
        </div>

        <div class="text-gray-500 rounded-full h-full flex-none">
          <button
            class="w-full h-full text-center bg-primary hover:bg-main text-white font-bold px-6 py-3 rounded-full transition-colors text-nowrap">
            搜尋
          </button>
        </div>
      </section>
      <section class="gap-5 mt-10 mx-auto flex">
        <aside class="hidden lg:flex flex-col gap-5 w-[285px]">
          <div class="rounded-[20px] p-10 bg-white border">
            <h3 class="font-bold text-xl mb-5">篩選條件</h3>
            <div class="flex flex-col gap-5">
              <!-- Option Filter -->
              <div class="border-b-[1px] pb-5 border-secondary border-solid last:border-b-0"
                v-for="TicketMenu in ticketFiltered" :key="TicketMenu.title">
                <h4 class="font-medium mb-2 text-base">{{ TicketMenu.title }}</h4>
                <div class="space-y-2">
                  <label class="flex cursor-pointer text-sm items-center" v-for="option in TicketMenu.options.slice(
                    0,
                    expandedMenus.includes(TicketMenu.title) ? TicketMenu.options.length : 4,
                  )" :key="option">
                    <input type="checkbox" class="mr-2 focus:ring-primary" />
                    {{ option }}
                  </label>
                  <button v-if="
                    TicketMenu.options.length > 5 && !expandedMenus.includes(TicketMenu.title)
                  " class="text-grey-300 text-sm mt-1" @click="expandedMenus.push(TicketMenu.title)">
                    查看更多選項
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div class="flex flex-1 flex-col gap-5">
          <h3 class="text-black text-2xl">
            找到 <span class="text-red-500 font-bold">{{ tickets.length }}</span> 項當地體驗
          </h3>
          <div class="flex flex-row flex-nowrap items-center gap-2">
            <button class="rounded-[20px] bg-primary hover:bg-main text-white h-full px-4 py-2 font-bold">最多人推薦</button>
            <button class="rounded-[20px] bg-primary hover:bg-main text-white h-full px-4 py-2 font-bold">好評優惠</button>
            <button class="rounded-[20px] bg-primary hover:bg-main text-white h-full px-4 py-2 font-bold">最低價</button>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-5">
            <TicketCard v-for="ticket in pagedTickets" :key="ticket.id" :ticket="ticket" />
          </div>
          <div class="flex justify-center gap-2 mt-5 mb-10">
            <button v-for="page in totalPages" :key="page"
              class="px-3 py-1 border rounded-full text-gray-500 hover:text-primary"
              :class="{ 'bg-primary text-white': currentPage === page }" @click="goToPage(page)">
              {{ page }}
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
