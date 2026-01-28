# WanTrip - 全方位旅遊預訂平台
![](https://res.cloudinary.com/wantrip/image/upload/v1769395567/meta_img_p0n4p6.png)
WanTrip 是一個現代化的旅遊預訂平台，專為提供流暢的飯店住宿與景點門票預訂體驗而設計。  
本專案採用前後端分離架構，前端使用 Vue 3 生態系，後端則基於 Node.js 與 Supabase 構建。

---

## 技術堆疊 (Tech Stack)

### 前端 (Frontend)

- **核心框架**: [Vue 3](https://vuejs.org/)
- **狀態管理**: [Pinia](https://pinia.vuejs.org/)
- **路由管理**: [Vue Router](https://router.vuejs.org/)
- **樣式設計**: [Tailwind CSS](https://tailwindcss.com/)
- **API 請求**: [Axios](https://axios-http.com/)
- **日期處理**: [date-fns](https://date-fns.org/) / [VueDatePicker](https://vue3datepicker.com/)
- **打包工具**: [Vite](https://vitejs.dev/)

### 後端 (Backend) 

- **運行環境**: [Node.js](https://nodejs.org/)
- **框架**: [Express.js](https://expressjs.com/)
- **語言**: [TypeScript](https://www.typescriptlang.org/)
- **資料庫**: [Supabase](https://supabase.com/) (PostgreSQL)
- **支付串接**:
  - GreenWorld (ECPay / 綠界科技): 信用卡、ATM、超商代碼
  - Line Pay

---

## 專案結構 (Project Structure)

### WanTrip (前端)

```
WanTrip/
├── src/
│   ├── assets/         # 靜態資源 (圖片、SVG)
│   ├── components/     # 共用元件 (Navbar, Footer, Search Bar, Cards)
│   ├── services/       # API 服務封裝 (orderApi.ts)
│   ├── stores/         # Pinia 狀態管理 (auth.ts, compareStore.ts, favoriteStore.ts, orderStore.ts)
│   ├── views/          # 頁面元件
│   │   ├── hotel/      # 飯店搜尋與詳情
│   │   ├── order/     # 結帳與訂單確認
│   │   ├── ticket/     # 景點門票與詳情
│   │   ├── travel-dna/ # 旅遊測驗
│   │   ├── user/       # 會員中心 (登入、註冊、個人資料)
│   ├── App.vue         # 根元件
│   └── fontawesome     # 圖示資源設定檔
├── index.html          # 入口 HTML
└── tailwind.config.js  # Tailwind 設定
```

### WanTrip-Backend (後端)

```
WanTrip-Backend/
├── src/
│   ├── middlewares/    # 中間件 (權限驗證 requireAdmin, Supabase 驗證)
│   ├── routes/         # API 路由模組化
│   │   ├── auth/       # 身份驗證相關介面
│   │   ├── hotels.ts   # 飯店核心功能
│   │   ├── hotelRooms.ts / hotelTypes.ts # 房型與房間管理
│   │   ├── hotelFeatured.ts / hotelRecommended.ts # 精選與推薦飯店
│   │   ├── hotelNearby.ts / hotelImages.ts # 周邊搜尋與圖片管理
│   │   ├── orders.ts   # 訂單處理
│   │   ├── payment.ts  # 支付流程
│   │   ├── tickets.ts  # 景點門票 API
│   │   └── users.ts    # 用戶資料管理
│   ├── services/       # 核心業務邏輯與第三方整合
│   │   ├── ECPayService.ts   # 綠界支付金流處理
│   │   ├── LinePayService.ts # Line Pay 金流處理
│   │   ├── supabase.ts       # Supabase 客戶端實例
│   │   └── supabaseAdmin.ts  # 管理員權限特定操作
│   ├── index.ts        # 伺服器入口點 (Server Entry)
├── .env                # 環境變數設定
├── .env.example        # 環境變數範例配置
├── package.json        # 專案依賴管理
└── tsconfig.json       # TypeScript 編譯設定
```

---

## 主要功能 (Key Features)

### 1. 會員系統 (Member System)

- **註冊與登入**: 支援 Email/Password 登入，並整合 Google 第三方快速登入。
- **個人資料管理**: 使用者可編輯個人資訊。
- **歷史訂單**: 完整記錄過往所有飯店與票券的訂單詳情。
- **個人化收藏**: 用戶可將心儀的飯店與票券加入收藏清單，方便隨時查看。

### 2. 飯店預訂 (Hotel Booking)

- **搜尋功能**: 依據目的地、日期搜尋飯店。
- **地圖找房**: 透過列表即時連動的互動式地圖，提供視覺化且精準的直覺找房體驗。
- **飯店詳情**: 完整呈現飯店圖片、設施、房型選擇與價格試算。

### 3. 票券購買 (Ticket Booking)

- **多樣化票種**: 支援單一景點多種票券方案 (如：全票、優待票)。
- **數量調整**: 在詳情頁直接調整各票種數量，即時試算總價。
- **地區篩選**: 可直接選擇特定地區縮小範圍，快速精準篩選票券。

### 4. 結帳 (Payment)

- **多元支付**: 整合綠界科技 (ECPay) 與 Line Pay。
- **訂單建立**: 結帳成功後自動寫入資料庫，並連結會員帳戶。

---

## 專案展示與執行 (Demo & Installation)

### 線上體驗

- [點此進入 WanTrip 官方網站](https://wantrip.store)

### 本地開發環境設置

#### 環境需求

- **Node.js**
- **Package Manager**: `npm` 或 `yarn`

#### 複製專案

1. Clone 或下載此專案
2. 安裝依賴套件：`npm install`

#### 後端環境設定 (WanTrip-Backend)

```bash
# 進入後端目錄
cd WanTrip-Backend

# 安裝依賴
npm install

# 環境變數設定：請參考 .env.example 建立 .env 檔案
# 需包含 Supabase URL/KEY、ECPay/LinePay 商戶金鑰

# 啟動開發伺服器
npm run dev
```

#### 前端環境設定 (WanTrip)

```bash
# 切換至前端目錄
cd ../WanTrip

# 安裝依賴
npm install

# 啟動前端專案
npm run dev
```

---

## 專案亮點 (Key Highlights)

- **飯店比較系統**：透過一鍵對比與關鍵資訊（價格、設施、評價）視覺化並排，大幅縮短決策路徑，提供高效率的直覺選取體驗。
- **高效地圖渲染**：針對地圖找房功能，優化了大量標記（Markers）的聚合算法，即便在多筆房源資料下也能維持 60 FPS 的流暢操作。
- **支付安全性**：金流接軌採非同步 Webhook 驗證，並結合 Server-side 驗證機制，防止客戶端惡意篡改訂單金額。
- **響應式設計 (RWD)**：全站針對手機、平板及桌機進行深度適配，確保使用者在各種裝置下皆有極佳的預訂體驗。

---

## 資料庫架構 (Database Schema)

本專案使用 Supabase 構建，核心包含以下資料表：

- `users`: 存放使用者基本資訊與權限。
- `hotels` & `hotel_rooms`: 飯店與房型的一對多關聯，支援即時庫存控管。
- `attractions` & `tickets`: 景點與票種資料關聯。
- `orders`: 整合飯店與票券的異質訂單系統，支援多樣化支付狀態。

---

## 開發規範 (Dev Standards)

- **型別安全**: 全站採用 **TypeScript** 開發，確保前後端 API 資料傳遞的準確性。
- **代碼風格**: 遵循 **ESLint**，維持高品質代碼規範。
- **元件化開發**: 抽離近多個高複用性 UI 元件，加速後續功能擴充。

---

## 團隊成員 (Contributors)

| 成員名稱                                        | 負責內容                                                                                                                                   |
| :---------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| [**陳仟龍**](https://github.com/chenchienlung/) | • UI 設計<br>• 導覽列 & 頁尾切版<br>• 比較頁面切版<br>• 票券詳情切版<br>• 金流串接<br>• 收藏功能<br>• 票券資料庫                           |
| [**彭奕翔**](https://github.com/andypeng1416)   | • UI 設計初版<br>• 首頁切版<br>• 飯店首頁切版<br>• 會員系統開發<br>• 會員 API<br>• 會員中心資料抓取                                        |
| [**莊珈毓**](https://github.com/B616G)          | • 飯店詳情切版<br>• 旅遊 DNA 切版及功能開發<br>• 地圖找房切版及功能開發<br>• 搜尋功能<br>• 後端環境建構<br>• 飯店列表及詳情前後端 API 串接 |
| [**顏文琳**](https://github.com/yencarol)       | • 篩選功能<br>• 資料庫建置<br>• 訂單產出<br>• 搜尋結果頁面切版<br>• 訂購成功頁面<br>• 會員中心切版<br>• 常見問題切版                       |
