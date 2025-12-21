<!-- src/components/LoginModal.vue -->
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
        <div
          class="absolute inset-0 bg-wan-primary/60 backdrop-blur-sm"
          @click="close"
        />

        <!-- modal card -->
        <div
          class="relative mx-4 w-full max-w-[920px] overflow-hidden rounded-[40px] bg-white shadow-2xl"
          @click.stop
        >
          <div class="grid grid-cols-1 md:grid-cols-2">
            <!-- Left: form -->
            <div class="p-6 sm:p-8">
              <!-- logo -->
              <div class="mb-6">
                <div class="text-4xl font-black tracking-tight text-black">
                  WanTrip
                </div>
              </div>

              <form class="space-y-4" @submit.prevent="onSubmit">
                <div>
                  <label class="sr-only" for="email">email</label>
                  <input
                    id="email"
                    v-model.trim="email"
                    type="email"
                    autocomplete="email"
                    placeholder="email"
                    class="w-full rounded-[20px] border border-gray-200 bg-white px-5 py-3 text-base outline-none ring-0 placeholder:text-gray-400 focus:border-wan-secondary focus:ring-2 focus:ring-wan-secondary/30"
                  />
                </div>

                <div>
                  <label class="sr-only" for="password">password</label>
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    autocomplete="current-password"
                    placeholder="password"
                    class="w-full rounded-[20px] border border-gray-200 bg-white px-5 py-3 text-base outline-none ring-0 placeholder:text-gray-400 focus:border-wan-secondary focus:ring-2 focus:ring-wan-secondary/30"
                  />
                </div>

                <div class="flex items-center justify-between pt-1">
                  <label class="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      v-model="remember"
                      type="checkbox"
                      class="h-4 w-4 rounded border-gray-300 text-wan-secondary focus:ring-wan-secondary"
                    />
                    remember for 30 days
                  </label>

                  <button
                    type="button"
                    class="text-sm text-gray-500 hover:text-wan-primary"
                    @click="$emit('forgot-password')"
                  >
                    forgot password
                  </button>
                </div>

                <div class="pt-2 space-y-3">
                  <button
                    type="submit"
                    class="w-full rounded-[20px] bg-wan-accent px-6 py-3 font-semibold text-wan-primary shadow-sm hover:brightness-95 active:brightness-90"
                  >
                    Log in
                  </button>

                  <button
                    type="button"
                    class="w-full rounded-[20px] bg-wan-secondary px-6 py-3 font-semibold text-white shadow-sm hover:brightness-95 active:brightness-90"
                    @click="$emit('signup')"
                  >
                    Sign Up
                  </button>
                </div>

                <!-- social -->
                <div class="pt-6">
                  <div class="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      class="grid h-10 w-10 place-items-center rounded-full border border-gray-200 hover:bg-gray-50"
                      aria-label="Continue with Google"
                      @click="$emit('social', 'google')"
                    >
                      <!-- Google icon (simple) -->
                      <svg viewBox="0 0 48 48" class="h-5 w-5" aria-hidden="true">
                        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.2 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.1-.1-2.3-.4-3.5z"/>
                        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.5 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.2 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"/>
                        <path fill="#4CAF50" d="M24 44c5.3 0 10.2-2 13.8-5.3l-6.4-5.2C29.5 35.5 26.9 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.6 5.1C9.3 39.7 16.1 44 24 44z"/>
                        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.2 5.3-5.9 6.8l.1.1 6.4 5.2C39.8 36.6 44 31.5 44 24c0-1.1-.1-2.3-.4-3.5z"/>
                      </svg>
                    </button>

                    <button
                      type="button"
                      class="grid h-10 w-10 place-items-center rounded-full border border-gray-200 hover:bg-gray-50"
                      aria-label="Continue with Apple"
                      @click="$emit('social', 'apple')"
                    >
                      <!-- Apple icon -->
                      <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M16.365 1.43c0 1.14-.43 2.2-1.28 3.16-.91 1.04-2.41 1.85-3.65 1.75-.14-1.1.41-2.25 1.25-3.18.93-1.03 2.48-1.78 3.68-1.73ZM20.5 17.2c-.72 1.7-1.06 2.46-1.98 3.96-1.29 2.08-3.11 4.67-5.37 4.69-2.01.02-2.53-1.33-5.27-1.32-2.74.01-3.32 1.34-5.33 1.32-2.26-.02-3.99-2.34-5.28-4.42C.99 18.4.02 14.62 1.56 11.9c1.09-1.93 2.81-3.07 4.63-3.1 2.11-.04 3.99 1.4 5.27 1.4 1.23 0 3.55-1.72 6.02-1.47 1.03.04 3.93.42 5.79 3.17-.15.1-3.46 2.02-3.42 6.03.04 4.78 4.19 6.36 4.24 6.38Z"
                        />
                      </svg>
                    </button>

                    <button
                      type="button"
                      class="grid h-10 w-10 place-items-center rounded-full border border-gray-200 hover:bg-gray-50"
                      aria-label="Continue with LINE"
                      @click="$emit('social', 'line')"
                    >
                      <!-- LINE-ish bubble -->
                      <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true">
                        <path
                          fill="#06C755"
                          d="M12 3C6.5 3 2 6.6 2 11c0 2.7 1.7 5.1 4.3 6.6l-.7 3.4c-.1.4.3.7.7.5l4-2.3c.6.1 1.1.1 1.7.1 5.5 0 10-3.6 10-8.3S17.5 3 12 3z"
                        />
                      </svg>
                    </button>
                  </div>

                  <div class="pt-4 text-center">
                    <button
                      type="button"
                      class="text-sm text-gray-500 hover:text-wan-primary"
                      @click="close"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <!-- Right: image card -->
            <div class="relative hidden md:block">
              <img
                :src="heroImage"
                alt="Taipei 101"
                class="h-full w-full object-cover"
              />
              <div class="absolute inset-0 bg-black/15" />
              <div class="absolute left-6 top-6 text-white drop-shadow">
                <div class="text-2xl font-semibold">台北101</div>
                <div class="text-sm opacity-90">Taipei 101</div>
              </div>
            </div>
          </div>

          <!-- optional close button (top-right) -->
          <button
            type="button"
            class="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-wan-primary shadow hover:bg-white"
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

<script setup>
import { computed, onMounted, onUnmounted, watch, ref } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  heroImage: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80", // 可換成你自己的圖
  },
});

const emit = defineEmits([
  "update:modelValue",
  "login",
  "signup",
  "forgot-password",
  "social",
]);

const email = ref("");
const password = ref("");
const remember = ref(false);

const close = () => emit("update:modelValue", false);

const onSubmit = () => {
  emit("login", { email: email.value, password: password.value, remember: remember.value });
};

// lock body scroll when modal open
const toggleBodyLock = (locked) => {
  document.body.style.overflow = locked ? "hidden" : "";
};

watch(
  () => props.modelValue,
  (v) => toggleBodyLock(v),
  { immediate: true }
);

onUnmounted(() => toggleBodyLock(false));
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
