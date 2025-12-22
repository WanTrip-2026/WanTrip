<template>
  <Navbar />
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

<script setup>
import Navbar from './components/layout/Navbar.vue'
import AppFooter from './components/layout/AppFooter.vue'
</script>
