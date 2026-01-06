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
        <!-- overlay -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close" />

        <!-- modal card -->
        <div
          class="relative mx-5 p-4 w-full max-w-[920px] overflow-hidden rounded-[20px] bg-white shadow-2xl"
          @click.stop
        >
          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <!-- Left: register form -->
            <div>
              <!-- ✅ Logo removed -->

              <form class="space-y-4 pt-6 sm:pt-8" @submit.prevent="onSubmit">
                <!-- 使用者名稱 -->
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

                <!-- 生日：YYYY / MM / DD 三欄下拉 -->
                <div class="grid grid-cols-3 gap-3">
                  <div>
                    <label class="sr-only" for="birthYear">birth year</label>
                    <select
                      id="birthYear"
                      v-model="birthYear"
                      class="w-full rounded-[20px] border border-gray-300 bg-white px-5 py-3 text-base text-dark outline-none ring-0 focus:border-wan-main_800 focus:ring-2 focus:ring-wan-main_700"
                    >
                      <option value="" disabled>YYYY</option>
                      <option v-for="y in years" :key="y" :value="String(y)">{{ y }}</option>
                    </select>
                  </div>

                  <div>
                    <label class="sr-only" for="birthMonth">birth month</label>
                    <select
                      id="birthMonth"
                      v-model="birthMonth"
                      class="w-full rounded-[20px] border border-gray-300 bg-white px-5 py-3 text-base text-dark outline-none ring-0 focus:border-wan-main_800 focus:ring-2 focus:ring-wan-main_700"
                    >
                      <option value="" disabled>MM</option>
                      <option v-for="m in months" :key="m" :value="String(m)">{{ String(m).padStart(2, '0') }}</option>
                    </select>
                  </div>

                  <div>
                    <label class="sr-only" for="birthDay">birth day</label>
                    <select
                      id="birthDay"
                      v-model="birthDay"
                      class="w-full rounded-[20px] border border-gray-300 bg-white px-5 py-3 text-base text-dark outline-none ring-0 focus:border-wan-main_800 focus:ring-2 focus:ring-wan-main_700"
                    >
                      <option value="" disabled>DD</option>
                      <option v-for="d in days" :key="d" :value="String(d)">{{ String(d).padStart(2, '0') }}</option>
                    </select>
                  </div>
                </div>

                <!-- email -->
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

                <!-- 密碼 -->
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

                <!-- 確認密碼 -->
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

                <div class="pt-4 text-center">
                  <button
                    type="button"
                    class="text-sm text-dark_500 hover:text-dark_900"
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
import { computed, onUnmounted, watch, ref } from 'vue'
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

const birthYear = ref<string>('')
const birthMonth = ref<string>('')
const birthDay = ref<string>('')

const close = () => emit('update:modelValue', false)

// years: current year - 100 ~ current year
const years = computed(() => {
  const now = new Date()
  const current = now.getFullYear()
  const start = current - 100
  const arr: number[] = []
  for (let y = current; y >= start; y--) arr.push(y)
  return arr
})

const months = computed(() => Array.from({ length: 12 }, (_, i) => i + 1))

const days = computed(() => {
  const y = Number(birthYear.value)
  const m = Number(birthMonth.value)
  if (!y || !m) return Array.from({ length: 31 }, (_, i) => i + 1)

  // JS month: 0-11; day 0 gets last day of previous month => last day of target month
  const lastDay = new Date(y, m, 0).getDate()
  const arr: number[] = []
  for (let d = 1; d <= lastDay; d++) arr.push(d)

  // 若切換月份導致原本日期超出範圍，清掉
  if (birthDay.value && Number(birthDay.value) > lastDay) birthDay.value = ''
  return arr
})

const birthday = computed(() => {
  if (!birthYear.value || !birthMonth.value || !birthDay.value) return ''
  const mm = String(birthMonth.value).padStart(2, '0')
  const dd = String(birthDay.value).padStart(2, '0')
  return `${birthYear.value}/${mm}/${dd}` // ✅ YYYY/MM/DD
})

const onSubmit = async () => {
  try {
    if (!username.value) throw new Error('請輸入使用者名稱')
    if (!birthYear.value || !birthMonth.value || !birthDay.value) throw new Error('請選擇生日')
    if (!email.value || !password.value) throw new Error('請輸入 email 與密碼')
    if (password.value !== password2.value) throw new Error('兩次輸入的密碼不一致')

    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          username: username.value,
          birthday: birthday.value, // ✅ user_metadata
        },
      },
    })

    if (error) throw error

    alert('註冊成功！請到信箱完成驗證（若有開啟信箱驗證）。')
    emit('registered', data)
    close()
  } catch (err: any) {
    console.error('[register] error:', err)
    alert(err?.message ?? String(err))
  }
}

// lock body scroll when modal open
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
