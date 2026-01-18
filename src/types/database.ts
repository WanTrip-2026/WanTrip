export interface Attraction {
  id: string | number
  name: string
  category: string[] | string
  city: string
  address: string
  intro: string
  description: string
  price: number
  district: string
  rating: number
  detail: string
  highlights: string[]
  created_at?: string
}

export interface AttractionImage {
  id: string | number
  attraction_id: string | number
  image_url: string
  caption?: string
  is_cover?: boolean
  created_at?: string
}

export interface Ticket {
  id: string | number
  attraction_id: string | number
  name: string
  ticket_type: string
  price: number
  description: string
  created_at?: string
}
