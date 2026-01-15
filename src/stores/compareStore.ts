import { defineStore } from 'pinia'

export interface CompareHotel {
  id: string
  name: string
  star_rating: number
  min_price: number
  city?: string
  district?: string
  image_url?: string
  types: string[]
  facilities: string[]
  rules?: string[]
  distance?: number
}

const STORAGE_KEY = 'wantrip_compare_hotels_v1'
const MAX = 5

function loadFromStorage(): CompareHotel[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveToStorage(hotels: CompareHotel[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hotels))
  } catch {}
}

export const useCompareStore = defineStore('compare', {
  state: () => ({
    hotels: loadFromStorage() as CompareHotel[],
  }),
  getters: {
    count: (s) => s.hotels.length,
    isFull: (s) => s.hotels.length >= MAX,

    isInCompare: (s) => (id: string) => s.hotels.some((h) => h.id === id),
  },
  actions: {
    addHotel(hotel: CompareHotel): { ok: boolean; reason?: 'duplicate' | 'full' } {
      if (this.hotels.some((h) => h.id === hotel.id)) return { ok: false, reason: 'duplicate' }
      if (this.hotels.length >= MAX) return { ok: false, reason: 'full' }

      const normalized: CompareHotel = {
        ...hotel,
        types: Array.isArray(hotel.types) ? hotel.types : [],
        facilities: Array.isArray(hotel.facilities) ? hotel.facilities : [],
        rules: Array.isArray(hotel.rules) ? hotel.rules : [],
      }

      this.hotels.push(normalized)
      saveToStorage(this.hotels)
      return { ok: true }
    },

    removeHotel(id: string) {
      this.hotels = this.hotels.filter((h) => h.id !== id)
      saveToStorage(this.hotels)
    },

    clear() {
      this.hotels = []
      saveToStorage(this.hotels)
    },

    // （可選）如果你未來想要手動重載
    reload() {
      this.hotels = loadFromStorage()
    },
  },
})
