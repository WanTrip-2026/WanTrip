<template>
  <div class="w-full min-h-screen relative">
    <img
      src="/src/assets/traveldna_img/IntroBg.png"
      alt="Background"
      class="absolute inset-0 w-full h-full object-cover z-0"
    />
    <div class="absolute inset-0 w-full h-full bg-primary/50 backdrop-blur-sm"></div>
    <div class="relative z-10 max-w-[1200px] mx-auto pt-24">
      <div class="relative w-[800px] h-4 mt-5 mb-12 mx-auto">
        <div class="w-full h-4 bg-[#EEF2F7] rounded-full"></div>
        <div
          class="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-primary via-white/30 to-primary bg-[length:200%_100%] animate-progress-flow"
          :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
        ></div>
        <div
          class="absolute -top-10 transition-all duration-500 ease-out"
          :style="{ left: `${(currentStep / totalSteps) * 100}%`, transform: 'translateX(-50%)' }"
        >
          <img src="/src/assets/logoIcon.svg" class="w-24 h-24 object-contain" alt="WanTrip Logo" />
        </div>
      </div>

      <main class="max-w-[800px] mx-auto text-center">
        <div class="pb-10 { 'animate-progress-bounce': animateProgress }">
          <h2 class="text-5xl font-bold text-primary pb-4">Q{{ currentStep }}</h2>
          <h3 class="text-2xl font-semibold text-primary pb-5">{{ currentQuestion.title }}</h3>
          <p class="text-white tracking-wider font-semibold drop-shadow-lg text-lg">
            {{ currentQuestion.subTitle }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-5">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="handleAnswer(option, index)"
            :class="
              selectedOptionIndex === index
                ? 'bg-white/80 border-black/30 p-5 rounded-[20px] text-xl font-medium border-2 min-h-[160px]'
                : 'bg-[#EEF2F7] hover:bg-white/80 hover:border-black/30 p-5 rounded-[20px] text-xl font-medium border-2 min-h-[160px]'
            "
          >
            {{ option.text }}
          </button>
        </div>

        <div v-if="showResultButton" class="mt-12 flex flex-col items-center gap-4 animate-bounce">
          <button
            @click="goToResult"
            class="bg-primary text-white px-10 py-4 rounded-full text-xl font-bold hover:bg-primary_hover transition shadow-lg"
          >
            ✨ 解鎖我的旅行角色 ✨
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 題目資料定義
const totalSteps = 6
const currentStep = ref(1)
const showResultButton = ref(false)
const animateProgress = ref(false)
interface Question {
  title: string
  subTitle: string
  options: { text: string; type: string }[]
}
interface Option {
  text: string
  type: string
}

const questions: Question[] = [
  {
    title: '晨光甦醒',
    subTitle: '你在陌生城市醒來，窗外的陽光灑進房間，你會如何開始一天？',
    options: [
      { text: '穿上登山鞋、背上背包', type: 'explorer' },
      { text: '慢慢梳洗，泡杯咖啡', type: 'relax' },
      { text: '查好博物館、展覽行程', type: 'culture' },
      { text: '約朋友討論今天計畫', type: 'social' },
    ],
  },
  {
    title: '早餐奇遇',
    subTitle: '走在街上，香味吸引你到了一家小店，你想怎麼吃早餐？',
    options: [
      { text: '穿速戰速決，趕去第一個景點', type: 'explorer' },
      { text: '慢慢慢品味，拍照分享給朋友', type: 'relax' },
      { text: '和同伴聊天，互相推薦餐點', type: 'culture' },
      { text: '找個安靜角落，一邊吃一邊觀察路人 ', type: 'social' },
    ],
  },
  {
    title: '旅途中意外事件',
    subTitle: '行程中突然下雨，交通也延誤，你會怎麼應對？',
    options: [
      { text: '立刻找新的刺激活動', type: 'explorer' },
      { text: '找個咖啡館避雨', type: 'relax' },
      { text: '和朋友討論下一步', type: 'culture' },
      { text: '找一個人思考，決定最適合自己的方案', type: 'social' },
    ],
  },
  {
    title: '下午探險',
    subTitle: '你到了景點，選擇你的活動方式',
    options: [
      { text: '戶外冒險、刺激設施', type: 'explorer' },
      { text: '慢慢散步拍照', type: 'relax' },
      { text: '參加團體導覽或互動活動', type: 'culture' },
      { text: '自己探索隱藏景點', type: 'social' },
    ],
  },
  {
    title: '夜晚旅程',
    subTitle: '太陽下山，夜幕降臨，你打算如何度過？',
    options: [
      { text: '夜市 / 夜間樂園', type: 'explorer' },
      { text: '酒店房間放空、聽音樂', type: 'relax' },
      { text: '夜景拍照、散步', type: 'culture' },
      { text: '夜間刺激活動', type: 'social' },
    ],
  },
  {
    title: '旅程回顧',
    subTitle: '旅行結束，你最想留下什麼？',
    options: [
      { text: '拍大量照片 / 日記', type: 'A' },
      { text: '拍刺激影片', type: 'B' },
      { text: '和朋友合影、社群分享', type: 'C' },
      { text: '個人收藏小物、手札', type: 'D' },
    ],
  },
]

// 當前題目邏輯
const currentQuestion = computed(() => questions[currentStep.value - 1] as Question)

// 處理選擇答案
const selectedOptionIndex = ref<number | null>(null)

const handleAnswer = (option: Option, index: number) => {
  console.log('User selected:', option.text)
  if (currentStep.value === totalSteps && selectedOptionIndex.value !== null) return
  selectedOptionIndex.value = index // 記錄被選的按鈕索引

  if (currentStep.value < totalSteps) {
    animateProgress.value = true
    setTimeout(() => {
      currentStep.value++
      selectedOptionIndex.value = null // 下一題清空選擇
      animateProgress.value = false
    }, 300)
  } else {
    showResultButton.value = true
  }
}

// 跳轉結果頁
const goToResult = () => {
  router.push('/quiz-result')
}
</script>

<style scoped>
@keyframes progress-flow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

.animate-progress-flow {
  background-size: 200% 200%;
  animation: progress-flow 3s linear infinite;
}

@keyframes progress-bounce {
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.3);
  }
  100% {
    transform: scaleY(1);
  }
}
.animate-progress-bounce {
  animation: progress-bounce 0.3s ease-out;
}
</style>
