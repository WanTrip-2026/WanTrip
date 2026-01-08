import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import HotelHomeView from '@/views/hotel/HotelHomeView.vue'
import TicketHomeView from '@/views/ticket/TicketHomeView.vue'
import Profile from '@/views/user/Profile.vue'
import Support from '@/views/Support.vue'
import LoginModel from '@/views/user/LoginModel.vue'
import TravelDNAIntro from '@/views/travel-dna/TravelDNAIntro.vue'
import HotelMapSearch from '@/views/hotel/HotelMapSearch.vue'

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
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { showAppNavbar: true, showFooter: true },
    },
    {
      path: '/profile', //RWD-OK
      name: 'profile',
      component: Profile,
      meta: { showAppNavbar: true, showFooter: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginModel,
      meta: { showAppNavbar: true, showFooter: true },
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
      meta: { showAppNavbar: true, showFooter: true },
    },
    {
      path: '/travel-dna/intro',
      name: 'travelDnaIntro',
      component: TravelDNAIntro,
      meta: { showAppNavbar: true, showFooter: true },
    },
    {
      path: '/travel-dna/result',
      name: 'travelDnaResult',
      component: TravelDNAResult,
      meta: { showAppNavbar: true, showFooter: true },
    },
    {
      path: '/orders/completed',
      name: 'orderCompleted',
      component: OrderCompleted,
      meta: { showAppNavbar: true, showFooter: true },
    },

    {
      path: '/orders/confirmation', //RWD-OK
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
