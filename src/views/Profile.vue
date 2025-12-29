<script setup>
import { ref } from 'vue'

const activeMenu = ref('account-section')

const menus = [
  { label: '我的帳號', href: '#account-section' },
  { label: '我的訂單', href: '#order-section' },
  { label: '收藏清單', href: '#favorite-section' },
  { label: '個資管理', href: '#admin-section' },
]

const setActive = (href) => {
  activeMenu.value = href
}

const isEditing = ref(false)

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}
</script>
<template>
  <main class="mx-auto w-full bg-page pt-24 min-h-screen">
    <section class="max-w-[1240px] mx-auto">
      <div class="h-full px-5 py-2.5 mx-auto flex flex-row gap-5">
        <aside
          class="h-full w-[285px] px-4 py-8 border bg-white border-gray-300 rounded-[20px] flex flex-col items-center gap-2"
        >
          <a
            v-for="menu in menus"
            :key="menu.href"
            :href="menu.href"
            @click="setActive(menu.href)"
            :class="[
              'w-[160px] rounded-[20px] px-12 py-3 transition-colors',
              activeMenu.value === menu.href ? 'bg-primary text-white' : 'bg-gray-200',
            ]"
            >{{ menu.label }}
          </a>
        </aside>
        <div class="w-[895px] flex flex-col gap-10 pb-10">
          <!-- 帳號管理區 -->
          <div
            class="bg-white w-full rounded-[20px] border border-gray-300 p-4"
            id="account-section"
          >
            <h3 class="font-bold text-2xl border-b-gray-300 border-b-2 pb-2">我的帳號</h3>
            <form class="max-w-md space-y-4 justify-between pt-5 px-5 flex flex-col gap-2">
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
          <div class="bg-white rounded-[20px] border border-gray-300 p-4" id="order-section">
            <h3 class="font-bold text-2xl border-b-gray-300 border-b-2 pb-2">我的訂單</h3>
            <div class="flex flex-col gap-2.5 p-5">
              <div
                class="flex justify-between rounded-[20px] border border-gray-300 overflow-hidden"
              >
                <div class="flex h-[120px]">
                  <img
                    class="aspect-[4/3] object-cover"
                    src="../assets/hoteldetail_img/Wanhao.jpg"
                    alt="產品照片"
                  />
                  <div class="flex flex-col justify-center gap-1 px-2">
                    <h3 class="text-xl font-bold">飯店名稱：高雄洲際飯店</h3>
                    <p class="text-sm">訂單編號：202512240001</p>
                    <p class="text-sm">訂單日期：2025年12月24日</p>
                  </div>
                </div>
                <div class="flex flex-col justify-center gap-2 px-2">
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
                  <div class="flex flex-col justify-center gap-1 px-2">
                    <h3 class="text-xl font-bold">飯店名稱：高雄洲際飯店</h3>
                    <p class="text-sm">訂單編號：202512240001</p>
                    <p class="text-sm">訂單日期：2025年12月24日</p>
                  </div>
                </div>
                <div class="flex flex-col justify-center gap-2 px-2">
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
                  <div class="flex flex-col justify-center gap-1 px-2">
                    <h3 class="text-xl font-bold">飯店名稱：高雄洲際飯店</h3>
                    <p class="text-sm">訂單編號：202512240001</p>
                    <p class="text-sm">訂單日期：2025年12月24日</p>
                  </div>
                </div>
                <div class="flex flex-col justify-center gap-2 px-2">
                  <button>訂單詳情</button>
                  <button>取消訂單</button>
                  <button>再次訂購</button>
                </div>
              </div>
            </div>
          </div>
          <!-- 收藏清單 -->
          <div class="bg-white rounded-[20px] border border-gray-300 p-4" id="favorite-section">
            <h3 class="font-bold text-2xl border-b-gray-300 border-b-2 pb-2">收藏清單</h3>
            <div class="flex gap-2.5 p-5 overflow-x-auto flex-nowrap">
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
                    <button class="rounded-[20px] bg-primary text-white px-6 py-2">取消收藏</button>
                    <button class="rounded-[20px] bg-primary text-white px-6 py-2">訂購</button>
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
                    <button class="rounded-[20px] bg-primary text-white px-6 py-2">取消收藏</button>
                    <button class="rounded-[20px] bg-primary text-white px-6 py-2">訂購</button>
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
                    <button class="rounded-[20px] bg-primary text-white px-6 py-2">取消收藏</button>
                    <button class="rounded-[20px] bg-primary text-white px-6 py-2">訂購</button>
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
                    <button class="rounded-[20px] bg-primary text-white px-6 py-2">取消收藏</button>
                    <button class="rounded-[20px] bg-primary text-white px-6 py-2">訂購</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white w-full rounded-[20px] border border-gray-300 p-4" id="admin-section">
            <button
              type="button"
              class="pt-5 float-right text-gray-500 font-medium"
              @click="toggleEdit"
            >
              {{ isEditing ? '取消' : '編輯' }}
            </button>
            <h3 class="font-bold text-2xl border-b-gray-300 border-b-2 pb-2">個資管理</h3>

            <form class="max-w-md space-y-4 justify-between pt-5 px-5 flex flex-col gap-2">
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
                      value="male"
                      class="accent-primary"
                      required
                    />
                    男
                  </label>
                  <label class="flex items-center gap-1">
                    <input type="radio" name="gender" value="female" class="accent-primary" />
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
