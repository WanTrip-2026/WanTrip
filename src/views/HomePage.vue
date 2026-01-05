<template>
  <!-- Page wrapper（不含 navbar / footer） -->
  <main class="min-h-screen max-w-[1240px] mx-auto pt-24 overflow-x-hidden mb-20">
    <div class="mx-5">
      <!-- Banner -->
      <section class="relative pb-32 md:pb-20">
        <div class="relative">
          <div class="relative w-full overflow-hidden rounded-[20px] bg-gray-200 shadow-sm">
            <div class="flex h-[340px] items-center justify-center md:h-[420px]">
              <span class="select-none text-sm text-primary/60">banner</span>
            </div>
          </div>

          <!-- Search Bar (floating on banner) -->
          <div class="absolute inset-x-0 bottom-0 z-20 flex justify-center translate-y-1/2">
            <form
              class="w-full lg:max-w-[1024px] rounded-[28px] md:rounded-full border border-gray-300 bg-white shadow-sm p-2"
              @submit.prevent="onSearch"
            >
              <div class="flex flex-col gap-2 md:flex-row md:items-center">
                <!-- Tabs -->
                <div class="flex items-center rounded-full border border-gray-300 bg-dark_100 p-1">
                  <button
                    type="button"
                    class="rounded-full text-nowrap w-full text-sm font-semibold transition px-4 py-1.5"
                    :class="
                      activeTab === 'package'
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-dark hover:bg-main_100'
                    "
                    @click="activeTab = 'package'"
                  >
                    找套票
                  </button>
                  <button
                    type="button"
                    class="rounded-full text-nowrap w-full text-sm font-semibold transition px-4 py-1.5"
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
                  <label class="flex items-center rounded-full border border-gray-300 bg-white p-1">
                    <span class="ml-2 mr-1 text-sm text-nowrap font-semibold text-primary/80"
                      >想去哪裡</span
                    >
                    <input
                      v-model="form.destination"
                      class="w-full h-full px-4 py-2 bg-transparent text-sm text-nowrap outline-none rounded-full transition focus:bg-dark_100 placeholder:text-dark_500"
                      placeholder="輸入城市、景點"
                    />
                  </label>

                  <label class="flex items-center rounded-full border border-gray-300 bg-white p-1">
                    <span class="ml-2 mr-1 text-sm text-nowrap font-semibold text-primary/80"
                      >入住/退房日期</span
                    >
                    <input
                      v-model="form.dateRange"
                      class="w-full h-full px-4 py-2 bg-transparent text-sm text-nowrap outline-none rounded-full transition focus:bg-dark_100 placeholder:text-dark_500"
                      placeholder="選擇日期"
                    />
                  </label>

                  <label class="flex items-center rounded-full border border-gray-300 bg-white p-1">
                    <span class="ml-2 mr-1 text-sm text-nowrap font-semibold text-primary/80"
                      >人數/需求</span
                    >
                    <input
                      v-model="form.people"
                      class="w-full h-full px-4 py-2 bg-transparent text-sm text-nowrap outline-none rounded-full transition focus:bg-dark_100 placeholder:text-dark_500"
                      placeholder="2 人｜1 間｜可帶寵物"
                    />
                  </label>
                </div>

                <!-- Submit -->
                <button
                  type="submit"
                  class="rounded-full bg-primary px-6 py-2 text-md font-semibold text-white transition hover:bg-main"
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
            />

            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-xl font-black text-white drop-shadow-sm">{{ r.label }}</span>
            </div>
          </button>
        </div>
      </section>

      <!-- 熱門飯店（第一排） -->
      <section class="mt-20">
        <h2 class="mb-5 text-xl font-bold text-dark">熱門飯店</h2>

        <div class="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          <article
            v-for="(h, index) in hotHotelsA"
            :key="h.id"
            class="relative"
            @mouseenter="onHoverEnter(h, index)"
            @mouseleave="onHoverLeave"
          >
            <div
              class="relative overflow-hidden rounded-[20px] bg-white/70 border border-gray-300 transition-all duration-200"
              :class="teleportOpen && hoverIndex === index ? 'shadow-lg' : 'shadow-sm'"
              :ref="(el) => setCardEl(index, el)"
            >
              <div
                class="h-[240px] bg-cover bg-center"
                :style="{ backgroundImage: `url(${h.imageUrl})` }"
              />
            </div>
          </article>
        </div>
      </section>

      <!-- 熱門飯店（第二排） -->
      <section class="mt-20">
        <h2 class="mb-5 text-xl font-bold text-dark">推薦飯店</h2>
        <div class="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          <article
            v-for="h in hotHotelsB"
            :key="h.id"
            class="overflow-hidden rounded-[20px] bg-white/70 shadow-sm border border-gray-300"
          >
            <div
              class="h-[240px] bg-cover bg-center"
              :style="{ backgroundImage: `url(${h.imageUrl})` }"
            />
          </article>
        </div>
      </section>

      <section class="mt-20">
        <h2 class="font-bold text-xl mb-5 text-dark">熱門體驗</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          <RouterLink
            v-for="recommend in recommendations"
            :key="recommend.id"
            :to="`/ticket/${recommend.id}`"
            class="group bg-white rounded-[20px] shadow-sm overflow-hidden border hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div class="h-32 bg-dark_100 overflow-hidden">
              <img
                :src="recommend.img"
                :alt="recommend.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div class="p-5">
              <div
                class="text-sm font-bold truncate mb-1 text-dark_900 group-hover:text-main_800 transition-colors"
              >
                {{ recommend.title }}
              </div>
              <div class="text-xs text-dark_700 font-medium">TWD {{ recommend.price }} 起</div>
            </div>
          </RouterLink>
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

          <p class="mt-4 text-xs text-primary/50"></p>
        </div>
      </section>
    </div>

    <!-- ✅ Teleport：hover 展開卡渲染到 body -->
    <Teleport to="body">
      <div
        v-if="teleportOpen && hoverHotel"
        class="fixed z-45 transition-all duration-300"
        :class="[teleportOpen ? 'opacity-100' : 'opacity-0']"
        :style="teleportStyle"
        @mouseenter="onTeleportEnter"
        @mouseleave="onTeleportLeave"
      >
        <div
          class="flex h-[260px] overflow-hidden rounded-[20px] border border-gray-300 bg-white shadow-2xl"
          :class="{ 'flex-row-reverse': teleportGrowLeft }"
          :style="{ width: teleportWidthPx }"
        >
          <div class="relative w-[40%] h-full overflow-hidden">
            <img
              :src="hoverHotel.imageUrl"
              :alt="hoverHotel.name"
              class="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div class="flex w-[40%] flex-col p-6">
            <div class="flex-1">
              <h3 class="text-xl font-bold leading-tight text-dark_900 line-clamp-1">
                {{ hoverHotel.name }}
              </h3>

              <div class="mt-2 flex items-center gap-0.5 text-yellow-400 text-sm">
                <span v-for="i in 5" :key="i">★</span>
                <span class="ml-2 text-dark_500 text-sm font-normal">(120+ 評論)</span>
              </div>

              <p class="mt-3 text-sm text-dark_500">
                <i class="icon-location mr-1"></i>
                {{ hoverHotel.city }} · {{ hoverHotel.addressBrief }}
              </p>
            </div>

            <div class="mt-auto border-t border-gray-50 pt-4">
              <div class="flex items-baseline justify-end gap-1 text-red-500">
                <span class="text-xs font-bold">NT$</span>
                <span class="text-2xl font-black">{{
                  hoverHotel.price?.toLocaleString() ?? '6,166'
                }}</span>
              </div>

              <div class="mt-3 flex items-center justify-between gap-2">
                <button
                  class="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-dark_500 hover:bg-main_100 hover:text-red-500 hover:border-red-100 transition-colors"
                  @click.stop
                >
                  ♥
                </button>

                <div class="flex gap-2">
                  <button
                    class="rounded-full bg-slate-800 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700 transition-all shadow-sm"
                    @click.stop
                  >
                    了解更多
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'

// Types
type Hotel = {
  id: number | string
  name: string
  city: string
  imageUrl: string
  price?: number
  addressBrief?: string
}

const activeTab = ref('stay')

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
    key: 'south',
    label: '中部',
    img: 'https://res.cloudinary.com/wantrip/image/upload/v1767445157/640x480_image636446327579990356_qeu0ii.jpg',
  },
  {
    key: 'central',
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

const hotHotelsA: Hotel[] = [
  {
    id: 1,
    name: '台北君悅酒店',
    city: '台北市',
    addressBrief: '信義區，近台北 101／世貿',
    imageUrl: 'https://picsum.photos/600/400?random=1',
    price: 6166,
  },
  {
    id: 2,
    name: '晶華酒店',
    city: '台北市',
    addressBrief: '中山區，近捷運中山站商圈',
    imageUrl: 'https://picsum.photos/600/400?random=2',
    price: 5800,
  },
  {
    id: 3,
    name: '日月潭涵碧樓',
    city: '南投縣',
    addressBrief: '魚池鄉，日月潭湖畔景觀',
    imageUrl: 'https://picsum.photos/600/400?random=3',
    price: 8900,
  },
  {
    id: 4,
    name: '台南晶英酒店',
    city: '台南市',
    addressBrief: '中西區，近國華街／正興街',
    imageUrl: 'https://picsum.photos/600/400?random=4',
    price: 4200,
  },
  {
    id: 5,
    name: '高雄漢來大飯店',
    city: '高雄市',
    addressBrief: '前金區，近愛河／中央公園',
    imageUrl: 'https://picsum.photos/600/400?random=5',
    price: 3800,
  },
  {
    id: 6,
    name: '礁溪寒沐酒店',
    city: '宜蘭縣',
    addressBrief: '礁溪市區，溫泉步行可達',
    imageUrl: 'https://picsum.photos/600/400?random=6',
    price: 5500,
  },
]

const hotHotelsB: Hotel[] = [
  {
    id: 7,
    name: '台北君悅酒店',
    city: '台北市',
    imageUrl: 'https://picsum.photos/600/400?random=1',
  },
  { id: 8, name: '晶華酒店', city: '台北市', imageUrl: 'https://picsum.photos/600/400?random=2' },
  {
    id: 9,
    name: '日月潭涵碧樓',
    city: '南投縣',
    imageUrl: 'https://picsum.photos/600/400?random=3',
  },
  {
    id: 10,
    name: '台南晶英酒店',
    city: '台南市',
    imageUrl: 'https://picsum.photos/600/400?random=7',
  },
  {
    id: 11,
    name: '礁溪寒沐酒店',
    city: '宜蘭縣',
    imageUrl: 'https://picsum.photos/600/400?random=8',
  },
  {
    id: 12,
    name: '墾丁凱撒大飯店',
    city: '屏東縣',
    imageUrl: 'https://picsum.photos/600/400?random=9',
  },
]

// ✅ 全台住宿關鍵字（縣市 + 熱門類型）
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

/* ===========================
   ✅ Hover Teleport logic
   =========================== */

const teleportOpen = ref(false)
const hoverHotel = ref<Hotel | null>(null)
const hoverIndex = ref<number>(-1)
const anchorRect = ref<DOMRect | null>(null)

let closeTimer: number | null = null

// ✅ 用 ref 記住每張卡片本體
const cardEls = ref<(HTMLElement | null)[]>([])

function setCardEl(index: number, el: Element | null) {
  cardEls.value[index] = el instanceof HTMLElement ? el : null
}

const GAP_PX = 20 // gap-5 = 20px
const w = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

const onResize = () => (w.value = window.innerWidth)

onMounted(() => {
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})

const cols = computed(() => {
  if (w.value >= 1024) return 6
  if (w.value >= 640) return 3
  return 2
})

const teleportGrowLeft = computed(() => {
  if (hoverIndex.value < 0) return false
  const colIndex = (hoverIndex.value % cols.value) + 1
  return colIndex >= cols.value - 1 // 最後兩欄往左長
})

const teleportWidthPx = computed(() => {
  if (!anchorRect.value) return '0px'
  const cardW = anchorRect.value.width
  return `${cardW * 3 + GAP_PX * 2}px`
})

const teleportStyle = computed(() => {
  const r = anchorRect.value
  if (!r) return {}

  const top = `${Math.round(r.top)}px`

  if (teleportGrowLeft.value) {
    const vw = document.documentElement.clientWidth // ✅ 不吃 scrollbar
    const right = `${Math.round(vw - r.right)}px`
    return { top, right }
  }

  const left = `${Math.round(r.left)}px`
  return { top, left }
})

function onHoverEnter(h: Hotel, index: number) {
  if (closeTimer) window.clearTimeout(closeTimer)
  closeTimer = null

  hoverHotel.value = h
  hoverIndex.value = index

  const el = cardEls.value[index]
  if (!el) return

  anchorRect.value = el.getBoundingClientRect()
  teleportOpen.value = true
}

function onHoverLeave() {
  if (closeTimer) window.clearTimeout(closeTimer)
  closeTimer = window.setTimeout(() => {
    teleportOpen.value = false
  }, 80)
}

function onTeleportEnter() {
  if (closeTimer) window.clearTimeout(closeTimer)
  closeTimer = null
  teleportOpen.value = true
}

function onTeleportLeave() {
  teleportOpen.value = false
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
  {
    id: 5,
    title: '九份接駁專車',
    price: '600',
    img: 'https://placehold.co/300x200/e2e8f0/94a3b8?text=Jiufen',
  },
  {
    id: 6,
    title: '九份接駁專車',
    price: '600',
    img: 'https://placehold.co/300x200/e2e8f0/94a3b8?text=Jiufen',
  },
])
</script>
