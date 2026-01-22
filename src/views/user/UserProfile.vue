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
        <div class="lg:col-span-3 gap-10 pb-10 mb-10 lg:mb-0">
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
          <!-- 個資管理區 -->
          <div
            class="scroll-mt-[96px] bg-white w-full rounded-[20px] border border-gray-300 p-5 mb-10"
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

            <form
              class="max-w-md space-y-4 justify-between pt-5 flex flex-col gap-2"
              @submit.prevent="saveProfile"
            >
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
                class="self-end rounded-full bg-primary hover:bg-main px-4 py-2 text-white"
              >
                修改資料
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
              <div v-if="orders.length === 0" class="text-center text-gray-500 py-10">
                目前沒有訂單
              </div>
              <div
                v-else
                v-for="order in orders"
                :key="order.id"
                class="flex justify-between rounded-[20px] border border-gray-300 overflow-hidden"
              >
                <div class="flex h-[120px]">
                  <img
                    class="aspect-[4/3] object-cover min-w-10 hidden lg:block"
                    :src="
                      (order.attraction_id ? order.image : order.image_url) ||
                      order.image ||
                      order.image_url ||
                      'https://fakeimg.pl/300x200/'
                    "
                    alt="產品照片"
                  />
                  <div class="flex flex-col justify-center gap-1 px-5">
                    <h3 class="text-md lg:text-xl font-bold">
                      {{ order.hotel_name || order.title }}
                    </h3>
                    <p class="text-sm text-gray-600 hidden lg:block">
                      訂單編號：{{ order.order_id || order.id }}
                    </p>
                    <p class="text-sm text-gray-600">
                      <template v-if="order.attraction_id">
                        日期：{{ order.date?.split(' ')[0] || order.check_in_date }}
                      </template>
                      <template v-else>
                        日期：{{ order.check_in_date }} - {{ order.check_out_date }}
                      </template>
                    </p>
                    <p class="text-sm font-bold">
                      總價：<span class="text-red-500">NT$ {{ order.price }}</span>
                    </p>
                  </div>
                </div>
                <!-- 按鈕區可依需求加上功能 -->
                <div class="flex flex-col justify-center gap-2 px-5">
                  <button class="text-nowrap hover:text-main_800" @click="goToOrder(order)">
                    訂單詳情
                  </button>
                  <!-- <button class="text-nowrap hover:text-main_800">取消訂單</button> -->
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

            <!-- Tabs -->
            <div class="flex gap-4 mt-5 border-b border-gray-200">
              <button
                v-for="cat in ['all', 'hotel', 'ticket']"
                :key="cat"
                @click="selectedCategory = cat"
                class="pb-2 px-4 text-dark_500 font-medium transition-colors border-b-2"
                :class="
                  selectedCategory === cat
                    ? 'border-primary text-primary'
                    : 'border-transparent hover:text-dark_900'
                "
              >
                {{ cat === 'all' ? '全部' : cat === 'hotel' ? '住宿' : '體驗' }}
              </button>
            </div>

            <div class="h-[270px] flex items-center gap-2.5 mt-5 overflow-x-auto flex-nowrap">
              <div
                v-if="filteredFavorites.length === 0"
                class="w-full text-center py-10 text-gray-500"
              >
                尚無收藏項目
              </div>
              <HomePageCard
                v-for="item in filteredFavorites"
                :key="item.id"
                :id="item.id"
                :name="item.name"
                :imageUrl="item.imageUrl"
                :price="item.price"
                :venue="item.venue"
                :category="item.category"
                :date="item.date"
                :address="item.address"
                :rating="item.rating"
                :type="item.type"
                class="shrink-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/utils/supabaseClient'
import { useAuthStore } from '@/stores/auth'
import { useFavoriteStore } from '@/stores/favoriteStore'
import HomePageCard from '@/components/layout/HomePageCard.vue'
import { getUserOrders, type Order } from '@/services/orderApi'

const authStore = useAuthStore()
const router = useRouter()

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

const goToOrder = (order: Order) => {
  const targetId = order.order_id || order.id
  router.push(`/orders/confirmation/${targetId}`)
}

const user = ref<User | null>(null)
const profile = ref<ProfileRow | null>(null)
const orders = ref<Order[]>([]) // 訂單列表

const loadingProfile = ref(false)
const saving = ref(false)
const errorMsg = ref('')

const form = ref({
  email: '',
  fullName: '',
  birthday: '',
  gender: 'male',
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
    form.value.gender = profile.value.gender ?? 'male'
    form.value.phone = profile.value.phone ?? ''
  }
}

const loadMe = async () => {
  errorMsg.value = ''
  loadingProfile.value = true

  // Wait for auth to be ready
  if (!authStore.ready) {
    // simpler to just return and let watch handle it, or wait
    // But since we call this onMounted, we might need to wait manually or just rely on watch.
    // actually, let's just proceed if ready, or return.
  }

  const currentUser = authStore.user
  user.value = currentUser

  if (!currentUser) {
    errorMsg.value = '未登入'
    loadingProfile.value = false
    return
  }

  try {
    // 1. Fetch Profile
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', currentUser.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116: JSON object requested, multiple (or no) rows returned
      throw error
    }

    profile.value = data

    // 2. Fill Form
    form.value.email = currentUser.email ?? ''
    form.value.fullName = data?.full_name ?? currentUser.user_metadata?.full_name ?? ''
    form.value.phone = data?.phone ?? currentUser.user_metadata?.phone ?? ''
    form.value.gender = data?.gender ?? 'male'
    form.value.birthday = data?.birthday ?? currentUser.user_metadata?.birthday ?? ''

    // 3. Load Orders
    await loadOrders()
  } catch (e: unknown) {
    console.error(e)
    errorMsg.value = '載入會員資料失敗'
  } finally {
    loadingProfile.value = false
  }
}

// Watch for auth changes to reload
watch(
  () => authStore.user,
  (newUser) => {
    if (newUser) loadMe()
    else {
      user.value = null
      profile.value = null
      orders.value = []
    }
  },
)

const loadOrders = async () => {
  try {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    if (!token) throw new Error('No auth token')

    orders.value = await getUserOrders(token)
  } catch (error) {
    console.error('Failed to load orders:', error)
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
    console.log(form.value)
    const { error } = await supabase.from('profiles').update(payload).eq('id', user.value.id)
    if (error) throw error

    isEditing.value = false
    await loadMe()
  } catch (e: unknown) {
    errorMsg.value = (e instanceof Error ? e.message : String(e)) || '更新失敗'
  } finally {
    saving.value = false
  }
}

/** 左側選單 IntersectionObserver */
const activeMenu = ref('#account-section')
import { USER_MENUS } from '@/constants/user'
const menus = USER_MENUS

let observer: IntersectionObserver | null = null

onMounted(async () => {
  observer?.disconnect()

  await loadMe()
  await favoriteStore.fetchFavorites()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeMenu.value = `#${entry.target.id}`
        }
      })
    },
    {
      root: null,
      rootMargin: '-120px 0px -60% 0px',
      threshold: 0,
    },
  )

  menus.forEach((menu) => {
    const section = document.getElementById(menu.id)
    if (section) observer?.observe(section)
  })
})
const setActive = (href: string) => {
  activeMenu.value = href
}

const favoriteStore = useFavoriteStore()

const selectedCategory = ref('all')

const filteredFavorites = computed(() => {
  if (selectedCategory.value === 'all') {
    return favoriteStore.favoriteList
  }
  return favoriteStore.favoriteList.filter((item) => item.type === selectedCategory.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
