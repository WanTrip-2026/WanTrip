<template>
  <main class="max-w-[1200px] mx-auto min-h-screen lg:px-0 px-5">
    <div class="pt-24 pb-24">
      <SearchBar mode="emit" :initial-keyword="keyword" :initial-range="range"
        :initial-people="{ rooms: peopleConfig.rooms, people: peopleConfig.people }" @search="handleSearchUpdate"
        @update:range="(val) => (range = val)" @update:people="
          (val) => {
            peopleConfig.people = val.people
            peopleConfig.rooms = val.rooms
          }
        " />
      <div v-if="error" class="text-red-600 p-4 bg-red-100 rounded mb-4">
        {{ error }}
      </div>
      <div class="md:hidden relative mb-10">
        <div class="overflow-hidden rounded-30">
          <div class="flex transition-transform duration-500"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }" @touchstart="onTouchStart"
            @touchmove="onTouchMove" @touchend="onTouchEnd">
            <div class="min-w-full h-72" v-for="(img, index) in images" :key="index">
              <img :src="img" class="w-full h-full object-cover rounded-30" alt="飯店圖片" />
            </div>
          </div>
        </div>
        <div class="flex justify-center gap-2 mt-3">
          <button v-for="(img, index) in images" :key="index" @click="goTo(index)" class="w-2.5 h-2.5 rounded-full"
            :class="index === currentIndex ? 'bg-primary' : 'bg-gray-300'"></button>
        </div>
      </div>

      <div class="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-2.5 mb-10">
        <div v-for="(column, colIndex) in desktopGallery" :key="colIndex" :class="column.type === 'large'
          ? 'relative h-[400px] rounded-30 overflow-hidden border border-gray-300 shadow-sm'
          : 'grid grid-rows-2 gap-[10px] h-[400px]'
          ">
          <div v-for="(img, imgIndex) in column.images" :key="imgIndex"
            class="relative h-full rounded-30 overflow-hidden border border-gray-300 shadow-sm">
            <img :src="img"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-125" />
          </div>
        </div>
      </div>

      <div class="bg-white p-5 md:p-[20px] rounded-30 mb-[40px] border border-gray-300 shadow-sm">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center pb-5">
          <div>
            <h2 class="text-2xl md:text-xl font-bold text-dark flex flex-wrap items-center gap-2">
              {{ hotel?.name }}
              <span><svg v-for="n in starCount(hotel?.star_rating)" :key="n" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640" class="w-5 h-5 inline-block fill-current text-yellow-400">
                  <path
                    d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" />
                </svg>
              </span>
            </h2>
            <p class="text-dark text-sm md:text-base mt-2 mb-4">
              {{ hotel?.city }}{{ hotel?.district }}{{ hotel?.address }}
            </p>
          </div>
          <div class="w-full md:w-auto text-left md:text-right border-t md:border-none pt-4 md:pt-0">
            <span class="text-dark-500 text-xs md:text-sm">每晚最低自</span>
            <div class="text-red-600 text-2xl md:text-3xl font-bold">
              NT$ {{ hotel?.min_price.toLocaleString() }}
            </div>
            <button @click="scrollToRooms"
              class="w-full md:w-auto bg-primary text-white text-base px-10 py-3 md:py-[10px] rounded-xl md:rounded-10 hover:bg-main transition mt-3">
              查看房間詳情
            </button>
          </div>
        </div>

        <div class="flex flex-col md:grid md:grid-cols-12 gap-5">
          <div class="w-full md:col-span-8 space-y-5">
            <div class="bg-main-100 rounded-10 p-5 flex flex-col">
              <h3 class="font-bold text-lg mb-4 text-dark">設施與服務</h3>
              <ul class="grid grid-cols-2 md:grid-cols-3 gap-4 text-dark-700">
                <li class="flex flex-col items-center justify-center bg-white rounded-10 py-4">
                  <img src="/src/assets/hoteldetail_img/icon/freeParking.png" class="w-12 h-12 md:w-16 md:h-16 mb-2"
                    alt="免費停車" />
                  <span class="text-sm">免費停車</span>
                </li>
                <li class="flex flex-col items-center justify-center bg-white rounded-10 py-4">
                  <img src="/src/assets/hoteldetail_img/icon/convenient.png" class="w-12 h-12 md:w-16 md:h-16 mb-2"
                    alt="位置便利" />
                  位置便利
                </li>
                <li class="flex flex-col items-center justify-center bg-white rounded-10 py-4">
                  <img src="/src/assets/hoteldetail_img/icon/breakfast.png" class="w-12 h-12 md:w-16 md:h-16 mb-2"
                    alt="美味早餐" />
                  美味早餐
                </li>
              </ul>
              <div v-if="hotel?.facilities?.length" class="mt-4 pt-4 border-t border-gray-300/50">
                <div class="flex flex-wrap gap-2">
                  <span v-for="(fac, i) in hotel.facilities" :key="i"
                    class="text-xs text-dark-700 bg-white px-2 py-1 rounded">
                    {{ fac }}
                  </span>
                </div>
              </div>
            </div>

            <div class="bg-main-100 rounded-10 p-5">
              <h3 class="font-bold text-lg mb-2 text-dark">住宿簡介</h3>
              <ul class="text-gray-600 text-sm leading-relaxed space-y-2">
                <li><span class="font-medium text-dark">電話：</span>{{ hotel?.phone }}</li>
                <li>
                  <span class="font-medium text-dark">信箱：</span>reservation@taipeimarriott.com.tw
                </li>
                <li class="pt-2 text-dark border-t border-gray-300/50 mt-2">
                  {{ hotel?.description }}
                </li>
              </ul>
            </div>
          </div>

          <div class="w-full md:col-span-4 space-y-5 md:space-y-0 md:flex md:flex-col md:gap-5">
            <div class="bg-main-100 rounded-10 p-5">
              <div class="flex items-center gap-3 pb-[10px]">
                <div class="text-3xl font-bold text-primary">8.8</div>
                <div>
                  <p class="text-sm font-bold text-primary">好極了</p>
                  <p class="text-xs text-gray-400">5 則評論</p>
                </div>
              </div>
              <p class="text-sm text-dark">
                除了飯店地理位置方便，還提供行李寄放以及退房後的洗澡需求，真的很感謝！
              </p>
            </div>
            <div class="bg-main-100 rounded-10 p-5 md:flex-1 md:flex md:flex-col">
              <h3 class="font-bold text-lg mb-[10px] text-dark">地圖 & 周邊景點</h3>
              <div
                class="bg-white w-full h-[200px] md:h-auto md:flex-1 rounded-xl overflow-hidden border border-gray-300 shadow-sm relative">
                <iframe v-if="hotel?.latitude && hotel?.longitude" width="100%" height="100%" frameborder="0"
                  style="border: 0" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"
                  :src="`https://maps.google.com/maps?q=${hotel.latitude},${hotel.longitude}&z=15&output=embed`"
                  sandbox="allow-scripts allow-same-origin allow-popups"></iframe>
                <div v-else class="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                  暫無地圖資訊
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="mb-10" id="room-section">
        <div class="bg-white border border-gray-300 rounded-30 p-2 hidden md:flex md:gap-[12px] z-50 shadow-sm">
          <button v-for="tag in ['房型', '服務及設施', '房客評論']" :key="tag" @click="handleTagClick(tag)"
            class="px-6 py-2 bg-primary text-white rounded-full text-lg hover:bg-main transition-colors">
            {{ tag }}
          </button>
        </div>

        <div class="space-y-[20px] pt-5 rounded-30">
          <div v-for="room in rooms" :key="room.id"
            class="flex flex-col md:flex-row bg-white rounded-30 overflow-hidden border border-gray-300 shadow-sm">
            <div class="w-full md:w-[30%] bg-main-100 flex flex-col">
              <div class="bg-main-100 flex items-center p-5 justify-center aspect-[4/3] overflow-hidden">
                <img :src="room.image_url" :alt="room.name" class="w-full h-full object-cover rounded-10" />
              </div>

              <div class="px-5 pb-5 text-left">
                <div class="font-bold text-lg mb-2">{{ room.name }}</div>
                <ul class="text-gray-600 text-sm space-y-1">
                  <li v-for="(item, index) in room.details" :key="index">{{ item }}</li>
                </ul>
              </div>
            </div>

            <div class="w-full md:w-[35%] p-[20px] flex flex-col border-t md:border-t-0 md:border-l border-gray-300">
              <span v-for="(feature, index) in room.features" :key="index"
                class="text-gray-600 text-sm md:px-3 md:py-1">
                {{ feature }}
              </span>
            </div>

            <div
              class="w-full md:w-[10%] p-[20px] flex md:flex-col border-t md:border-t-0 md:border-l border-gray-300 justify-start items-start gap-2">
              <p class="text-gray-600">可入住 {{ room.capacity }} 人</p>

              <!-- [NEW] Room Quantity Selector -->
              <div v-if="room.status === 'available' || room.status === 'sold_out'" class="flex items-center gap-1">
                <select v-model="room.selectedQuantity" @click.stop :disabled="room.status === 'sold_out' && (!room.maxAvailable || room.maxAvailable <= 0)
                  "
                  class="border border-gray-300 rounded px-2 py-2 text-sm bg-white cursor-pointer hover:border-primary focus:outline-none focus:border-primary">
                  <option v-for="n in room.maxAvailable && room.maxAvailable < 999
                    ? room.maxAvailable
                    : 10" :key="n" :value="n">
                    {{ n }} 間
                  </option>
                </select>
              </div>
            </div>

            <div
              class="w-full md:w-[25%] p-[20px] bg-white flex flex-col justify-start border-t md:border-t-0 md:border-l border-gray-300">
              <span class="text-[#D14D4D] font-bold text-2xl self-end">
                NT$ {{ (room.price ?? 0).toLocaleString() }}</span>
              <button @click="handleBook(room)" :disabled="room.status === 'capacity_exceeded' ||
                (room.status === 'sold_out' && (!room.maxAvailable || room.maxAvailable <= 0))
                " :class="[
                  'w-full px-[40px] py-[10px] rounded-full mt-4 font-bold transition-colors',
                  room.status === 'available' ||
                    (room.status === 'sold_out' && room.maxAvailable && room.maxAvailable > 0)
                    ? 'bg-primary text-white hover:bg-main'
                    : 'bg-gray-300 text-white cursor-not-allowed',
                ]">
                <span v-if="room.status === 'sold_out'">
                  {{
                    room.maxAvailable && room.maxAvailable > 0
                      ? `僅剩 ${room.maxAvailable} 間`
                      : '已售完'
                  }}
                </span>
                <span v-else-if="room.status === 'capacity_exceeded'">超過人數上限</span>
                <span v-else>立即預定</span>
              </button>
              <span v-if="room.status === 'available' && room.maxAvailable && room.maxAvailable <= 3"
                class="text-xs text-red-500 text-center mt-2">
                僅剩 {{ room.maxAvailable }} 間
              </span>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-10 p-5 rounded-30 border border-gray-300 bg-white" id="facilities-section">
        <h3 class="text-2xl font-bold mb-6 text-dark flex items-center gap-2">服務及設施</h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Column 1: Cleaning Services -->
          <div class="space-y-4">
            <h4 class="font-bold text-lg text-dark border-b border-gray-200 pb-2">清潔服務</h4>
            <ul class="space-y-3 text-gray-600">
              <li class="flex items-center gap-3">
                <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>洗衣間
              </li>
              <li class="flex items-center gap-3">
                <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>乾洗
              </li>
              <li class="flex items-center gap-3">
                <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>熨燙服務
              </li>
              <li class="flex items-center gap-3">
                <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>外送洗衣服務
              </li>
              <li class="flex items-center gap-3">
                <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>洗衣服務
              </li>
            </ul>
          </div>

          <!-- Column 2: Safety Facilities -->
          <div class="space-y-4">
            <h4 class="font-bold text-lg text-dark border-b border-gray-200 pb-2">安全設施</h4>
            <ul class="space-y-3 text-gray-600">
              <li class="flex items-center gap-3">
                <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>煙霧感應器
              </li>
              <li class="flex items-center gap-3">
                <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>公共區域監視器
              </li>
              <li class="flex items-center gap-3">
                <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>滅火器
              </li>
              <li class="flex items-center gap-3">
                <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>保全人員
              </li>
            </ul>
          </div>

          <!-- Column 3: Front Desk Services -->
          <div class="space-y-4">
            <h4 class="font-bold text-lg text-dark border-b border-gray-200 pb-2">櫃台服務</h4>
            <ul class="space-y-3 text-gray-600">
              <li class="flex items-center gap-3">
                <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>櫃檯保險箱
              </li>
              <li class="flex items-center gap-3">
                <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>行李寄存免費
              </li>
              <li class="flex items-center gap-3">
                <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>英文翻譯
              </li>
            </ul>
          </div>
        </div>

        <!-- Dynamic Facilities from DB -->
        <div v-if="hotel?.facilities?.length" class="mt-8 pt-8 border-t border-gray-200">
          <h4 class="font-bold text-lg text-dark mb-4">其他設施</h4>
          <div class="flex flex-wrap gap-3">
            <span v-for="(facility, index) in hotel.facilities" :key="index"
              class="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm border border-gray-100">
              {{ facility }}
            </span>
          </div>
        </div>
      </section>

      <section class="p-5 rounded-30 border border-gray-300 bg-white" id="reviews-section">
        <h3 class="text-2xl font-bold mb-6 text-dark">房客評論</h3>

        <div class="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 mb-5">
          <div class="rounded-10 p-5 bg-main-100">
            <div class="font-bold text-lg mb-2">綜合評論</div>
            <div class="flex items-end gap-2 mb-2">
              <div class="text-3xl font-bold text-primary">{{ filteredAverageRating }}</div>
              <span class="text-gray-600">(共 {{ filteredReviews.length }} 則評論)</span>
            </div>
            <p class="text-gray-600 text-sm">
              客房乾淨舒適，服務人員親切，交通方便，整體評價良好。
            </p>
          </div>

          <div class="bg-main-100 rounded-10 p-[20px]">
            <div class="font-bold text-lg mb-2">AI 摘要</div>
            <p class="text-gray-600 text-sm">
              多數房客稱讚房間整潔與飯店地點便利，少數建議增加早餐選擇。
            </p>
          </div>
        </div>

        <div class="pb-[20px] flex flex-col md:flex-row gap-3 md:gap-[20px]">
          <div class="grid grid-cols-2 md:flex md:flex-row gap-3 w-full text-dark-900">
            <select v-model="filterMemberType"
              class="w-full md:w-auto rounded-10 px-4 md:px-5 py-[10px] border border-gray-300 text-sm md:text-base">
              <option value="" class="px-5">所有住客類型</option>
              <option v-for="type in memberTypes" :key="type" :value="type">{{ type }}</option>
            </select>

            <select v-model="filterRoomType"
              class="w-full md:w-auto rounded-10 px-4 md:px-5 py-[10px] border border-gray-300 text-sm md:text-base">
              <option value="">所有房型</option>
              <option v-for="room in roomTypes" :key="room" :value="room">{{ room }}</option>
            </select>

            <select v-model="sortOption"
              class="w-full md:w-auto rounded-10 px-4 md:px-5 py-[10px] border border-gray-300 text-sm md:text-base">
              <option value="ratingDesc">評分高到低</option>
              <option value="ratingAsc">評分低到高</option>
              <option value="recent">最新評論</option>
            </select>
          </div>
        </div>

        <div class="space-y-5">
          <div v-for="review in paginatedReviews" :key="review.id"
            class="bg-[#EEF2F7] rounded-10 p-5 flex flex-col gap-5">
            <div class="flex justify-between items-start">
              <div class="flex items-center gap-3">
                <div
                  class="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {{ review.memberName.charAt(0) }}
                </div>
                <div>
                  <div class="font-bold text-dark-900 flex items-center gap-2">
                    {{ review.memberName }}
                    <span class="text-xs font-normal bg-white/90 text-dark-500 px-2 py-0.5 rounded-full">
                      {{ review.memberType }}
                    </span>
                  </div>
                  <div class="text-xs text-dark-500 mt-0.5">
                    {{ review.memberLocation }} · {{ review.date }}
                  </div>
                </div>
              </div>

              <div class="flex flex-col items-end">
                <div class="text-2xl font-black text-primary leading-none">
                  {{ review.rating }}.0
                </div>
                <div class="text-xs font-bold text-primary uppercase tracking-wider mt-1">
                  好極了
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <h4 class="font-bold text-dark-900 text-lg leading-snug">
                {{ review.title }}
              </h4>
              <p class="text-dark-500 text-sm leading-relaxed">
                {{ review.comment }}
              </p>

              <div v-if="review.photos && review.photos.length"
                class="flex gap-3 overflow-x-auto py-2 snap-x snap-mandatory">
                <img v-for="(photo, idx) in review.photos" :key="idx" :src="photo"
                  class="w-32 h-32 md:w-40 md:h-40 object-cover rounded-10 flex-shrink-0 snap-start" alt="評論照片" />
              </div>
            </div>

            <div class="bg-white/90 rounded-10 p-5 flex flex-wrap gap-y-2 gap-x-6 items-center">
              <div class="flex items-center gap-2 text-sm text-dark-500">
                <span class="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                <span class="text-sm font-medium text-dark-700">房型：</span>{{ review.roomType }}
              </div>
              <div class="flex items-center gap-2 text-sm text-dark-500">
                <span class="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                <span class="text-sm font-medium text-dark-700">入住：</span>{{ review.nights }} 晚
                ({{ review.stayDate }})
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center gap-2 mt-4">
          <button v-for="page in totalPages" :key="page" @click="currentPage = page" class="border hover:bg-main-100"
            :class="{
              'bg-primary text-white w-10 h-10 flex justify-center items-center rounded-full hover:bg-main': currentPage === page,
              'text-primary hover:text-black w-10 h-10 flex justify-center items-center rounded-full': currentPage !== page,
            }">
            {{ page }}
          </button>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import { useAuthStore } from '@/stores/auth'
import SearchBar from '../../components/layout/SearchBar.vue'

// --- 1. 型別定義 ---
import { REVIEWS, type Review } from '@/constants/hotel'

interface Hotel {
  id: string
  name: string
  star_rating: number
  city: string
  district: string
  address: string
  min_price: number
  description?: string
  phone?: string
  email?: string
  rating_score?: number
  rating_text?: string
  rating_count?: number
  latitude?: number
  longitude?: number
  facilities?: string[]
}

interface HotelImage {
  id: string
  hotel_id: string
  image_url: string
  sort_order?: number | null
}

interface Room {
  id: string
  name: string
  price: number
  capacity: number
  image_url: string
  details: string[]
  features: string[]
  status?: 'available' | 'sold_out' | 'capacity_exceeded'
  maxAvailable?: number
  selectedQuantity?: number
}

interface SearchPayload {
  keyword: string
  range: [Date, Date]
  rooms: number
  people: number
}

// --- 2. 狀態定義 ---
const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()
const authStore = useAuthStore()

const handleBook = async (room: Room) => {
  console.log('handleBook called with room:', room)
  if (!authStore.isLoggedIn) {
    alert('請先登入會員以完成結帳')
    return
  }

  if (!room) {
    console.error('Room data is missing')
    return
  }

  // Use the specific selected quantity for this room
  const finalRooms = room.selectedQuantity || 1

  // Basic validation against availability just in case
  if (room.maxAvailable !== undefined && room.maxAvailable > 0 && finalRooms > room.maxAvailable) {
    alert(`此房型僅剩 ${room.maxAvailable} 間，無法預訂 ${finalRooms} 間`)
    return
  }

  try {
    const sDate = range.value[0] ? formatDate(range.value[0]) : ''
    const eDate = range.value[1] ? formatDate(range.value[1]) : ''
    const dateStr = sDate && eDate ? `${sDate} - ${eDate}` : ''

    orderStore.setOrder({
      hotel_id: hotel.value?.id,
      room_id: room.id,
      title: hotel.value?.name || '未知名稱',
      subtitle: room.name || '未知房型',
      date: dateStr,
      note: Array.isArray(room.features) ? room.features.join(' / ') : '',
      price: room.price || 0,
      image: room.image_url || '',
      address: hotel.value?.address,
      phone: hotel.value?.phone,
      latitude: hotel.value?.latitude,
      longitude: hotel.value?.longitude,
      type: 'hotel',
      roomQuantity: finalRooms, // Use the adjusted room count
      peopleCount: peopleConfig.people, // Note: Total people count passed for reference
    })
    console.log('Order set successfully, navigating to checkout...')
    router.push('/orders/checkout')
  } catch (err) {
    console.error('Error setting order:', err)
    alert('設定訂單資料時發生錯誤，請稍後再試')
  }
}

const scrollToTarget = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const headerOffset = 96
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

const scrollToRooms = () => {
  scrollToTarget('room-section')
}

const handleTagClick = (tag: string) => {
  const map: Record<string, string> = {
    房型: 'room-section',
    服務及設施: 'facilities-section',
    房客評論: 'reviews-section',
  }

  const id = map[tag]
  if (id) {
    scrollToTarget(id)
  }
}

const hotel = ref<Hotel | null>(null)
const images = ref<string[]>([])
const rooms = ref<Room[]>([])
const error = ref<string | null>(null)

// 搜尋狀態
const keyword = ref('')
const range = ref<[Date, Date]>([
  new Date(),
  new Date(new Date().setDate(new Date().getDate() + 1)),
])
const peopleConfig = reactive({ people: 2, rooms: 1 })

// 評論與篩選狀態
const filterMemberType = ref('')
const filterRoomType = ref('')
const sortOption = ref('ratingDesc')
const currentPage = ref(1)
const reviewsPerPage = 2

// 輪播狀態
const currentIndex = ref(0)
const startX = ref(0)
const endX = ref(0)

const reviews = ref<Review[]>(REVIEWS)

// --- 3. 核心邏輯 ---

const formatDate = (date: Date | null): string => {
  if (!date) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// --- 從 URL 解析參數的函式 ---
const initStatesFromUrl = () => {
  const { keyword: urlKeyword, start_date, end_date, adults, rooms } = route.query

  if (urlKeyword) {
    keyword.value = String(urlKeyword)
  }

  if (start_date && end_date) {
    const start = new Date(String(start_date))
    const end = new Date(String(end_date))

    // 檢查轉換是否成功
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      range.value = [start, end]
    }
  }

  if (adults) peopleConfig.people = Number(adults)
  if (rooms) peopleConfig.rooms = Number(rooms)
}

// 動態生成選項
const memberTypes = computed(() => Array.from(new Set(reviews.value.map((r) => r.memberType))))
const roomTypes = computed(() => rooms.value.map((r) => r.name))
const fetchHotelDetail = async () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL
  if (!apiUrl) return

  // 1. 取得 ID
  const rawId = route.params.id
  const id = Array.isArray(rawId) ? rawId[0] : rawId

  if (!id) {
    error.value = '無法取得飯店 ID'
    return
  }

  try {
    // 2. 設定 URL
    const hotelUrl = `${apiUrl}/hotels/${id}`
    const imagesUrl = `${apiUrl}/hotel_images/${id}`

    // Construct rooms URL with query params
    const roomsUrl = new URL(`${apiUrl}/hotels/${id}/rooms`)
    if (range.value[0] && range.value[1]) {
      const sDate = formatDate(range.value[0])
      const eDate = formatDate(range.value[1])
      roomsUrl.searchParams.append('start_date', sDate)
      roomsUrl.searchParams.append('end_date', eDate)
    }
    roomsUrl.searchParams.append('adults', String(peopleConfig.people))
    roomsUrl.searchParams.append('rooms', String(peopleConfig.rooms))

    // 3. 同時發送請求
    const [hotelRes, imagesRes, roomsRes] = await Promise.all([
      fetch(hotelUrl),
      fetch(imagesUrl),
      fetch(roomsUrl),
    ])

    // 4. 檢查狀態
    if (!hotelRes.ok) throw new Error(`取得飯店資料失敗：${hotelRes.status}`)
    if (!imagesRes.ok) throw new Error(`取得飯店圖片失敗：${imagesRes.status}`)
    if (!roomsRes.ok) {
      const errData = await roomsRes.json().catch(() => ({}))
      console.error('Room fetch error details:', errData)
      throw new Error(
        `取得房型資料失敗：${roomsRes.status} ${errData.message || (errData.supabase_error ? errData.supabase_error.message : '')}`,
      )
    }

    // 5. 解析資料 (直接用 .json() 比較簡潔)
    const hotelData = (await hotelRes.json()) as Hotel

    const imgData = (await imagesRes.json()) as HotelImage[]
    const apiRooms = (await roomsRes.json()) as Omit<Room, 'features'>[]

    // 6. 更新狀態
    hotel.value = hotelData
    if (hotelData.name) keyword.value = hotelData.name

    // PATCH: 若 detail api 沒回傳 facilities，嘗試從列表 api 補抓
    if (!hotelData.facilities || hotelData.facilities.length === 0) {
      if (hotelData.name) {
        try {
          const listRes = await fetch(
            `${apiUrl}/hotels?keyword=${encodeURIComponent(hotelData.name)}`,
          )
          if (listRes.ok) {
            const listData = await listRes.json()
            const found = (listData.hotels || []).find((h: { id: unknown }) => h.id === hotelData.id)
            if (found && found.facilities) {
              hotelData.facilities = found.facilities
              hotel.value = { ...hotelData } // trigger reactivity
            }
          }
        } catch (e) {
          console.warn('Fallback fetch facilities failed', e)
        }
      }
    }

    // 處理圖片
    images.value = imgData
      .sort((a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999))
      .map((img) => img.image_url)

    // 處理房型 (加入預設特徵 & 初始化選取數量)
    rooms.value = apiRooms.map((r) => {
      // Calculate max select options
      const max = r.maxAvailable && r.maxAvailable < 999 ? r.maxAvailable : 10
      // Default to searched rooms, capped by availability and reasonable limit
      let defaultQty = peopleConfig.rooms
      if (defaultQty > max) defaultQty = max
      if (defaultQty < 1) defaultQty = 1

      return {
        ...r,
        features: ['即時確認', '線上預付', '豐盛早餐 NT$450 (現場選購)', '12歲以下兒童免費加床'],
        selectedQuantity: defaultQty,
      }
    })

    // 7. 隨機分配評論的房型 (讓 UI 看起來比較真實)
    if (rooms.value.length > 0) {
      if (reviews.value) {
        // Ensure reviews is not undefined
        reviews.value = reviews.value.map((review) => ({
          ...review,
          roomType: rooms.value[Math.floor(Math.random() * rooms.value.length)]?.name || '標準房',
        }))
      }
    }

    error.value = null
  } catch (err: unknown) {
    console.error('[HotelDetail error]', err)
    error.value = err instanceof Error ? err.message : '取得飯店資料時發生錯誤'
  }
}

// Watch for changes and refetch
// [Modified] Disable live watcher to align with "Search Button" trigger behavior
// watch(
//   [range, () => peopleConfig.people, () => peopleConfig.rooms],
//   () => {
//     fetchHotelDetail()
//   },
//   { deep: true },
// )

// --- 4. 計算屬性 ---
const desktopGallery = computed(() => [
  { type: 'large', images: images.value.slice(0, 1) },
  { type: 'stack', images: images.value.slice(1, 3) },
  { type: 'stack', images: images.value.slice(3, 5) },
  { type: 'stack', images: images.value.slice(5, 7) },
])

const filteredReviews = computed(() => {
  let result = [...reviews.value]
  if (filterMemberType.value) result = result.filter((r) => r.memberType === filterMemberType.value)
  if (filterRoomType.value) result = result.filter((r) => r.roomType === filterRoomType.value)

  if (sortOption.value === 'ratingDesc') result.sort((a, b) => b.rating - a.rating)
  else if (sortOption.value === 'ratingAsc') result.sort((a, b) => a.rating - b.rating)
  else if (sortOption.value === 'recent')
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return result
})

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * reviewsPerPage
  return filteredReviews.value.slice(start, start + reviewsPerPage)
})

const totalPages = computed(() => Math.ceil(filteredReviews.value.length / reviewsPerPage))
const filteredAverageRating = computed(() => {
  if (filteredReviews.value.length === 0) return '0.0'
  const total = filteredReviews.value.reduce((sum, r) => sum + r.rating, 0)
  return (total / filteredReviews.value.length).toFixed(1)
})
// --- 5. 事件處理 ---
const handleSearchUpdate = (data: SearchPayload) => {
  // 1. 同步本地狀態，確保 SearchBar UI 顯示正確
  keyword.value = data.keyword
  range.value = data.range
  peopleConfig.people = data.people
  peopleConfig.rooms = data.rooms

  // 2. 如果關鍵字變了，通常代表 user 想找別家店，這時才跳轉回搜尋頁
  if (hotel.value && data.keyword && data.keyword !== hotel.value.name) {
    router.push({
      path: '/hotels/search',
      query: {
        keyword: data.keyword,
        start_date: formatDate(data.range[0]),
        end_date: formatDate(data.range[1]),
        adults: String(data.people),
        rooms: String(data.rooms),
      },
    })
  } else {
    // 只是改日期或人數，留在本頁重新抓取該飯店的最新房價/空房
    // [NEW] 使用 router.replace 更新網址參數，保持狀態同步且不增加多餘的 history 堆疊
    router.replace({
      query: {
        ...route.query,
        start_date: formatDate(data.range[0]),
        end_date: formatDate(data.range[1]),
        adults: String(data.people),
        rooms: String(data.rooms),
      },
    })

    // [Modified] Manually trigger fetch since we removed the watcher
    fetchHotelDetail()
  }
}

const starCount = (stars: number | undefined): number => {
  return stars || 0
}

// --- 6. 生命週期 ---
onMounted(() => {
  initStatesFromUrl()
  fetchHotelDetail()
})

watch(
  () => route.params.id,
  () => {
    fetchHotelDetail()
  },
)

// 輪播手勢
const goTo = (index: number) => {
  currentIndex.value = index
}
const onTouchStart = (e: TouchEvent) => {
  const touch = e.touches[0]
  if (touch) {
    startX.value = touch.clientX
    endX.value = touch.clientX
  }
}

const onTouchMove = (e: TouchEvent) => {
  const touch = e.touches[0]
  if (touch) {
    endX.value = touch.clientX
  }
}

const onTouchEnd = () => {
  const diff = endX.value - startX.value
  const len = images.value.length
  if (len > 0 && Math.abs(diff) > 50) {
    if (diff < 0) currentIndex.value = (currentIndex.value + 1) % len
    else currentIndex.value = (currentIndex.value - 1 + len) % len
  }
}
</script>
