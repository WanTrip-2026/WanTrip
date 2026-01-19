import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabaseClient'
import type { User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(true)
  const ready = ref(false)

  const isLoggedIn = computed(() => !!user.value)

  // ✅ 初始化：檢查 Supabase Session
  const init = async () => {
    loading.value = true
    try {
      const { data } = await supabase.auth.getSession()
      user.value = data.session?.user ?? null

      // 監聽登入狀態變化
      supabase.auth.onAuthStateChange((_event, session) => {
        user.value = session?.user ?? null
      })
    } catch (error) {
      console.error('Auth Init Error:', error)
    } finally {
      loading.value = false
      ready.value = true
    }
  }

  // ✅ 登出
  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  const showLoginModal = ref(false)
  const openLoginModal = () => {
    showLoginModal.value = true
  }
  const closeLoginModal = () => {
    showLoginModal.value = false
  }

  const setAuth = (sessionUser: User | null) => {
    user.value = sessionUser
  }

  return {
    user,
    isLoggedIn,
    loading,
    ready,
    init,
    logout,
    showLoginModal,
    openLoginModal,
    closeLoginModal,
    setAuth,
  }
})
