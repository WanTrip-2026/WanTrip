const API = import.meta.env.VITE_API_BASE_URL

export interface Order {
  id: string
  user_id: string
  // Backend columns
  hotel_name?: string
  room_type?: string
  image_url?: string
  check_in_date?: string
  check_out_date?: string
  order_id?: string
  hotel_id?: string
  latitude?: number
  longitude?: number
  // Legacy/Frontend props (optional now)
  title?: string
  subtitle?: string
  date?: string
  note?: string
  price: number
  image?: string
  status: string
  created_at: string
}

export async function getUserOrders(userId: string) {
  const r = await fetch(`${API}/orders/user/${userId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await r.json().catch(() => [])
  if (!r.ok) throw new Error(data?.message || 'fetch orders failed')

  return data as Order[]
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
  console.log(`[getOrderById] Fetching: ${API}/orders/${orderId}`)
  const r = await fetch(`${API}/orders/${orderId}`)
  console.log(`[getOrderById] Status: ${r.status}`)
  const data = await r.json().catch(() => ({}))
  console.log(`[getOrderById] Data:`, data)
  if (!r.ok) throw new Error(data?.message || 'fetch order failed')
  return data as Order
}
