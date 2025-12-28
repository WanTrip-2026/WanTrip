import { createRouter, createWebHistory } from 'vue-router'

// views
import HomePage from '@/views/HomePage.vue'
import HotelSearch from '@/views/HotelSearch.vue'
import HotelDetail from '@/views/HotelDetail.vue'
import HotelCompare from '@/views/HotelCompare.vue'
import HotelHomeView from '@/views/HotelHomeView.vue'
import TicketSearch from '@/views/TicketSearch.vue'
import TravelDNA from '@/views/TravelDNA.vue'
import TravelDNAIntro from '@/views/TravelDNAIntro.vue'
import TravelDNAResult from '@/views/TravelDNAResult.vue'
import OrderCompleted from '@/views/OrderCompleted.vue'
import Support from '@/views/Support.vue'
import Profile from '@/views/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
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
      path: '/hotelhomeview',
      name: 'hotel-home-view',
      component: HotelHomeView,
    },
    {
      path: '/ticketsearch',
      name: 'ticket-search',
      component: TicketSearch,
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
    {
      path: '/travelDNAresult',
      name: 'travel-DNA-result',
      component: TravelDNAResult,
    },
    {
      path: '/ordercompleted',
      name: 'order-completed',
      component: OrderCompleted,
    },
    {
      path: '/support',
      name: 'support',
      component: Support,
    },
    // 404 頁（選擇性，但很推薦）
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
