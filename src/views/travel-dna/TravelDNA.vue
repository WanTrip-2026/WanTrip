<template>
  <div class="w-full min-h-screen relative">
    <img
      src="/src/assets/traveldna_img/IntroBg.png"
      alt="Background"
      class="absolute inset-0 w-full h-full object-cover z-0"
    />
    <div class="absolute inset-0 w-full h-full bg-primary/50 backdrop-blur-sm"></div>
    <div class="relative z-10 max-w-[1200px] mx-auto pt-24">
      <div class="relative max-w-[800px] h-4 mt-5 mb-12 mx-auto">
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

        <div class="grid grid-cols-1 gap-5">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="handleAnswer(option, index)"
            :class="
              selectedOptionIndex === index
                ? 'bg-white/80 border-black/30 p-5 rounded-[20px] text-xl font-medium border-2 '
                : 'bg-[#EEF2F7] hover:bg-white/80 hover:border-black/30 p-5 rounded-[20px] text-xl font-medium border-2 '
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

type RoleKey = 'bear' | 'lion' | 'sheep' | 'turtle' | 'owl' | 'cat' | 'fox' | 'rabbit'

interface Question {
  title: string
  subTitle: string
  options: Option[]
}
interface Option {
  text: string
  score: { role: RoleKey; point: number }[]
}

const router = useRouter()
const goToResult = () => {
  router.push({
    path: '/travel-dna/result',
    query: { role: finalRole.value },
  })
}

// 題目資料定義
const totalSteps = 6
const questions: Question[] = [
  {
    title: '晨光甦醒',
    subTitle: '你在陌生城市醒來，窗外的陽光灑進房間，你會如何開始一天？',
    options: [
      {
        text: '迫不及待踏出門去看看街道的另一端',
        score: [
          { role: 'bear', point: 2 },
          { role: 'lion', point: 1 },
        ],
      },
      {
        text: '慢慢梳洗，泡杯咖啡，坐在窗邊看人來人往',
        score: [
          { role: 'sheep', point: 2 },
          { role: 'turtle', point: 1 },
        ],
      },
      {
        text: '隨意穿好衣服，漫步到街角，探索陌生的小巷',
        score: [
          { role: 'owl', point: 2 },
          { role: 'cat', point: 1 },
        ],
      },
      {
        text: '拿起手機聯絡朋友，討論今天的計畫和路線',
        score: [
          { role: 'fox', point: 2 },
          { role: 'rabbit', point: 1 },
        ],
      },
    ],
  },
  {
    title: '早餐奇遇',
    subTitle: '街道上傳來誘人的香氣，你走進一家早餐店，你想怎麼用餐？',
    options: [
      {
        text: '快速點餐，邊吃邊期待接下來的行程',
        score: [
          { role: 'bear', point: 2 },
          { role: 'lion', point: 1 },
        ],
      },
      {
        text: '慢慢品嘗每一口，拍照留念',
        score: [
          { role: 'cat', point: 2 },
          { role: 'owl', point: 1 },
        ],
      },
      {
        text: '和同行的朋友討論推薦菜色，順便聊天',
        score: [
          { role: 'fox', point: 2 },
          { role: 'rabbit', point: 1 },
        ],
      },
      {
        text: '找個安靜角落，一邊吃一邊觀察店裡的人群',
        score: [
          { role: 'sheep', point: 2 },
          { role: 'turtle', point: 1 },
        ],
      },
    ],
  },
  {
    title: '突發事件',
    subTitle: '行程中突然下起小雨，街道濕滑，交通也稍微延誤，你會怎麼做？',
    options: [
      {
        text: '不被打亂，立刻改變計畫，看看新的探索機會',
        score: [
          { role: 'lion', point: 2 },
          { role: 'bear', point: 1 },
        ],
      },
      {
        text: '找家咖啡館，坐下享受雨聲與溫暖飲品',
        score: [
          { role: 'sheep', point: 2 },
          { role: 'turtle', point: 1 },
        ],
      },
      {
        text: '靜靜思考下一步，找自己最想做的方式前進',
        score: [
          { role: 'owl', point: 2 },
          { role: 'cat', point: 1 },
        ],
      },
      {
        text: '跟朋友一起討論接下來去哪裡比較好',
        score: [
          { role: 'fox', point: 2 },
          { role: 'rabbit', point: 1 },
        ],
      },
    ],
  },
  {
    title: '下午旅程',
    subTitle: '你到了一個景點，周遭充滿各種活動選項，你想如何度過這個下午？',
    options: [
      {
        text: '嘗試不一樣的體驗，挑戰自己的舒適圈',
        score: [
          { role: 'bear', point: 2 },
          { role: 'lion', point: 1 },
        ],
      },
      {
        text: '沿著小路慢慢散步，欣賞周遭的景色',
        score: [
          { role: 'turtle', point: 2 },
          { role: 'sheep', point: 1 },
        ],
      },
      {
        text: '發掘角落裡的小驚喜，沉浸在細節中',
        score: [
          { role: 'owl', point: 2 },
          { role: 'cat', point: 1 },
        ],
      },
      {
        text: '參加導覽或互動活動，和其他人一起體驗',
        score: [
          { role: 'rabbit', point: 2 },
          { role: 'fox', point: 1 },
        ],
      },
    ],
  },
  {
    title: '夜晚旅程',
    subTitle: '太陽下山，城市燈光逐漸亮起，你打算如何度過這個夜晚？',
    options: [
      {
        text: '嘗試夜間的特色體驗，看看不同的夜晚景象',
        score: [
          { role: 'lion', point: 2 },
          { role: 'bear', point: 1 },
        ],
      },
      {
        text: '在飯店房間放空、聽音樂',
        score: [
          { role: 'sheep', point: 2 },
          { role: 'turtle', point: 1 },
        ],
      },
      {
        text: '漫步街頭或沿河邊欣賞夜景，拍下美麗瞬間',
        score: [
          { role: 'cat', point: 2 },
          { role: 'owl', point: 1 },
        ],
      },
      {
        text: '逛夜市或參加晚間活動，感受熱鬧氛圍',
        score: [
          { role: 'rabbit', point: 2 },
          { role: 'fox', point: 1 },
        ],
      },
    ],
  },
  {
    title: '旅程回顧',
    subTitle: '旅行結束了，你最想做什麼？',
    options: [
      {
        text: '記錄那些讓人心跳加速的瞬間',
        score: [
          { role: 'lion', point: 2 },
          { role: 'bear', point: 1 },
        ],
      },
      {
        text: '把旅途的節奏與心情慢慢寫下來',
        score: [
          { role: 'sheep', point: 2 },
          { role: 'turtle', point: 1 },
        ],
      },
      {
        text: '收集小物或紀念品，作為旅途的專屬印記',
        score: [
          { role: 'owl', point: 2 },
          { role: 'cat', point: 1 },
        ],
      },
      {
        text: '和朋友分享美食與旅途趣事',
        score: [
          { role: 'fox', point: 2 },
          { role: 'rabbit', point: 1 },
        ],
      },
    ],
  },
]

const currentStep = ref(1)
const showResultButton = ref(false)
const animateProgress = ref(false)
// 處理選擇答案
const selectedOptionIndex = ref<number | null>(null)
const scores = ref<Record<RoleKey, number>>({
  bear: 0,
  lion: 0,
  sheep: 0,
  turtle: 0,
  owl: 0,
  cat: 0,
  fox: 0,
  rabbit: 0,
})

// 當前題目邏輯
const currentQuestion = computed(() => questions[currentStep.value - 1] as Question)

const finalRole = computed<RoleKey>(
  () =>
    (Object.entries(scores.value) as [RoleKey, number][]).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    'bear',
)

const handleAnswer = (option: Option, index: number) => {
  console.log('User selected:', option.text)
  if (currentStep.value === totalSteps && selectedOptionIndex.value !== null) return
  selectedOptionIndex.value = index // 記錄被選的按鈕索引

  option.score.forEach(({ role, point }) => {
    scores.value[role] += point
  })

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
