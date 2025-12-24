<script setup></script>
<template>
  <main class="w-full bg-page pt-24">
    <section class="max-w-[1200px] mx-auto flex flex-col gap-5">
      <div class="w-full p-5 bg-white flex flex-col flex-nowrap items-center gap-10 rounded-[20px]">
        <h3 class="text-[40px] font-bold text-black">付款完成</h3>
        <div class="flex flex-col flex-nowrap gap-5 text-base">
          <p>訂單編號：202512310936001</p>
          <p>飯店/票券名稱：高雄洲際酒店</p>
          <p class="text-red-600">金額：NT 50,000</p>
          <p>訂單建立日期：12/31 09:36</p>
        </div>
      </div>
      <div
        class="w-full bg-page p-5 mb-5 flex flex-col flex-nowrap items-center gap-10 rounded-[20px]"
      >
        <h3 class="text-[30px] font-bold text-center">
          搭乘大眾運輸交通資訊<br />請參考以下資訊：
        </h3>
        <div class="flex justify-around gap-5">
          <a
            class="bg-white h-[250px] flex-1 w-full rounded-[20px]"
            href="https://www.thsrc.com.tw/"
          >
            <img
              class="object-cover w-full h-full"
              src="../assets/traffic_photo/高鐵logo.svg"
              alt="高鐵官方logo"
            />
          </a>
          <a
            class="bg-white flex-1 w-full h-[250px] rounded-[20px]"
            href="https://www.railway.gov.tw/tra-tip-web/tip"
          >
            <img
              class="h-full object-contain w-full"
              src="../assets/traffic_photo/台鐵logo.png"
              alt="台鐵官方logo"
            />
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
