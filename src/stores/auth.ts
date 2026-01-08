import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/utils/supabaseClient'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const profile = ref(null)
  const loading = ref(false)

  const isLoggedIn = computed(() => !!user.value)

  // 🔹 初始化（頁面重整時呼叫）
  const init = async () => {
    loading.value = true
    try {
      const { data } = await supabase.auth.getSession()
      user.value = data.session?.user ?? null

      if (user.value) {
        const { data: p } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.value.id)
          .single()
        profile.value = p
      }
    } finally {
      loading.value = false
    }
  }

  // 🔹 登入後呼叫
  const setAuth = async (newUser) => {
    user.value = newUser
    if (newUser) {
      const { data: p } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', newUser.id)
        .single()
      profile.value = p
    } else {
      profile.value = null
    }
  }

  // 🔹 登出
  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
    profile.value = null
  }

  return { user, profile, isLoggedIn, loading, init, setAuth, logout }
})
