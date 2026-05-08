import { ref } from 'vue'
import { supabase } from '@/utils/supabaseClient'

export function useProfile() {
  const profile = ref<Record<string, unknown> | null>(null)
  const loading = ref(false)
  const error = ref<unknown>(null)

  const fetchProfile = async () => {
    loading.value = true
    error.value = null
    try {
      const { data: userRes, error: userErr } = await supabase.auth.getUser()
      if (userErr) throw userErr
      const user = userRes.user
      if (!user) {
        profile.value = null
        return null
      }

      const { data, error: pErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (pErr) throw pErr
      profile.value = data
      return data
    } catch (e) {
      error.value = e
      profile.value = null
      return null
    } finally {
      loading.value = false
    }
  }

  return { profile, loading, error, fetchProfile }
}
