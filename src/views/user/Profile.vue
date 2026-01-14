<template>
  <main class="max-w-[1240px] mx-auto pt-24 min-h-screen">
    <section class="mx-5">
      <div class="relative grid grid-cols-1 lg:grid-cols-4 gap-5">
        <aside
          class="sticky top-[96px] h-fit self-start hidden lg:block lg:col-span-1 px-4 py-8 border bg-white border-gray-300 rounded-[20px] items-center gap-2"
        >
          <div class="flex flex-col items-center gap-5">
            <a
              v-for="menu in menus"
              :key="menu.href"
              :href="menu.href"
              @click="setActive(menu.href)"
              :class="[
                'w-[160px] rounded-[20px] px-12 py-3 hover:text-main_800 transition-colors',
                activeMenu === menu.href ? 'bg-primary text-white' : '',
              ]"
              >{{ menu.label }}
            </a>
          </div>
        </aside>
        <div class="lg:col-span-3 gap-10 pb-10">
          <!-- 帳號管理區 -->
          <div
            class="scroll-mt-[96px] bg-white w-full rounded-[20px] border border-gray-300 p-5 mb-10"
            id="account-section"
          >
            <h3 class="font-bold text-2xl border-b-gray-300 border-b pb-2">我的帳號</h3>
            <form class="max-w-md space-y-4 justify-between pt-5 flex flex-col gap-2">
              <!-- Email -->
              <div>
                <label for="email" class="block mb-1 font-medium">帳號</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  v-model="form.email"
                  disabled
                  placeholder="example@email.com"
                  class="w-full rounded-full border border-gray-300 px-5 py-3"
                />
              </div>
              <div>
                <label for="currentPassword" class="block mb-1 font-medium">原密碼</label>
                <input
                  id="currentPassword"
                  type="password"
                  required
                  minlength="8"
                  placeholder="請輸入原密碼"
                  class="w-full rounded-full border border-gray-300 px-5 py-3"
                />
              </div>
              <!-- Password -->
              <div>
                <label for="newPassword" class="block mb-1 font-medium">新密碼</label>
                <input
                  id="newPassword"
                  name="password"
                  type="password"
                  required
                  minlength="8"
                  placeholder="至少 8 碼"
                  class="w-full rounded-full border border-gray-300 px-5 py-3"
                />
              </div>

              <div>
                <label for="confirmPassword" class="block mb-1 font-medium">確認密碼</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  minlength="8"
                  placeholder="請再次輸入密碼"
                  class="w-full rounded-full border border-gray-300 px-5 py-3"
                />
              </div>

              <button
                type="submit"
                class="self-end rounded-full bg-primary hover:bg-main px-4 py-2 text-white"
              >
                修改密碼
              </button>
            </form>
          </div>

          <!-- 我的訂單 -->
          <div
            class="scroll-mt-[96px] bg-white rounded-[20px] border border-gray-300 p-5 mb-10"
            id="order-section"
          >
            <h3 class="font-bold text-2xl border-b-gray-300 border-b-2 pb-2">我的訂單</h3>
            <div class="flex flex-col gap-2.5 py-5">
              <div
                class="flex justify-between rounded-[20px] border border-gray-300 overflow-hidden"
              >
                <div class="flex h-[120px]">
                  <img
                    class="aspect-[4/3] object-cover min-w-10"
                    src="../../assets/hoteldetail_img/Wanhao.jpg"
                    alt="產品照片"
                  />
                  <div class="flex flex-col justify-center gap-1 px-5">
                    <h3 class="text-md lg:text-xl font-bold">飯店名稱：高雄洲際飯店</h3>
                    <p class="text-sm">訂單編號：202512240001</p>
                    <p class="text-sm">訂單日期：2025年12月24日</p>
                  </div>
                </div>
                <div class="flex flex-col justify-center gap-2 px-5">
                  <button class="text-nowrap hover:text-main_800">訂單詳情</button>
                  <button class="text-nowrap hover:text-main_800">取消訂單</button>
                  <button class="text-nowrap hover:text-main_800">再次訂購</button>
                </div>
              </div>
              <!-- 複製 -->
              <div
                class="flex justify-between rounded-[20px] border border-gray-300 overflow-hidden"
              >
                <div class="flex h-[120px]">
                  <img
                    class="aspect-[4/3] object-cover min-w-10"
                    src="../../assets/hoteldetail_img/Wanhao.jpg"
                    alt="產品照片"
                  />
                  <div class="flex flex-col justify-center gap-1 px-5">
                    <h3 class="text-md lg:text-xl font-bold">飯店名稱：高雄洲際飯店</h3>
                    <p class="text-sm">訂單編號：202512240001</p>
                    <p class="text-sm">訂單日期：2025年12月24日</p>
                  </div>
                </div>
                <div class="flex flex-col justify-center gap-2 px-5">
                  <button class="text-nowrap hover:text-main_800">訂單詳情</button>
                  <button class="text-nowrap hover:text-main_800">取消訂單</button>
                  <button class="text-nowrap hover:text-main_800">再次訂購</button>
                </div>
              </div>
              <div
                class="flex justify-between rounded-[20px] border border-gray-300 overflow-hidden"
              >
                <div class="flex h-[120px]">
                  <img
                    class="aspect-[4/3] object-cover min-w-10"
                    src="../../assets/hoteldetail_img/Wanhao.jpg"
                    alt="產品照片"
                  />
                  <div class="flex flex-col justify-center gap-1 px-5">
                    <h3 class="text-md lg:text-xl font-bold">飯店名稱：高雄洲際飯店</h3>
                    <p class="text-sm">訂單編號：202512240001</p>
                    <p class="text-sm">訂單日期：2025年12月24日</p>
                  </div>
                </div>
                <div class="flex flex-col justify-center gap-2 px-5">
                  <button class="text-nowrap hover:text-main_800">訂單詳情</button>
                  <button class="text-nowrap hover:text-main_800">取消訂單</button>
                  <button class="text-nowrap hover:text-main_800">再次訂購</button>
                </div>
              </div>
            </div>
          </div>
          <!-- 收藏清單 -->
          <div
            class="scroll-mt-[96px] bg-white rounded-[20px] border border-gray-300 p-5 mb-10"
            id="favorite-section"
          >
            <h3 class="font-bold text-2xl border-b-gray-300 border-b-2 pb-2">收藏清單</h3>
            <div class="flex gap-2.5 mt-5 overflow-x-auto flex-nowrap">
              <div class="w-[240px] shrink-0 rounded-[20px] border border-gray-300 overflow-hidden">
                <img
                  class="aspect-[4/3] object-cover"
                  src="../../assets/hoteldetail_img/Wanhao.jpg"
                  alt="產品照片"
                />
                <div class="flex flex-col p-2.5 gap-1">
                  <h3 class="text-md font-bold text-nowrap">飯店名稱：高雄洲際飯店</h3>
                  <p class="text-sm">高雄市前鎮區</p>
                  <div class="flex gap-2 justify-center items-center">
                    <button
                      class="rounded-[20px] bg-dark_100 hover:bg-dark_300 text-dark w-full py-2"
                    >
                      取消收藏
                    </button>
                    <button
                      class="rounded-[20px] bg-primary hover:bg-main_800 text-white w-full py-2"
                    >
                      訂購
                    </button>
                  </div>
                </div>
              </div>
              <div class="w-[240px] shrink-0 rounded-[20px] border border-gray-300 overflow-hidden">
                <img
                  class="aspect-[4/3] object-cover"
                  src="../../assets/hoteldetail_img/Wanhao.jpg"
                  alt="產品照片"
                />
                <div class="flex flex-col p-2.5 gap-1">
                  <h3 class="text-md font-bold text-nowrap">飯店名稱：高雄洲際飯店</h3>
                  <p class="text-sm">高雄市前鎮區</p>
                  <div class="flex gap-2 justify-center items-center">
                    <button
                      class="rounded-[20px] bg-dark_100 hover:bg-dark_300 text-dark w-full py-2"
                    >
                      取消收藏
                    </button>
                    <button
                      class="rounded-[20px] bg-primary hover:bg-main_800 text-white w-full py-2"
                    >
                      訂購
                    </button>
                  </div>
                </div>
              </div>
              <div class="w-[240px] shrink-0 rounded-[20px] border border-gray-300 overflow-hidden">
                <img
                  class="aspect-[4/3] object-cover"
                  src="../../assets/hoteldetail_img/Wanhao.jpg"
                  alt="產品照片"
                />
                <div class="flex flex-col p-2.5 gap-1">
                  <h3 class="text-md font-bold text-nowrap">飯店名稱：高雄洲際飯店</h3>
                  <p class="text-sm">高雄市前鎮區</p>
                  <div class="flex gap-2 justify-center items-center">
                    <button
                      class="rounded-[20px] bg-dark_100 hover:bg-dark_300 text-dark w-full py-2"
                    >
                      取消收藏
                    </button>
                    <button
                      class="rounded-[20px] bg-primary hover:bg-main_800 text-white w-full py-2"
                    >
                      訂購
                    </button>
                  </div>
                </div>
              </div>
              <div class="w-[240px] shrink-0 rounded-[20px] border border-gray-300 overflow-hidden">
                <img
                  class="aspect-[4/3] object-cover"
                  src="../../assets/hoteldetail_img/Wanhao.jpg"
                  alt="產品照片"
                />
                <div class="flex flex-col p-2.5 gap-1">
                  <h3 class="text-md font-bold text-nowrap">飯店名稱：高雄洲際飯店</h3>
                  <p class="text-sm">高雄市前鎮區</p>
                  <div class="flex gap-2 justify-center items-center">
                    <button
                      class="rounded-[20px] bg-dark_100 hover:bg-dark_300 text-dark w-full py-2"
                    >
                      取消收藏
                    </button>
                    <button
                      class="rounded-[20px] bg-primary hover:bg-main_800 text-white w-full py-2"
                    >
                      訂購
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 個資管理區 -->
          <div
            class="scroll-mt-[96px] bg-white w-full rounded-[20px] border border-gray-300 p-5"
            id="admin-section"
          >
            <button
              type="button"
              class="float-right text-dark_700 hover:text-main_800 font-medium"
              @click="toggleEdit"
            >
              {{ isEditing ? '取消' : '編輯' }}
            </button>
            <h3 class="font-bold text-2xl border-b-gray-300 border-b-2 pb-2">我的資料</h3>
            <p v-if="loadingProfile" class="text-sm text-gray-500 mt-2">載入中...</p>
            <p v-if="errorMsg" class="text-sm text-red-500 mt-2">{{ errorMsg }}</p>

            <form class="max-w-md space-y-4 justify-between pt-5 flex flex-col gap-2"
            @submit.prevent="saveProfile">
              <!-- 使用者名稱 -->
              <div>
                <label for="fullName" class="block mb-1 font-medium">使用者名稱</label>
                <input
                  id="fullName"
                  name="fullName"
                  :disabled="!isEditing"
                  type="text"
                  required
                  placeholder="請輸入姓名"
                  class="w-full rounded-full border border-gray-300 px-5 py-3"
                  v-model="form.fullName"
                />
              </div>
              <!-- 生日 -->
              <div>
                <label for="birthday" class="block mb-1 font-medium">
                  生日（YYYY / MM / DD）
                </label>
                <input
                  id="birthday"
                  name="birthday"
                  :disabled="!isEditing"
                  type="date"
                  required
                  class="w-full rounded-full border border-gray-300 px-5 py-3"
                  v-model="form.birthday"
                />
              </div>

              <!-- 性別 -->
              <div>
                <span class="block mb-1 font-medium">性別</span>
                <div class="flex items-center gap-4">
                  <label class="flex items-center gap-1">
                    <input
                      type="radio"
                      :disabled="!isEditing"
                      name="gender"
                      v-model="form.gender"
                      value="male"
                      class="accent-primary"
                      required
                    />
                    男
                  </label>
                  <label class="flex items-center gap-1">
                    <input
                        type="radio"
                        :disabled="!isEditing"
                        name="gender"
                        v-model="form.gender"
                        value="female"
                      class="accent-primary"
                    />
                    女
                  </label>
                </div>
              </div>

              <!-- 電話 -->
              <div>
                <label for="phone" class="block mb-1 font-medium">電話</label>
                <input
                  id="phone"
                  name="phone"
                  :disabled="!isEditing"
                  type="tel"
                  required
                  placeholder="請輸入電話號碼"
                  class="w-full rounded-full border border-gray-300 px-5 py-3"
                  v-model="form.phone"
                />
              </div>

              <button
                type="submit"
                v-if="isEditing"
                class="self-end rounded-full bg-primary hover:bg-main_800 px-4 py-2 text-white"
              >
                修改資料
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/utils/supabaseClient'

type ProfileRow = {
  id: string
  email: string | null
  full_name: string | null
  phone: string | null
  gender: string | null
  birthday: string | null // date 會以 'YYYY-MM-DD' 字串回來
  updated_at: string | null
  created_at?: string
}

const user = ref<User | null>(null)
const profile = ref<ProfileRow | null>(null)

const loadingProfile = ref(false)
const saving = ref(false)
const errorMsg = ref('')

const form = ref({
  email: '',
  fullName: '',
  birthday: '',
  gender: 'male/female',
  phone: '',
})

const isEditing = ref(false)
const toggleEdit = () => {
  isEditing.value = !isEditing.value

  // 取消編輯時還原表單
  if (!isEditing.value && profile.value) {
    form.value.email = profile.value.email ?? user.value?.email ?? ''
    form.value.fullName = profile.value.full_name ?? ''
    form.value.birthday = profile.value.birthday ?? ''
    form.value.gender = profile.value.gender ?? 'male/female'
    form.value.phone = profile.value.phone ?? ''
  }
}

const loadMe = async () => {
  errorMsg.value = ''
  loadingProfile.value = true

  try {
    const { data: authData, error: authErr } = await supabase.auth.getUser()
    if (authErr) throw authErr

    user.value = authData.user
    if (!user.value) return

    // 1) auth email 塞入表單（通常 email 以 auth 為準）
    form.value.email = user.value.email ?? ''

    // 2) 確保 profiles 一定有這筆（第一次登入自動建立）
    const { error: upsertErr } = await supabase
      .from('profiles')
      .upsert(
        { id: user.value.id, email: user.value.email ?? null },
        { onConflict: 'id' }
      )
    if (upsertErr) throw upsertErr

    // 3) 讀回 profiles
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, full_name, birthday, gender, phone, updated_at, created_at')
      .eq('id', user.value.id)
      .single()

    if (error) throw error
    profile.value = data

    // 4) 塞回表單
    form.value.fullName = data.full_name ?? ''
    form.value.birthday = data.birthday ?? ''
    form.value.gender = data.gender ?? 'male'
    form.value.phone = data.phone ?? ''
  } catch (e: any) {
    errorMsg.value = e?.message || '載入會員資料失敗'
  } finally {
    loadingProfile.value = false
  }
}

const saveProfile = async () => {
  if (!user.value) return
  saving.value = true
  errorMsg.value = ''

  try {
    const payload: Partial<ProfileRow> = {
      full_name: form.value.fullName,
      birthday: form.value.birthday || null,
      gender: form.value.gender,
      phone: form.value.phone,
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from('profiles').update(payload).eq('id', user.value.id)
    if (error) throw error

    isEditing.value = false
    await loadMe()
  } catch (e: any) {
    errorMsg.value = e?.message || '更新失敗'
  } finally {
    saving.value = false
  }
}

/** 左側選單 IntersectionObserver（保留你原本功能） */
const activeMenu = ref('#account-section')
const menus = [
  { label: '我的帳號', id: 'account-section', href: '#account-section' },
  { label: '我的訂單', id: 'order-section', href: '#order-section' },
  { label: '收藏清單', id: 'favorite-section', href: '#favorite-section' },
  { label: '個資管理', id: 'admin-section', href: '#admin-section' },
]

let observer: IntersectionObserver | null = null
const setActive = (href: string) => {
  activeMenu.value = href
}

let authSub: { unsubscribe: () => void } | null = null

onMounted(() => {
  loadMe()

  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
    if (user.value) loadMe()
  })
  authSub = data?.subscription ?? null

  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: '-120px 0px -60% 0px',
    threshold: 0,
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) activeMenu.value = `#${entry.target.id}`
    })
  }, options)

  menus.forEach((menu) => {
    const section = document.getElementById(menu.id)
    if (section) observer?.observe(section)
  })
})

onUnmounted(() => {
  authSub?.unsubscribe?.()
  observer?.disconnect()
})
</script>
