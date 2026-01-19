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
  }) {
    const newData = {
      ...data,
      address: data.address || '',
      phone: data.phone || '',
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
    }
    localStorage.removeItem('orderData')
  }

  return {
    orderData,
    setOrder,
    clearOrder,
  }
})
