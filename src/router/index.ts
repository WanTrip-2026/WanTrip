import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import HotelHomeView from '@/views/hotel/HotelHomeView.vue'
import TicketHomeView from '@/views/ticket/TicketHomeView.vue'
import UserProfile from '@/views/user/UserProfile.vue'
import Support from '@/views/SupportPage.vue'
import LoginModal from '@/views/user/LoginModal.vue'
import TravelDNAIntro from '@/views/travel-dna/TravelDNAIntro.vue'
import HotelMapSearch from '@/views/hotel/HotelMapSearch.vue'
import AuthCallback from '@/views/user/AuthCallback.vue'

// Lazy Loading
const HotelSearch = () => import('@/views/hotel/HotelSearch.vue')
const HotelDetail = () => import('@/views/hotel/HotelDetail.vue')
const HotelCompare = () => import('@/views/hotel/HotelCompare.vue')
const TicketSearch = () => import('@/views/ticket/TicketSearch.vue')
const TicketDetail = () => import('@/views/ticket/TicketDetail.vue')
const TravelDNA = () => import('@/views/travel-dna/TravelDNA.vue')
const TravelDNAResult = () => import('@/views/travel-dna/TravelDNAResult.vue')
const OrderCheckOut = () => import('@/views/order/OrderCheckOut.vue')
const OrderConfirmation = () => import('@/views/order/OrderConfirmation.vue')
const OrderCompleted = () => import('@/views/order/OrderCompleted.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    // 頁面跳轉，一律回到最上方
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { showAppNavbar: true, showFooter: true },
    },
    {
      path: '/profile', //RWD-OK
      name: 'userprofile',
      component: UserProfile,
      meta: { showAppNavbar: true, showFooter: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginModal,
      meta: { showAppNavbar: true, showFooter: true },
    },
    {
      path: '/auth/callback',
      name: 'authCallback',
      component: AuthCallback,
      meta: { showAppNavbar: false, showFooter: false },
    },
    {
      path: '/hotels', //RWD-OK
      name: 'hotelHome',
      component: HotelHomeView,
      meta: { showAppNavbar: true, showFooter: true },
    },
    {
      path: '/hotels/search',
      name: 'hotelSearch',
      component: HotelSearch,
      meta: { showAppNavbar: true, showFooter: true },
    },
    {
      path: '/hotels/compare',
      name: 'hotelCompare',
      component: HotelCompare,
      meta: { showAppNavbar: true, showFooter: true },
    },
    {
      path: '/hotels/:id',
      name: 'hotelDetail',
      component: HotelDetail,
      meta: { showAppNavbar: true, showFooter: true },
    },
    {
      path: '/tickets/search',
      name: 'ticketSearch',
      component: TicketSearch,
      meta: { showAppNavbar: true, showFooter: true },
    },
    {
      path: '/tickets',
      name: 'ticketHome',
      component: TicketHomeView,
      meta: { showAppNavbar: true, showFooter: true },
    },
    {
      path: '/tickets/:id',
      name: 'ticketDetail',
      component: TicketDetail,
      meta: { showAppNavbar: true, showFooter: true },
    },
    {
      path: '/travel-dna',
      name: 'travelDna',
      component: TravelDNA,
      meta: { showAppNavbar: true, showFooter: false },
    },
    {
      path: '/travel-dna/intro',
      name: 'travelDnaIntro',
      component: TravelDNAIntro,
      meta: { showAppNavbar: true, showFooter: false },
    },
    {
      path: '/travel-dna/result',
      name: 'travelDnaResult',
      component: TravelDNAResult,
      meta: { showAppNavbar: true, showFooter: false },
    },
    {
      path: '/orders/completed',
      name: 'orderCompleted',
      component: OrderCompleted,
      meta: { showAppNavbar: true, showFooter: true },
    },

    {
      path: '/orders/confirmation/:id', //RWD-OK
      name: 'orderConfirmation',
      component: OrderConfirmation,
      meta: { showAppNavbar: true, showFooter: true },
    },
    {
      path: '/orders/checkout', //RWD-OK
      name: 'orderCheckout',
      component: OrderCheckOut,
      meta: { showAppNavbar: true, showFooter: true },
    },
    {
      path: '/support', //RWD-OK
      name: 'support',
      component: Support,
      meta: { showAppNavbar: true, showFooter: true },
    },
    {
      path: '/hotels/map-search', //RWD-OK
      name: 'hotelMapSearch',
      component: HotelMapSearch,
      meta: { showAppNavbar: false, showFooter: false },
    },
    // 404 頁
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
