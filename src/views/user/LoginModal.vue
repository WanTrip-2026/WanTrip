<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue" class="fixed inset-0 z-[9999] flex items-center justify-center" aria-modal="true"
        role="dialog" @keydown.esc="close" tabindex="-1">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close"></div>

        <!-- modal card -->
        <div
          class="relative mx-5 p-4 w-full max-w-[920px] overflow-hidden rounded-[40px] bg-white border border-white/60 shadow-2xl"
          @click.stop>
          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div class="">
              <div class="mb-6 pt-6 sm:pt-8 flex justify-center">
                <svg viewBox="0 0 517 140" fill="none" xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet" class="block w-[200px] sm:w-[200px] md:w-[240px] h-auto">
                  <path
                    d="M111.52 98.9977C111.281 99.3072 111.121 99.6699 111.053 100.055C110.985 100.44 111.012 100.835 111.13 101.208C111.39 101.728 111.78 101.728 113.33 99.9077C123.59 88.0977 124.76 72.9077 125.28 62.9077C126.97 28.6377 123.46 14.7477 141.64 14.7477C141.64 14.7477 155.27 14.7477 156.18 29.1577C157.08 47.9777 136.57 107.698 127.48 118.988C123.59 123.798 117.36 125.348 112.81 125.348C92.95 125.348 98.15 100.428 99.18 91.5977C99.7 87.3177 99.31 86.6677 98.66 86.5377C98.01 86.4077 97.76 86.7977 96.98 90.6877C94.9 103.018 94.51 125.348 74.13 125.348C65.69 125.348 60.5 119.898 56.08 107.698C50.08 91.2077 40.24 27.9877 27.65 27.9877C20.65 27.9877 20.12 37.1977 26.74 46.4177C35.83 59.4177 31.94 72.7777 18.69 72.9077C9.35 73.0377 0 66.6677 0 48.6277C0 28.3777 11.68 16.1677 30.9 16.1677C59.33 16.1677 65.82 43.4377 68.42 53.9477C77.11 90.2977 76.85 91.7277 73.22 97.9477C72.22 99.8977 72.22 100.548 72.31 101.198C72.4 101.848 73.09 101.848 74.52 99.8977C81.14 89.5077 88.02 70.0377 81.79 52.3777C75.79 35.8977 85.94 29.7877 94.79 29.7877C101.02 29.7877 111.67 33.0377 116.99 59.1277C118.01 64.6777 121.51 83.7577 111.52 98.9977Z"
                    fill="black" />
                  <path
                    d="M218.65 102.198C218.65 107.128 211.51 111.668 205.02 111.668C196.19 111.668 191.02 102.718 197.36 91.4177C198.66 89.2077 198.53 88.8177 198.14 88.5577C197.36 88.3077 196.84 88.6877 196.06 90.5077C193.6 95.3177 188.53 111.668 172.95 111.668C159.06 111.668 150.36 98.8177 150.36 78.8277C150.36 57.1477 160.62 43.3877 176.46 43.3877C186.97 43.3877 190.74 49.4877 192.04 55.9777C192.69 58.3177 193.04 58.7077 193.73 58.7077C194.42 58.7077 194.63 58.3177 194.5 56.7577C192.69 48.5777 197.75 43.3877 204.89 43.3877C211.51 43.3877 218.65 47.9277 218.65 52.7277C218.65 57.5277 212.42 62.9877 212.42 76.8777C212.42 91.1577 218.65 97.5177 218.65 102.198ZM180.35 86.9977C185.94 86.9977 189.44 81.7977 189.44 75.4377C189.44 69.0777 185.81 63.8877 180.09 63.8877C174.09 63.8877 170.75 69.5977 170.75 75.4377C170.75 81.8077 174.64 86.9977 180.35 86.9977Z"
                    fill="black" />
                  <path
                    d="M269.15 43.3877C288.63 43.3877 281.1 69.0877 281.1 76.0977V78.0477C281.1 96.9977 286.29 93.6277 287.46 98.8177C289.02 104.918 281.75 111.668 272.66 111.668C265.13 111.668 258.38 106.998 258.38 96.3477C258.38 90.2477 260.59 84.1477 260.59 78.0477V77.0477C260.59 68.0477 259.42 62.8977 253.84 62.8977C246.18 62.8977 245.14 72.5077 245.14 77.0477V78.0477C245.14 96.9977 250.33 93.6277 251.63 98.8177C253.06 104.918 245.92 111.668 236.7 111.668C229.17 111.668 222.55 106.998 222.55 96.3477C222.55 90.2477 224.75 84.1477 224.75 78.0477V77.0477C224.778 73.6363 224.389 70.2343 223.59 66.9177C221.77 59.0077 218.13 56.4077 218.13 51.9877C218.13 47.1877 222.68 43.4277 229.69 43.4277C235.69 43.4277 240.59 46.2777 241.5 50.5677C242.28 53.9377 240.98 59.6477 238.5 63.6777C237.5 65.3677 237.2 66.3977 238.24 66.3977C238.63 66.3977 239.02 66.1477 240.31 63.6777C246.57 51.0477 258.77 43.3877 269.15 43.3877Z"
                    fill="black" />
                  <path
                    d="M320.04 20.7677C302.13 23.4877 301.48 32.5777 309.14 38.4177C320.95 47.4177 313.29 64.1277 299.53 64.2577C290.7 64.3877 281.36 58.0277 281.36 41.4077C281.36 20.7677 296.29 7.52771 319 7.52771C334.06 7.52771 353.54 13.2377 376.65 2.84772C387.65 -2.08228 391.45 -0.392294 392.65 6.22771C393.82 13.8877 391.49 28.0377 375.91 31.2277C369.29 32.5277 355.53 32.2277 349.29 28.1177C351.24 38.1177 346.44 67.1877 346.44 75.2377C346.44 102.118 352.28 101.338 352.28 106.658C352.28 111.978 346.18 116.658 336.83 116.658C326.57 116.658 320.73 111.198 320.73 100.298C320.73 91.2077 324.63 79.3977 324.63 66.5377C324.63 53.6777 320.73 43.1777 320.73 33.3077C320.73 27.5977 322.81 22.0177 330.6 22.4077C332.42 22.5277 332.68 22.2777 332.68 21.8877C332.68 21.4977 332.42 21.2377 331.12 20.8877C327.7 19.8577 323.68 20.1177 320.04 20.7677Z"
                    fill="black" />
                  <path
                    d="M398.62 67.1677C399.27 64.0477 396.81 63.9177 395.9 63.9177C391.22 63.9177 387.98 69.5077 387.98 78.0677V79.0677C387.98 98.0677 393.17 94.6477 394.47 99.8377C395.9 105.948 388.76 112.698 379.54 112.698C372.01 112.698 365.39 108.018 365.39 97.3777C365.39 91.2777 367.59 85.1677 367.59 79.0677V78.0677C367.609 74.6766 367.22 71.2955 366.43 67.9977C364.61 60.0777 360.97 57.4777 360.97 53.0677C360.97 48.2577 365.52 44.4977 372.53 44.4977C378.53 44.4977 383.43 47.3577 384.34 51.6377C385.12 55.0077 383.82 60.7277 381.34 64.7477C380.34 66.4377 380.04 67.4777 381.08 67.4777C381.47 67.4777 381.86 67.2177 383.15 64.7477C389.39 52.1577 398.86 44.4977 408.21 44.4977C418.98 44.4977 421.06 54.6277 421.06 59.6877C421.06 67.8677 415.87 74.6177 407.95 75.0077C401.87 75.3477 397.84 71.5777 398.62 67.1677Z"
                    fill="black" />
                  <path
                    d="M449.27 102.738C449.27 108.188 443.17 112.738 434.34 112.738C424.86 112.738 418.89 107.278 418.89 98.4577C418.89 91.3177 422.89 85.2077 422.89 79.1077V78.1077C422.89 71.8777 418.89 61.8877 418.89 55.6477C418.89 47.7277 425.25 44.4877 433.56 44.4877C441.87 44.4877 447.32 47.7278 447.32 55.3878C447.32 61.8878 443.42 71.8777 443.42 78.1077V79.1077C443.46 97.2877 449.27 97.2877 449.27 102.738ZM433.43 15.7378C436.012 15.6821 438.553 16.397 440.727 17.7912C442.901 19.1854 444.611 21.1958 445.638 23.5658C446.665 25.9358 446.963 28.558 446.493 31.0979C446.024 33.6378 444.808 35.9803 443.002 37.8265C441.196 39.6727 438.88 40.9389 436.351 41.4637C433.822 41.9884 431.194 41.7478 428.802 40.7727C426.41 39.7975 424.363 38.1319 422.922 35.9884C421.481 33.8449 420.711 31.3207 420.71 28.7377C420.682 27.044 420.992 25.3617 421.62 23.7887C422.249 22.2157 423.184 20.7835 424.372 19.5755C425.559 18.3675 426.975 17.4078 428.537 16.7524C430.099 16.097 431.776 15.7588 433.47 15.7577L433.43 15.7378Z"
                    fill="black" />
                  <path
                    d="M479.8 130.128C479.8 136.748 473.57 139.998 465.39 139.998C457.21 139.998 451.39 136.748 451.39 126.628C451.39 118.058 455.39 108.968 455.39 92.2177C455.39 67.6877 448.12 59.7677 448.12 54.3177C448.12 48.8677 455.39 44.4478 461.75 44.4478C470.75 44.4478 475.9 53.2778 469.41 64.6978C468.24 66.7778 468.41 67.1677 468.76 67.5577C469.41 67.8177 469.93 67.4277 470.83 65.6077C473.3 60.6777 478.36 44.4478 493.83 44.4478C507.83 44.4478 516.55 57.2978 516.55 77.1678C516.55 98.8478 506.17 112.738 490.33 112.738C479.81 112.738 476.18 106.498 474.75 100.138C474.23 97.8078 473.84 97.4178 473.19 97.4178C472.54 97.4178 472.28 97.8077 472.28 99.7477C472.27 114.418 479.8 123.118 479.8 130.128ZM486.68 68.9977C480.97 68.9977 477.34 74.1877 477.34 80.6777C477.34 87.1677 481.1 92.2278 486.81 92.2278C492.81 92.2278 496.03 86.5177 496.03 80.6777C496.03 74.1777 492.27 68.9977 486.68 68.9977Z"
                    fill="black" />
                </svg>
              </div>

              <form class="space-y-4" @submit.prevent="onSubmit">
                <div>
                  <span class="text-dark_900 pl-3 mb-2 font-bold">帳號</span>
                  <label class="sr-only" for="email"></label>
                  <input id="email" v-model.trim="email" type="email" autocomplete="email" placeholder="請輸入電子郵件"
                    class="w-full rounded-full border border-gray-300 bg-white px-5 py-3 text-base text-dark outline-none ring-0 placeholder:text-dark_300 focus:border-wan-main_800 focus:ring-2 focus:ring-wan-main_700" />
                </div>

                <div>
                  <span class="text-dark_900 pl-3 mb-2 font-bold">密碼</span>
                  <label class="sr-only" for="password"></label>
                  <input id="password" v-model="password" type="password" autocomplete="current-password"
                    placeholder="請輸入密碼"
                    class="w-full rounded-full border border-gray-300 bg-white px-5 py-3 text-base text-dark outline-none ring-0 placeholder:text-dark_300 focus:border-wan-main_800 focus:ring-2 focus:ring-wan-main_700" />
                </div>

                <div class="flex items-center justify-between pt-1 px-5">
                  <label class="flex items-center gap-2 text-sm cursor-pointer text-dark hover:text-dark_700">
                    <input v-model="remember" type="checkbox" class="h-4 w-4 text-dark bg-white focus:bg-primary" />
                    保持登入
                  </label>

                  <button type="button"
                    class="text-sm text-dark hover:text-dark_700 hover:underline hover:cursor-pointer"
                    @click="$emit('forgot-password')">
                    忘記密碼？
                  </button>
                </div>

                <div class="pt-2 space-y-4">
                  <button type="submit"
                    class="w-full rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-sm hover:bg-main">
                    登入
                  </button>

                  <button type="button"
                    class="w-full rounded-full bg-main_100 px-6 py-3 font-semibold text-dark shadow-sm hover:bg_main_300"
                    @click="$emit('signup')">
                    註冊
                  </button>
                </div>

                <div class="relative flex items-center">
                  <div class="flex-grow border-t border-gray-300"></div>
                  <span class="flex-shrink mx-4 text-gray-500">或使用以下方式登入</span>
                  <div class="flex-grow border-t border-gray-300"></div>
                </div>

                <!-- social -->
                <div class="flex items-center justify-center gap-4">
                  <button type="button"
                    class="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white border border-gray-300 hover:bg-main_100"
                    aria-label="Continue with Google" @click="$emit('social', 'google')">
                    <!-- Google icon (simple) -->
                    <svg viewBox="0 0 48 48" class="h-5 w-5" aria-hidden="true">
                      <path fill="#FFC107"
                        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.2 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.1-.1-2.3-.4-3.5z" />
                      <path fill="#FF3D00"
                        d="M6.3 14.7l6.6 4.8C14.7 15.5 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.2 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z" />
                      <path fill="#4CAF50"
                        d="M24 44c5.3 0 10.2-2 13.8-5.3l-6.4-5.2C29.5 35.5 26.9 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.6 5.1C9.3 39.7 16.1 44 24 44z" />
                      <path fill="#1976D2"
                        d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.2 5.3-5.9 6.8l.1.1 6.4 5.2C39.8 36.6 44 31.5 44 24c0-1.1-.1-2.3-.4-3.5z" />
                    </svg>
                    <p class="text-dark">使用Gmail登入</p>
                  </button>
                </div>

                <div class="text-center">
                  <button type="button" class="text-sm text-dark hover:text-dark_800 hover:underline cursor-pointer"
                    @click="close">
                    Close
                  </button>
                </div>
              </form>
            </div>

            <div class="hidden md:block p-1 lg:p-2">
              <div class="relative h-full min-h-[400px] lg:min-h-[500px] overflow-hidden rounded-[28px]">
                <img
                  src="https://images.unsplash.com/photo-1531934985319-1fc5317d8ce1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Taipei 101" class="absolute inset-0 h-full w-full object-cover" />
                <div class="absolute inset-0 bg-black/10"></div>
                <div class="absolute left-6 top-6 text-left text-white drop-shadow">
                  <div class="text-3xl font-semibold leading-none">台北101</div>
                  <div class="text-sm opacity-90">Taipei 101</div>
                </div>
              </div>
            </div>
          </div>

          <button type="button"
            class="absolute right-8 top-8 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-dark shadow hover:bg-dark_100"
            aria-label="Close modal" @click="close">
            ✕
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, ref, onUnmounted } from 'vue'
import { supabase } from '@/utils/supabaseClient'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  heroImage: {
    type: String,
    default:
      'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80',
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'login', payload: { user: unknown }): void // Use any or strict type
  (e: 'signup'): void
  (e: 'forgot-password'): void
  (e: 'social', provider: 'google' | 'apple' | 'line'): void
}>()

const email = ref('')
const password = ref('')
const remember = ref(false)

const close = () => emit('update:modelValue', false)

const onSubmit = async () => {
  try {
    if (!email.value || !password.value) throw new Error('請輸入 email 與密碼')

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (signInError) throw signInError

    const user = signInData.session?.user
    if (!user) throw new Error('No user data')

    // No need to call old APIs
    // await exchangeToCookie(access_token)
    // const meRes = await me()

    emit('login', { user })
    emit('update:modelValue', false)
  } catch (err: unknown) {
    console.error('[login] error:', err)

    // 提供更友善的錯誤訊息
    let errorMessage = '登入失敗'

    if (err instanceof Error) {
      if (err.message.includes('Invalid login credentials')) {
        errorMessage =
          '帳號或密碼錯誤,請確認:\n1. Email 是否正確\n2. 密碼是否正確\n3. 是否已完成 Email 驗證(請檢查信箱)'
      } else if (err.message.includes('Email not confirmed')) {
        errorMessage = '請先到信箱完成 Email 驗證後再登入'
      } else {
        errorMessage = err.message
      }
    }
    alert(errorMessage)
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
