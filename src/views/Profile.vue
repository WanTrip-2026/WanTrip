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
</script>
<template>
  <main class="mx-auto w-full bg-page pt-24 min-h-screen">
    <section class="max-w-[1200px] mx-auto">
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
        <div class="w-[895px] flex flex-col gap-10">
          <!-- 帳號管理區 -->
          <div
            class="bg-white w-full rounded-[20px] border border-gray-300 p-4"
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
          <div class="bg-white rounded-[20px] border border-gray-300 p-4" id="order-section">
            <h3 class="font-bold text-2xl border-b-gray-300 border-b-2 pb-2">我的訂單</h3>
          </div>
          <div class="bg-white rounded-[20px] border border-gray-300 p-4" id="favorite-section">
            <h3 class="font-bold text-2xl border-b-gray-300 border-b-2 pb-2">收藏清單</h3>
          </div>
          <div class="bg-white rounded-[20px] border border-gray-300 p-4" id="admin-section">
            <h3 class="font-bold text-2xl border-b-gray-300 border-b-2 pb-2">個資管理</h3>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
