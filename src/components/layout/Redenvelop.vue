<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { CSSProperties } from 'vue'

type Packet = {
  id: number
  style: CSSProperties
  removeTimer: ReturnType<typeof setTimeout>
}

const packets = ref<Packet[]>([])
let packetId = 0

let generatorTimer: ReturnType<typeof setInterval> | null = null
let stopTimer: ReturnType<typeof setTimeout> | null = null

const MAX_PACKETS = 30

const createPacket = () => {
  if (packets.value.length >= MAX_PACKETS) return

  const id = packetId++
  const left = Math.random() * 95
  const duration = Math.random() * 2 + 3 // 3–5s
  const size = Math.random() * 20 + 40 // 40–60px（你原本註解寫 40-60，但程式是 50-70）

  const style: CSSProperties = {
    left: `${left}%`,
    animationDuration: `${duration}s`,
    fontSize: `${size}px`,
  }

  const removeTimer = setTimeout(() => {
    packets.value = packets.value.filter((p) => p.id !== id)
  }, duration * 1000)

  packets.value.push({ id, style, removeTimer })
}

onMounted(() => {
  generatorTimer = setInterval(createPacket, 200)

  stopTimer = setTimeout(() => {
    if (generatorTimer) clearInterval(generatorTimer)
    generatorTimer = null
  }, 8000)
})

onUnmounted(() => {
  if (generatorTimer) clearInterval(generatorTimer)
  if (stopTimer) clearTimeout(stopTimer)

  // 清掉每個 packet 自己的 timeout，避免卸載後還改 state
  packets.value.forEach((p) => clearTimeout(p.removeTimer))
  packets.value = []
})
</script>
