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
  initialKeyword: { type: String, default: '' },
  initialRange: { type: Array as () => Date[] | null, default: null },
  initialPeople: { type: Object as () => PeopleConfig, default: () => ({ rooms: 1, people: 2 }) },
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

const emit = defineEmits(['search'])
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

// 4. 搜尋執行邏輯
const onSearch = () => {
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
        start_date: formatDate(payload.range[0]),
        end_date: formatDate(payload.range[1]),
        adults: String(payload.people),
        rooms: String(payload.rooms),
      },
    })
  }
}

// 5. 點擊外部關閉選單
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.closest('.dp__menu') || target.closest('.dp__overlay')) return
  if (target.closest('.search-bar-container')) {
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
    class="max-w-[1200px] mx-auto p-2 mb-10 bg-white rounded-[24px] md:rounded-full border border-gray-300 flex flex-col md:flex-row items-stretch gap-2 z-20 search-bar-container"
  >
    <div class="relative flex-[2] flex">
      <div
        class="w-full min-h-[70px] md:min-h-0 rounded-[20px] md:rounded-full px-7 flex flex-col justify-center border transition-all cursor-pointer"
        :class="[
          activePicker === 'keyword'
            ? 'bg-white ring-1 ring-gray-300'
            : 'bg-gray-50 border-transparent hover:bg-gray-100',
        ]"
        @click="togglePicker('keyword')"
      >
        <p
          class="text-[12px] font-bold text-primary/70 uppercase tracking-wider mb-0.5 pointer-events-none"
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

    <div class="relative flex flex-[1.5]">
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
            class="w-full min-h-[70px] h-full rounded-[20px] md:rounded-full px-7 flex flex-col justify-center border transition-all cursor-pointer"
            :class="[
              activePicker === 'date'
                ? 'bg-white ring-1 ring-gray-300'
                : 'bg-gray-50 border-transparent hover:bg-gray-100',
            ]"
          >
            <p class="text-[12px] font-bold text-primary/70 uppercase tracking-wider mb-0.5">
              入住 - 退房日期
            </p>
            <input
              :value="formatRangeDisplay()"
              class="w-full bg-transparent text-[18px] text-black outline-none pointer-events-none"
              placeholder="點選選擇日期"
              readonly
            />
          </div>
        </template>
      </VueDatePicker>
    </div>

    <div class="relative flex-1 flex" ref="peoplePickerRef">
      <div
        @click="togglePicker('people')"
        class="w-full min-h-[70px] md:min-h-0 rounded-[20px] md:rounded-full px-7 flex flex-col justify-center border transition-all cursor-pointer"
        :class="[
          activePicker === 'people'
            ? 'bg-white ring-1 ring-gray-300'
            : 'bg-gray-50 border-transparent hover:bg-gray-100',
        ]"
      >
        <p
          class="text-[12px] font-bold text-primary/70 uppercase tracking-wider mb-0.5 pointer-events-none"
        >
          人數、需求
        </p>
        <div class="flex items-center justify-between pointer-events-none">
          <span class="text-base text-black truncate">{{ peopleDisplayText }}</span>
          <svg
            class="h-4 w-4 text-primary/40 transition-transform duration-300"
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
          class="absolute top-[calc(100%+12px)] left-0 md:right-0 md:left-auto z-[100] w-full md:w-[300px] rounded-[24px] bg-white p-6 border border-gray-300 shadow-[0px_8px_24px_rgba(0,0,0,0.08)] space-y-6"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-bold text-primary">房間</p>
              <p class="text-[11px] text-gray-400">所需的客房數量</p>
            </div>
            <div class="flex items-center gap-4">
              <button
                @click.stop="peopleConfig.rooms > 1 ? peopleConfig.rooms-- : null"
                type="button"
                class="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
              >
                -
              </button>
              <span class="text-sm font-bold w-4 text-center">{{ peopleConfig.rooms }}</span>
              <button
                @click.stop="peopleConfig.rooms++"
                type="button"
                class="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
              >
                +
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-bold text-primary">旅客</p>
              <p class="text-[11px] text-gray-400">總人數</p>
            </div>
            <div class="flex items-center gap-4">
              <button
                @click.stop="peopleConfig.people > 1 ? peopleConfig.people-- : null"
                type="button"
                class="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
              >
                -
              </button>
              <span class="text-sm font-bold w-4 text-center">{{ peopleConfig.people }}</span>
              <button
                @click.stop="peopleConfig.people++"
                type="button"
                class="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div class="flex">
      <button
        @click="onSearch"
        class="w-full md:w-auto min-h-[70px] md:h-full md:px-10 rounded-[20px] md:rounded-full bg-primary hover:bg-main_800 text-white transition-all whitespace-nowrap flex items-center justify-center font-bold text-lg"
      >
        <font-awesome-icon icon="search" class="mr-2" /> 搜尋
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

@media (min-width: 768px) {
  .search-bar-container {
    height: 86px;
  }
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
</style>
