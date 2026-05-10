<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <!-- Loading Skeleton -->
      <div v-if="loading" class="animate-pulse flex flex-col items-center gap-4">
        <div class="h-16 w-16 rounded-full bg-gray-200"></div>
        <div class="h-4 w-40 bg-gray-200 rounded-full"></div>
        <div class="h-3 w-28 bg-gray-200 rounded-full"></div>
      </div>

      <div v-else-if="error" class="space-y-4">
        <div class="text-red-500 text-xl">❌</div>
        <p class="text-gray-800 font-semibold">登入失敗</p>
        <p class="text-gray-600">{{ error }}</p>
        <button
          name="return-home"
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

const router = useRouter()
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

    if (!data.session?.user) {
      throw new Error('未能取得登入資訊')
    }

    // 更新 auth store (已經在 main.ts 初始化監聽了，但這裡可以做個雙重確認或直接導轉)
    // auth.setAuth(data.session.user) // authStore might catch it automatically via onAuthStateChange

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
