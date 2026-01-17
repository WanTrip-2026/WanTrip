export interface HotelBaseApi {
  id: string
  name: string
  city: string | null
  district: string | null
  star_rating: number | null
  min_price: number | null
  cover_image_url: string | null
}

export interface FeaturedHotelApi extends HotelBaseApi {
  featured_order: number | null
}

export interface HotelApi extends HotelBaseApi {
  address: string | null
}

export interface HomePageCardItem {
  id: string
  name: string
  imageUrl: string
  price: number
  rating: number
  venue: string
  address?: string
}
