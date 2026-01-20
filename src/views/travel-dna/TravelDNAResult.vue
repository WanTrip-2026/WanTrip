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
            class="bg-primary hover:bg-primary_hover text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition"
          >
            邀請朋友測驗
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { ref } from 'vue'

type RoleKey = 'bear' | 'lion' | 'turtle' | 'sheep' | 'owl' | 'cat' | 'fox' | 'rabbit'

interface RoleData {
  img: string
  tickets: string
}

const router = useRouter()
const route = useRoute()

const roleMap: Record<RoleKey, RoleData> = {
  bear: {
    img: '/src/assets/traveldna_img/Bear.svg',
    tickets: '大坑登山步道、合歡山步道',
  },
  lion: {
    img: '/src/assets/traveldna_img/Lion.svg',
    tickets: '六福村主題樂園、義大遊樂世界',
  },
  turtle: {
    img: '/src/assets/traveldna_img/Turtle.svg',
    tickets: '大安森林公園、高雄市立美術館',
  },
  sheep: {
    img: '/src/assets/traveldna_img/Sheep.svg',
    tickets: '淡水漁人碼頭、日月潭遊湖',
  },
  owl: {
    img: '/src/assets/traveldna_img/Owl.svg',
    tickets: '淡水老街導覽、松山文創園區',
  },
  cat: {
    img: '/src/assets/traveldna_img/Cat.svg',
    tickets: '淡水紅毛城、打狗英國領事館',
  },
  fox: {
    img: '/src/assets/traveldna_img/Fox.svg',
    tickets: '羅東夜市、漢來海港自助餐',
  },
  rabbit: {
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
</script>
