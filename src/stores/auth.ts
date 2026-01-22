import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabaseClient'
import type { User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(true)
  const ready = ref(false)

  const isLoggedIn = computed(() => !!user.value)

  // ✅ 確保 Profile 存在 (適用於 Email 驗證後首次登入)
  const ensureUserProfile = async (currentUser: User) => {
    try {
      // 1. 檢查 Profile 是否已存在
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', currentUser.id)
        .single()

      if (profile) return // 已存在，不需處理

      // 2. 若不存在，根據 user_metadata 建立
      const user_metadata = currentUser.user_metadata || {}
      const username = user_metadata.full_name || user_metadata.username || currentUser.email?.split('@')[0] || 'Member'
      const birthday = user_metadata.birthday || null

      console.log('[Auth] Profile missing, creating now...', { username, birthday })

      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: currentUser.id,
          email: currentUser.email,
          full_name: username,
          birthday: birthday,
          updated_at: new Date().toISOString(),
        })

      if (insertError) throw insertError
      console.log('[Auth] Profile created successfully')

    } catch (err) {
      console.error('[Auth] ensureUserProfile error:', err)
    }
  }

  // ✅ 初始化：檢查 Supabase Session
  const init = async () => {
    loading.value = true
    try {
      const { data } = await supabase.auth.getSession()
      user.value = data.session?.user ?? null

      if (user.value) {
        await ensureUserProfile(user.value)
      }

      // 監聽登入狀態變化
      supabase.auth.onAuthStateChange(async (_event, session) => {
        user.value = session?.user ?? null
        if (user.value) {
           await ensureUserProfile(user.value)
        }
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
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      user.value = null
    }
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
