const API = import.meta.env.VITE_API_BASE_URL

export interface Order {
  id: string
  user_id: string
  title: string
  subtitle: string
  date: string
  note: string
  price: number
  image: string
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
}
