const API = import.meta.env.VITE_API_BASE_URL

export type Order = {
  id: string
  order_id?: string

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
}

export async function getUserOrders(userId: string) {
  const r = await fetch(`${API}/orders/user/${userId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await r.json().catch(() => [])
  if (!r.ok) throw new Error(data?.message || 'fetch orders failed')

  return data as Order[]
}

export async function createOrder(orderData: object) {
  const r = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  })

  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data?.message || 'create order failed')

  return data
}

export async function getOrderById(orderId: string) {
  const r = await fetch(`${API}/orders/${orderId}`)
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data?.message || 'fetch order failed')
  return data as Order
}
