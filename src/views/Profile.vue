Carol carolyan1016 線上 這就是 #code暫存 頻道的起點。 Carol — 2025/12/20 下午5:57 愛心符號
<button
  class="bg-primary text-white p-[9px] rounded-[20px] hover:bg-secondary transition flex items-center justify-center"
>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="w-5 h-5 fill-current"
              >
                <path
                  d="M378.9 80c-27.3 0-53 13.1-69 35.2l-34.4 47.6c-4.5 6.2-11.7 9.9-19.4 9.9s-14.9-3.7-19.4-9.9l-34.4-47.6c-16-22.1-41.7-35.2-69-35.2-47 0-85.1 38.1-85.1 85.1 0 49.9 32 98.4 68.1 142.3 41.1 50 91.4 94 125.9 120.3 3.2 2.4 7.9 4.2 14 4.2s10.8-1.8 14-4.2c34.5-26.3 84.8-70.4 125.9-120.3 36.2-43.9 68.1-92.4 68.1-142.3 0-47-38.1-85.1-85.1-85.1zM271 87.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 68.6-42.9 128.9-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.3 9.4-27.5 14.1-43.1 14.1s-30.8-4.7-43.1-14.1C176.4 438 123.2 391.5 79.1 338 42.9 294.1 0 233.7 0 165.1 0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1l15 20.7 15-20.7z"
                />
              </svg>
            </button>
Carol — 2025/12/22 下午5:42 import { createRouter, createWebHistory } from 'vue-router' // views
import Home from '@/views/Home.vue' import HotelSearch from '@/views/HotelSearch.vue' import
HotelDetail from '@/views/HotelDetail.vue' import HotelCompare from '@/views/HotelCompare.vue' const
router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes: [ { path: '/',
name: 'home', component: Home, }, { path: '/hotels', name: 'hotel-search', component: HotelSearch,
}, { path: '/hotelsdetail', name: 'hotel-detail', component: HotelDetail, }, { path: '/compare',
name: 'hotel-compare', component: HotelCompare, }, // 404 頁（選擇性，但很推薦） { path:
'/:pathMatch(.*)*', redirect: '/', }, ], }) export default router Carol — 2025/12/22 下午6:02
app.vue
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
Yu — 2025/12/23 下午4:02
<script setup>
  // import { RouterLink } from 'vue-router'

  const footerLinks = [
    { title: '住宿', links: ['飯店', '旅館', '民宿', '度假村', '住宿+交通'] },
    { title: '交通', links: ['台鐵', '高鐵', '租車', '套票', '接送'] },
展開
message.txt
48 KB
Chris — 2025/12/23 晚上9:04
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');
Carol — 2025/12/24 晚上10:40
index.ts
import { createRouter, createWebHistory } from 'vue-router'

// views
import HomePage from '@/views/HomePage.vue'
import HotelSearch from '@/views/HotelSearch.vue'
import HotelDetail from '@/views/HotelDetail.vue'
import HotelCompare from '@/views/HotelCompare.vue'
import TicketSearch from '@/views/TicketSearch.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/hotelsearch',
      name: 'hotel-search',
      component: HotelSearch,
    },
    {
      path: '/hotelsdetail',
      name: 'hotel-detail',
      component: HotelDetail,
    },
    {
      path: '/compare',
      name: 'hotel-compare',
      component: HotelCompare,
    },
    {
      path: '/ticketsearch',
      name: 'ticket-search',
      component: TicketSearch,
    },
    // 404 頁（選擇性，但很推薦）
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
Carol — 2025/12/24 晚上10:48
import { createRouter, createWebHistory } from 'vue-router'

// views
import Home from '@/views/Home.vue'
import HotelSearch from '@/views/HotelSearch.vue'
import HotelDetail from '@/views/HotelDetail.vue'
import HotelCompare from '@/views/HotelCompare.vue'
import OrderCompleted from '@/views/OrderCompleted.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/hotels',
      name: 'hotel-search',
      component: HotelSearch,
    },
    {
      path: '/hotelsdetail',
      name: 'hotel-detail',
      component: HotelDetail,
    },
    {
      path: '/compare',
      name: 'hotel-compare',
      component: HotelCompare,
    },
    {
      path: '/ordercompleted',
      name: 'order-completed',
      component: OrderCompleted,
    },
    // 404 頁（選擇性，但很推薦）
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
Chris — 2025/12/28 下午1:34
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z"/></svg>

home
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M16 24C16 10.7 26.7 0 40 0L472 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 416 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L40 512c-13.3 0-24-10.7-24-24s10.7-24 24-24l8 0 0-416-8 0C26.7 48 16 37.3 16 24zm208 88l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM128 96c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm96 112l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM352 96c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM112 208l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm240-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM288 384l43.8 0c9.9 0 17.5-9 14-18.2-13.8-36.1-48.8-61.8-89.7-61.8s-75.9 25.7-89.7 61.8c-3.5 9.2 4.1 18.2 14 18.2l43.8 0 0 80 64 0 0-80z"/></svg>
hotel
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>
more
Chris — 2025/12/28 下午1:48
<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 3C13 4.10457 13.8954 5 15 5C16.1046 5 17 4.10457 17 3H19C20.6569 3 22 4.34315 22 6V14C22 15.6569 20.6569 17 19 17H17C17 15.8954 16.1046 15 15 15C13.8954 15 13 15.8954 13 17H3C1.34315 17 0 15.6569 0 14V6C1.28853e-07 4.34315 1.34315 3 3 3H13ZM4 12C3.44772 12 3 12.4477 3 13C3 13.5523 3.44772 14 4 14H8C8.55228 14 9 13.5523 9 13C9 12.4477 8.55228 12 8 12H4ZM15 7C13.8954 7 13 7.89543 13 9V11C13 12.1046 13.8954 13 15 13C16.1046 13 17 12.1046 17 11V9C17 7.89543 16.1046 7 15 7ZM4 9C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11H8C8.55228 11 9 10.5523 9 10C9 9.44772 8.55228 9 8 9H4ZM4 6C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8H10C10.5523 8 11 7.55228 11 7C11 6.44772 10.5523 6 10 6H4Z"/>
</svg>
ticket
Chris — 2025/12/28 下午3:41
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 10.5861C19.1046 10.5861 20 11.4815 20 12.5861C19.9999 13.6906 19.1045 14.5861 18 14.5861H8.82812L10 15.7579C10.7809 16.5389 10.781 17.8051 10 18.5861C9.21905 19.367 7.95289 19.3669 7.17188 18.5861L2.6709 14.0861C1.37949 12.7946 2.29471 10.5861 4.12109 10.5861H18ZM10 0.586058C10.7809 -0.194814 12.0471 -0.195566 12.8281 0.585081L17.3291 5.08606C18.6202 6.37749 17.7052 8.58606 15.8789 8.58606H2C0.895557 8.58606 0.000204757 7.69045 0 6.58606C0 5.48149 0.895431 4.58606 2 4.58606H11.1719L10 3.41418C9.21909 2.63327 9.21925 1.36708 10 0.586058Z" fill="#D9D9D9"/>
</svg>
compare
Carol — 昨天 上午11:41
profile
<script setup>
import { ref } from 'vue'

const activeMenu = ref('account-section')

const menus = [
展開
message.txt
5 KB
Carol — 下午3:31
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeMenu = ref('#account-section')

const menus = [
  { label: '我的帳號', id: 'account-section', href: '#account-section' },
  { label: '我的訂單', id: 'order-section', href: '#order-section' },
  { label: '收藏清單', id: 'favorite-section', href: '#favorite-section' },
  { label: '個資管理', id: 'admin-section', href: '#admin-section' },
]
let observer = null

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '-120px 0px -60% 0px',
    threshold: 0,
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeMenu.value = `#${entry.target.id}`
      }
    })
  }, options)

  menus.forEach((menu) => {
    const section = document.getElementById(menu.id)
    if (section) observer.observe(section)
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

const setActive = (href) => {
  activeMenu.value = href
}

const isEditing = ref(false)

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}
const gender = ref('male')
</script>
<template>
  <main class="mx-auto w-full bg-page pt-24 min-h-screen">
    <section class="max-w-[1240px] mx-auto">
      <div class="relative h-full w-full px-5 py-2.5 mx-auto grid grid-cols-1 lg:grid-cols-4 gap-5">
        <aside
          class="sticky top-[96px] h-fit self-start hidden lg:block lg:col-span-1 px-4 py-8 border bg-white border-gray-300 rounded-[20px] items-center gap-2"
        >
          <div class="flex flex-col items-center gap-5">
            <a
              v-for="menu in menus"
              :key="menu.href"
              :href="menu.href"
              @click="setActive(menu.href)"
              :class="[
                'w-[160px] rounded-[20px] px-12 py-3 transition-colors',
                activeMenu === menu.href ? 'bg-primary text-white' : '',
              ]"
              >{{ menu.label }}
            </a>
          </div>
        </aside>
        <div class="lg:col-span-3 gap-10 pb-10">
          <!-- 帳號管理區 -->
          <div
            class="scroll-mt-[96px] bg-white w-full rounded-[20px] border border-gray-300 p-5 mb-10"
            id="account-section"
          >
            <h3 class="font-bold text-2xl border-b-gray-300 border-b-2 pb-2">我的帳號</h3>
            <form class="max-w-md space-y-4 justify-between pt-5 flex flex-col gap-2">
              <!-- Email -->
              <div>
                <label for="email" class="block mb-1 font-medium">帳號</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="example@email.com"
                  class="w-full rounded-full border border-gray-300 px-5 py-3"
                />
              </div>
              <div>
                <label for="currentPassword" class="block mb-1 font-medium">原密碼</label>
                <input
                  id="currentPassword"
                  type="password"
                  required
                  minlength="8"
                  placeholder="請輸入原密碼"
                  class="w-full rounded-full border border-gray-300 px-5 py-3"
                />
                ... (還剩 288 行) 收起 message.txt 16 KB profile.vue ﻿
                <script setup>
                  import { ref, onMounted, onUnmounted } from 'vue'

                  const activeMenu = ref('#account-section')

                  const menus = [
                    { label: '我的帳號', id: 'account-section', href: '#account-section' },
                    { label: '我的訂單', id: 'order-section', href: '#order-section' },
                    { label: '收藏清單', id: 'favorite-section', href: '#favorite-section' },
                    { label: '個資管理', id: 'admin-section', href: '#admin-section' },
                  ]
                  let observer = null

                  onMounted(() => {
                    const options = {
                      root: null,
                      rootMargin: '-120px 0px -60% 0px',
                      threshold: 0,
                    }

                    observer = new IntersectionObserver((entries) => {
                      entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                          activeMenu.value = `#${entry.target.id}`
                        }
                      })
                    }, options)

                    menus.forEach((menu) => {
                      const section = document.getElementById(menu.id)
                      if (section) observer.observe(section)
                    })
                  })

                  onUnmounted(() => {
                    if (observer) observer.disconnect()
                  })

                  const setActive = (href) => {
                    activeMenu.value = href
                  }

                  const isEditing = ref(false)

                  const toggleEdit = () => {
                    isEditing.value = !isEditing.value
                  }
                  const gender = ref('male')
                </script>
                <template>
                  <main class="mx-auto w-full bg-page pt-24 min-h-screen">
                    <section class="max-w-[1240px] mx-auto">
                      <div
                        class="relative h-full w-full px-5 py-2.5 mx-auto grid grid-cols-1 lg:grid-cols-4 gap-5"
                      >
                        <aside
                          class="sticky top-[96px] h-fit self-start hidden lg:block lg:col-span-1 px-4 py-8 border bg-white border-gray-300 rounded-[20px] items-center gap-2"
                        >
                          <div class="flex flex-col items-center gap-5">
                            <a
                              v-for="menu in menus"
                              :key="menu.href"
                              :href="menu.href"
                              @click="setActive(menu.href)"
                              :class="[
                                'w-[160px] rounded-[20px] px-12 py-3 transition-colors',
                                activeMenu === menu.href ? 'bg-primary text-white' : '',
                              ]"
                              >{{ menu.label }}
                            </a>
                          </div>
                        </aside>
                        <div class="lg:col-span-3 gap-10 pb-10">
                          <!-- 帳號管理區 -->
                          <div
                            class="scroll-mt-[96px] bg-white w-full rounded-[20px] border border-gray-300 p-5 mb-10"
                            id="account-section"
                          >
                            <h3 class="font-bold text-2xl border-b-gray-300 border-b-2 pb-2">
                              我的帳號
                            </h3>
                            <form
                              class="max-w-md space-y-4 justify-between pt-5 flex flex-col gap-2"
                            >
                              <!-- Email -->
                              <div>
                                <label for="email" class="block mb-1 font-medium">帳號</label>
                                <input
                                  id="email"
                                  name="email"
                                  type="email"
                                  required
                                  placeholder="example@email.com"
                                  class="w-full rounded-full border border-gray-300 px-5 py-3"
                                />
                              </div>
                              <div>
                                <label for="currentPassword" class="block mb-1 font-medium"
                                  >原密碼</label
                                >
                                <input
                                  id="currentPassword"
                                  type="password"
                                  required
                                  minlength="8"
                                  placeholder="請輸入原密碼"
                                  class="w-full rounded-full border border-gray-300 px-5 py-3"
                                />
                              </div>
                              <!-- Password -->
                              <div>
                                <label for="newPassword" class="block mb-1 font-medium"
                                  >新密碼</label
                                >
                                <input
                                  id="newPassword"
                                  name="password"
                                  type="password"
                                  required
                                  minlength="8"
                                  placeholder="至少 8 碼"
                                  class="w-full rounded-full border border-gray-300 px-5 py-3"
                                />
                              </div>

                              <div>
                                <label for="confirmPassword" class="block mb-1 font-medium"
                                  >確認密碼</label
                                >
                                <input
                                  id="confirmPassword"
                                  name="confirmPassword"
                                  type="password"
                                  required
                                  minlength="8"
                                  placeholder="請再次輸入密碼"
                                  class="w-full rounded-full border border-gray-300 px-5 py-3"
                                />
                              </div>

                              <button
                                type="submit"
                                class="self-end rounded-full bg-primary hover:bg-secondary px-4 py-2 text-white"
                              >
                                修改密碼
                              </button>
                            </form>
                          </div>
                          <!-- 我的訂單 -->
                          <div
                            class="scroll-mt-[96px] bg-white rounded-[20px] border border-gray-300 p-5 mb-10"
                            id="order-section"
                          >
                            <h3 class="font-bold text-2xl border-b-gray-300 border-b-2 pb-2">
                              我的訂單
                            </h3>
                            <div class="flex flex-col gap-2.5 py-5">
                              <div
                                class="flex justify-between rounded-[20px] border border-gray-300 overflow-hidden"
                              >
                                <div class="flex h-[120px]">
                                  <img
                                    class="aspect-[4/3] object-cover"
                                    src="../assets/hoteldetail_img/Wanhao.jpg"
                                    alt="產品照片"
                                  />
                                  <div class="flex flex-col justify-center gap-1 px-5">
                                    <h3 class="text-xl font-bold">飯店名稱：高雄洲際飯店</h3>
                                    <p class="text-sm">訂單編號：202512240001</p>
                                    <p class="text-sm">訂單日期：2025年12月24日</p>
                                  </div>
                                </div>
                                <div class="flex flex-col justify-center gap-2 px-5">
                                  <button>訂單詳情</button>
                                  <button>取消訂單</button>
                                  <button>再次訂購</button>
                                </div>
                              </div>
                              <!-- 複製 -->
                              <div
                                class="flex justify-between rounded-[20px] border border-gray-300 overflow-hidden"
                              >
                                <div class="flex h-[120px]">
                                  <img
                                    class="aspect-[4/3] object-cover"
                                    src="../assets/hoteldetail_img/Wanhao.jpg"
                                    alt="產品照片"
                                  />
                                  <div class="flex flex-col justify-center gap-1 px-5">
                                    <h3 class="text-xl font-bold">飯店名稱：高雄洲際飯店</h3>
                                    <p class="text-sm">訂單編號：202512240001</p>
                                    <p class="text-sm">訂單日期：2025年12月24日</p>
                                  </div>
                                </div>
                                <div class="flex flex-col justify-center gap-2 px-5">
                                  <button>訂單詳情</button>
                                  <button>取消訂單</button>
                                  <button>再次訂購</button>
                                </div>
                              </div>
                              <div
                                class="flex justify-between rounded-[20px] border border-gray-300 overflow-hidden"
                              >
                                <div class="flex h-[120px]">
                                  <img
                                    class="aspect-[4/3] object-cover"
                                    src="../assets/hoteldetail_img/Wanhao.jpg"
                                    alt="產品照片"
                                  />
                                  <div class="flex flex-col justify-center gap-1 px-5">
                                    <h3 class="text-xl font-bold">飯店名稱：高雄洲際飯店</h3>
                                    <p class="text-sm">訂單編號：202512240001</p>
                                    <p class="text-sm">訂單日期：2025年12月24日</p>
                                  </div>
                                </div>
                                <div class="flex flex-col justify-center gap-2 px-5">
                                  <button>訂單詳情</button>
                                  <button>取消訂單</button>
                                  <button>再次訂購</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- 收藏清單 -->
                          <div
                            class="scroll-mt-[96px] bg-white rounded-[20px] border border-gray-300 p-5 mb-10"
                            id="favorite-section"
                          >
                            <h3 class="font-bold text-2xl border-b-gray-300 border-b-2 pb-2">
                              收藏清單
                            </h3>
                            <div class="flex gap-2.5 py-5 overflow-x-auto flex-nowrap">
                              <div
                                class="w-[240px] shrink-0 rounded-[20px] border border-gray-300 overflow-hidden"
                              >
                                <img
                                  class="aspect-[4/3] object-cover"
                                  src="../assets/hoteldetail_img/Wanhao.jpg"
                                  alt="產品照片"
                                />
                                <div class="flex flex-col p-2.5">
                                  <h3 class="text-xl font-bold text-nowrap py-2">
                                    飯店名稱：高雄洲際飯店
                                  </h3>
                                  <p class="text-sm">高雄市前鎮區</p>
                                  <div class="flex gap-2 h-10 justify-center items-center my-4">
                                    <button
                                      class="rounded-[20px] bg-primary text-white w-full py-2"
                                    >
                                      取消收藏
                                    </button>
                                    <button
                                      class="rounded-[20px] bg-primary text-white w-full py-2"
                                    >
                                      訂購
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="w-[240px] shrink-0 rounded-[20px] border border-gray-300 overflow-hidden"
                              >
                                <img
                                  class="aspect-[4/3] object-cover"
                                  src="../assets/hoteldetail_img/Wanhao.jpg"
                                  alt="產品照片"
                                />
                                <div class="flex flex-col p-2.5">
                                  <h3 class="text-xl font-bold text-nowrap py-2">
                                    飯店名稱：高雄洲際飯店
                                  </h3>
                                  <p class="text-sm">高雄市前鎮區</p>
                                  <div class="flex gap-2 h-10 justify-center items-center my-4">
                                    <button
                                      class="rounded-[20px] bg-primary text-white w-full py-2"
                                    >
                                      取消收藏
                                    </button>
                                    <button
                                      class="rounded-[20px] bg-primary text-white w-full py-2"
                                    >
                                      訂購
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="w-[240px] shrink-0 rounded-[20px] border border-gray-300 overflow-hidden"
                              >
                                <img
                                  class="aspect-[4/3] object-cover"
                                  src="../assets/hoteldetail_img/Wanhao.jpg"
                                  alt="產品照片"
                                />
                                <div class="flex flex-col p-2.5">
                                  <h3 class="text-xl font-bold text-nowrap py-2">
                                    飯店名稱：高雄洲際飯店
                                  </h3>
                                  <p class="text-sm">高雄市前鎮區</p>
                                  <div class="flex gap-2 h-10 justify-center items-center my-4">
                                    <button
                                      class="rounded-[20px] bg-primary text-white w-full py-2"
                                    >
                                      取消收藏
                                    </button>
                                    <button
                                      class="rounded-[20px] bg-primary text-white w-full py-2"
                                    >
                                      訂購
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="w-[240px] shrink-0 rounded-[20px] border border-gray-300 overflow-hidden"
                              >
                                <img
                                  class="aspect-[4/3] object-cover"
                                  src="../assets/hoteldetail_img/Wanhao.jpg"
                                  alt="產品照片"
                                />
                                <div class="flex flex-col p-2.5">
                                  <h3 class="text-xl font-bold text-nowrap py-2">
                                    飯店名稱：高雄洲際飯店
                                  </h3>
                                  <p class="text-sm">高雄市前鎮區</p>
                                  <div class="flex gap-2 h-10 justify-center items-center my-4">
                                    <button
                                      class="rounded-[20px] bg-primary text-white w-full py-2"
                                    >
                                      取消收藏
                                    </button>
                                    <button
                                      class="rounded-[20px] bg-primary text-white w-full py-2"
                                    >
                                      訂購
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- 個資管理區 -->
                          <div
                            class="scroll-mt-[96px] bg-white w-full rounded-[20px] border border-gray-300 p-5"
                            id="admin-section"
                          >
                            <button
                              type="button"
                              class="pt-5 float-right text-gray-500 font-medium"
                              @click="toggleEdit"
                            >
                              {{ isEditing ? '取消' : '編輯' }}
                            </button>
                            <h3 class="font-bold text-2xl border-b-gray-300 border-b-2 pb-2">
                              我的資料
                            </h3>

                            <form
                              class="max-w-md space-y-4 justify-between pt-5 flex flex-col gap-2"
                            >
                              <!-- 使用者名稱 -->

                              <div>
                                <label for="fullName" class="block mb-1 font-medium"
                                  >使用者名稱</label
                                >
                                <input
                                  id="fullName"
                                  name="fullName"
                                  :disabled="!isEditing"
                                  type="text"
                                  required
                                  placeholder="請輸入姓名"
                                  class="w-full rounded-full border border-gray-300 px-5 py-3"
                                />
                              </div>
                              <!-- 生日 -->
                              <div>
                                <label for="birthday" class="block mb-1 font-medium">
                                  生日（YYYY / MM / DD）
                                </label>
                                <input
                                  id="birthday"
                                  name="birthday"
                                  :disabled="!isEditing"
                                  type="date"
                                  required
                                  class="w-full rounded-full border border-gray-300 px-5 py-3"
                                />
                              </div>

                              <!-- 性別 -->
                              <div>
                                <span class="block mb-1 font-medium">性別</span>
                                <div class="flex items-center gap-4">
                                  <label class="flex items-center gap-1">
                                    <input
                                      type="radio"
                                      :disabled="!isEditing"
                                      name="gender"
                                      v-model="gender"
                                      value="male"
                                      class="accent-primary"
                                      required
                                    />
                                    男
                                  </label>
                                  <label class="flex items-center gap-1">
                                    <input
                                      type="radio"
                                      name="gender"
                                      v-model="gender"
                                      value="female"
                                      class="accent-primary"
                                    />
                                    女
                                  </label>
                                </div>
                              </div>

                              <!-- 電話 -->
                              <div>
                                <label for="phone" class="block mb-1 font-medium">電話</label>
                                <input
                                  id="phone"
                                  name="phone"
                                  :disabled="!isEditing"
                                  type="tel"
                                  required
                                  placeholder="請輸入電話號碼"
                                  class="w-full rounded-full border border-gray-300 px-5 py-3"
                                />
                              </div>

                              <button
                                type="submit"
                                v-if="isEditing"
                                class="self-end rounded-full bg-primary hover:bg-secondary px-4 py-2 text-white"
                              >
                                修改資料
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </section>
                  </main>
                </template>
                message.txt 16 KB
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
