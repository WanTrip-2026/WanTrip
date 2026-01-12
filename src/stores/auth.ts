import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { me, logoutApi, type SessionUser } from '@/services/authApi'
import { supabase } from '@/utils/supabaseClient'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<SessionUser | null>(null)
  const loading = ref(false)
  const ready = ref(false)

  const isLoggedIn = computed(() => !!user.value)

  // ✅ 初始化：用後端 cookie /me
  const init = async () => {
    loading.value = true
    try {
      const res = await me()
      user.value = res.user
    } finally {
      loading.value = false
      ready.value = true
    }
  }

  // ✅ 登入後：直接塞後端 user（LoginModal emit 的就是這個）
  const setAuth = (newUser: SessionUser | null) => {
    user.value = newUser
  }

  // ✅ 登出：清 cookie + 清 supabase session（保險）
  const logout = async () => {
    await logoutApi()
    await supabase.auth.signOut()
    user.value = null
  }

  return { user, isLoggedIn, loading, ready, init, setAuth, logout }
})
