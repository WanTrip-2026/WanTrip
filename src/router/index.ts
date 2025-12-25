import { createRouter, createWebHistory } from 'vue-router'

// views
import HomePage from '@/views/HomePage.vue'
import HotelSearch from '@/views/HotelSearch.vue'
import HotelDetail from '@/views/HotelDetail.vue'
import HotelCompare from '@/views/HotelCompare.vue'
import TravelDNA from '@/views/TravelDNA.vue'
import TravelDNAIntro from '@/views/TravelDNAIntro.vue'

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
      path: '/travelDNA',
      name: 'travel-DNA',
      component: TravelDNA,
    },
    {
      path: '/travelDNAintro',
      name: 'travel-DNA-intro',
      component: TravelDNAIntro,
    },
    // 404 頁（選擇性，但很推薦）
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
