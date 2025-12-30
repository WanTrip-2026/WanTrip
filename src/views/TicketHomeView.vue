<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Experience {
  id: number
  image: string
  title: string
  rating: number
  reviews: number
}

interface Section {
  title: string
  variant: 'landscape' | 'portrait' | 'region'
  items: Experience[]
}

const sections = ref<Section[]>([])
const isLoading = ref(true)
const isRegionSection = (sectionTitle: string) => sectionTitle === '人氣地區'

onMounted(() => {
  setTimeout(() => {
    sections.value = [
      { title: '熱門景點', variant: 'landscape', items: mockItems(8) },
      { title: '特色體驗', variant: 'portrait', items: mockItems(4) },
      { title: '人氣地區', variant: 'region', items: mockItems(4) },
      { title: '推薦門票', variant: 'landscape', items: mockItems(8) },
    ]
    isLoading.value = false
  }, 1000)
})

function mockItems(count: number): Experience[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800',
    title: `示範景點 ${i + 1}`,
    rating: 4.7,
    reviews: 33715,
  }))
}
</script>

<template>
  <main class="bg-[#f7fbfb] pb-10">
    <div class="mt-5 pt-[80px]">
      <div class="max-w-[1200px] mx-auto px-4 md:px-6">
        <section
          class="max-w-[800px] h-[80px] p-2.5 mx-auto
                 bg-secondary rounded-full flex items-center gap-5
                 mt-5 mb-10"
        >
          <div class="h-full w-full">
            <input
              type="text"
              placeholder="城市"
              class="h-full w-full border text-center border-gray-300 rounded-full
                     focus:ring-primary focus:border-primary outline-none"
            />
          </div>

          <div class="h-full w-full">
            <input
              type="text"
              placeholder="景點與體驗"
              class="h-full w-full border text-center border-gray-300 rounded-full
                     focus:ring-primary focus:border-primary outline-none"
            />
          </div>

          <div class="h-full">
            <button
              class="h-full bg-primary text-white font-bold px-[30px]
                     rounded-full hover:brightness-95 whitespace-nowrap"
            >
              搜尋
            </button>
          </div>
        </section>

        <template v-if="isLoading">
          <section v-for="n in 2" :key="n" class="mb-10">
            <div class="h-6 w-32 bg-gray-200 rounded mb-[40px] animate-pulse"></div>

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <div
                v-for="i in 4"
                :key="i"
                class="bg-gray-200 rounded-[40px] aspect-[4/3] animate-pulse"
              />
            </div>

            <div class="mt-5 flex justify-center">
              <div class="h-[44px] w-[120px] bg-gray-200 rounded-full animate-pulse" />
            </div>
          </section>
        </template>

        <template v-else>
          <section v-for="section in sections" :key="section.title" class="mb-10">
            <h2 class="text-[24px] font-extrabold mb-[40px]">
              {{ section.title }}
            </h2>

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <article
                v-for="item in section.items"
                :key="item.id"
                class="rounded-[20px] overflow-hidden border border-gray-200 bg-white hover:border-black transition"
              >
                <template v-if="isRegionSection(section.title)">
                  <div
                    class="relative w-full bg-gray-100"
                    :class="
                      section.variant === 'portrait'
                        ? 'aspect-[3/4]'
                        : section.variant === 'region'
                          ? 'aspect-[5/4]'
                          : 'aspect-[4/3]'
                    "
                  >
                    <img :src="item.image" class="w-full h-full object-cover" />

                    <div class="absolute left-4 bottom-4 text-white">
                      <p class="text-[26px] font-extrabold leading-none drop-shadow">
                        {{ item.title }}
                      </p>
                      <p class="mt-2 text-[18px] font-semibold drop-shadow flex items-center gap-2">
                        探索 <span class="text-[22px] leading-none">›</span>
                      </p>
                    </div>
                  </div>
                </template>

                <template v-else>
                  <div
                    class="w-full bg-gray-100"
                    :class="
                      section.variant === 'portrait'
                        ? 'aspect-[3/4]'
                        : section.variant === 'region'
                          ? 'aspect-[5/4]'
                          : 'aspect-[4/3]'
                    "
                  >
                    <img :src="item.image" class="w-full h-full object-cover" />
                  </div>

                  <div class="p-5">
                    <h3 class="text-[18px] font-bold text-black">
                      {{ item.title }}
                    </h3>

                    <div class="mt-3 flex items-center gap-3">
                      <span
                        class="bg-[#6D8FA3] text-white font-bold text-sm
                               px-3 py-1 rounded-full">
                        {{ item.rating }} / 5
                      </span>
                      <span class="text-gray-500 text-sm">
                        {{ item.reviews.toLocaleString() }}則評價
                      </span>
                    </div>
                  </div>
                </template>
              </article>
            </div>

            <div class="mt-5 flex justify-center">
              <button
                type="button"
                class="h-[44px] bg-primary text-white font-bold px-[30px]
                       rounded-full hover:brightness-95 transition shadow-sm"
              >
                顯示更多
              </button>
            </div>
          </section>
        </template>
      </div>
    </div>
  </main>
</template>

