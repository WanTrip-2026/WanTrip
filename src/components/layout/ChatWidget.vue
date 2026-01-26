<template>
  <div class="fixed bottom-0 right-0 z-50">
    <Transition name="slide-fade">
      <div
        v-if="isOpen"
        class="flex flex-col w-80 h-[420px] md:w-80 md:h-[520px] rounded-[20px] shadow-xl overflow-hidden mr-6 mb-36 md:mb-24 bg-white/50 backdrop-blur-xl border border-white/50"
      >
        <div class="bg-primary text-white font-semibold text-lg text-center py-3 z-10">
          旅遊規劃師 阿萬🪄
        </div>

        <div
          ref="msgBox"
          class="flex-1 p-3 flex flex-col gap-3 overflow-y-auto scrollbar-thin pb-4"
        >
          <TransitionGroup name="chat-list">
            <div
              v-for="m in messages"
              :key="m.id"
              :class="[
                'max-w-[85%] px-3 py-2 rounded-2xl shadow-sm break-words flex items-start relative',
                m.role === 'user'
                  ? 'self-end bg-gradient-to-r bg-primary text-white rounded-br-sm'
                  : 'self-start bg-white/80 text-dark-800 rounded-bl-sm',
              ]"
            >
              <img
                v-if="m.role === 'assistant'"
                src="https://res.cloudinary.com/wantrip/image/upload/f_auto,q_100,dpr_2/v1769403862/robot1_yaznos"
                alt="AI"
                class="w-6 h-6 rounded-full mr-2 mt-1 flex-shrink-0 object-cover"
              />
              <span class="whitespace-pre-wrap text-sm leading-relaxed">{{ m.content }}</span>
            </div>
          </TransitionGroup>

          <div
            v-if="isLoading"
            class="self-start bg-white/90 px-4 py-3 rounded-2xl shadow-sm border border-gray-100"
          >
            <div class="flex items-center gap-2">
              <span class="text-lg animate-spin-slow">🪄</span>
              <span class="text-sm text-dark-800 leading-relaxed">
                {{ currentLoadingText }}
              </span>
            </div>
          </div>
        </div>
        <div class="flex gap-2 p-3 border-t border-gray-100 bg-white z-10 relative">
          <input
            ref="inputField"
            v-model="userInput"
            @keyup.enter="sendMessage"
            :disabled="isLoading"
            placeholder="阿萬等你下指令冒險..."
            class="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-dark-900 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:bg-gray-50"
          />
          <button
            @click="sendMessage"
            :disabled="isLoading"
            class="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-main transition disabled:bg-gray-400 flex-shrink-0"
          >
            GO!
          </button>
        </div>
      </div>
    </Transition>

    <button
      @click="toggleChat"
      class="fixed bottom-24 md:bottom-6 right-6 w-10 h-10 md:w-14 md:h-14 rounded-full bg-primary text-white border border-white/60 flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 z-50"
      :class="{ 'rotate-180': isOpen }"
    >
      <font-awesome-icon v-if="isOpen" icon="fa-solid fa-xmark" class="text-2xl text-white" />

      <img
        v-else
        src="https://res.cloudinary.com/wantrip/image/upload/f_auto,q_100,dpr_2/v1769403862/robot_geqjl0"
        alt="阿萬"
        class="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { chatService } from '@/constants/chatService'

interface Message {
  id: number
  role: 'user' | 'assistant' | 'system'
  content: string
}

const isOpen = ref(false)
const userInput = ref('')
const isLoading = ref(false)
const msgBox = ref<HTMLElement | null>(null)

// 1. 準備歡迎詞陣列
const greetings = [
  '今天的天氣適合出發！想去哪裡走走？☀️',
  '世界這麼大，WanTrip 陪你去看看！✈️',
  '正在為訂飯店煩惱嗎？交給我吧！🏨',
  '聽說想旅行的人最帥/最美了，今天想去哪？🌈',
]

const getTimeGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return '早安！美好的一天從 WanTrip 開始，想去哪裡冒險呢？✈️'
  if (hour < 18) return '午安！下午茶時間最適合規劃行程了，我幫你找靈感！ 🍰'
  return '晚安！睡前偷偷看個景點，夢裡先去玩一次嘿嘿！🌙'
}

const messages = ref<Message[]>([])

// 3. 切換視窗邏輯
const toggleChat = () => {
  isOpen.value = !isOpen.value

  if (isOpen.value && messages.value.length === 0) {
    // 隨機選一個普通歡迎詞
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]

    // 50% 機率出隨機詞，50% 出時間詞
    const welcomeMsg = Math.random() > 0.5 ? randomGreeting : getTimeGreeting()

    messages.value.push({
      id: Date.now(),
      role: 'assistant',
      content: welcomeMsg ?? '你好！我是阿萬，有什麼可以幫你的嗎？',
    })
    scrollToBottom()
  }
}

const currentLoadingText = ref('')

const loadingTexts = [
  '阿萬正在尋找靈感... ✨',
  '阿萬正在翻閱私藏地圖... 🗺️',
  '阿萬幫你從口袋名單挑選最棒的景點... 💎',
  '阿萬正在喝口咖啡，靈感馬上就來！☕',
  '阿萬正在努力讓你的旅程變得更完美... 🌈',
]

// 自動捲動到底部
const scrollToBottom = async () => {
  await nextTick()
  if (msgBox.value) {
    msgBox.value.scrollTop = msgBox.value.scrollHeight
  }
}

const inputField = ref<HTMLInputElement | null>(null)

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return

  const userQuery = userInput.value

  // A. 先把使用者的問題推送到畫面上
  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: userQuery,
  })

  // 整理記憶紀錄
  const chatHistory = messages.value.map((m) => ({
    role: m.role,
    content: m.content,
  }))

  const randomIndex = Math.floor(Math.random() * loadingTexts.length)
  currentLoadingText.value = loadingTexts[randomIndex] ?? '阿萬正在思考中...'

  // B. 清空輸入框、開啟載入狀態、捲動到底部
  userInput.value = ''
  isLoading.value = true
  await scrollToBottom()

  try {
    const data = await chatService.sendMessage(chatHistory)

    messages.value.push({
      id: Date.now() + 1,
      role: 'assistant',
      content: data.answer || '抱歉，我暫時無法回答這個問題。',
    })
  } catch (error) {
    console.error(error)
    messages.value.push({
      id: Date.now() + 1,
      role: 'assistant',
      content: '哎呀，阿萬的訊號不太穩定，請稍後再試！',
    })
  } finally {
    isLoading.value = false

    // 讓游標回到輸入框
    // 使用 nextTick 確保 DOM 已經從 disabled 狀態恢復
    await nextTick()
    inputField.value?.focus()
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px) scale(0.9);
  opacity: 0;
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  display: inline-block;
  animation: spin-slow 2s linear infinite;
}

@keyframes magic-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
    filter: blur(0px);
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
    filter: blur(1px);
  }
}

.magic-dot {
  animation: magic-pulse 1.2s infinite ease-in-out;
}

div[ref='msgBox']::-webkit-scrollbar,
.overflow-y-auto::-webkit-scrollbar {
  width: 4px !important;
}

div[ref='msgBox']::-webkit-scrollbar-thumb,
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1) !important;
  border-radius: 10px !important;
}

div[ref='msgBox']::-webkit-scrollbar-track,
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent !important;
}

/* 訊息清單進場動畫 */
.chat-list-enter-active {
  transition: all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

.chat-list-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.chat-list-move {
  transition: transform 0.3s ease;
}

.chat-list-leave-active {
  position: absolute;
}
</style>
