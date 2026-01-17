<template>
  <div class="min-h-screen pt-20 pb-10 bg-[#f8fdff]">
    <div class="container mx-auto px-4 max-w-[1240px]">

      <div class="mb-8">
        <h1 class="text-3xl font-bold text-black mb-2">我的收藏</h1>
        <p class="text-dark_500">這裡保存了您感興趣的住宿與體驗行程</p>
      </div>

      <div v-if="favoriteList.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <HomePageCard
          v-for="item in favoriteList"
          :key="item.id"
          :id="item.id"
          :name="item.name"
          :imageUrl="item.imageUrl"
          :price="item.price"
          :venue="item.venue"
          :category="item.category"
          :date="item.date"
          :address="item.address"
          :rating="item.rating"
        />
      </div>

      <div v-else class="flex flex-col items-center justify-center py-20 text-center">
        <div class="bg-white p-6 rounded-full shadow-sm mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </div>
        <h3 class="text-xl font-bold text-dark_300 mb-2">目前沒有收藏項目</h3>
        <p class="text-dark_500 mb-6">快去探索喜歡的行程加入收藏吧！</p>
        <RouterLink to="/" class="px-6 py-2 bg-primary text-white rounded-full hover:bg-main transition-colors">
          去逛逛
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFavoriteStore } from '@/stores/favoriteStore';
import HomePageCard from '@/components/layout/HomePageCard.vue';

const favoriteStore = useFavoriteStore();
const favoriteList = computed(() => favoriteStore.favoriteList);

// Note: fetchFavorites is called in App.vue, so data should be ready or loading.
</script>
