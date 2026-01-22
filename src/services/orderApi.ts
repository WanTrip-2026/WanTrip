const API = import.meta.env.VITE_API_BASE_URL

export type Order = {
  id: string
  order_id?: string
  hotel_id?: string | null
  attraction_id?: string | null

  title?: string
  subtitle?: string
  hotel_name?: string
  room_type?: string
  image?: string
  image_url?: string

  price: number
  status: string

  date?: string
  check_in_date?: string
  check_out_date?: string
  created_at: string

  contact_name?: string | null
  contact_email?: string | null
  contact_phone?: string | null

  latitude?: number | null
  longitude?: number | null

  city?: string | null
  district?: string | null
  address?: string | null
}

export async function getUserOrders(token: string) {
  const r = await fetch(`${API}/orders/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await r.json().catch(() => [])
  if (!r.ok) throw new Error(data?.message || 'fetch orders failed')

  return data as Order[]
}

export async function createOrder(orderData: object, token: string) {
  const r = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  })

  const data = await r.json().catch(() => ({}))
  if (!r.ok) {
    const error = new Error(data?.message || 'create order failed')
    ;(error as any).response = { data }
    throw error
  }

  return data
}

export async function getOrderById(orderId: string, token?: string) {
  const headers: HeadersInit = {}
  if (token) headers.Authorization = `Bearer ${token}`

  const r = await fetch(`${API}/orders/${orderId}`, {
    headers,
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data?.message || 'fetch order failed')
  return data as Order
}

export async function cancelOrder(orderId: string, token: string) {
  const r = await fetch(`${API}/orders/${orderId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data?.message || 'cancel order failed')
  return data
}
