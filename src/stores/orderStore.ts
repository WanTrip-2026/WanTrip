import { defineStore } from 'pinia'
import { ref } from 'vue'

type OrderData = {
  // Common fields
  title: string
  subtitle: string
  date: string
  note: string
  price: number
  image: string
  // User info (often filled during checkout, but can be pre-filled)
  address: string
  phone: string

  // Hotel specific
  hotel_id: string
  latitude: number
  longitude: number

  // Attraction specific
  type?: 'hotel' | 'attraction'
  attraction_id?: string | number
  city?: string
  category?: string | string[]
  highlights?: string[]
}

const STORAGE_KEY = 'orderData'

const DEFAULT_ORDER: OrderData = {
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
  type: 'hotel',
  attraction_id: '',
  city: '',
  category: '',
  highlights: [],
}

function safeLoadOrder(): OrderData {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return DEFAULT_ORDER

  try {
    const parsed = JSON.parse(raw) as Partial<OrderData>
    // 保底：避免缺欄位或型別怪怪的
    return { ...DEFAULT_ORDER, ...parsed }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return DEFAULT_ORDER
  }
}

export const useOrderStore = defineStore('order', () => {
  const orderData = ref<OrderData>(safeLoadOrder())

  // 可接受「整包」或「部分更新」
  function setOrder(data: Partial<OrderData>) {
    const newData: OrderData = {
      ...orderData.value,
      ...data,
      address: data.address ?? orderData.value.address,
      phone: data.phone ?? orderData.value.phone,
      hotel_id: data.hotel_id ?? orderData.value.hotel_id,
      latitude: data.latitude ?? orderData.value.latitude,
      longitude: data.longitude ?? orderData.value.longitude,
      type: data.type ?? orderData.value.type,
      attraction_id: data.attraction_id ?? orderData.value.attraction_id,
      city: data.city ?? orderData.value.city,
      category: data.category ?? orderData.value.category,
      highlights: data.highlights ?? orderData.value.highlights,
    }

    orderData.value = newData
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
  }

  function clearOrder() {
    orderData.value = { ...DEFAULT_ORDER }
    localStorage.removeItem(STORAGE_KEY)
  }

  return { orderData, setOrder, clearOrder }
})
