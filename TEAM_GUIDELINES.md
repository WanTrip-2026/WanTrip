# 1️⃣ 檔案與命名規範

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
| 主色   | #6D8FA3 |
| 輔色   | #E4E4E4 |
| 點綴色 | #93ACAA |

檔案：”tailwind.config.js” 設定顏色/字型....
後續 Tailwind 使用舉例：bg-primary

# 3️⃣ Issue、Pr 命名規則

| type     | 說明     |
| -------- | -------- |
| feat     | 新功能   |
| bug      | 錯誤回報 |
| task     | 任務     |
| refactor | 重構     |
| docs     | 文件     |

    * type: 描述
    * 舉例：feat: 首頁切版

# 4️⃣ 分支命名規則

    * 舉例：feat/login-api (英文)

# 5️⃣ Commit 訊息格式

| type     | 說明                       |
| -------- | -------------------------- |
| feat     | 新增飯店搜尋元件           |
| fix      | 修正 Navbar 在小螢幕的排版 |
| style    | 調整按鈕樣式               |
| refactor | 重構 HotelCard 組件        |
| chore    | 更新依賴套件               |

    * type: 中文描述
    * 一行完成，不加句號
    * 舉例：feat: 功能名稱、 fix: 問題描述

# 6️⃣ GitHub 規範

- 平時作業流程
  1. 開票：建立issue -> 3️⃣ Issue、Pr 命名規則
  2. 接票者：更改assignee，在issue上新增分支-> 4️⃣ 分支命名規則
  3. 在新分支進行作業

- PR流程
  - issue 作業完成
    1. `git add 檔案`
    2. `git commit -m"commit訊息"`
    3. `git fetch origin`
    - 如果需要最新的dev進度 切到dev分支下 `git pull`(同步遠端dev)
    - 切回自己的分支
    4. `git rebase origin/dev`
    5. `git push origin 分支名 --force-with-lease` (當下分支名稱,不用斜線)
    6. 提交PR >通知大家

  - 提交PR填寫 -> 3️⃣ Issue、Pr 命名規則

  - 審核PR
    最後同意的人：rebase&merge，issue即自動關閉
    - 審核中發生衝突，請在群組通知，並由”PR 提交者“解決，解決後可以直接合併
    - 若用vscode查看code，可先暫停當下作業commit/stash 當下任務，才能切換分支
      (commit:WIP on branch)

  - 審核中做修改，切回要修改的分支，修改code完成後，
    1. `git commit -m"commit訊息"`
    2. `git fetch origin`
    3. `git rebase origin/dev` (視狀況)
    4. `git push origin 分支名 --force-with-lease`

  - 關票後，負責人需更新自己的git graph
    1. `git fetch --prune` 更新GitHub上已經刪除的遠端分支
    2. `git switch dev` 切回主線抓取進度
    3. `git pull`
    4. `git branch -d 分支名` 刪掉本機已完成的分支

  - 在自己的分支想要接到某個分支的最新 commit 之後 (吃到某個分支最新進度) 的方法
    1. 如果有新的修改，先 commit：
       `git commit -m "訊息"`
    2. 抓取遠端最新狀態：
       `git fetch origin`
    3. 將自己的分支接到目標分支（例如 dev）的最新 commit：
       `git rebase origin/dev`
       - 若出現衝突，解決後 `git rebase --continue`
    4. 推回遠端分支（同步重寫的歷史）：
       `git push origin <你的分支> --force-with-lease`

# 7️⃣ git 常用指令

- `git init` 開始追蹤專案
- `git status` 查看檔案目前在哪個狀態
- `git add 檔案名稱` 將檔案加入「暫存區」
- `git add .` 全部檔案加入暫存區
- `git rm --cached 檔案名稱` 將檔案移除「暫存區」
- `git commit -m"文字說明"`「暫存區」拍照

- `git stash ` 暫存該分支進度 可多個
- `git stash pop ` 取出“上個”暫存進度
- `git checkout 分支名稱` 切換到不同的分支。
- `git merge 分支名稱` 合併分支。
- `git rebase 分支名稱` 合併分支=>接到某分支後面

- `git cherrypick` 允許將單一或多個特定提交(commit) 從一個分支複製並應用到當前分支

# 補充說明

    若無法確定命名方式，請優先與組員討論
    規範目的為降低溝通成本，非限制創意
    規範可依團隊需求調整
