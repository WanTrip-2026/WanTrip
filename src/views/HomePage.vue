<template>
  <!-- Page wrapper（不含 navbar / footer） -->
  <main
    class="min-h-screen max-w-[1240px] mx-auto bg-page pt-24"
  >
    <div class="mx-5 mb-20">
      <!-- Banner -->
      <section class="relative pb-32 md:pb-20">
        <!-- wrapper：讓 Search Bar 以 banner 為定位基準 -->
        <div class="relative">
          <div
            class="relative w-full overflow-hidden rounded-[40px] bg-gray-200 shadow-[0_10px_30px_rgba(47,61,77,0.12)]"
          >
            <div class="flex h-[340px] items-center justify-center md:h-[420px]">
              <span class="select-none text-sm text-primary/60">banner</span>
            </div>
          </div>

          <!-- Search Bar (floating on banner) -->
          <div class="absolute inset-x-0 bottom-0 z-20 flex justify-center translate-y-1/2">
            <form
              class="max-w-[720px] rounded-[40px] border border-primary/25 bg-white shadow-sm p-5 md:p-2"
              @submit.prevent="onSearch"
            >
              <div class="flex flex-col gap-2 md:flex-row md:items-center">
                <!-- Tabs -->
                <div class="flex items-center gap-2 rounded-full border border-primary/25 bg-white p-1">
                  <button
                    type="button"
                    class="rounded-full text-nowrap w-full text-sm font-semibold transition px-1 py-2"
                    :class="
                      activeTab === 'package'
                        ? 'bg-secondary text-white'
                        : 'text-primary/80 hover:bg-primary/5'
                    "
                    @click="activeTab = 'package'"
                  >
                    找套票
                  </button>
                  <button
                    type="button"
                    class="rounded-full text-nowrap w-full text-sm font-semibold transition px-1 py-2"
                    :class="
                      activeTab === 'stay'
                        ? 'bg-secondary text-white'
                        : 'text-primary/80 hover:bg-primary/5'
                    "
                    @click="activeTab = 'stay'"
                  >
                    找住宿
                  </button>
                </div>

                <!-- Fields -->
                <div class="grid flex-1 grid-cols-1 gap-2 md:grid-cols-3">
                  <label class="flex items-center rounded-full border border-primary/25 bg-white px-4 py-2">
                    <span class="mr-3 text-sm text-nowrap font-semibold text-primary/80">去哪</span>
                    <input
                      v-model="form.destination"
                      class="w-full bg-transparent text-sm text-nowrap outline-none placeholder:text-primary/35"
                      placeholder="輸入城市、景點"
                    />
                  </label>

                  <label class="flex items-center rounded-full border border-primary/25 bg-white px-4 py-2">
                    <span class="mr-3 text-sm text-nowrap font-semibold text-primary/80">入住退房日期</span>
                    <input
                      v-model="form.dateRange"
                      class="w-full bg-transparent text-sm text-nowrap outline-none placeholder:text-primary/35"
                      placeholder="選擇日期"
                    />
                  </label>

                  <label class="flex items-center rounded-full border border-primary/25 bg-white px-4 py-2">
                    <span class="mr-3 text-sm text-nowrap font-semibold text-primary/80">人數、需求</span>
                    <input
                      v-model="form.people"
                      class="w-full bg-transparent text-sm text-nowrap outline-none placeholder:text-primary/35"
                      placeholder="2 人｜1 間｜可帶寵物"
                    />
                  </label>
                </div>

                <!-- Submit -->
                <button
                  type="submit"
                  class="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 active:scale-[0.99]"
                >
                  搜尋
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <!-- 想去哪裡玩？ -->
      <section class="mt-10">
        <h2 class="mb-5 text-lg font-black">想去哪裡玩？</h2>

        <div class="grid grid-cols-2 gap-5 md:grid-cols-5">
          <button
            v-for="r in regions"
            :key="r.key"
            type="button"
            class="group relative overflow-hidden rounded-[20px] bg-white/70 shadow-sm ring-1 ring-primary/10 transition hover:-translate-y-0.5 hover:shadow-sm"
            @click="onClickRegion(r)"
          >
            <!-- placeholder image -->
            <div
              class="h-[110px] w-full"
              style="
                background-image: linear-gradient(
                  45deg,
                  rgba(47,61,77,0.08) 25%,
                  transparent 25%,
                  transparent 50%,
                  rgba(47,61,77,0.08) 50%,
                  rgba(47,61,77,0.08) 75%,
                  transparent 75%,
                  transparent
                );
                background-size: 18px 18px;
              "
            />
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-xl font-black text-primary drop-shadow-sm">{{ r.label }}</span>
            </div>
          </button>
        </div>
      </section>

      <!-- 熱門飯店（第一排） -->
      <section class="mt-20">
        <h2 class="mb-5 text-lg font-black">熱門飯店</h2>

        <div class="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          <article
            v-for="h in hotHotelsA"
            :key="h.id"
            class="group relative overflow-visible"
          >
            <!-- 卡片本體 -->
            <div class="overflow-hidden rounded-[20px] bg-white/70 shadow-sm border border-gray-300">
              <!-- 圖片區 -->
              <div
                class="h-[240px] bg-cover bg-center"
                :style="h.imageUrl
                  ? { backgroundImage: `url(${h.imageUrl})` }
                  : {
                      backgroundImage: `linear-gradient(
                        45deg,
                        rgba(47,61,77,0.08) 25%,
                        transparent 25%,
                        transparent 50%,
                        rgba(47,61,77,0.08) 50%,
                        rgba(47,61,77,0.08) 75%,
                        transparent 75%,
                        transparent
                      )`,
                      backgroundSize: '18px 18px'
                    }"
              />
            </div>

            <!-- Hover 浮層：不佔位、不推擠 -->
            <div
              class="
                pointer-events-none absolute top-3 left-full z-20 ml-3 w-[180px]
                opacity-0 translate-x-1 transition
                group-hover:opacity-100 group-hover:translate-x-0
              "
            >
              <div class="rounded-2xl bg-white/95 border border-gray-200 shadow-lg p-3">
                <p class="line-clamp-1 text-sm font-bold text-primary">
                  {{ h.name }}
                </p>
                <p class="mt-1 text-xs text-primary/60">
                  {{ h.city }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>


      <!-- 熱門飯店（第二排） -->
      <section class="mt-20">
        <h2 class="mb-5 text-lg font-black">熱門飯店</h2>

        <div class="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          <article
            v-for="h in hotHotelsB"
            :key="h.id"
            class="overflow-hidden rounded-[20px] bg-white/70 shadow-sm border border-gray-300"
          >
            <div
              class="h-[240px]"
              style="
                background-image: linear-gradient(
                  45deg,
                  rgba(47,61,77,0.08) 25%,
                  transparent 25%,
                  transparent 50%,
                  rgba(47,61,77,0.08) 50%,
                  rgba(47,61,77,0.08) 75%,
                  transparent 75%,
                  transparent
                );
                background-size: 18px 18px;
              "
            />
            <!-- <div class="p-[20px]">
              <p class="line-clamp-1 text-sm font-bold text-primary">{{ h.name }}</p>
              <p class="mt-1 text-xs text-primary/60">{{ h.city }}</p>
            </div> -->
          </article>
        </div>
      </section>

      <!-- 關鍵字 -->
      <section class="my-10">
        <div
          class="rounded-[20px] bg-white/75 p-5 text-center shadow-sm border border-gray-300"
        >
          <p class="text-2xl font-bold">大家都在找...</p>
          <p class="mt-4 text-sm font-semibold text-primary/75">台北住宿 新北住宿 宜蘭包棟...</p>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const activeTab = ref("stay");

const form = reactive({
  destination: "",
  dateRange: "",
  people: "",
});

const regions = [
  { key: "north", label: "北部" },
  { key: "central", label: "中部" },
  { key: "south", label: "南部" },
  { key: "east", label: "東部" },
  { key: "islands", label: "離島" },
];

// const hotHotelsA = [
//   { id: "a1", name: "Hotel A", city: "台北" },
//   { id: "a2", name: "Hotel B", city: "新北" },
//   { id: "a3", name: "Hotel C", city: "台中" },
//   { id: "a4", name: "Hotel D", city: "台南" },
//   { id: "a5", name: "Hotel E", city: "高雄" },
//   { id: "a6", name: "Hotel F", city: "花蓮" },
// ];

// const hotHotelsB = [
//   { id: "b1", name: "Hotel G", city: "宜蘭" },
//   { id: "b2", name: "Hotel H", city: "苗栗" },
//   { id: "b3", name: "Hotel I", city: "南投" },
//   { id: "b4", name: "Hotel J", city: "嘉義" },
//   { id: "b5", name: "Hotel K", city: "屏東" },
//   { id: "b6", name: "Hotel L", city: "台東" },
// ];

function onSearch() {
  console.log("[Home Search]", { tab: activeTab.value, ...form });
}

function onClickRegion(region: { key: string }) {
  console.log(region.key);
}

const hotHotelsA = [
  {
    id: 1,
    name: "台北君悅酒店",
    city: "台北市",
    imageUrl: "https://picsum.photos/600/400?random=1",
  },
  {
    id: 2,
    name: "晶華酒店",
    city: "台北市",
    imageUrl: "https://picsum.photos/600/400?random=2",
  },
  {
    id: 3,
    name: "日月潭涵碧樓",
    city: "南投縣",
    imageUrl: "https://picsum.photos/600/400?random=3",
  },
]
</script>
