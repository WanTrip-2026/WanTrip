import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('order', () => {
  // Load from localStorage on initialization
  const storedOrder = localStorage.getItem('orderData')
  const orderData = ref(
    storedOrder
      ? JSON.parse(storedOrder)
      : {
          title: '',
          subtitle: '',
          date: '',
          note: '',
          price: 0,
          image: '',
          address: '',
          phone: '',
          hotel_id: '',
          latitude: 0,
          longitude: 0,
        },
  )

  function setOrder(data: {
    title: string
    subtitle: string
    date: string
    note: string
    price: number
    image: string
    address?: string
    phone?: string
    hotel_id?: string
    latitude?: number
    longitude?: number
  }) {
    const newData = {
      ...data,
      address: data.address || '',
      phone: data.phone || '',
      hotel_id: data.hotel_id || '',
      latitude: data.latitude || 0,
      longitude: data.longitude || 0,
    }
    orderData.value = newData
    localStorage.setItem('orderData', JSON.stringify(newData))
  }

  function clearOrder() {
    orderData.value = {
      title: '',
      subtitle: '',
      date: '',
      note: '',
      price: 0,
      image: '',
      address: '',
      phone: '',
      hotel_id: '',
      latitude: 0,
      longitude: 0,
    }
    localStorage.removeItem('orderData')
  }

  return {
    orderData,
    setOrder,
    clearOrder,
  }
})
