## 1️⃣ 檔案與命名規範

| 類型        | 命名方式         | 範例                          |
| ----------- | ---------------- | ----------------------------- |
| Vue 組件    | PascalCase       | `Navbar.vue`, `HotelCard.vue` |
| 變數 / 函式 | camelCase        | `userName`, `fetchHotels()`   |
| 常數        | UPPER_SNAKE_CASE | `API_BASE_URL`                |
| HTML / CSS  | kebab-case       | `hotel-card`                  |

# 2️⃣ 專案主題色

| 用途   | 色碼    |
| ------ | ------- |
| 主色   | #2F3D4D |
| 輔色   | #6D8FA3 |
| 點綴色 | #93ACAA |

檔案：”tailwind.config.js” 設定顏色/字型....
後續 Tailwind 使用舉例：bg-primary

# 3️⃣ Commit 訊息格式

| type     | 說明                       |
| -------- | -------------------------- |
| feat     | 新增飯店搜尋元件           |
| fix      | 修正 Navbar 在小螢幕的排版 |
| style    | 調整按鈕樣式               |
| refactor | 重構 HotelCard 組件        |
| chore    | 更新依賴套件               |
