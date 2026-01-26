<template>
  <div
    class="fixed inset-0 z-0 bg-page bg-cover bg-center"
    style="
      background-image: url('https://res.cloudinary.com/wantrip/image/upload/f_auto,q_90,w_2560,dpr_2/v1769236224/IntroBg_fji07v');
    "
  >
    <div class="absolute inset-0 bg-primary/50 backdrop-blur-sm"></div>
  </div>

  <div class="relative z-10 min-h-screen w-full flex justify-center overflow-y-auto">
    <div class="w-full max-w-2xl px-5 py-24 md:py-24 flex flex-col items-center">
      <div
        class="bg-white/20 backdrop-blur-md rounded-[20px] border border-white/30 p-6 md:p-10 shadow-xl w-full"
      >
        <img
          :src="roleMap[role].img"
          loading="lazy"
          decoding="async"
          alt="Result"
          ref="roleImgRef"
          @load="playFadeIn"
          class="w-full max-w-[280px] md:max-w-[380px] mb-6 mx-auto drop-shadow-2xl opacity-0"
        />
        <div
          v-if="!imgLoaded"
          class="w-full max-w-[280px] md:max-w-[380px] mb-6 mx-auto h-[280px] md:h-[380px] bg-white/10 rounded-2xl animate-pulse"
        ></div>

        <div class="mb-10 text-center">
          <p
            class="text-white text-base md:text-lg font-bold tracking-wider mb-4 drop-shadow-lg opacity-90"
          >
            🎫 推薦票券 🎫
          </p>

          <div class="flex flex-wrap justify-center items-center gap-3">
            <template v-for="ticket in roleMap[role].tickets" :key="ticket.id">
              <router-link
                :to="`/tickets/${ticket.id}`"
                target="_blank"
                class="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm md:text-base hover:bg-white/30 hover:scale-105 transition-all duration-300 backdrop-blur-sm shadow-sm select-none"
              >
                {{ ticket.name }}
              </router-link>
            </template>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <button
            @click="saveRoleImage"
            class="bg-primary hover:bg-primary_hover text-white px-4 py-3 rounded-full text-base md:text-lg font-bold shadow-lg transition active:scale-95"
          >
            儲存結果
          </button>
          <button
            @click="goToIntro"
            class="bg-primary hover:bg-primary_hover text-white px-4 py-3 rounded-full text-base md:text-lg font-bold shadow-lg transition active:scale-95"
          >
            再測一次
          </button>
          <button
            @click="showShareMenu = true"
            class="bg-primary hover:bg-primary_hover text-white px-4 py-3 rounded-full text-base md:text-lg font-bold shadow-lg transition active:scale-95"
          >
            邀請朋友
          </button>
        </div>
      </div>

      <transition name="fade">
        <div
          v-if="showShareMenu"
          class="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/50 backdrop-blur-md"
          @click.self="showShareMenu = false"
        >
          <div
            class="bg-white rounded-[24px] p-8 w-full max-w-sm text-gray-800 shadow-2xl scale-in"
          >
            <h3 class="text-xl font-extrabold mb-6 text-center">分享我的測驗結果</h3>
            <div class="flex flex-col gap-4">
              <button
                @click="copyLink"
                class="flex items-center justify-center gap-3 bg-gray-100 p-4 rounded-2xl hover:bg-gray-200 transition font-medium"
              >
                🔗 複製連結
              </button>
              <button
                @click="shareToLine"
                class="flex items-center justify-center gap-3 bg-[#06C755] text-white p-4 rounded-2xl hover:opacity-90 transition font-bold"
              >
                LINE 分享
              </button>
              <button
                v-if="canNativeShare"
                @click="handleNativeShare"
                class="flex items-center justify-center gap-3 bg-blue-50 text-blue-600 p-4 rounded-2xl hover:bg-blue-100 transition font-medium"
              >
                📲 其他分享方式
              </button>
            </div>
            <button
              @click="showShareMenu = false"
              class="mt-6 w-full py-2 text-gray-400 text-sm font-medium hover:text-gray-600 transition"
            >
              取消
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { gsap } from 'gsap'

type RoleKey = 'bear' | 'lion' | 'turtle' | 'sheep' | 'owl' | 'cat' | 'fox' | 'rabbit'

interface Ticket {
  name: string
  id: string
}

interface RoleData {
  name: string
  img: string
  tickets: Ticket[] // 改為 Ticket 陣列
}

const router = useRouter()
const route = useRoute()

const roleImgRef = ref<HTMLImageElement | null>(null)
const imgLoaded = ref(false)

const playFadeIn = () => {
  if (!roleImgRef.value) return
  imgLoaded.value = true

  gsap.fromTo(
    roleImgRef.value,
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
  )
}

const roleMap: Record<RoleKey, RoleData> = {
  bear: {
    name: '探險熊',
    img: 'https://res.cloudinary.com/wantrip/image/upload/f_auto,q_100,w_800,dpr_2/v1769236223/Bear_o2nkiv',
    tickets: [
      { name: '大坑登山步道', id: '8415e430-db48-4b54-ade3-ec1884104384' },
      { name: '合歡山步道', id: '8dda1f46-390c-4524-81d7-d7fc911f0ea2' },
    ],
  },
  lion: {
    name: '刺激獅',
    img: 'https://res.cloudinary.com/wantrip/image/upload/f_auto,q_100,w_800,dpr_2/v1769236237/Lion_kpkiiq',
    tickets: [
      { name: '六福村主題樂園', id: '34e1de2e-a7fd-48be-868d-51df067e3854' },
      { name: '義大遊樂世界', id: '4113d661-777c-41ef-84b9-907aaa32da42' },
    ],
  },
  turtle: {
    name: '漫遊龜',
    img: 'https://res.cloudinary.com/wantrip/image/upload/f_auto,q_100,w_800,dpr_2/v1769236246/Turtle_gqeqsv',
    tickets: [
      { name: '大安森林公園', id: '204ec8b3-1065-46e8-8496-6c3c1793945d' },
      { name: '高雄市立美術館', id: 'b818940a-2d61-462b-9b29-19b2ca53957f' },
    ],
  },
  sheep: {
    name: '放空羊',
    img: 'https://res.cloudinary.com/wantrip/image/upload/f_auto,q_100,w_800,dpr_2/v1769236232/Sheep_yg9er2',
    tickets: [
      { name: '淡水漁人碼頭', id: 'ccdb9755-2f55-45a6-a719-73e0c9ff2c8e' },
      { name: '日月潭遊湖', id: 'cb423c81-45a0-468d-9561-5031b9f8f5eb' },
    ],
  },
  owl: {
    name: '知旅鴞',
    img: 'https://res.cloudinary.com/wantrip/image/upload/f_auto,q_100,w_800,dpr_2/v1769236240/Owl_pizgxo',
    tickets: [
      { name: '淡水老街導覽', id: '89f201ab-2f3d-481f-8312-5cb79f00e20f' },
      { name: '華山文創園區', id: '871f316b-9555-4449-adab-bbb70c327aa1' },
    ],
  },
  cat: {
    name: '城市貓',
    img: 'https://res.cloudinary.com/wantrip/image/upload/f_auto,q_100,w_800,dpr_2/v1769236233/Cat_mugn3l',
    tickets: [
      { name: '淡水紅毛城', id: '31343d56-4be0-44d8-8e61-207ed6597678' },
      { name: '打狗英國領事館', id: '62051de7-c3f0-4a57-90b7-b0e30f79f9da' },
    ],
  },
  fox: {
    name: '社交狐',
    img: 'https://res.cloudinary.com/wantrip/image/upload/f_auto,q_100,w_800,dpr_2/v1769236227/Fox_cjqqhv',
    tickets: [
      { name: '羅東夜市', id: '978d6790-bda3-4b5c-9783-86f3ffe8b4a2' },
      { name: '漢來海港自助餐', id: '41d977c8-16f3-4356-bc44-62b4d59af6e1' },
    ],
  },
  rabbit: {
    name: '美食兔',
    img: 'https://res.cloudinary.com/wantrip/image/upload/f_auto,q_100,w_800,dpr_2/v1769236238/Rabbit_ewi9ck',
    tickets: [
      { name: '饗 A JOY', id: 'c17cb3f8-69ce-43a2-8250-4feb9d396e3f' },
      { name: '漢來海港自助餐', id: '41d977c8-16f3-4356-bc44-62b4d59af6e1' },
    ],
  },
}

const role = computed<RoleKey>(() => {
  const r = route.query.role
  if (r && typeof r === 'string' && r in roleMap) {
    return r as RoleKey
  }
  return 'turtle'
})

// 儲存角色圖
const saveRoleImage = async () => {
  try {
    const currentRole = roleMap[role.value] // 根據目前選的角色
    const imgUrl = currentRole.img

    const res = await fetch(imgUrl, { mode: 'cors' })
    if (!res.ok) throw new Error('圖片抓取失敗')
    const blob = await res.blob()

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${currentRole.name}.webp` // 自動用角色名稱命名
    link.click()

    URL.revokeObjectURL(link.href)
  } catch (err) {
    console.error('下載失敗', err)
  }
}

const goToIntro = () => {
  router.push('/travel-dna/intro')
}

const showShareMenu = ref(false)
const canNativeShare = ref(false)

// 檢查瀏覽器是否支援 Web Share API
onMounted(() => {
  canNativeShare.value = !!navigator.share
})

// 設定分享的基礎資料
const getShareData = () => {
  const currentRole = roleMap[role.value]
  return {
    url: window.location.href,
    title: 'WanTrip 旅遊 DNA 測驗',
    text: `我的旅遊靈魂動物是【${currentRole.name}】，快來測測看你的旅遊 DNA！`,
  }
}

// 1. 原生分享
const handleNativeShare = async () => {
  const data = getShareData()
  try {
    await navigator.share(data)
    showShareMenu.value = false
  } catch (err) {
    console.log('使用者取消或不支援', err)
  }
}

// 2. LINE 分享
const shareToLine = () => {
  const { url, text } = getShareData()
  // LINE 分享格式：https://line.me/R/msg/text/?{文字}{換行}{網址}
  const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(text + '\n\n' + url)}`
  window.open(lineUrl, '_blank')
  showShareMenu.value = false
}

// 3. 複製連結
const copyLink = async () => {
  const { url } = getShareData()
  try {
    await navigator.clipboard.writeText(url)
    alert('連結已複製！快點分享給朋友吧～')
    showShareMenu.value = false
  } catch (err) {
    console.error('複製失敗', err)
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-in {
  animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
