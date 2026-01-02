<template>
  <div class="max-w-[1200px] mx-auto min-h-screen px-5">
    <div class="py-24">
      <section
        class="max-w-[1200px] w-full p-2 mb-5 bg-white rounded-2xl md:rounded-full border border-gray-300 flex flex-col md:flex-row items-center gap-3"
      >
        <div class="relative w-full h-12 md:h-full flex-1">
          <input
            type="text"
            placeholder="台北萬豪酒店"
            class="h-10 w-full pl-4 md:pl-10 pr-4 text-sm md:text-base border-none bg-gray-50 md:bg-transparent rounded-xl md:rounded-full focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <div class="hidden md:block w-[1px] h-8 bg-gray-200"></div>
        <div class="relative w-full h-12 md:h-full flex-1">
          <input
            type="text"
            placeholder="入住及退房日期"
            class="h-10 w-full pl-4 md:pl-10 pr-4 text-sm md:text-base border-none bg-gray-50 md:bg-transparent rounded-xl md:rounded-full focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <div class="hidden md:block w-[1px] h-8 bg-gray-200"></div>
        <div class="relative w-full h-12 md:h-full flex-1">
          <input
            type="text"
            placeholder="2 位成人 · 1 間房"
            class="h-10 w-full pl-4 md:pl-10 pr-4 text-sm md:text-base border-none bg-gray-50 md:bg-transparent rounded-xl md:rounded-full focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <div class="w-full md:w-auto h-12 md:h-full">
          <button
            class="h-10 w-full md:w-auto bg-primary hover:bg-[#6D8FA3] text-white py-1 px-7 rounded-xl md:rounded-full transition-colors whitespace-nowrap"
          >
            搜尋
          </button>
        </div>
      </section>
      <div class="md:hidden relative mb-10">
        <div class="overflow-hidden rounded-[20px]">
          <div
            class="flex transition-transform duration-500"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
          >
            <div class="min-w-full h-72" v-for="(img, index) in images" :key="index">
              <img :src="img" class="w-full h-full object-cover" alt="飯店圖片" />
            </div>
          </div>
        </div>
        <div class="flex justify-center gap-2 mt-3">
          <button
            v-for="(img, index) in images"
            :key="index"
            @click="goTo(index)"
            class="w-2.5 h-2.5 rounded-full"
            :class="index === currentIndex ? 'bg-primary' : 'bg-gray-300'"
          ></button>
        </div>
      </div>

      <div class="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-[10px] mb-[40px]">
        <div class="relative h-[400px] rounded-[20px] overflow-hidden border border-black/30">
          <img
            src="/src/assets/hoteldetail_img/Wanhao.jpg"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-125"
          />
        </div>

        <div class="grid grid-rows-2 gap-[10px] h-[400px]">
          <div class="relative rounded-[20px] overflow-hidden border border-black/30">
            <img
              src="/src/assets/hoteldetail_img/Wanhao2.jpg"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-125"
            />
          </div>

          <div class="relative rounded-[20px] overflow-hidden border border-black/30">
            <img
              src="/src/assets/hoteldetail_img/Wanhao3.jpg"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-125"
            />
          </div>
        </div>

        <div class="grid grid-rows-2 gap-[10px] h-[400px]">
          <div class="relative rounded-[20px] overflow-hidden border border-black/30">
            <img
              src="/src/assets/hoteldetail_img/Wanhao4.jpg"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-125"
            />
          </div>

          <div class="relative rounded-[20px] overflow-hidden border border-black/30">
            <img
              src="/src/assets/hoteldetail_img/Wanhao5.jpg"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-125"
            />
          </div>
        </div>

        <div class="grid grid-rows-2 gap-[10px] h-[400px]">
          <div class="relative rounded-[20px] overflow-hidden border border-black/30">
            <img
              src="/src/assets/hoteldetail_img/Wanhao6.jpg"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-125"
            />
          </div>

          <div class="relative rounded-[20px] overflow-hidden border border-black/30">
            <img
              src="/src/assets/hoteldetail_img/Wanhao7.jpg"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-125"
            />
          </div>
        </div>
      </div>

      <div class="bg-white p-5 md:p-[20px] rounded-[20px] mb-[40px] border border-black/30">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center pb-5">
          <div>
            <h2
              class="text-2xl md:text-[28px] font-bold text-black flex flex-wrap items-center gap-2"
            >
              台北萬豪酒店 (Taipei Marriott Hotel)
              <span class="text-yellow-500 text-base md:text-xl">★★★★★</span>
            </h2>
            <p class="text-black text-sm md:text-base mt-2 mb-4">台灣台北市中山區樂群二路199號</p>
          </div>
          <div
            class="w-full md:w-auto text-left md:text-right border-t md:border-none pt-4 md:pt-0"
          >
            <span class="text-gray-400 text-xs md:text-sm">每晚最低自</span>
            <div class="text-[#D14D4D] text-2xl md:text-3xl font-bold">NT$ 6,166</div>
            <button
              class="w-full md:w-auto bg-primary text-white text-base px-10 py-3 md:py-[10px] rounded-xl md:rounded-[20px] hover:bg-[#4a6b78] transition mt-3"
            >
              查看房間詳情
            </button>
          </div>
        </div>

        <div class="flex flex-col md:grid md:grid-cols-12 gap-5">
          <div class="w-full md:col-span-8 space-y-5">
            <div class="bg-[#EEF2F7] rounded-[20px] p-5 flex flex-col">
              <h3 class="font-bold text-lg mb-4">設施與服務</h3>
              <ul class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <li class="flex flex-col items-center justify-center bg-white rounded-[20px] py-4">
                  <img
                    src="/src/assets/hoteldetail_img/icon/freeParking.png"
                    class="w-12 h-12 md:w-16 md:h-16 mb-2"
                    alt="免費停車"
                  />
                  <span class="text-sm">免費停車</span>
                </li>
                <li class="flex flex-col items-center justify-center bg-white rounded-[20px] py-4">
                  <img
                    src="/src/assets/hoteldetail_img/icon/convenient.png"
                    class="w-12 h-12 md:w-16 md:h-16 mb-2"
                    alt="位置便利"
                  />
                  位置便利
                </li>
                <li class="flex flex-col items-center justify-center bg-white rounded-[20px] py-4">
                  <img
                    src="/src/assets/hoteldetail_img/icon/breakfast.png"
                    class="w-12 h-12 md:w-16 md:h-16 mb-2"
                    alt="美味早餐"
                  />
                  美味早餐
                </li>
              </ul>
            </div>

            <div class="bg-[#EEF2F7] rounded-[20px] p-5">
              <h3 class="font-bold text-lg mb-2">住宿簡介</h3>
              <ul class="text-gray-600 text-sm leading-relaxed space-y-2">
                <li><span class="font-medium text-black">電話：</span>+886-2-8502-9999</li>
                <li>
                  <span class="font-medium text-black">信箱：</span
                  >reservation@taipeimarriott.com.tw
                </li>
                <li class="pt-2 text-black border-t border-gray-300/50 mt-2">
                  台北萬豪酒店是一家位於台北市中山區大直地區的五星級豪華酒店，坐落於基隆河畔的都市綠洲，
                  結合住宿、餐飲、會議與休閒設施於一身，廣受商務與休閒旅客青睞。酒店於 2015 年 9 月
                  28 日正式開幕，是萬豪國際在台北的重要旗艦酒店之一。
                </li>
              </ul>
            </div>
          </div>

          <div class="w-full md:col-span-4 space-y-5">
            <div class="bg-[#EEF2F7] rounded-[20px] p-5">
              <div class="flex items-center gap-3 pb-[10px]">
                <div class="text-3xl font-bold text-secondary">9.2</div>
                <div>
                  <p class="text-sm font-bold text-gray-600">超棒</p>
                  <p class="text-xs text-gray-400">1,245 則評論</p>
                </div>
              </div>
              <p class="text-sm text-black">
                除了飯店地理位置方便，還提供行李寄放以及退房後的洗澡需求，真的很感謝！
              </p>
            </div>
            <div class="bg-[#EEF2F7] rounded-2xl p-5">
              <h3 class="font-bold text-lg mb-[10px]">地圖 & 周邊景點</h3>
              <div class="bg-white w-full h-[200px] md:h-[272px] rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>

      <section class="mb-[40px]">
        <div class="flex gap-[12px]">
          <button
            v-for="tag in ['房型', '房客評論', '服務及設施', '政策']"
            :key="tag"
            class="px-6 py-2 bg-primary text-white rounded-[12px] text-lg"
          >
            {{ tag }}
          </button>
        </div>

        <div class="space-y-[20px] pt-4 rounded-[20px]">
          <div
            v-for="room in rooms"
            :key="room.id"
            class="flex flex-col md:flex-row bg-white rounded-[20px] overflow-hidden border border-black/30"
          >
            <div class="w-full md:w-[30%] bg-[#EEF2F7] flex flex-col">
              <div
                class="bg-[#EEF2F7] flex items-center p-5 justify-center aspect-[4/3] overflow-hidden"
              >
                <img
                  :src="room.image"
                  :alt="room.name"
                  class="w-full h-full rounded-[20px] object-cover"
                />
              </div>

              <div class="px-5 pb-5 text-left">
                <div class="font-bold text-lg mb-2">{{ room.name }}</div>
                <ul class="text-gray-600 text-sm space-y-1">
                  <li v-for="(item, index) in room.details" :key="index">{{ item }}</li>
                </ul>
              </div>
            </div>

            <div
              class="w-full md:w-[35%] p-[20px] flex flex-col border-t md:border-t-0 md:border-l border-gray-200"
            >
              <span
                v-for="(feature, index) in room.features"
                :key="index"
                class="text-gray-600 text-sm md:px-3 md:py-1"
              >
                {{ feature }}
              </span>
            </div>

            <div
              class="w-full md:w-[10%] p-[20px] flex border-t md:border-t-0 md:border-l border-gray-200 justify-start items-start"
            >
              <p class="text-gray-600">可入住 {{ room.capacity }} 人</p>
            </div>

            <div
              class="w-full md:w-[25%] p-[20px] bg-white flex flex-col justify-start border-t md:border-t-0 md:border-l border-gray-200"
            >
              <span class="text-[#D14D4D] font-bold text-2xl self-end">NT$ {{ room.price }}</span>
              <button
                class="bg-primary text-white px-[40px] py-[10px] rounded-[10px] mt-4 font-bold"
              >
                立即預定
              </button>
              <button
                class="bg-white text-primary border border-primary px-[40px] py-[10px] rounded-[10px] mt-4 font-bold"
              >
                加入收藏
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="p-[20px] rounded-[20px] border border-black/30 bg-[white]">
        <h3 class="text-2xl font-bold mb-6">房客評論</h3>

        <div class="grid grid-cols-2 gap-8 mb-[20px]">
          <div class="rounded-[20px] p-[20px] bg-[#EEF2F7]">
            <div class="font-bold text-lg mb-2">綜合評論</div>
            <div class="flex items-end gap-2 mb-2">
              <div class="text-3xl font-bold text-secondary">{{ filteredAverageRating }}</div>
              <span class="text-gray-600">(共 {{ filteredReviews.length }} 則評論)</span>
            </div>
            <p class="text-gray-600 text-sm">
              客房乾淨舒適，服務人員親切，交通方便，整體評價良好。
            </p>
          </div>

          <div class="bg-[#EEF2F7] rounded-[20px] p-[20px]">
            <div class="font-bold text-lg mb-2">AI 摘要</div>
            <p class="text-gray-600 text-sm">
              多數房客稱讚房間整潔與飯店地點便利，少數建議增加早餐選擇。
            </p>
          </div>
        </div>

        <div class="pb-[20px] flex gap-[20px]">
          <select
            v-model="filterMemberType"
            class="rounded-[12px] px-[20px] py-[10px] border border-black/30"
          >
            <option value="">所有住客類型</option>
            <option v-for="type in memberTypes" :key="type" :value="type">{{ type }}</option>
          </select>

          <select
            v-model="filterRoomType"
            class="rounded-[12px] px-[20px] py-[10px] border border-black/30"
          >
            <option value="">所有房型</option>
            <option v-for="room in roomTypes" :key="room" :value="room">{{ room }}</option>
          </select>

          <select
            v-model="sortOption"
            class="rounded-[12px] px-[20px] py-[10px] border border-black/30"
          >
            <option value="ratingDesc">評分高到低</option>
            <option value="ratingAsc">評分低到高</option>
            <option value="recent">最新評論</option>
          </select>
        </div>

        <div class="space-y-5">
          <div
            v-for="review in paginatedReviews"
            :key="review.id"
            class="bg-[#EEF2F7] rounded-[20px] p-5 flex flex-col gap-5"
          >
            <div class="flex justify-between items-start">
              <div class="flex items-center gap-3">
                <div
                  class="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0"
                >
                  {{ review.memberName.charAt(0) }}
                </div>
                <div>
                  <div class="font-bold text-gray-900 flex items-center gap-2">
                    {{ review.memberName }}
                    <span
                      class="text-[12px] font-normal bg-white/90 text-gray-500 px-2 py-0.5 rounded-full"
                    >
                      {{ review.memberType }}
                    </span>
                  </div>
                  <div class="text-xs text-gray-500 mt-0.5">
                    {{ review.memberLocation }} · {{ review.date }}
                  </div>
                </div>
              </div>

              <div class="flex flex-col items-end">
                <div class="text-2xl font-black text-primary leading-none">
                  {{ review.rating }}.0
                </div>
                <div class="text-[10px] font-bold text-primary uppercase tracking-wider mt-1">
                  Excellent
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <h4 class="font-bold text-gray-900 text-lg leading-snug">
                {{ review.title }}
              </h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                {{ review.comment }}
              </p>

              <div
                v-if="review.photos && review.photos.length"
                class="flex gap-3 overflow-x-auto py-2 scrollbar-hide"
              >
                <img
                  v-for="(photo, idx) in review.photos"
                  :key="idx"
                  :src="photo"
                  class="w-32 h-32 md:w-40 md:h-40 object-cover rounded-[20px] flex-shrink-0"
                  alt="評論照片"
                />
              </div>
            </div>

            <div
              class="bg-white/90 rounded-[10px] md:rounded-[20px] p-5 flex flex-wrap gap-y-2 gap-x-6 items-center"
            >
              <div class="flex items-center gap-2 text-xs text-gray-500">
                <span class="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                <span class="text-xs font-medium text-gray-700">房型：</span>{{ review.roomType }}
              </div>
              <div class="flex items-center gap-2 text-xs text-gray-500">
                <span class="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                <span class="text-xs font-medium text-gray-700">入住：</span>{{ review.nights }} 晚
                ({{ review.stayDate }})
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center gap-2 mt-4">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="
              page === currentPage
                ? 'bg-primary text-white px-3 py-1 rounded-[20px]'
                : 'bg-gray-200 text-primary px-3 py-1 rounded-[20px]'
            "
          >
            {{ page }}
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Room {
  id: number
  name: string
  price: string
  capacity: number
  features: string[]
  details: string[]
  image: string
}

interface Review {
  id: number
  memberName: string
  memberLocation: string
  memberType: string
  rating: number
  roomType: string
  nights: number
  stayDate: string
  title: string
  comment: string
  photos?: string[]
  date: string
}

const totalPages = computed(() => Math.ceil(filteredReviews.value.length / reviewsPerPage.value))
const currentIndex = ref(0)
const startX = ref(0)
const endX = ref(0)

const images = [
  '/src/assets/hoteldetail_img/Wanhao.jpg',
  '/src/assets/hoteldetail_img/Wanhao2.jpg',
  '/src/assets/hoteldetail_img/Wanhao3.jpg',
  '/src/assets/hoteldetail_img/Wanhao4.jpg',
  '/src/assets/hoteldetail_img/Wanhao5.jpg',
  '/src/assets/hoteldetail_img/Wanhao6.jpg',
  '/src/assets/hoteldetail_img/Wanhao7.jpg',
]

const goTo = (index: number) => {
  currentIndex.value = index
}

const onTouchStart = (e: TouchEvent) => {
  const touch = e.touches?.[0]
  if (!touch) return // 保護空陣列
  startX.value = touch.clientX
}

const onTouchMove = (e: TouchEvent) => {
  const touch = e.touches?.[0]
  if (!touch) return
  endX.value = touch.clientX
}

const onTouchEnd = () => {
  const diff = endX.value - startX.value
  if (Math.abs(diff) > 50) {
    if (diff < 0) {
      currentIndex.value = (currentIndex.value + 1) % images.length
    } else {
      currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
    }
  }
  startX.value = 0
  endX.value = 0
}

const rooms = ref<Room[]>([
  {
    id: 1,
    name: '豪華大床房',
    price: '8,714',
    capacity: 2,
    features: ['豐盛早餐付費 TWD935 (選購)', '2026年2月16日前可免費取消', '即時確認', '線上預付'],
    details: [
      '1張特大雙人床',
      '城市景觀',
      '禁菸',
      '40平方公尺 | 樓層：11-12',
      '免費 Wi-Fi',
      '空調',
      '私人浴室',
    ],
    image: '/src/assets/hoteldetail_img/Wanhao5.jpg',
  },

  {
    id: 2,
    name: '豪華雙床房',
    price: '8,150',
    capacity: 4,
    features: ['豐盛早餐付費 TWD935 (選購)', '不可退款', '即時確認', '線上預付'],
    details: [
      '2張單人床',
      '城市景觀',
      '禁菸',
      '40平方公尺 | 樓層：11-12',
      '免費 Wi-Fi',
      '空調',
      '私人浴室',
    ],
    image: '/src/assets/hoteldetail_img/Wanhao5.jpg',
  },
  {
    id: 3,
    name: '經典大床房',
    price: '10,626',
    capacity: 1,
    features: ['豐盛早餐付費 TWD935 (選購)', '不可退款', '即時確認', '到店付款'],
    details: [
      '1張特大雙人床',
      '城市景觀',
      '禁菸',
      '40平方公尺 | 樓層：6-10',
      '免費 Wi-Fi',
      '空調',
      '私人浴室',
    ],
    image: '/src/assets/hoteldetail_img/Wanhao5.jpg',
  },
])

const reviews = ref<Review[]>([
  {
    id: 1,
    memberName: 'Christin',
    memberLocation: '台灣',
    memberType: '商務旅客',
    rating: 10,
    roomType: '經典特大床間',
    nights: 1,
    stayDate: '2024年12月',
    title: '非常棒的住宿體驗！',
    comment: '房間舒適整潔，員工服務親切，交通便利，下次還會再來！',
    photos: ['photo1.jpg', 'photo2.jpg'],
    date: '2024/12/05',
  },
  {
    id: 2,
    memberName: 'Jason',
    memberLocation: '香港',
    memberType: '休閒旅客',
    rating: 9,
    roomType: '豪華雙人房- 含陽台',
    nights: 2,
    stayDate: '2024年11月',
    title: '位置優越，早餐豐富',
    comment: '飯店位置很好，走路就能到捷運站，早餐種類多樣且美味，房間有陽台景觀佳。',
    photos: ['photo3.jpg'],
    date: '2024/11/18',
  },
  {
    id: 3,
    memberName: 'Sophia',
    memberLocation: '新加坡',
    memberType: '家庭旅客',
    rating: 8,
    roomType: '家庭套房- 帶兩張雙人床',
    nights: 3,
    stayDate: '2024年10月',
    title: '適合帶小孩入住',
    comment: '房間寬敞，床鋪舒適，帶孩子入住很方便，附近有商場和公園。',
    photos: [],
    date: '2024/10/12',
  },
  {
    id: 4,
    memberName: 'Emily',
    memberLocation: '日本',
    memberType: '情侶旅客',
    rating: 10,
    roomType: '浪漫套房- 含按摩浴缸',
    nights: 1,
    stayDate: '2024年09月',
    title: '非常浪漫的住宿體驗',
    comment: '房間布置浪漫，浴室有按摩浴缸，適合慶祝紀念日，服務也非常周到。',
    photos: ['photo4.jpg', 'photo5.jpg', 'photo6.jpg'],
    date: '2024/09/22',
  },
  {
    id: 5,
    memberName: 'Michael',
    memberLocation: '台灣',
    memberType: '商務旅客',
    rating: 7,
    roomType: '單人商務房',
    nights: 2,
    stayDate: '2024年08月',
    title: '房間整潔，但空調有點吵',
    comment: '整體住宿還不錯，房間乾淨，唯獨空調運作聲音稍大，影響睡眠。',
    photos: [],
    date: '2024/08/30',
  },
])

// 篩選條件
const filterMemberType = ref('')
const filterRoomType = ref('')
const sortOption = ref('ratingDesc')

// 動態生成選項
const memberTypes = computed(() => Array.from(new Set(reviews.value.map((r) => r.memberType))))
const roomTypes = computed(() => Array.from(new Set(reviews.value.map((r) => r.roomType))))

// 篩選 + 排序後的評論
const filteredReviews = computed(() => {
  let result = reviews.value

  // 篩選住客類型
  if (filterMemberType.value) {
    result = result.filter((r) => r.memberType === filterMemberType.value)
  }

  // 篩選房型
  if (filterRoomType.value) {
    result = result.filter((r) => r.roomType === filterRoomType.value)
  }

  // 排序
  if (sortOption.value === 'ratingDesc') {
    result = [...result].sort((a, b) => b.rating - a.rating)
  } else if (sortOption.value === 'ratingAsc') {
    result = [...result].sort((a, b) => a.rating - b.rating)
  } else if (sortOption.value === 'recent') {
    result = [...result].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  return result
})

// 計算篩選後的平均分數
const filteredAverageRating = computed(() => {
  if (filteredReviews.value.length === 0) return '0.0'
  const total = filteredReviews.value.reduce((sum, r) => sum + r.rating, 0)
  return (total / filteredReviews.value.length).toFixed(1)
})

const currentPage = ref(1) // 當前頁
const reviewsPerPage = ref(2) // 每頁顯示評論數

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * reviewsPerPage.value
  const end = start + reviewsPerPage.value
  return filteredReviews.value.slice(start, end)
})
</script>
