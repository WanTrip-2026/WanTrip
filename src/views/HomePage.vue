<template>
  <!-- Page wrapper（不含 navbar / footer） -->
  <main class="min-h-screen max-w-[1240px] mx-auto pt-24 overflow-x-hidden mb-20">
    <div class="mx-5">
      <!-- Banner -->
      <section class="relative pb-32 md:pb-20">
        <div class="relative">
          <div class="relative w-full overflow-hidden rounded-[40px] bg-gray-200 shadow-sm">
            <img src="https://res.cloudinary.com/wantrip/image/upload/v1767445158/%E5%9F%8E%E5%B8%82_luoarw.jpg"
              class="aspect-[3/4] absolute inset-0 w-full h-full object-fill" alt="banner" />
            <div class="h-[340px] md:h-[420px]"></div>
          </div>

          <!-- Search Bar (floating on banner) -->
          <div class="absolute inset-x-0 bottom-0 z-20 flex justify-center translate-y-1/2">
            <form
              class="w-full lg:max-w-[1024px] rounded-[28px] md:rounded-full border border-gray-300 bg-white shadow-sm p-2"
              @submit.prevent="onSearch">
              <div class="flex flex-col gap-2 md:flex-row md:items-center">
                <!-- Tabs -->
                <div class="h-11 flex items-center rounded-full border border-gray-300 bg-dark_100 p-0.5">
                  <button type="button"
                    class="h-full rounded-full text-nowrap w-full text-sm font-semibold transition px-4" :class="activeTab === 'package'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-dark hover:bg-main_100'
                      " @click="activeTab = 'package'">
                    找門票
                  </button>
                  <button type="button"
                    class="h-full rounded-full text-nowrap w-full text-sm font-semibold transition px-4" :class="activeTab === 'stay'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-dark hover:bg-main_100'
                      " @click="activeTab = 'stay'">
                    找住宿
                  </button>
                </div>

                <!-- Fields -->
                <div class="grid flex-1 grid-cols-1 gap-2 md:grid-cols-3">
                  <label class="h-11 flex items-center rounded-full border border-gray-300 bg-white p-1">
                    <span class="ml-2 mr-1 text-sm text-nowrap font-semibold text-primary/80">想去哪裡</span>
                    <input v-model="form.destination"
                      class="w-full h-full px-4 bg-transparent text-sm text-nowrap outline-none rounded-full transition text-black focus:bg-dark_100 placeholder:text-dark_500"
                      placeholder="輸入城市、景點" />
                  </label>

                  <label class="h-11 flex items-center rounded-full border border-gray-300 bg-white p-1">
                    <span class="ml-2 mr-1 text-sm text-nowrap font-semibold text-primary/80">入住/退房日期</span>
                    <input v-model="form.dateRange"
                      class="w-full h-full px-4 bg-transparent text-sm text-nowrap outline-none rounded-full transition text-black focus:bg-dark_100 placeholder:text-dark_500"
                      placeholder="選擇日期" />
                  </label>

                  <label class="h-11 flex items-center rounded-full border border-gray-300 bg-white p-1">
                    <span class="ml-2 mr-1 text-sm text-nowrap font-semibold text-primary/80">人數/需求</span>
                    <input v-model="form.people"
                      class="w-full h-full px-4 bg-transparent text-sm text-nowrap outline-none rounded-full transition text-black focus:bg-dark_100 placeholder:text-dark_500"
                      placeholder="2 人｜1 間｜可帶寵物" />
                  </label>
                </div>

                <!-- Submit -->
                <button type="submit"
                  class="h-11 rounded-full bg-primary px-6 text-md font-semibold text-white transition hover:bg-main">
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
          <button v-for="r in regions" :key="r.key" type="button"
            class="relative group overflow-hidden rounded-[20px] bg-white/70 border border-gray-300 transition shadow-sm hover:shadow-xl"
            @click="onClickRegion(r)">
            <div class="h-[110px] w-full aspect-[3/4]" :style="{
              backgroundImage: `url(${r.img})`,
              backgroundSize: 'cover',
            }"></div>

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
          <HomePageCard v-for="(hotel, index) in hotHotelsA" :key="hotel.id" v-bind="hotel"
            :expand-left="index >= hotHotelsA.length - 2" @compare="handleWishlist" @book="handleBook" />
        </div>
      </section>

      <!-- 熱門飯店（第二排） -->
      <section class="mt-20">
        <h2 class="mb-5 text-xl font-bold text-dark">推薦飯店</h2>
        <div class="flex flex-row xl:grid xl:grid-cols-6 gap-5 overflow-x-auto pb-10 no-scrollbar">
          <HomePageCard v-for="(hotel, index) in hotHotelsB" :key="hotel.id" v-bind="hotel"
            :expand-left="index >= hotHotelsB.length - 2" @compare="handleWishlist" @book="handleBook" />
        </div>
      </section>

      <section class="mt-20">
        <h2 class="font-bold text-xl mb-5 text-dark">熱門體驗</h2>
        <div class="flex flex-row xl:grid xl:grid-cols-6 gap-5 overflow-x-auto pb-10 no-scrollbar">
          <HomePageCard v-for="(recommend, index) in recommendations" :key="recommend.id" v-bind="recommend"
            :expand-left="index >= recommendations.length - 2" @compare="handleWishlist" @book="handleBook" />
        </div>
      </section>

      <!-- 關鍵字（全台住宿｜可點選 Toggle） -->
      <section class="my-20">
        <div class="rounded-[20px] bg-white/75 p-5 text-center shadow-sm border border-gray-300">
          <p class="text-2xl font-bold text-dark">大家都在找...</p>
          <div class="mt-5 flex flex-wrap justify-center gap-2">
            <button v-for="k in stayKeywords" :key="k" type="button"
              class="rounded-full px-4 py-1 text-sm font-semibold border transition" :class="selectedKeywords.has(k)
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-gray-100 text-primary/80 border-primary/10 hover:bg-main_100'
                " @click="toggleKeyword(k)">
              {{ k }}
            </button>
          </div>
        </div>
      </section>
    </div>


  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import HomePageCard from '@/components/layout/HomePageCard.vue'

const activeTab = ref('stay')

const router = useRouter();

const form = reactive({
  destination: '',
  dateRange: '',
  people: '',
})

const regions = [
  {
    key: 'north',
    label: '北部',
    img: 'https://res.cloudinary.com/wantrip/image/upload/v1767452852/%E5%9F%8E%E5%B8%82-tp_zyi27w.jpg',
  },
  {
    key: 'central',
    label: '中部',
    img: 'https://res.cloudinary.com/wantrip/image/upload/v1767445157/640x480_image636446327579990356_qeu0ii.jpg',
  },
  {
    key: 'south',
    label: '南部',
    img: 'https://res.cloudinary.com/wantrip/image/upload/v1767445160/%E7%86%B1%E9%96%80%E5%9F%8E%E5%B8%821_ybmlyx.jpg',
  },

  {
    key: 'east',
    label: '東部',
    img: 'https://res.cloudinary.com/wantrip/image/upload/v1767445159/%E5%9F%8E%E5%B8%821_bl2w6i.jpg',
  },
  {
    key: 'islands',
    label: '離島',
    img: 'https://res.cloudinary.com/wantrip/image/upload/v1767452852/%E5%9F%8E%E5%B8%82-%E5%B3%B6_qnxq42.jpg',
  },
]

const hotHotelsA = ref([
  {
    id: 1,
    name: '台北君悅酒店',
    city: '台北市',
    address: '信義區，近台北 101／世貿',
    imageUrl: 'https://picsum.photos/600/400?random=1',
    price: 6166,
  },
  {
    id: 2,
    name: '晶華酒店',
    city: '台北市',
    address: '中山區，近捷運中山站商圈',
    imageUrl: 'https://picsum.photos/600/400?random=2',
    price: 5800,
  },
  {
    id: 3,
    name: '日月潭涵碧樓',
    city: '南投縣',
    address: '魚池鄉，日月潭湖畔景觀',
    imageUrl: 'https://picsum.photos/600/400?random=3',
    price: 8900,
  },
  {
    id: 4,
    name: '台南晶英酒店',
    city: '台南市',
    address: '中西區，近國華街／正興街',
    imageUrl: 'https://picsum.photos/600/400?random=4',
    price: 4200,
  },
  {
    id: 5,
    name: '高雄漢來大飯店',
    city: '高雄市',
    address: '前金區，近愛河／中央公園',
    imageUrl: 'https://picsum.photos/600/400?random=5',
    price: 3800,
  },
  {
    id: 6,
    name: '礁溪寒沐酒店',
    city: '宜蘭縣',
    address: '礁溪市區，溫泉步行可達',
    imageUrl: 'https://picsum.photos/600/400?random=6',
    price: 5500,
  },
])

const hotHotelsB = ref([
  {
    id: 7,
    name: '台北君悅酒店',
    address: '台北市',
    imageUrl: 'https://picsum.photos/600/400?random=1',
  },
  { id: 8, name: '晶華酒店', address: '台北市', imageUrl: 'https://picsum.photos/600/400?random=2' },
  {
    id: 9,
    name: '日月潭涵碧樓',
    address: '南投縣',
    imageUrl: 'https://picsum.photos/600/400?random=3',
  },
  {
    id: 10,
    name: '台南晶英酒店',
    address: '台南市',
    imageUrl: 'https://picsum.photos/600/400?random=7',
  },
  {
    id: 11,
    name: '礁溪寒沐酒店',
    address: '宜蘭縣',
    imageUrl: 'https://picsum.photos/600/400?random=8',
  },
  {
    id: 12,
    name: '墾丁凱撒大飯店',
    address: '屏東縣',
    imageUrl: 'https://picsum.photos/600/400?random=9',
  },
])

const handleWishlist = (id: string | number) => {
  const product = hotHotelsA.value.find(t => t.id === id);
  console.log(`用戶收藏了: ${product?.name}`);
};

const handleBook = (id: string | number) => {
  router.push(`/product/${id}`);
};

const stayKeywords = [
  '台北住宿',
  '新北住宿',
  '基隆住宿',
  '桃園住宿',
  '新竹住宿',
  '苗栗住宿',
  '台中住宿',
  '彰化住宿',
  '南投住宿',
  '雲林住宿',
  '嘉義住宿',
  '台南住宿',
  '高雄住宿',
  '屏東住宿',
  '宜蘭住宿',
  '花蓮住宿',
  '台東住宿',
  '澎湖住宿',
  '金門住宿',
  '馬祖住宿',
  '綠島住宿',
  '蘭嶼住宿',
  '小琉球住宿',
  '溫泉飯店',
  '親子飯店',
  '海景民宿',
  '包棟民宿',
  '度假村',
  '遊樂園',
  '水族館',
  '博物館',
  '美術館',
  '觀光工廠',
  '觀光套票',
  '農場',
  '牧場',
] as const

const selectedKeywords = reactive(new Set<string>())

function toggleKeyword(k: string) {
  if (selectedKeywords.has(k)) selectedKeywords.delete(k)
  else selectedKeywords.add(k)
  console.log('[Stay Keyword Toggle]', Array.from(selectedKeywords))
}

// Methods
function onSearch() {
  console.log('[Home Search]', { tab: activeTab.value, ...form })
}

function onClickRegion(region: { key: string }) {
  console.log(region.key)
}

const recommendations = ref([
  {
    id: 1,
    name: '台北 101 觀景台門票',
    address: '信義區，近台北 101／世貿',
    imageUrl: 'https://picsum.photos/600/400?random=10',
    price: 500,
  },
  {
    id: 2,
    name: '故宮博物院電子門票',
    address: '台北市士林區',
    imageUrl: 'https://picsum.photos/600/400?random=11',
    price: 500,
  },
  {
    id: 3,
    name: '北投溫泉大眾池體驗',
    address: '台北市北投區',
    imageUrl: 'https://picsum.photos/600/400?random=12',
    price: 500,
  },
  {
    id: 4,
    name: '九份接駁專車',
    address: '台北車站出發',
    imageUrl: 'https://picsum.photos/600/400?random=13',
    price: 500,
  },
  {
    id: 5,
    name: '九份接駁專車',
    address: '松山車站出發',
    imageUrl: 'https://picsum.photos/600/400?random=14',
    price: 500,
  },
  {
    id: 6,
    name: '九份接駁專車',
    address: '基隆車站出發',
    imageUrl: 'https://picsum.photos/600/400?random=15',
    price: 500,
  },
])
</script>
