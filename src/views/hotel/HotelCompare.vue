<template>
  <main class="min-h-screen max-w-[1240px] mx-auto mt-24 mb-24">
    <div class="mx-5">
      <!-- 上方操作：只出現一次 -->
      <button
        name="open-picker"
        v-if="compareStore.hotels.length !== 0"
        type="button"
        @click="openPicker"
        class="w-fit mx-auto px-6 py-3 my-5 rounded-[20px] text-center text-white text-lg font-bold shadow-sm bg-primary hover:bg-main transition-all"
      >
        選擇住宿（已加入 {{ compareStore.hotels.length }}/5）
      </button>

      <!-- 空狀態：沒有任何比較飯店 -->
      <div
        v-if="compareStore.hotels.length === 0"
        class="bg-main_100 w-fit p-5 rounded-[20px] mx-auto mt-5 text-center text-dark_700 shadow-sm"
      >
        目前沒有加入任何飯店可以比較。請先回飯店列表按「加入比較」。
        <div class="mt-4">
          <button
            name="go-hotellist"
            class="px-5 py-2 rounded-[20px] bg-primary hover:bg-main text-white transition-all"
            @click="goBackToList"
          >
            前往飯店列表
          </button>
        </div>
      </div>

      <!-- 有資料才顯示卡片 -->
      <div v-else class="grid grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="hotel in limitedHotels" :key="hotel.id" class="flex flex-col space-y-2">
          <button
            name="remove-hotel"
            class="w-full py-3 rounded-[20px] bg-dark_100 text-dark font-bold hover:bg-dark_200 transition-all"
            @click="removeFromCompare(hotel.id)"
          >
            移除比較
          </button>
          <div
            class="w-full aspect-[16/9] bg-main_100 rounded-[20px] overflow-hidden border border-gray-300 shadow-sm"
          >
            <img
              :src="
                hotel.image_url ||
                'https://res.cloudinary.com/wantrip/image/upload/v1767939338/%E9%A3%AF%E5%BA%97%E9%A6%96%E5%9C%96_dualwy.jpg'
              "
              class="w-full h-full object-cover"
              alt="Hotel Photo"
            />
          </div>

          <div
            class="bg-main_100 p-5 rounded-[20px] text-center w-full font-bold text-xl text-dark_900 shadow-sm"
          >
            {{ hotel.name }}
          </div>

          <div class="bg-main_100 p-5 rounded-[20px] text-center text-dark_700 w-full shadow-sm">
            {{ (hotel.types ?? []).join(' / ') }}
          </div>

          <div class="bg-main_100 p-5 rounded-[20px] min-h-[320px] shadow-sm">
            <p class="font-bold mb-2 text-center text-dark_700">設施 & 服務</p>
            <ul class="space-y-1">
              <li v-for="f in getDisplayFacilities(hotel)" :key="f" class="text-dark_500">
                - {{ f }}
              </li>
            </ul>
            <li
              v-if="getDisplayFacilities(hotel).length === 0"
              class="text-dark_400 text-center italic"
            >
              尚未提供設施資訊
            </li>
          </div>

          <!-- distance / rules 都要防呆 -->
          <div
            v-if="hotel.distance != null"
            class="bg-main_100 p-5 rounded-[20px] text-center min-h-[100px] flex flex-col justify-center shadow-sm"
          >
            <p class="font-bold text-dark_700">交通資訊</p>
            <p class="text-sm">距離市中心 {{ hotel.distance }} km</p>
          </div>

          <div
            v-if="(hotel.rules ?? []).length"
            class="bg-main_100 p-5 rounded-[20px] min-h-[80px] shadow-sm"
          >
            <div
              v-for="rule in hotel.rules ?? []"
              :key="rule"
              class="bg-main_100 rounded-[20px] text-center text-sm text-dark_500"
            >
              {{ rule }}
            </div>
          </div>

          <div class="bg-main_100 p-5 rounded-[20px] text-center shadow-sm">
            <p class="font-bold text-dark_700">價格</p>
            <p class="text-base lg:text-xl font-bold text-red-500">
              NT$ {{ formatPrice(hotel.min_price) }} <span class="text-dark_500 text-sm">/起</span>
            </p>
          </div>

          <RouterLink
            :to="`/hotels/${hotel.id}`"
            class="w-full bg-primary hover:bg-main transition-all py-3 rounded-[20px] text-white text-center font-bold shadow-sm"
          >
            立即預訂
          </RouterLink>
        </div>

        <div v-if="!canCompare" class="col-span-2 p-5 text-center text-dark_700">
          請至少選 2 間飯店進行比較（目前 {{ visibleHotels.length }} 間）
        </div>
      </div>

      <div v-if="showPicker" class="fixed inset-0 z-50">
        <div class="absolute inset-0 bg-black/40" @click="showPicker = false"></div>

        <div
          class="absolute left-1/2 top-1/2 w-[92%] max-w-[720px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-5 shadow-lg"
        >
          <div class="flex items-center justify-between mb-4">
            <p class="font-bold text-lg text-dark">已加入比較的飯店（最多 5 間）</p>
            <button
              name="close-picker"
              class="w-8 h-8 rounded-full transition-all text-dark_700 hover:bg-main_100"
              @click="showPicker = false"
            >
              ✕
            </button>
          </div>

          <div v-if="compareStore.hotels.length === 0" class="text-dark_700">
            尚未加入飯店。請回列表按「加入比較」。
          </div>

          <div v-else class="space-y-3 max-h-[420px] overflow-auto">
            <div
              v-for="h in compareStore.hotels"
              :key="h.id"
              class="flex items-center gap-3 border rounded-xl p-3"
            >
              <input type="checkbox" :checked="selectedIds.includes(h.id)" @change="toggle(h.id)" />
              <img :src="h.image_url" class="w-20 h-14 object-cover rounded-lg" alt="" />
              <div class="flex-1">
                <div class="font-bold text-dark">{{ h.name }}</div>
                <div class="text-sm text-dark_500">{{ (h.types ?? []).join(' / ') }}</div>
              </div>
              <button
                name="remove-hotel-in-picker"
                class="text-sm text-dark_700 hover:text-dark_500"
                @click="removeFromCompare(h.id)"
              >
                移除
              </button>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-5">
            <button
              name="clear-all"
              class="px-4 py-2 rounded-xl border text-dark bg-dark_100 hover:bg-dark_300"
              @click="clearAll"
            >
              清空
            </button>
            <button
              name="close-picker"
              class="px-4 py-2 rounded-xl bg-primary hover:bg-main text-white"
              @click="showPicker = false"
            >
              完成
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCompareStore } from '@/stores/compareStore'

const router = useRouter()
const compareStore = useCompareStore()

const props = defineProps<{ hotel: any }>()

const showPicker = ref(false)
const selectedIds = ref<string[]>([])

watchEffect(() => {
  if (compareStore.hotels.length > 0 && selectedIds.value.length === 0) {
    selectedIds.value = compareStore.hotels.map((h) => h.id)
  }
})

const visibleHotels = computed(() => {
  if (selectedIds.value.length === 0) return compareStore.hotels
  return compareStore.hotels.filter((h) => selectedIds.value.includes(h.id))
})

// 螢幕是否 >= lg(1024)
const isLg = ref(false)

function updateIsLg() {
  isLg.value = window.matchMedia('(min-width: 1024px)').matches
}

onMounted(() => {
  updateIsLg()
  window.addEventListener('resize', updateIsLg)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsLg)
})

// 最多顯示數量：大 3、小 2
const maxDisplay = computed(() => (isLg.value ? 3 : 2))

const limitedHotels = computed(() => visibleHotels.value.slice(0, maxDisplay.value))

function openPicker() {
  showPicker.value = true
}

function toggle(id: string) {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((x) => x !== id)
  } else {
    selectedIds.value = [...selectedIds.value, id]
  }
}

function removeFromCompare(id: string) {
  compareStore.removeHotel(id)
  selectedIds.value = selectedIds.value.filter((x) => x !== id)
}

function clearAll() {
  compareStore.clear()
  selectedIds.value = []
  showPicker.value = false
}

const canCompare = computed(() => visibleHotels.value.length >= 2)

function goBackToList() {
  router.push('/hotels')
}

const formatPrice = (price: number): string => {
  return Number.isFinite(price) ? price.toLocaleString() : '0'
}
const getDisplayFacilities = (hotel: any) => {
  const defaultFacilities = [
    '洗衣間',
    '乾洗',
    '熨燙服務',
    '洗衣服務',
    '煙霧感應器',
    '公共區域監視器',
  ]
  const dynamicFacilities = Array.isArray(hotel.facilities) ? hotel.facilities : []
  return [...defaultFacilities, ...dynamicFacilities]
}
</script>
