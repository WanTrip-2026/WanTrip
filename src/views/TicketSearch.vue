<script setup lang="ts">
import { ref, computed } from 'vue'

const cities = [
  {
    label: '熱門城市',
    cities: ['台北市', '新北市', '台中市', '台南市', '高雄市'],
  },
  {
    label: '其他城市',
    cities: [
      '基隆市',
      '新竹市',
      '新竹縣',
      '苗栗縣',
      '彰化縣',
      '南投縣',
      '雲林縣',
      '嘉義市',
      '嘉義縣',
      '屏東縣',
      '宜蘭縣',
      '花蓮縣',
      '台東縣',
    ],
  },
  {
    label: '離島地區',
    cities: ['澎湖縣', '金門縣', '連江縣'],
  },
]
</script>

<template>
  <main class="w-full bg-red-300 pt-24 min-h-screen">
    <!-- search-bar -->
    <section
      class="max-w-[800px] h-[60px] px-5 py-2.5 mx-auto bg-page rounded-full flex flex-row justify-between gap-2.5"
    >
      <div class="flex-auto h-full">
        <label class="text-gray-500 rounded-full"></label>
        <select
          class="w-full h-full border text-center border-gray-300 rounded-full focus:ring-primary focus:border-primary outline-none"
        >
          <option value="" disabled selected class="p-10">選擇城市</option>

          <optgroup v-for="group in cities" :key="group.label" :label="group.label">
            <option v-for="city in group.cities" :key="city" :value="city">
              {{ city }}
            </option>
          </optgroup>
        </select>
      </div>

      <div class="flex-auto h-full">
        <label class="text-gray-500 rounded-full"></label>
        <input
          type="text"
          placeholder="入住及退房日期"
          class="h-full w-full border text-center border-gray-300 rounded-full focus:ring-primary focus:border-primary outline-none"
        />
      </div>

      <div class="text-gray-500 rounded-full h-full flex-none">
        <button
          class="w-full h-full bg-primary hover:bg-secondary text-white font-bold py-15px px-[30px] rounded-full transition-colors text-nowrap"
        >
          搜尋
        </button>
      </div>
    </section>
  </main>
</template>
