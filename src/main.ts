import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { supabase } from "@/utils/supabaseClient"; // ✅ 確保這行存在

const app = createApp(App);

app.use(createPinia());
app.use(router);

// ✅ 測試用（先留著）
supabase.auth.getSession().then(({ data, error }) => {
  console.log("[Supabase test] session:", data.session);
  console.log("[Supabase test] error:", error);
});

app.mount("#app");

