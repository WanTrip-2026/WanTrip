<template>
  <AppNavbar v-if="showAppNavbar" />
  <router-view />
  <AppFooter v-if="showFooter" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from './components/layout/AppNavbar.vue'
import AppFooter from './components/layout/AppFooter.vue'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useFavoriteStore } from '@/stores/favoriteStore'

const route = useRoute()

onMounted(() => {
  // auth.init() is called in main.ts
})

const showAppNavbar = computed(() => {
  return route && route.meta && route.meta.showAppNavbar !== false
})

const showFooter = computed(() => {
  return route && route.meta && route.meta.showFooter !== false
})


const favoriteStore = useFavoriteStore()

onMounted(() => {
  favoriteStore.fetchFavorites()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');

#app {
  font-family:
    'Helvetica', 'Arial', 'SF Pro', 'Noto Sans', 'Noto Sans TC', '微軟正黑體', sans-serif;
}

body {
  background-color: #f8fdff;
}
</style>
