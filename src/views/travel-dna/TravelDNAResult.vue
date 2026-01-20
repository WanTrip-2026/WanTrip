<template>
  <div
    class="w-full min-h-screen relative bg-page bg-cover bg-center"
    style="background-image: url('/src/assets/traveldna_img/IntroBg.png')"
  >
    <div class="absolute inset-0 w-full h-full bg-primary/50 backdrop-blur-sm"></div>
    <div class="relative z-10 flex flex-col items-center justify-center min-h-screen p-5">
      <div
        class="bg-white/20 backdrop-blur-md rounded-[20px] border border-white/30 p-5 m-24 shadow-xl max-w-md w-full"
      >
        <img :src="roleMap[role].img" alt="Result" ref="roleImgRef" class="w-full mb-5 mx-auto" />
        <p class="text-white text-lg font-bold tracking-wider text-center mb-10 drop-shadow-lg">
          🎫 推薦票券：{{ roleMap[role].tickets }}
        </p>
        <div class="flex gap-5 justify-center flex-wrap">
          <button
            @click="saveRoleImage"
            class="bg-primary hover:bg-primary_hover text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition"
          >
            儲存結果
          </button>
          <button
            @click="goToIntro"
            class="bg-primary hover:bg-primary_hover text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition"
          >
            再測一次
          </button>
          <button
            @click="showShareMenu = true"
            class="bg-primary hover:bg-primary_hover text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition"
          >
            邀請朋友測驗
          </button>
          <div
            v-if="showShareMenu"
            class="fixed inset-0 z-50 flex items-center justify-center p-5 bg-gray-300/30 backdrop-blur-sm rounded-[20px]"
            @click.self="showShareMenu = false"
          >
            <div class="bg-white rounded-2xl p-6 w-full max-w-xs text-gray-800 shadow-2xl">
              <h3 class="text-xl font-bold mb-4 text-center">分享我的測驗結果</h3>

              <div class="grid grid-cols-1 gap-3">
                <button
                  @click="copyLink"
                  class="flex items-center justify-center gap-2 bg-gray-700 text-white p-3 rounded-xl hover:bg-gray-800 transition"
                >
                  🔗 複製連結
                </button>
                <button
                  @click="shareToLine"
                  class="flex items-center justify-center gap-2 bg-[#06C755] text-white p-3 rounded-xl hover:opacity-90 transition font-bold"
                >
                  LINE 分享
                </button>
                <button
                  v-if="canNativeShare"
                  @click="handleNativeShare"
                  class="flex items-center justify-center gap-2 bg-gray-100 p-3 rounded-xl hover:bg-gray-200 transition"
                >
                  📲 更多分享方式
                </button>
              </div>

              <button @click="showShareMenu = false" class="mt-4 w-full text-gray-500 text-sm">
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'

type RoleKey = 'bear' | 'lion' | 'turtle' | 'sheep' | 'owl' | 'cat' | 'fox' | 'rabbit'

interface RoleData {
  name: string
  img: string
  tickets: string
}

const router = useRouter()
const route = useRoute()

const roleMap: Record<RoleKey, RoleData> = {
  bear: {
    name: '探險熊',
    img: '/src/assets/traveldna_img/Bear.svg',
    tickets: '大坑登山步道、合歡山步道',
  },
  lion: {
    name: '刺激獅',
    img: '/src/assets/traveldna_img/Lion.svg',
    tickets: '六福村主題樂園、義大遊樂世界',
  },
  turtle: {
    name: '漫遊龜',
    img: '/src/assets/traveldna_img/Turtle.svg',
    tickets: '大安森林公園、高雄市立美術館',
  },
  sheep: {
    name: '放空羊',
    img: '/src/assets/traveldna_img/Sheep.svg',
    tickets: '淡水漁人碼頭、日月潭遊湖',
  },
  owl: {
    name: '知旅鴞',
    img: '/src/assets/traveldna_img/Owl.svg',
    tickets: '淡水老街導覽、松山文創園區',
  },
  cat: {
    name: '城市貓',
    img: '/src/assets/traveldna_img/Cat.svg',
    tickets: '淡水紅毛城、打狗英國領事館',
  },
  fox: {
    name: '社交狐',
    img: '/src/assets/traveldna_img/Fox.svg',
    tickets: '羅東夜市、漢來海港自助餐',
  },
  rabbit: {
    name: '美食兔',
    img: '/src/assets/traveldna_img/Rabbit.svg',
    tickets: '饗 A JOY、漢來海港自助餐',
  },
}

const role = computed<RoleKey>(() => {
  const r = route.query.role
  if (r && typeof r === 'string' && r in roleMap) {
    return r as RoleKey
  }
  return 'turtle'
})

const roleImgRef = ref<HTMLImageElement>()

// 儲存角色圖
const saveRoleImage = () => {
  const img = roleImgRef.value
  if (!img) return

  const scale = 2
  const canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth * scale
  canvas.height = img.naturalHeight * scale
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 提升畫質
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  canvas.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'WanTripTravelDNA.png'
    link.click()
    URL.revokeObjectURL(url)
  }, 'image/png')
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
  const roleName = roleMap[role.value].name
  const url = window.location.href
  const title = 'WanTrip 旅遊 DNA 測驗'
  const text = `我的旅遊靈魂動物是【${roleName}】，快來測測看你的旅遊 DNA！`
  return { url, title, text }
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
    alert('連結已複製！可以貼給朋友囉！') // 建議之後改用 Toast 元件
    showShareMenu.value = false
  } catch (err) {
    console.error('複製失敗', err)
  }
}
</script>
