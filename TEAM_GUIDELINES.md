## 1️⃣ 檔案與命名規範

🌟待確認"變數與函式命名"

| 類型        | 命名方式         | 範例                          |
| ----------- | ---------------- | ----------------------------- |
| Vue 組件    | PascalCase       | `Navbar.vue`, `HotelCard.vue` |
| 變數 / 函式 | PascalCase       | `UserName`, `FetchHotels()`   |
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
| feature  | 新增飯店搜尋元件           |
| fix      | 修正 Navbar 在小螢幕的排版 |
| style    | 調整按鈕樣式               |
| refactor | 重構 HotelCard 組件        |
| chore    | 更新依賴套件               |

    * type/中文描述
    * 一行完成，不加句號
    * 舉例：feature/功能名稱、 fix/問題描述

# 4️⃣ GitHub 規範

- 平時作業流程
  - 開票：建立issue -> 5️⃣Issue命名規則
  - 接票者：更改assignee，在issue上新增分支: 大家都看得懂的英文 (不能#)
  - 在新分支進行作業

- PR流程
  - issue 作業完成
    `git add 檔案`
    `git commit -m"commit訊息"`
    `git fetch origin`
    `git rebase origin/dev`
    `git push origin "#12" --force` (當下分支名稱,不用斜線)
    提交PR >通知大家

  - 提交PR填寫
    情況1.完成：Close Issue/4
    描述：做了什麼，附上圖片
    情況2.更新：做了什麼
    描述

  - 審核PR
    最後同意的人：rebase&merge，issue即自動關閉
    - 審核中發生衝突，請在群組通知，並由”PR 提交者“解決，解決後可以直接合併
    - 若用vscode查看code，可先暫停當下作業commit/stash 當下任務，才能切換分支
      (commit:WIP on branch)

# 5️⃣ Issue命名規則

| type     | 說明     |
| -------- | -------- |
| feature  | 新功能   |
| bug      | 錯誤回報 |
| task     | 任務     |
| refactor | 重構     |
| docs     | 文件     |

# 6️⃣ git 常用指令

`git init` 開始追蹤專案
`git status` 查看檔案目前在哪個狀態
`git add 檔案名稱` 將檔案加入「暫存區」
`git add .` 全部檔案加入暫存區
`git rm --cached 檔案名稱` 將檔案移除「暫存區」
`git commit -m”文字說明"`「暫存區」拍照

`git stash ` 暫存該分支進度 可多個
`git stash pop ` 取出“上個”暫存進度
`git checkout 分支名稱` 切換到不同的分支。
`git merge 分支名稱` 合併分支。
`git rebase 分支名稱` 合併分支=>接到某分支後面

`git cherrypick` 允許將單一或多個特定提交(commit) 從一個分支複製並應用到當前分支

# 7️⃣ 補充說明

    若無法確定命名方式，請優先與組員討論
    規範目的為降低溝通成本，非限制創意
    規範可依團隊需求調整
