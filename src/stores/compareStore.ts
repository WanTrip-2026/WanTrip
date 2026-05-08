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

    async fetchAndAddHotel(
      id: string,
    ): Promise<{ ok: boolean; reason?: 'duplicate' | 'full' | 'error' }> {
      // 1. 先檢查是否已存在或已滿，避免多餘 API 請求
      if (this.hotels.some((h) => h.id === id)) return { ok: false, reason: 'duplicate' }
      if (this.hotels.length >= MAX) return { ok: false, reason: 'full' }

      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL
        const res = await fetch(`${apiUrl}/hotels/${id}`)
        if (!res.ok) throw new Error('Fetch failed')

        const hotelData = await res.json()

        // 2. 再次檢查（防止在 fetch 期間被加入）
        if (this.hotels.some((h) => h.id === id)) return { ok: false, reason: 'duplicate' }
        if (this.hotels.length >= MAX) return { ok: false, reason: 'full' }

        // 3. 整理資料並加入
        const normalized: CompareHotel = {
          id: hotelData.id,
          name: hotelData.name,
          star_rating: hotelData.star_rating,
          min_price: hotelData.min_price,
          city: hotelData.city,
          district: hotelData.district,
          image_url: hotelData.image_url,
          types: Array.isArray(hotelData.types) ? hotelData.types : [],
          facilities: Array.isArray(hotelData.facilities) ? hotelData.facilities : [],
          rules: Array.isArray(hotelData.rules) ? hotelData.rules : [],
          distance: hotelData.distance,
        }

        // PATCH: 若 detail api 缺少資料 (types, facilities, image_url)，嘗試從列表 api 補抓
        if (!normalized.types.length || !normalized.facilities.length || !normalized.image_url) {
          try {
            const listRes = await fetch(
              `${apiUrl}/hotels?keyword=${encodeURIComponent(hotelData.name)}`,
            )
            if (listRes.ok) {
              const listData = await listRes.json()
              const found = (listData.hotels || []).find((h: { id: unknown }) => h.id === hotelData.id)
              if (found) {
                if (!normalized.types.length && found.types) {
                  normalized.types = found.types
                }
                if (!normalized.facilities.length && found.facilities) {
                  normalized.facilities = found.facilities
                }
                if (!normalized.image_url && found.image_url) {
                  normalized.image_url = found.image_url
                }
              }
            }
          } catch (e) {
            console.warn('Fallback fetch details failed', e)
          }
        }

        this.hotels.push(normalized)
        saveToStorage(this.hotels)
        return { ok: true }
      } catch (e) {
        console.error(e)
        return { ok: false, reason: 'error' }
      }
    },
  },
})
