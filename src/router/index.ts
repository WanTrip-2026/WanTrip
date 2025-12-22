import { createRouter, createWebHistory } from 'vue-router'

// views
import Home from '@/views/Home.vue'
import HotelSearch from '@/views/HotelSearch.vue'
import HotelDetail from '@/views/HotelDetail.vue'
import HotelCompare from '@/views/HotelCompare.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
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
    // 404 頁（選擇性，但很推薦）
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
