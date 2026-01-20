<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[9999] flex items-center justify-center"
        aria-modal="true"
        role="dialog"
        @keydown.esc="close"
        tabindex="-1"
      >

        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close">
        </div>

        <div
          class="relative mx-5 p-4 w-full max-w-[920px] overflow-hidden rounded-[40px] bg-white shadow-2xl"
          @click.stop
        >
          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <form class="space-y-4 pt-6 sm:pt-8" @submit.prevent="onSubmit">
                <div>
                  <label class="sr-only" for="username">username</label>
                  <input
                    id="username"
                    v-model.trim="username"
                    type="text"
                    autocomplete="username"
                    placeholder="使用者名稱"
                    class="w-full rounded-[20px] border border-gray-300 bg-white px-5 py-3 text-base text-dark outline-none ring-0 placeholder:text-dark_300 focus:border-wan-main_800 focus:ring-2 focus:ring-wan-main_700"
                  />
                </div>

                <!-- 生日 -->
                <div>
                  <label class="sr-only" for="birthday">生日</label>
                  <input
                    id="birthday"
                    v-model="birthday"
                    type="date"
                    required
                    placeholder="YYYY-MM-DD"
                    class="w-full rounded-[20px] border border-gray-300 bg-white px-5 py-3 text-base text-dark outline-none ring-0 placeholder:text-dark_300 focus:border-wan-main_800 focus:ring-2 focus:ring-wan-main_700"
                  />
                </div>

                <div>
                  <label class="sr-only" for="email">email</label>
                  <input
                    id="email"
                    v-model.trim="email"
                    type="email"
                    autocomplete="email"
                    placeholder="email"
                    class="w-full rounded-[20px] border border-gray-300 bg-white px-5 py-3 text-base text-dark outline-none ring-0 placeholder:text-dark_300 focus:border-wan-main_800 focus:ring-2 focus:ring-wan-main_700"
                  />
                </div>

                <div>
                  <label class="sr-only" for="password">password</label>
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    autocomplete="new-password"
                    placeholder="密碼"
                    class="w-full rounded-[20px] border border-gray-300 bg-white px-5 py-3 text-base text-dark outline-none ring-0 placeholder:text-dark_300 focus:border-wan-main_800 focus:ring-2 focus:ring-wan-main_700"
                  />
                </div>

                <div>
                  <label class="sr-only" for="password2">confirm password</label>
                  <input
                    id="password2"
                    v-model="password2"
                    type="password"
                    autocomplete="new-password"
                    placeholder="確認密碼"
                    class="w-full rounded-[20px] border border-gray-300 bg-white px-5 py-3 text-base text-dark outline-none ring-0 placeholder:text-dark_300 focus:border-wan-main_800 focus:ring-2 focus:ring-wan-main_700"
                  />
                </div>

                <!-- buttons -->
                <div class="pt-2 space-y-4">
                  <button
                    type="submit"
                    class="w-full rounded-[20px] bg-primary px-6 py-3 font-semibold text-white shadow-sm hover:bg-main"
                  >
                    註冊
                  </button>

                  <button
                    type="button"
                    class="w-full rounded-[20px] bg-dark_100 px-6 py-3 font-semibold text-dark shadow-sm hover:bg_dark_300"
                    @click="$emit('go-login')"
                  >
                    已有帳號？去登入
                  </button>
                </div>

                <div class="text-center">
                  <button
                    type="button"
                    class="text-sm text-dark hover:text-dark_700 hover:underline hover:cursor-pointer"
                    @click="close"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>

            <!-- Right: image card -->
            <div class="hidden md:block p-1 lg:p-2">
              <div class="relative h-full min-h-[400px] lg:min-h-[500px] overflow-hidden rounded-[28px]">
                <img
                  :src="heroImage"
                  :alt="rightSubtitle"
                  class="absolute inset-0 h-full w-full object-cover"
                />
                <div class="absolute inset-0 bg-black/10"></div>

                <div class="absolute left-6 top-6 text-left text-white drop-shadow">
                  <div class="text-3xl font-semibold leading-none">{{ rightTitle }}</div>
                  <div class="text-sm opacity-90">{{ rightSubtitle }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- close button (top-right) -->
          <button
            type="button"
            class="absolute right-8 top-8 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-wan-primary shadow hover:bg-black"
            aria-label="Close modal"
            @click="close"
          >
            ✕
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onUnmounted, watch, ref } from 'vue'
import { supabase } from '@/utils/supabaseClient'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  heroImage: {
    type: String,
    default:
      'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80',
  },
  rightTitle: { type: String, default: '填寫會員資料' },
  rightSubtitle: { type: String, default: 'Create your account' },
})

const emit = defineEmits(['update:modelValue', 'registered', 'go-login'])

const username = ref('')
const email = ref('')
const password = ref('')
const password2 = ref('')
const birthday = ref('')

const close = () => emit('update:modelValue', false)

const onSubmit = async () => {
  try {
    if (!username.value) throw new Error('請輸入使用者名稱')
    if (!birthday.value) throw new Error('請選擇生日')
    if (!email.value || !password.value) throw new Error('請輸入 email 與密碼')
    if (password.value !== password2.value) throw new Error('兩次輸入的密碼不一致')

    console.log('[env] VITE_SUPABASE_URL =', import.meta.env.VITE_SUPABASE_URL)
    console.log('[env] VITE_API_BASE_URL =', import.meta.env.VITE_API_BASE_URL)
    console.log('[birthday] =', birthday.value)

    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          username: username.value,
          birthday: birthday.value,
        },
      },
    })

    console.log('[signup] data =', data)
    console.log('[signup] error =', error)

    if (error) throw error

    const userId = data?.user?.id
    console.log('[signup] userId =', userId)

    // ✅ 將使用者資料寫入 profiles 表 (使用 upsert 避免重複插入)
    if (userId) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          email: email.value,
          full_name: username.value,
          birthday: birthday.value,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id', // 如果 id 已存在,則更新
        })

      if (profileError) {
        console.error('[profile upsert] error:', profileError)
        // 即使 profile 寫入失敗,註冊還是成功了,所以只記錄錯誤
      } else {
        console.log('[profile upsert] success')
      }
    }

    alert('註冊成功!請到信箱完成驗證(若有開啟信箱驗證)。')
    emit('registered', data)
    close()
  } catch (err: unknown) {
    console.error('[register] error:', err)
    alert((err instanceof Error ? err.message : String(err)) || '註冊失敗')
  }
}

const toggleBodyLock = (locked: boolean) => {
  document.body.style.overflow = locked ? 'hidden' : ''
}

watch(
  () => props.modelValue,
  (v) => toggleBodyLock(v),
  { immediate: true },
)

onUnmounted(() => toggleBodyLock(false))
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
