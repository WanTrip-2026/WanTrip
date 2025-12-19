<script setup>
import Navbar from '../components/layout/Navbar.vue'
// import Footer from '../components/layout/Footer.vue'
// import { RouterLink } from 'vue-router'
</script>

<template>
  <Navbar class="relative top-0" />
  <main class="max-w-[1200px] mx-auto">
    <!-- search-bar -->
    <section
      class="max-w-[800px] h-[80px] p-2.5 mt-10 mb-10 mx-auto bg-slate-400 rounded-full flex flex-row items-center gap-5 sticky"
    >
      <div class="h-full w-full">
        <label class="rounded-full"></label>
        <input
          type="text"
          placeholder="目的地"
          class="h-full w-full border text-center border-gray-300 rounded-full focus:ring-primary focus:border-primary outline-none"
        />
      </div>
      <div class="h-full w-full">
        <label class="text-gray-500 rounded-full"></label>
        <input
          type="text"
          placeholder="入住及退房日期"
          class="h-full w-full border text-center border-gray-300 rounded-full focus:ring-primary focus:border-primary outline-none"
        />
      </div>
      <div class="h-full w-full">
        <label class="text-gray-500 rounded-full"></label>
        <input
          type="text"
          placeholder="房間及房客"
          class="h-full w-full border text-center border-gray-300 rounded-full focus:ring-primary focus:border-primary outline-none"
        />
      </div>
      <div class="text-gray-500 rounded-full h-full">
        <button
          class="h-full bg-primary hover:bg-#6D8FA3 text-white font-bold py-15px px-[30px] rounded-full transition-colors text-nowrap"
        >
          搜尋
        </button>
      </div>
    </section>
    <!-- result-list -->
    <section></section>
  </main>
</template>

<style></style>
