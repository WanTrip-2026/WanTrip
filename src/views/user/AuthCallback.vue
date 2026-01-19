<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <div v-if="loading" class="space-y-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p class="text-gray-600">正在處理登入...</p>
      </div>

      <div v-else-if="error" class="space-y-4">
        <div class="text-red-500 text-xl">❌</div>
        <p class="text-gray-800 font-semibold">登入失敗</p>
        <p class="text-gray-600">{{ error }}</p>
        <button
          @click="goHome"
          class="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-main"
        >
          返回首頁
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabaseClient'
import { exchangeToCookie, me } from '@/services/authApi'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const loading = ref(true)
const error = ref('')

const goHome = () => {
  router.push('/')
}

onMounted(async () => {
  try {
    // 等待 Supabase 處理 OAuth callback
    const { data, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
      throw sessionError
    }

    if (!data.session) {
      throw new Error('未能取得登入資訊')
    }

    // 將 Supabase session 轉換為後端 cookie
    const access_token = data.session.access_token
    await exchangeToCookie(access_token)

    // 取得使用者資訊
    const meRes = await me()

    if (!meRes?.user) {
      throw new Error('登入失敗：無法取得使用者資訊')
    }

    // 更新 auth store
    auth.setAuth(meRes.user)

    // 登入成功，導向首頁
    setTimeout(() => {
      router.push('/')
    }, 500)

  } catch (err: unknown) {
    console.error('[OAuth callback] error:', err)
    error.value = err instanceof Error ? err.message : '登入過程發生錯誤'
    loading.value = false
  }
})
</script>
