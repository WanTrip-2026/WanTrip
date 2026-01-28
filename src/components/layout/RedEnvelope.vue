<template>
  <div
    v-if="packets.length > 0"
    class="fixed inset-0 w-screen h-screen z-[9999] pointer-events-none overflow-hidden"
  >
    <div
      v-for="packet in packets"
      :key="packet.id"
      class="absolute top-[-100px] animate-red-packet-fall"
      :style="packet.style"
    >
      🧧
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { CSSProperties } from 'vue'

type Packet = {
  id: number
  style: CSSProperties
}

const packets = ref<Packet[]>([])
let packetId = 0

let generatorTimer: ReturnType<typeof setInterval> | null = null
let stopTimer: ReturnType<typeof setTimeout> | null = null

const createPacket = () => {
  const id = packetId++
  const left = Math.random() * 95
  const duration = Math.random() * 2 + 3 // 3–5 秒
  const size = Math.random() * 20 + 40 // 40–60px

  const style: CSSProperties = {
    left: `${left}%`,
    animationDuration: `${duration}s`,
    fontSize: `${size}px`,
  }

  packets.value.push({ id, style })

  setTimeout(() => {
    packets.value = packets.value.filter((p) => p.id !== id)
  }, duration * 1000)
}

onMounted(() => {
  generatorTimer = setInterval(createPacket, 200)

  stopTimer = setTimeout(() => {
    if (generatorTimer) clearInterval(generatorTimer)
  }, 8000)
})

onUnmounted(() => {
  if (generatorTimer) clearInterval(generatorTimer)
  if (stopTimer) clearTimeout(stopTimer)
})
</script>

<style scoped>
@keyframes red-packet-fall {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(115vh) rotate(360deg);
  }
}

.animate-red-packet-fall {
  animation-name: red-packet-fall;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
</style>
