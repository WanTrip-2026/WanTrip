import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import HotelHomeView from '@/views/hotel/HotelHomeView.vue'
import TicketHomeView from '@/views/ticket/TicketHomeView.vue'
import Profile from '@/views/user/Profile.vue'
import Support from '@/views/Support.vue'
import LoginModel from '@/views/user/LoginModel.vue'
import TravelDNAIntro from '@/views/travel-dna/TravelDNAIntro.vue'

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
    },
    {
      path: '/profile', //RWD-OK
      name: 'profile',
      component: Profile,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginModel,
    },
    {
      path: '/hotels', //RWD-OK
      name: 'hotelHome',
      component: HotelHomeView,
    },
    {
      path: '/hotels/search',
      name: 'hotelSearch',
      component: HotelSearch,
    },
    {
      path: '/hotels/compare',
      name: 'hotelCompare',
      component: HotelCompare,
    },
    {
      path: '/hotels/:id',
      name: 'hotelDetail',
      component: HotelDetail,
    },
    {
      path: '/tickets/search',
      name: 'ticketSearch',
      component: TicketSearch,
    },
    {
      path: '/tickets',
      name: 'ticketHome',
      component: TicketHomeView,
    },
    {
      path: '/tickets/:id',
      name: 'ticketDetail',
      component: TicketDetail,
    },
    {
      path: '/travel-dna',
      name: 'travelDna',
      component: TravelDNA,
    },
    {
      path: '/travel-dna/intro',
      name: 'travelDnaIntro',
      component: TravelDNAIntro,
    },
    {
      path: '/travel-dna/result',
      name: 'travelDnaResult',
      component: TravelDNAResult,
    },
    {
      path: '/orders/completed',
      name: 'orderCompleted',
      component: OrderCompleted,
    },

    {
      path: '/orders/confirmation', //RWD-OK
      name: 'orderConfirmation',
      component: OrderConfirmation,
    },
    {
      path: '/orders/checkout', //RWD-OK
      name: 'orderCheckout',
      component: OrderCheckOut,
    },
    {
      path: '/support', //RWD-OK
      name: 'support',
      component: Support,
    },
    // 404 頁
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
