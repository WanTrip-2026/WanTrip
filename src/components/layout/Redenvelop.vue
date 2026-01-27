<template>
  <div v-if="packets.length > 0" class="rain-container">
    <div v-for="packet in packets" :key="packet.id" class="red-packet" :style="packet.style">
      <div class="packet-content">🧧</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const packets = ref([])
let packetId = 0
let generatorTimer = null // 控制持續生成的計時器
let stopTimer = null // 控制 8 秒關閉的計時器

const createPacket = () => {
  const id = packetId++
  const left = Math.random() * 95
  const duration = Math.random() * 2 + 3 // 落下時間 3-5 秒
  const size = Math.random() * 20 + 50 // 隨機大小 (40-60px)

  const style = {
    left: `${left}%`,
    animationDuration: `${duration}s`,
    fontSize: `${size}px`,
  }

  packets.value.push({ id, style })

  // 每個紅包掉完後自己消失
  setTimeout(() => {
    packets.value = packets.value.filter((p) => p.id !== id)
  }, duration * 1000)
}

onMounted(() => {
  // 1. 開始每 200ms 產生紅包
  generatorTimer = setInterval(createPacket, 200)

  // 2. 8 秒後停止產生新的紅包
  stopTimer = setTimeout(() => {
    clearInterval(generatorTimer)
    console.log('停止生成紅包')
  }, 8000)
})

onUnmounted(() => {
  clearInterval(generatorTimer)
  clearTimeout(stopTimer)
})
</script>

<style scoped>
.rain-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;
}

.red-packet {
  position: absolute;
  top: -100px;
  font-size: 50px;
  animation: fall linear forwards;
}

@keyframes fall {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(115vh) rotate(360deg);
  }
}
</style>
