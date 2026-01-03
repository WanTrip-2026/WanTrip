<template>
  <main class="min-h-screen text-primary max-w-[1240px] mx-auto pt-24 pb-10">
    <div class="mx-5">

      <section class="bg-white rounded-[20px] shadow-sm border border-gray-300 p-5 lg:p-10 mb-10">
        <div class="flex flex-col md:flex-row justify-between items-start gap-8">
          <div class="flex flex-col sm:flex-row gap-6 items-center text-center sm:text-left">
            <div class="h-24 md:h-32 rounded-[20px] bg-gray-100 checker shrink-0"></div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold mb-2">飯店名稱</h1>
              <p class="text-dark_700 text-sm">000 台北市中山區南京西路???號</p>
              <p class="text-dark_700 text-sm">(02)XXXX-XXXX</p>
              <div class="mt-4">
                <span class="text-xs md:text-sm font-bold">總價</span>
                <span class="text-xl md:text-2xl font-black ml-2 text-dark">NT$ 6,000</span>
              </div>
            </div>
          </div>
          <div
            class="w-full md:w-auto text-left md:text-right text-xs md:shadow-sm text-dark_700 space-y-1 border-t md:border-t-0 pt-4 md:pt-0">
            <p>訂單編號 <span class="text-dark_900 font-mono">2025123100001</span></p>
            <p>訂單日期 <span class="text-dark_900 font-mono">2025年12月28日</span></p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-[40px] mt-[40px]">
          <div class="rounded-[20px] border border-gray-300 p-5 md:p-6">
            <p class="text-xs font-bold text-secondary mb-2">入住</p>
            <p class="text-lg md:text-xl font-bold">2025年12月28日</p>
          </div>
          <div class="rounded-[20px] border border-gray-300 p-5 md:p-6">
            <p class="text-xs font-bold text-secondary mb-2">退房</p>
            <p class="text-lg md:text-xl font-bold">2025年12月29日</p>
          </div>
          <div class="rounded-[20px] bg-main_100 p-5 md:p-6 sm:col-span-2 md:col-span-1">
            <p class="text-xs font-bold text-secondary mb-2">總共</p>
            <p class="text-lg md:text-xl font-bold">1 房 1 晚</p>
          </div>
        </div>
      </section>

      <div
        class="grid grid-cols-1 lg:grid-cols-3 gap-5 p-5 lg:p-10 bg-white border border-gray-300 rounded-[20px] shadow-sm">

        <div class="lg:col-span-2 space-y-10 md:space-y-14">
          <section>
            <h2 class="text-lg md:text-xl font-black mb-10">訂購人資訊</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <div class="space-y-1">
                <p class="text-dark_700 text-xs uppercase">姓名</p>
                <p class="font-bold text-base">NAME</p>
              </div>
              <div class="space-y-1">
                <p class="text-dark_700 text-xs uppercase">電子郵件</p>
                <p class="font-bold text-base break-all">@email.com</p>
              </div>
              <div class="space-y-1">
                <p class="text-dark_700 text-xs uppercase">房型</p>
                <p class="font-bold text-base">雅緻大床房</p>
              </div>
              <div class="space-y-1">
                <p class="text-dark_700 text-xs uppercase">入住人數/房</p>
                <p class="font-bold text-base">2人/房，每房最多入住2人</p>
              </div>
              <div class="sm:col-span-2 space-y-1">
                <p class="text-dark_700 text-xs uppercase">餐點</p>
                <p class="font-bold text-base">早餐，早餐時段6:00~9:30</p>
              </div>
            </div>
          </section>

          <section>
            <div
              class="w-full aspect-video rounded-[20px] bg-page flex items-center justify-center border border-gray-300 overflow-hidden">
              <span class="text-accent font-bold text-sm md:text-xl uppercase tracking-widest">google map</span>
              <!-- 之後google map -->
            </div>
          </section>
        </div>

        <div class="space-y-5">
          <section class="rounded-[20px] border border-gray-300 p-5">
            <h3 class="font-bold mb-4 text-dark">房間設施</h3>
            <p class="text-sm leading-relaxed text-dark_700">
              牙刷、牙膏、洗手乳、沐浴乳、洗髮乳、冷氣、暖氣、浴缸、乾濕分離浴室、香皂、浴帽、梳子、毛巾、浴巾、拋棄式拖鞋、吹風機、冰箱、水、茶包、濾掛式咖啡、杯子、無線網路、有線網路插槽、110V插座、USB插座、Netflix、Disney+
            </p>
          </section>

          <section class="rounded-[20px] bg-main_100 p-5">
            <h3 class="font-bold mb-4 text-dark">住宿付費提供</h3>
            <p class="text-sm text-dark_700">
              洗衣機、冰箱內飲料(瓶裝水免費)
            </p>
          </section>

          <section class="rounded-[20px] border border-gray-300 p-5 bg-white shadow-sm">
            <div class="flex items-center gap-5 mb-8">
              <img src="../assets/logoIcon.svg" alt="WanTrip Logo" class="w-20 h-20" />
              <div>
                <h3 class="font-bold text-xl text-dark tracking-wide">交通訂票</h3>
                <p class="text-xs text-dark_700 uppercase tracking-tighter">Quick Booking</p>
              </div>
            </div>

            <div class="space-y-3">
              <a href="https://irs.thsrc.com.tw/IMINT/" target="_blank" rel="noopener noreferrer"
                class="group flex items-center justify-between p-4 rounded-xl border border-primary/5 bg-main_100 hover:bg-white hover:border-secondary/50 hover:shadow-md transition-all duration-300">
                <div class="flex items-center gap-4">
                  <span class="text-2xl group-hover:scale-110 transition-transform">🚄</span>
                  <div>
                    <p class="font-semibold text-primary/80">台灣高鐵 THSRC</p>
                    <p class="text-xs text-primary/40">Online Booking</p>
                  </div>
                </div>
                <span
                  class="text-primary/30 group-hover:text-secondary group-hover:translate-x-1 transition-all">→</span>
              </a>

              <a href="https://www.railway.gov.tw/tra-tip-web/tip/tip001/tip121/query" target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center justify-between p-4 rounded-xl border border-primary/5 bg-main_100 hover:bg-white hover:border-secondary/50 hover:shadow-md transition-all duration-300">
                <div class="flex items-center gap-4">
                  <span class="text-2xl group-hover:scale-110 transition-transform">🚇</span>
                  <div>
                    <p class="font-semibold text-primary/80">台灣鐵路 TRA</p>
                    <p class="text-xs text-primary/40">Online Booking</p>
                  </div>
                </div>
                <span
                  class="text-primary/30 group-hover:text-secondary group-hover:translate-x-1 transition-all">→</span>
              </a>
            </div>
          </section>
        </div>
      </div>

      <div class="mt-[60px] flex flex-col sm:flex-row justify-center gap-4">
        <button
          class="w-full sm:w-auto bg-primary text-white px-12 py-3 rounded-full font-bold hover:bg-main transition-all active:scale-95 shadow-lg">
          回到訂單列表
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* 這裡的 checker 顏色也統一使用 primary 的透明度 */
.checker {
  background-image:
    linear-gradient(45deg, rgba(47, 61, 77, 0.05) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(47, 61, 77, 0.05) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(47, 61, 77, 0.05) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(47, 61, 77, 0.05) 75%);
  background-size: 20px 20px;
}
</style>
