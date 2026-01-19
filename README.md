# WanTrip - 全方位旅遊預訂平台

WanTrip 是一個現代化的旅遊預訂平台，專為提供流暢的飯店住宿與景點門票預訂體驗而設計。本專案採用前後端分離架構，前端使用 Vue 3 生態系，後端則基於 Node.js 與 Supabase 構建。

---

## 🛠 技術堆疊 (Tech Stack)

### 前端 (Frontend) - `WanTrip/`

- **核心框架**: [Vue 3](https://vuejs.org/) (Composition API, Script Setup)
- **狀態管理**: [Pinia](https://pinia.vuejs.org/)
- **路由管理**: [Vue Router](https://router.vuejs.org/)
- **樣式設計**: [Tailwind CSS](https://tailwindcss.com/)
- **API 請求**: [Axios](https://axios-http.com/)
- **日期處理**: [date-fns](https://date-fns.org/) / [V-Calendar](https://vcalendar.io/)
- **打包工具**: [Vite](https://vitejs.dev/)

### 後端 (Backend) - `WanTrip-Backend/`

- **運行環境**: [Node.js](https://nodejs.org/)
- **框架**: [Express.js](https://expressjs.com/)
- **語言**: [TypeScript](https://www.typescriptlang.org/)
- **資料庫**: [Supabase](https://supabase.com/) (PostgreSQL)
- **支付串接**:
  - GreenWorld (ECPay / 綠界科技): 信用卡、ATM、超商代碼
  - Line Pay

---

## 📂 專案結構 (Project Structure)

### WanTrip (前端)

```
WanTrip/
├── src/
│   ├── assets/         # 靜態資源 (圖片、SVG)
│   ├── components/     # 共用元件 (Header, Footer, Cards)
│   ├── services/       # API 服務封裝 (api.ts, orderApi.ts)
│   ├── stores/         # Pinia 狀態管理 (auth.ts, orderStore.ts)
│   ├── views/          # 頁面元件
│   │   ├── home/       # 首頁
│   │   ├── hotel/      # 飯店搜尋與詳情
│   │   ├── ticket/     # 景點門票與詳情
│   │   ├── order/      # 結帳與訂單確認
│   │   ├── user/       # 會員中心 (登入、註冊、個人資料)
│   └── App.vue         # 根元件
├── index.html          # 入口 HTML
└── tailwind.config.js  # Tailwind 設定
```

### WanTrip-Backend (後端)

```
WanTrip-Backend/
├── src/
│   ├── routes/         # API 路由 (auth, hotels, orders, payment)
│   ├── utils/          # 工具函式 (Supabase client)
│   ├── index.ts        # 伺服器入口
├── .env                # 環境變數 (需自行設定)
```

---

## ✨ 主要功能 (Key Features)

### 1. 會員系統 (Member System)

- **註冊與登入**: 支援 Email/Password 登入。
- **個人資料管理**: 使用者可編輯個人資訊。
- **歷史訂單**: 查看過往的飯店與票券訂單詳情。

### 2. 飯店預訂 (Hotel Booking)

- **搜尋功能**: 依據目的地、日期搜尋飯店。
- **飯店詳情**: 查看飯店圖片、設施、房型與價格。
- **房型選擇**: 選擇不同房型進行預訂。

### 3. 景點票券 (Attraction Tickets) - **核心特色**

- **多樣化票種**: 支援單一景點多種票券方案 (如：全票、優待票)。
- **數量調整**: 在詳情頁直接調整各票種數量，即時試算總價。
- **最低價顯示**: 列表頁自動顯示該景點所有票種中的最低價格（起價）。
- **單日使用**: 票券訂單自動設定開始與結束日期為同一天（需配合資料庫設定）。

### 4. 購物車與結帳 (Checkout & Payment)

- **整合結帳頁**: 統一的結帳介面，依據商品類型 (飯店/票券) 自動調整顯示資訊。
- **多元支付**: 整合綠界科技 (ECPay) 與 Line Pay。
- **訂單建立**: 結帳成功後自動寫入資料庫，並連結會員帳戶。

---

## ⚙️ 資料庫設定 (Database Setup)

**重要：** 為了支援「景點票券」功能，**必須** 對 Supabase 資料庫執行以下 SQL 指令：

```sql
-- 1. 設定 hotel_id 為可選 (Nullable)
-- 说明：景點訂單沒有 hotel_id，因此必須解除 Not Null 限制
ALTER TABLE orders ALTER COLUMN hotel_id DROP NOT NULL;

-- 2. 新增 attraction_id 欄位
-- 说明：用於關聯景點資料表
ALTER TABLE orders ADD COLUMN attraction_id BIGINT REFERENCES attractions(id);

-- 3. 移除日期範圍限制 (Constraints)
-- 说明：資料庫預設可能有 check_out > check_in 的限制。
-- 由於票券是單日使用 (Start = End)，必須移除此限制以避免訂單建立失敗。
ALTER TABLE orders DROP CONSTRAINT orders_date_range_check;
```

---

## 🚀 安裝與執行 (Installation)

### 環境需求

- Node.js (v16+)
- npm 或 yarn

### 1. 啟動後端

```bash
cd WanTrip-Backend
npm install
npm run dev
# 伺服器預設運行於 http://localhost:3000
```

### 2. 啟動前端

```bash
cd WanTrip
npm install
npm run dev
# 網站預設運行於 http://localhost:5173
```

### 3. 環境變數設定

請確保後端目錄下的 `.env` 檔案包含有效的 Supabase 連線資訊與支付金鑰。

---

## 📝 開發者筆記

- **訂單資料結構**: 目前 `orders` 資料表共用 `hotel_id` (舊有) 與 `attraction_id` (新增) 來區分訂單類型。前端 `OrderData` type 已更新以支援這兩種格式。
- **錯誤處理**: 結帳頁面 (`OrderCheckOut.vue`) 已包含錯誤訊息顯示區塊，若訂單建立失敗，會顯示詳細的後端錯誤訊息以便除錯。
