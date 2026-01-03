<template>
  <AppNavbar />
  <router-view />
  <AppFooter />
</template>

<!--
網址設定：
 Home飯店首頁 http://localhost:5173/
 HotelDetail飯店資訊頁 http://localhost:5173/hotelsdetail/
 HotelSearch飯店搜尋頁 http://localhost:5173/hotelsearch
 HotelCompare http://localhost:5173/compare

設定檔案：
 router/index.ts
 -->

<script setup lang="ts">
import AppNavbar from './components/layout/AppNavbar.vue'
import AppFooter from './components/layout/AppFooter.vue'
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
