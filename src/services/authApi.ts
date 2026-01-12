const API = import.meta.env.VITE_API_BASE_URL

export type SessionUser = {
  id: string
  email: string | null
}

export async function exchangeToCookie(access_token: string) {
  const r = await fetch(`${API}/auth/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ access_token }),
  })

  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data?.message || 'session create failed')

  return data as { ok: true; user: SessionUser }
}

export async function me() {
  const r = await fetch(`${API}/auth/me`, { credentials: 'include' })
  const data = await r.json().catch(() => ({}))
  return data as { user: SessionUser | null }
}

export async function logoutApi() {
  const r = await fetch(`${API}/auth/logout`, { method: 'POST', credentials: 'include' })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data?.message || 'logout failed')
  return data as { ok: true }
}
