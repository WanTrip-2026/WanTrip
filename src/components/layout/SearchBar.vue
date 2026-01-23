<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// 1. 定義 Props 與 Emits
interface PeopleConfig {
  rooms: number
  people: number
}

const props = defineProps({
  // 'emit'：在同頁更新數據（結果頁用）
  // 'redirect'：開新分頁跳轉（詳情頁或首頁用）
  mode: { type: String, default: 'redirect' },
  searchType: { type: String, default: 'stay' }, // 'stay' or 'package'
  initialKeyword: { type: String, default: '' },
  initialRange: { type: Array as () => Date[] | null, default: null },
  initialPeople: { type: Object as () => PeopleConfig, default: () => ({ rooms: 1, people: 2 }) },
  // Ticket Props
  initialDestination: { type: String, default: '' },
  initialTicketGuests: {
    type: Object as () => { adults: number; children: number; hasPet: boolean },
    default: () => ({ adults: 2, children: 0, hasPet: false }),
  },
})

// 當從首頁跳轉過來，Props 改變時，手動同步內部的 ref
watch(
  () => props.initialKeyword,
  (newVal) => {
    keyword.value = newVal
  },
)

watch(
  () => props.initialRange,
  (newVal) => {
    if (newVal) range.value = newVal as [Date, Date]
  },
  { deep: true },
)

watch(
  () => props.initialPeople,
  (newVal) => {
    if (newVal) {
      peopleConfig.people = newVal.people
      peopleConfig.rooms = newVal.rooms
    }
  },
  { deep: true },
)

const emit = defineEmits(['search', 'update:range', 'update:people'])
const router = useRouter()

// 2. 內部狀態同步 Props
const keyword = ref(props.initialKeyword)
// 如果外部沒傳日期，預設為今天與明天
const range = ref<[Date, Date]>(
  (props.initialRange as [Date, Date]) || [
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 1)),
  ],
)
const activePicker = ref('none')
const peoplePickerRef = ref<HTMLElement | null>(null)
const peopleConfig = reactive({ ...props.initialPeople })

// 監聽內部狀態改變並 Emit
watch(range, (newVal) => {
  emit('update:range', newVal)
})

watch(
  peopleConfig,
  (newVal) => {
    emit('update:people', newVal)
  },
  { deep: true },
)

// 3. 工具函數
const formatDate = (date: Date | null): string => {
  if (!date) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const formatRangeDisplay = (): string => {
  if (!range.value || range.value.length !== 2) return ''
  const [start, end] = range.value
  return start && end ? `${formatDate(start)} - ${formatDate(end)}` : ''
}

const peopleDisplayText = computed(() => {
  return `${peopleConfig.rooms} 間房 · ${peopleConfig.people} 位旅客`
})

const togglePicker = (name: string) => {
  activePicker.value = activePicker.value === name ? 'none' : name
}

const handleDateChange = (newRange: Date[] | null) => {
  if (!newRange || newRange.length !== 2) return
  const [start, end] = newRange
  if (start && end) {
    const diffDays = (end.getTime() - start.getTime()) / 86400000
    if (diffDays < 1) {
      const fixedEnd = new Date(start)
      fixedEnd.setDate(start.getDate() + 1)
      range.value = [start, fixedEnd]
    }
  }
}

// City Data for Ticket Search
const hotCities = ['台北市', '台中市', '高雄市', '台南市', '宜蘭縣', '花蓮縣', '台東縣']
const allCities = [
  {
    region: '北部',
    cities: ['基隆市', '台北市', '新北市', '桃園市', '新竹市', '新竹縣', '宜蘭縣'],
  },
  { region: '中部', cities: ['苗栗縣', '台中市', '彰化縣', '南投縣', '雲林縣'] },
  { region: '南部', cities: ['嘉義市', '嘉義縣', '台南市', '高雄市', '屏東縣'] },
  { region: '東部', cities: ['花蓮縣', '台東縣'] },
  { region: '離島', cities: ['澎湖縣', '金門縣', '連江縣'] },
]

// Ticket State
const ticketDestination = ref(props.initialDestination)
const ticketGuests = reactive({ ...props.initialTicketGuests })
const ticketSearchKeyword = ref('') // For filtering cities in dropdown

const ticketGuestDisplay = computed(() => {
  const { adults, children, hasPet } = ticketGuests
  let text = `${adults + children} 人`
  if (hasPet) text += ' · 攜帶寵物'
  return text
})

// Filtered Cities
const filteredCities = computed(() => {
  if (!ticketSearchKeyword.value) return allCities
  return allCities
    .map((group) => ({
      region: group.region,
      cities: group.cities.filter((c) => c.includes(ticketSearchKeyword.value)),
    }))
    .filter((group) => group.cities.length > 0)
})

const selectCity = (city: string) => {
  ticketDestination.value = city
  activePicker.value = 'none'
  ticketSearchKeyword.value = ''
}

// 4. 搜尋執行邏輯
const onSearch = () => {
  if (props.searchType === 'package') {
    const payload = {
      destination: ticketDestination.value,
      guests: ticketGuests,
    }
    emit('search', payload)

    if (props.mode === 'redirect') {
      router.push({
        path: '/tickets/search',
        query: {
          destination: payload.destination,
          adults: String(payload.guests.adults),
          children: String(payload.guests.children),
        },
      })
    }
  } else {
    // Hotel Search
    const payload = {
      keyword: keyword.value,
      range: range.value,
      rooms: peopleConfig.rooms,
      people: peopleConfig.people,
    }
    emit('search', payload)

    if (props.mode === 'redirect') {
      router.push({
        path: '/hotels/search',
        query: {
          keyword: payload.keyword,
          start_date: payload.range[0] ? formatDate(payload.range[0]) : '',
          end_date: payload.range[1] ? formatDate(payload.range[1]) : '',
          adults: String(payload.people),
          rooms: String(payload.rooms),
        },
      })
    }
  }
}

// 5. 點擊外部關閉選單
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.closest('.dp__menu') || target.closest('.dp__overlay')) return
  if (target.closest('.search-bar-container')) {
    // Check for Ticket Pickers
    if (activePicker.value === 'ticketCity' && !target.closest('.city-picker-content')) {
      // Logic handled by event bubbling or explicit close?
      // Actually let's just keep activePicker logic simple.
      // If click is outside the picker content but inside container, it might be clicking another field.
      return
    }
    if (
      activePicker.value === 'people' &&
      peoplePickerRef.value &&
      !peoplePickerRef.value.contains(target)
    ) {
      activePicker.value = 'none'
    }
    return
  }
  activePicker.value = 'none'
}

onMounted(() => window.addEventListener('click', handleClickOutside))
onUnmounted(() => window.removeEventListener('click', handleClickOutside))
</script>

<template>
  <section
    class="max-w-[1240px] mx-auto p-1 mb-10 bg-white rounded-[24px] md:rounded-full border border-gray-200 shadow-lg flex flex-col md:flex-row items-stretch md:items-center gap-1 z-20 search-bar-container"
  >
    <!-- Mode Transition Wrapper -->
    <Transition name="mode-slide" mode="out-in">
      <div
        :key="searchType"
        class="flex flex-col md:flex-row items-stretch md:items-center gap-1 flex-grow"
      >
        <template v-if="searchType === 'package'">
          <!-- City Picker -->
          <div class="relative flex-1">
            <div
              class="w-full h-[64px] rounded-[20px] md:rounded-full px-5 flex flex-col justify-center border transition-all cursor-pointer"
              :class="[
                activePicker === 'ticketCity'
                  ? 'bg-white ring-1 ring-gray-300'
                  : 'bg-gray-50 border-transparent hover:bg-gray-100',
              ]"
              @click="togglePicker('ticketCity')"
            >
              <p
                class="text-xs font-bold text-primary/70 uppercase tracking-wider pointer-events-none"
              >
                目的地
              </p>
              <div class="flex items-center justify-between min-h-[24px]">
                <input
                  v-if="activePicker === 'ticketCity'"
                  v-model="ticketSearchKeyword"
                  type="text"
                  class="w-full text-base text-black bg-transparent border-none outline-none placeholder:text-gray-400"
                  placeholder="搜尋城市..."
                  @click.stop
                  autoFocus
                />
                <p v-else class="text-base font-medium text-black truncate flex-1">
                  {{ ticketDestination || '選擇城市、景點' }}
                </p>

                <!-- Chevron Icon for City -->
                <svg
                  class="h-5 w-5 text-primary/40 transition-transform duration-300 ml-2 flex-shrink-0"
                  :class="{ 'rotate-180': activePicker === 'ticketCity' }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <transition name="fade">
              <div
                v-if="activePicker === 'ticketCity'"
                class="city-picker-content absolute top-[calc(100%+12px)] left-0 z-[100] w-full md:w-[480px] max-h-[80vh] md:max-h-[400px] overflow-y-auto rounded-[24px] bg-white p-5 border border-gray-200 shadow-[0px_8px_32px_rgba(0,0,0,0.12)]"
                style="scrollbar-width: thin"
                @click.stop
              >
                <!-- Hot Cities -->
                <div v-if="!ticketSearchKeyword" class="mb-4">
                  <p class="text-xs font-bold text-gray-400 mb-2">熱門城市</p>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="city in hotCities"
                      :key="city"
                      @click="selectCity(city)"
                      class="px-3 py-1.5 rounded-full bg-gray-100 text-sm hover:bg-primary hover:text-white transition"
                    >
                      {{ city }}
                    </button>
                  </div>
                </div>

                <!-- Region List -->
                <div v-for="group in filteredCities" :key="group.region" class="mb-4 last:mb-0">
                  <p class="text-xs font-bold text-gray-400 mb-2">{{ group.region }}</p>
                  <div class="grid grid-cols-6 gap-1">
                    <button
                      v-for="city in group.cities"
                      :key="city"
                      @click="selectCity(city)"
                      class="text-sm text-nowrap py-1.5 px-3 rounded-full text-dark_700 hover:bg-primary hover:text-white transition-all"
                    >
                      {{ city }}
                    </button>
                  </div>
                </div>
                <div v-if="filteredCities.length === 0" class="text-center text-gray-400 py-4">
                  沒有找到相關城市
                </div>
              </div>
            </transition>
          </div>

          <!-- Ticket Guest Picker -->
          <div class="relative flex-[1.5]">
            <div
              class="h-[64px] rounded-[20px] md:rounded-full px-5 flex flex-col justify-center border transition-all cursor-pointer"
              :class="[
                activePicker === 'ticketGuest'
                  ? 'bg-white ring-1 ring-gray-300'
                  : 'bg-gray-50 border-transparent hover:bg-gray-100',
              ]"
              @click="togglePicker('ticketGuest')"
            >
              <p
                class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5 pointer-events-none"
              >
                人數、需求
              </p>
              <div class="flex items-center justify-between pointer-events-none">
                <span class="text-base font-medium text-black truncate">{{
                  ticketGuestDisplay
                }}</span>
                <svg
                  class="h-4 w-4 text-primary/40 transition-transform duration-300"
                  :class="{ 'rotate-180': activePicker === 'ticketGuest' }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <transition name="fade">
              <div
                v-if="activePicker === 'ticketGuest'"
                @click.stop
                class="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 md:translate-x-0 md:right-0 md:left-auto z-[100] w-[calc(100vw-32px)] md:w-[320px] rounded-[24px] bg-white p-6 border border-gray-200 shadow-[0px_8px_32px_rgba(0,0,0,0.12)] space-y-6"
              >
                <!-- Adults -->
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-bold text-primary">成人</p>
                    <p class="text-sm text-gray-400">18 歲以上</p>
                  </div>
                  <div class="flex items-center gap-3">
                    <button
                      type="button"
                      class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                      :disabled="ticketGuests.adults <= 1"
                      @click="ticketGuests.adults--"
                    >
                      -
                    </button>
                    <span class="text-sm font-bold w-4 text-center">{{ ticketGuests.adults }}</span>
                    <button
                      type="button"
                      class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                      @click="ticketGuests.adults++"
                    >
                      +
                    </button>
                  </div>
                </div>
                <!-- Children -->
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-bold text-primary">孩童</p>
                    <p class="text-sm text-gray-400">0 - 17 歲</p>
                  </div>
                  <div class="flex items-center gap-3">
                    <button
                      type="button"
                      class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                      :disabled="ticketGuests.children <= 0"
                      @click="ticketGuests.children--"
                    >
                      -
                    </button>
                    <span class="text-sm font-bold w-4 text-center">{{
                      ticketGuests.children
                    }}</span>
                    <button
                      type="button"
                      class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                      @click="ticketGuests.children++"
                    >
                      +
                    </button>
                  </div>
                </div>
                <hr class="border-gray-100" />
                <!-- Pet -->
                <div
                  class="flex items-center justify-between cursor-pointer"
                  @click="ticketGuests.hasPet = !ticketGuests.hasPet"
                >
                  <div>
                    <p class="text-sm font-bold text-primary">攜帶寵物</p>
                    <p class="text-[11px] text-gray-400">將為您篩選可攜帶寵物的行程</p>
                  </div>
                  <div
                    class="w-11 h-6 rounded-full transition-colors relative"
                    :class="ticketGuests.hasPet ? 'bg-primary' : 'bg-gray-200'"
                  >
                    <div
                      class="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform"
                      :class="ticketGuests.hasPet ? 'translate-x-5' : 'translate-x-0'"
                    ></div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </template>

        <template v-else>
          <!-- Stay Mode Template (Existing) -->
          <div class="relative flex-1">
            <div
              class="w-full h-[64px] rounded-[20px] md:rounded-full px-5 flex flex-col justify-center border transition-all cursor-pointer"
              :class="[
                activePicker === 'keyword'
                  ? 'bg-white ring-1 ring-gray-300'
                  : 'bg-gray-50 border-transparent hover:bg-gray-100',
              ]"
              @click="togglePicker('keyword')"
            >
              <p
                class="text-xs font-bold text-primary/70 uppercase tracking-wider mb-0.5 pointer-events-none"
              >
                目的地
              </p>
              <input
                v-model="keyword"
                type="text"
                placeholder="想住哪～"
                @focus="activePicker = 'keyword'"
                @click.stop="activePicker = 'keyword'"
                class="w-full text-base text-black bg-transparent border-none outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <div class="relative flex-[1.5]">
            <VueDatePicker
              v-model="range"
              range
              :min-range="1"
              :enable-time-picker="false"
              format="yyyy-MM-dd"
              :min-date="new Date()"
              auto-apply
              hide-input-icon
              :clearable="false"
              class="w-full"
              @update:model-value="handleDateChange"
              @open="activePicker = 'date'"
              @closed="activePicker = 'none'"
            >
              <template #dp-input>
                <div
                  class="w-full h-[64px] rounded-[20px] md:rounded-full px-5 flex flex-col justify-center border transition-all cursor-pointer"
                  :class="[
                    activePicker === 'date'
                      ? 'bg-white ring-1 ring-gray-300'
                      : 'bg-gray-50 border-transparent hover:bg-gray-100',
                  ]"
                >
                  <p class="text-xs font-bold text-primary/70 uppercase tracking-wider">
                    入住 - 退房日期
                  </p>
                  <input
                    :value="formatRangeDisplay()"
                    class="w-full bg-transparent text-base text-black outline-none pointer-events-none"
                    placeholder="點選選擇日期"
                    readonly
                  />
                </div>
              </template>
            </VueDatePicker>
          </div>

          <div class="relative flex-1" ref="peoplePickerRef">
            <div
              @click="togglePicker('people')"
              class="w-full h-[64px] rounded-[20px] md:rounded-full px-5 flex flex-col justify-center border transition-all cursor-pointer"
              :class="[
                activePicker === 'people'
                  ? 'bg-white ring-1 ring-gray-300'
                  : 'bg-gray-50 border-transparent hover:bg-gray-100',
              ]"
            >
              <p
                class="text-xs font-bold text-primary/70 uppercase tracking-wider pointer-events-none"
              >
                人數、需求
              </p>
              <div class="flex items-center justify-between pointer-events-none min-h-[24px]">
                <span class="text-base text-black truncate">{{ peopleDisplayText }}</span>
                <svg
                  class="h-4 w-4 text-primary/40 transition-transform duration-300 ml-2 flex-shrink-0"
                  :class="{ 'rotate-180': activePicker === 'people' }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <transition name="fade">
              <div
                v-if="activePicker === 'people'"
                @click.stop
                class="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 md:translate-x-0 md:right-0 md:left-auto z-[100] w-[calc(100vw-32px)] md:w-[300px] rounded-[24px] bg-white p-6 border border-gray-200 shadow-[0px_8px_32px_rgba(0,0,0,0.12)] space-y-6"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-bold text-primary">房間</p>
                    <p class="text-sm text-gray-400">所需的客房數量</p>
                  </div>
                  <div class="flex items-center gap-4">
                    <button
                      @click.stop="peopleConfig.rooms > 1 ? peopleConfig.rooms-- : null"
                      type="button"
                      class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                    >
                      -
                    </button>
                    <span class="text-sm font-bold w-4 text-center">{{ peopleConfig.rooms }}</span>
                    <button
                      @click.stop="peopleConfig.rooms++"
                      type="button"
                      class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-bold text-primary">旅客</p>
                    <p class="text-xs text-gray-400">總人數</p>
                  </div>
                  <div class="flex items-center gap-4">
                    <button
                      @click.stop="peopleConfig.people > 1 ? peopleConfig.people-- : null"
                      type="button"
                      class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                    >
                      -
                    </button>
                    <span class="text-sm font-bold w-4 text-center">{{ peopleConfig.people }}</span>
                    <button
                      @click.stop="peopleConfig.people++"
                      type="button"
                      class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </template>
      </div>
    </Transition>

    <div class="flex items-center justify-center">
      <button
        @click="onSearch"
        class="w-[64px] h-[64px] rounded-full bg-primary hover:bg-main text-white transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center group"
      >
        <font-awesome-icon
          icon="search"
          class="text-xl group-hover:scale-110 transition-transform"
        />
      </button>
    </div>
  </section>
</template>

<style scoped>
:deep(.dp__menu) {
  border-radius: 20px !important;
  background-color: #ffffff;
  padding: 24px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #d1d5db;
  z-index: 100;
}

:deep(.dp__range_start),
:deep(.dp__range_end) {
  background-color: #2f3d4d !important;
  color: #fff !important;
}

.fade-enter-active {
  transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-leave-active {
  transition: all 0.1s cubic-bezier(0.4, 0, 1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.95);
}

.mode-slide-enter-active,
.mode-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mode-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.mode-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
