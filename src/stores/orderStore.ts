import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const orderData = ref({
    title: '',
    subtitle: '',
    date: '',
    note: '',
    price: 0,
    image: '',
  })

  function setOrder(data: {
    title: string
    subtitle: string
    date: string
    note: string
    price: number
    image: string
  }) {
    orderData.value = data
  }

  function clearOrder() {
    orderData.value = {
      title: '',
      subtitle: '',
      date: '',
      note: '',
      price: 0,
      image: '',
    }
  }

  return {
    orderData,
    setOrder,
    clearOrder,
  }
})
