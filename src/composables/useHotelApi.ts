import { ref } from 'vue'
import type { FeaturedHotelApi, HotelApi, HomePageCardItem, HotelBaseApi } from '@/types/hotel'

const FALLBACK_IMG =
  'https://res.cloudinary.com/wantrip/image/upload/v1767939338/%E9%A3%AF%E5%BA%97%E9%A6%96%E5%9C%96_dualwy.jpg'

export function useHotelApi() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL as string
  const api = (path: string) =>
    new URL(path, API_BASE.endsWith('/') ? API_BASE : `${API_BASE}/`).toString()

  const mapToCardItem = (h: HotelBaseApi & { address?: string | null }): HomePageCardItem => ({
    id: h.id,
    name: h.name,
    imageUrl: h.cover_image_url ?? FALLBACK_IMG,
    price: h.min_price ?? 0,
    rating: h.star_rating ?? 0,
    venue: [h.city, h.district].filter(Boolean).join('｜'),
    address: h.address ?? '',
  })

  const fetchFeaturedHotels = async () => {
    const loading = ref(false)
    const error = ref<string | null>(null)
    const data = ref<HomePageCardItem[]>([])

    loading.value = true
    try {
      const res = await fetch(api('hotel_featured'))
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const result = (await res.json()) as FeaturedHotelApi[]
      data.value = result.map(mapToCardItem)
    } catch (e) {
      console.error(e)
      error.value = '熱門飯店載入失敗'
    } finally {
      loading.value = false
    }

    return { data, loading, error }
  }

  const fetchNearbyHotels = async (city: string, limit: number = 6) => {
    const loading = ref(false)
    const error = ref<string | null>(null)
    const data = ref<HomePageCardItem[]>([])

    loading.value = true
    try {
      const url = new URL(api('hotels/nearby'))
      url.searchParams.set('city', city)
      url.searchParams.set('limit', String(limit))

      const res = await fetch(url.toString())
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const result = (await res.json()) as HotelApi[]
      data.value = result.map(mapToCardItem)
    } catch (e) {
      console.error(e)
      error.value = `${city}飯店載入失敗`
    } finally {
      loading.value = false
    }

    return { data, loading, error }
  }

  const fetchRecommendedHotels = async (limit: number = 6) => {
    const loading = ref(false)
    const error = ref<string | null>(null)
    const data = ref<HomePageCardItem[]>([])

    loading.value = true
    try {
      const res = await fetch(api(`hotels/recommended?limit=${limit}`))
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const result = (await res.json()) as HotelApi[]
      data.value = result.map(mapToCardItem)
    } catch (e) {
      console.error(e)
      error.value = '推薦飯店載入失敗'
    } finally {
      loading.value = false
    }

    return { data, loading, error }
  }

  return {
    fetchFeaturedHotels,
    fetchNearbyHotels,
    fetchRecommendedHotels,
  }
}
