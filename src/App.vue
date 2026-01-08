<template>
  <AppNavbar />
  <router-view />
  <AppFooter />
</template>

<script setup lang="ts">
import AppNavbar from './components/layout/AppNavbar.vue'
import AppFooter from './components/layout/AppFooter.vue'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

onMounted(() => {
  auth.init()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');

#app {
  font-family: 'Helvetica', 'Arial', 'SF Pro', 'Noto Sans', 'Noto Sans TC', '微軟正黑體', sans-serif;
}

body {
  background-color: #F8FDFF;
}
</style>
