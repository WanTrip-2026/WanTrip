export interface Attraction {
  id: number
  name: string
  category: string[] | string // Handle both just in case, typically array or comma-separated
  city: string
  address: string
  intro: string
  description: string
  price: number
  district: string
  rating: number
  detail: string // Could be HTML or JSON, treating as string for now
  highlights: string[]
  created_at?: string
}

export interface AttractionImage {
  id: number
  attraction_id: number
  image_url: string
  caption?: string
  is_cover?: boolean // Assuming we might interpret cover image logic
  created_at?: string
}
