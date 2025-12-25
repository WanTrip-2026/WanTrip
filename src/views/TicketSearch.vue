<script setup lang="ts">
import { ref, computed } from 'vue'
const selectedCity = ref<string>('選擇城市')
const isOpen = ref(false)

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
function selectCity(city: string) {
  selectedCity.value = city
  isOpen.value = false // 選完自動收起
}
const ticketFiltered = [
  { title: '星級', options: ['五星級', '四星級', '三星級'] },
  {
    title: '評價',
    options: ['好極了: 9分以上', '非常好: 8分以上', '好: 7分以上', '令人愉悅: 6分以上'],
  },
  { title: '住宿類型', options: ['飯店', '旅館', '民宿', '度假村'] },
  { title: '付款政策', options: ['免費取消', '立即付款', '延後付款', '到店付款'] },
  {
    title: '設施＆服務',
    options: [
      '健身房',
      '游泳池',
      'SPA服務',
      '停車場',
      '24小時櫃檯服務',
      '可帶寵物',
      '浴缸',
      '山景',
      '夜景',
    ],
  },
  { title: '地區', options: ['中正區', '中山區', '萬華區', '大同區', '松山區'] },
  {
    title: '距離市中心',
    options: [
      '位於市中心',
      '距市中心1.5公里內',
      '距市中心1.5-3公里內',
      '距市中心3-5公里內',
      '距市中心5公里以上',
    ],
  },
]
const expandedMenus = ref<string[]>([]) // 儲存哪些 option 已展開
</script>

<template>
  <main class="max-w-[1200px] mx-auto w-full bg-page pt-24 min-h-screen">
    <!-- search-bar -->
    <section
      class="max-w-[800px] h-[60px] bg-white border border-gray-300 px-5 py-2.5 mx-auto bg-page rounded-full flex flex-row justify-between gap-2.5"
    >
      <div
        class="relative flex-auto h-full focus:ring-primary focus:border-primary"
        @mouseenter="isOpen = true"
        @mouseleave="isOpen = false"
      >
        <div
          class="w-full h-full rounded-full border border-gray-300 flex items-center justify-center text-gray-500 bg-white cursor-pointer"
          @click="isOpen = !isOpen"
        >
          {{ selectedCity || '選擇城市' }}
        </div>

        <div
          v-if="isOpen"
          class="absolute top-full left-0 w-full overflow-hidden bg-white z-50 rounded-[10px]"
        >
          <template v-for="group in cities" :key="group.label">
            <!-- group 標題 -->
            <div class="px-4 py-2 text-sm text-white bg-secondary">
              {{ group.label }}
            </div>

            <!-- 城市 grid，每排 3 個 -->
            <div class="grid grid-cols-3 gap-2">
              <div
                v-for="city in group.cities"
                :key="city"
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap text-center rounded"
                @click="selectCity(city)"
              >
                {{ city }}
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="flex-auto h-full">
        <label class="text-gray-500 rounded-full"></label>
        <input
          type="text"
          placeholder="搜尋目的地/當地體驗"
          class="h-full w-full border text-center border-gray-300 rounded-full focus:ring-primary focus:border-primary outline-none"
        />
      </div>

      <div class="text-gray-500 rounded-full h-full flex-none">
        <button
          class="w-full h-full text-center bg-primary hover:bg-secondary text-white font-bold px-[30px] rounded-full transition-colors text-nowrap"
        >
          搜尋
        </button>
      </div>
    </section>

    <section class="gap-[20px] m-[40px] mx-auto flex">
      <aside class="flex flex-col gap-5 w-[285px]">
        <div class="rounded-[20px] p-10 bg-white">
          <h3 class="font-bold text-xl mb-[20px]">篩選條件</h3>
          <div class="flex flex-col gap-5">
            <!-- Option Filter -->
            <div
              class="border-b-[1px] pb-[20px] border-secondary border-solid last:border-b-0"
              v-for="TicketMenu in ticketFiltered"
              :key="TicketMenu.title"
            >
              <h4 class="font-medium mb-2 text-base">{{ TicketMenu.title }}</h4>
              <div class="space-y-2">
                <label
                  class="flex cursor-pointer text-[14px] items-center"
                  v-for="option in TicketMenu.options.slice(
                    0,
                    expandedMenus.includes(TicketMenu.title) ? TicketMenu.options.length : 4,
                  )"
                  :key="option"
                >
                  <input type="checkbox" class="mr-2 focus:ring-primary" />
                  {{ option }}
                </label>
                <button
                  v-if="TicketMenu.options.length > 5 && !expandedMenus.includes(TicketMenu.title)"
                  class="text-black text-sm mt-1"
                  @click="expandedMenus.push(TicketMenu.title)"
                >
                  展開更多選項
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div class="flex flex-1 flex-col gap-5">
        <h3 class="text-black text-2xl">
          找到 <span class="text-red-500 font-bold">50</span> 項當地體驗
        </h3>
        <div class="flex flex-row flex-nowrap items-center gap-2.5 h-[40px]">
          <button class="rounded-full bg-secondary h-full px-4 py-2 font-bold">最多人推薦</button>
          <button class="rounded-full bg-secondary h-full px-4 py-2 font-bold">好評優惠</button>
          <button class="rounded-full bg-secondary h-full px-4 py-2 font-bold">最低價</button>
        </div>
        <div class="hotel-card rounded-[20px] w-full"><HotelCard class="w-full" /></div>
      </div>
    </section>
  </main>
</template>
