<script setup>
// 帶入假資料
const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
})

// const props = defineProps()
</script>

<template>
  <div>
    <div
      class="w-[280px] rounded-[20px] border bg-white border-gray-200 hover:border-black overflow-hidden"
    >
      <a href="#" class="w-full h-full flex-col gap-2.5">
        <!-- 圖片 -->
        <div class="w-full">
          <img
            :src="props.ticket.image_url"
            :alt="props.ticket.name"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- 內容 -->
        <div class="flex-1 flex flex-col justify-between p-2.5 w-full">
          <div class="flex flex-col gap-2.5">
            <h3 class="text-xl font-bold text-black">
              {{ props.ticket.name }}
            </h3>

            <p class="text-gray-700 text-sm flex gap-2">
              <span
                class="bg-gray-200 rounded-[20px] px-2 py-1"
                v-for="(opt, index) in props.ticket.option"
                :key="index"
              >
                {{ opt }}
              </span>
            </p>

            <p class="text-base text-gray-400">
              {{ props.ticket.comments }}
            </p>
            <p class="text-gray-400 text-sm font-bold">
              起價
              <span class="text-black text-base">NT${{ props.ticket.price }}</span>
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
