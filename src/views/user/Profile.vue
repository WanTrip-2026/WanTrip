<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeMenu = ref('#account-section')

const menus = [
  { label: '我的帳號', id: 'account-section', href: '#account-section' },
  { label: '我的訂單', id: 'order-section', href: '#order-section' },
  { label: '收藏清單', id: 'favorite-section', href: '#favorite-section' },
  { label: '個資管理', id: 'admin-section', href: '#admin-section' },
]
let observer = null

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '-120px 0px -60% 0px',
    threshold: 0,
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeMenu.value = `#${entry.target.id}`
      }
    })
  }, options)

  menus.forEach((menu) => {
    const section = document.getElementById(menu.id)
    if (section) observer.observe(section)
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

const setActive = (href) => {
  activeMenu.value = href
}

const isEditing = ref(false)

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}
const gender = ref('male')
</script>
<template>
  <main class="mx-auto w-full bg-page pt-24 min-h-screen">
    <section class="max-w-[1240px] mx-auto">
      <div class="relative h-full w-full px-5 py-2.5 mx-auto grid grid-cols-1 lg:grid-cols-4 gap-5">
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
                'w-[160px] rounded-[20px] px-12 py-3 transition-colors',
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
            <h3 class="font-bold text-2xl border-b-gray-300 border-b-2 pb-2">我的帳號</h3>
            <form class="max-w-md space-y-4 justify-between pt-5 flex flex-col gap-2">
              <!-- Email -->
              <div>
                <label for="email" class="block mb-1 font-medium">帳號</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
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
                class="self-end rounded-full bg-primary hover:bg-secondary px-4 py-2 text-white"
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
                    class="aspect-[4/3] object-cover"
                    src="../assets/hoteldetail_img/Wanhao.jpg"
                    alt="產品照片"
                  />
                  <div class="flex flex-col justify-center gap-1 px-5">
                    <h3 class="text-xl font-bold">飯店名稱：高雄洲際飯店</h3>
                    <p class="text-sm">訂單編號：202512240001</p>
                    <p class="text-sm">訂單日期：2025年12月24日</p>
                  </div>
                </div>
                <div class="flex flex-col justify-center gap-2 px-5">
                  <button>訂單詳情</button>
                  <button>取消訂單</button>
                  <button>再次訂購</button>
                </div>
              </div>
              <!-- 複製 -->
              <div
                class="flex justify-between rounded-[20px] border border-gray-300 overflow-hidden"
              >
                <div class="flex h-[120px]">
                  <img
                    class="aspect-[4/3] object-cover"
                    src="../assets/hoteldetail_img/Wanhao.jpg"
                    alt="產品照片"
                  />
                  <div class="flex flex-col justify-center gap-1 px-5">
                    <h3 class="text-xl font-bold">飯店名稱：高雄洲際飯店</h3>
                    <p class="text-sm">訂單編號：202512240001</p>
                    <p class="text-sm">訂單日期：2025年12月24日</p>
                  </div>
                </div>
                <div class="flex flex-col justify-center gap-2 px-5">
                  <button>訂單詳情</button>
                  <button>取消訂單</button>
                  <button>再次訂購</button>
                </div>
              </div>
              <div
                class="flex justify-between rounded-[20px] border border-gray-300 overflow-hidden"
              >
                <div class="flex h-[120px]">
                  <img
                    class="aspect-[4/3] object-cover"
                    src="../assets/hoteldetail_img/Wanhao.jpg"
                    alt="產品照片"
                  />
                  <div class="flex flex-col justify-center gap-1 px-5">
                    <h3 class="text-xl font-bold">飯店名稱：高雄洲際飯店</h3>
                    <p class="text-sm">訂單編號：202512240001</p>
                    <p class="text-sm">訂單日期：2025年12月24日</p>
                  </div>
                </div>
                <div class="flex flex-col justify-center gap-2 px-5">
                  <button>訂單詳情</button>
                  <button>取消訂單</button>
                  <button>再次訂購</button>
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
            <div class="flex gap-2.5 py-5 overflow-x-auto flex-nowrap">
              <div class="w-[240px] shrink-0 rounded-[20px] border border-gray-300 overflow-hidden">
                <img
                  class="aspect-[4/3] object-cover"
                  src="../assets/hoteldetail_img/Wanhao.jpg"
                  alt="產品照片"
                />
                <div class="flex flex-col p-2.5">
                  <h3 class="text-xl font-bold text-nowrap py-2">飯店名稱：高雄洲際飯店</h3>
                  <p class="text-sm">高雄市前鎮區</p>
                  <div class="flex gap-2 h-10 justify-center items-center my-4">
                    <button class="rounded-[20px] bg-primary text-white w-full py-2">
                      取消收藏
                    </button>
                    <button class="rounded-[20px] bg-primary text-white w-full py-2">訂購</button>
                  </div>
                </div>
              </div>
              <div class="w-[240px] shrink-0 rounded-[20px] border border-gray-300 overflow-hidden">
                <img
                  class="aspect-[4/3] object-cover"
                  src="../assets/hoteldetail_img/Wanhao.jpg"
                  alt="產品照片"
                />
                <div class="flex flex-col p-2.5">
                  <h3 class="text-xl font-bold text-nowrap py-2">飯店名稱：高雄洲際飯店</h3>
                  <p class="text-sm">高雄市前鎮區</p>
                  <div class="flex gap-2 h-10 justify-center items-center my-4">
                    <button class="rounded-[20px] bg-primary text-white w-full py-2">
                      取消收藏
                    </button>
                    <button class="rounded-[20px] bg-primary text-white w-full py-2">訂購</button>
                  </div>
                </div>
              </div>
              <div class="w-[240px] shrink-0 rounded-[20px] border border-gray-300 overflow-hidden">
                <img
                  class="aspect-[4/3] object-cover"
                  src="../assets/hoteldetail_img/Wanhao.jpg"
                  alt="產品照片"
                />
                <div class="flex flex-col p-2.5">
                  <h3 class="text-xl font-bold text-nowrap py-2">飯店名稱：高雄洲際飯店</h3>
                  <p class="text-sm">高雄市前鎮區</p>
                  <div class="flex gap-2 h-10 justify-center items-center my-4">
                    <button class="rounded-[20px] bg-primary text-white w-full py-2">
                      取消收藏
                    </button>
                    <button class="rounded-[20px] bg-primary text-white w-full py-2">訂購</button>
                  </div>
                </div>
              </div>
              <div class="w-[240px] shrink-0 rounded-[20px] border border-gray-300 overflow-hidden">
                <img
                  class="aspect-[4/3] object-cover"
                  src="../assets/hoteldetail_img/Wanhao.jpg"
                  alt="產品照片"
                />
                <div class="flex flex-col p-2.5">
                  <h3 class="text-xl font-bold text-nowrap py-2">飯店名稱：高雄洲際飯店</h3>
                  <p class="text-sm">高雄市前鎮區</p>
                  <div class="flex gap-2 h-10 justify-center items-center my-4">
                    <button class="rounded-[20px] bg-primary text-white w-full py-2">
                      取消收藏
                    </button>
                    <button class="rounded-[20px] bg-primary text-white w-full py-2">訂購</button>
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
              class="pt-5 float-right text-gray-500 font-medium"
              @click="toggleEdit"
            >
              {{ isEditing ? '取消' : '編輯' }}
            </button>
            <h3 class="font-bold text-2xl border-b-gray-300 border-b-2 pb-2">我的資料</h3>

            <form class="max-w-md space-y-4 justify-between pt-5 flex flex-col gap-2">
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
                      v-model="gender"
                      value="male"
                      class="accent-primary"
                      required
                    />
                    男
                  </label>
                  <label class="flex items-center gap-1">
                    <input
                      type="radio"
                      name="gender"
                      v-model="gender"
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
                />
              </div>

              <button
                type="submit"
                v-if="isEditing"
                class="self-end rounded-full bg-primary hover:bg-secondary px-4 py-2 text-white"
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
