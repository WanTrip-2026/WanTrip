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
      // 1. 檢查 Profile 是否已存在 (包含生日欄位)
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, birthday')
        .eq('id', currentUser.id)
        .single()

      // 若資料完整則直接返回
      if (profile?.birthday) return

      // 準備使用者資料
      const user_metadata = currentUser.user_metadata || {}
      const username = user_metadata.full_name || user_metadata.username || currentUser.email?.split('@')[0] || 'Member'
      const birthday = user_metadata.birthday || null

      console.log('[Auth] ensureUserProfile:', { exists: !!profile, hasBirthday: !!profile?.birthday, metaBirthday: birthday })

      if (profile) {
        // Profile 存在但缺少生日，且 Metadata 中有生日 -> 嘗試補齊
        if (!profile.birthday && birthday) {
          console.log('[Auth] Profile exists but birthday missing. Updating now...')
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ birthday })
            .eq('id', currentUser.id)

          if (updateError) console.error('[Auth] Update birthday error:', updateError)
        }
        return
      }

      console.log('[Auth] Profile missing, creating now...')
      console.log('[Auth] user_metadata:', user_metadata)
      console.log('[Auth] extracted birthday:', birthday)

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
      console.log("start")

      // 使用 Promise.race 加入 3 秒超時
      const signOutPromise = supabase.auth.signOut()
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('SignOut timeout')), 1000)
      )
      await Promise.race([signOutPromise, timeoutPromise])
      console.log("here")
    } catch (error) {
      console.error('Logout error:', error)
      // 即使 signOut 失敗，也強制清除本地狀態
    } finally {
      console.log("end")
      user.value = null
      // 強制清除 localStorage 中的 session
      try {
        localStorage.removeItem('supabase.auth.token')
      } catch (e) {
        console.warn('Failed to clear localStorage:', e)
      }
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
