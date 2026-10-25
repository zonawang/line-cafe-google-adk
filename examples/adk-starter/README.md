# Day 2：最小 TypeScript ADK agent

對照 [官方 TypeScript Quickstart](https://adk.dev/get-started/typescript/)。此起點只定義一個 LlmAgent，尚未接工具、graph、Firestore 或 LINE。模型呼叫需要自己的 Gemini API key 與可用配額。

## 安裝與執行

於 repo 根目錄執行：

```bash
node --version
npm --version
cd examples/adk-starter
npm install
cp .env.example .env
```

官方 Quickstart 在 2026-10-24 列出 Node ≥24.13.0、npm ≥11.8.0。舊 Bot 的 Node 20 環境需要另外確認。`@google/adk` 與 devtools 固定為 2.3.0，第一次安裝後保存 lockfile，記下實際版本。Zod 用於 Day 3～4 的工具參數。

還沒有 key 時，先到 [Google AI Studio](https://aistudio.google.com/apikey) 登入，點選 Create API key 並選擇練習用的專案；如果既有專案沒有出現，先在 Projects 匯入。[官方建立方式](https://ai.google.dev/gemini-api/docs/api-key)

用編輯器在 `.env` 的 `GEMINI_API_KEY` 填入自己的 key，儲存於本機；不需要把 key 貼到聊天或提交到 Git。接著執行：

```bash
npm run agent
```

輸入「咖啡護照能幫我做什麼？」與「我這個月去了幾間店？」。前者應簡短說明用途，後者應說明尚未接上資料；實際模型句子不必逐字一致。若要觀察開發介面，執行 `npm run web`，依終端提示開啟本機網址。ADK Web 用於開發與除錯。

## 常見卡點

- Node 或 npm 不符：先完成環境更新，再安裝；Day 1 仍可先做。
- 401／403：確認 key、帳號權限與 API 設定；不要把 key 貼到文章或 repo。
- 模型不存在：將 `GEMINI_MODEL` 改成自己帳號可用的 ID，記下版本。
- 429：查看帳號配額並減少重跑，可先完成流程圖與筆記。
- 504 或長時間停在 Sending out request：本次測試中 `gemini-flash-latest` 在 ADK 與直接 API 呼叫都發生逾時；同一把 key 改用 `gemini-3.5-flash-lite` 後成功。範例已固定使用後者，模型選擇參考 [官方模型文件](https://ai.google.dev/gemini-api/docs/models)。本機 `.env` 的 `GEMINI_MODEL` 也要一致，修改後先按 Control＋C，再重新啟動。

範例的模型請求設有 30 秒逾時，且只嘗試一次，方便遇到連線問題時取得明確錯誤。

## 驗證狀態

2026-10-25 已在本機完成：

- Node.js 24.22.1、npm 12.2.1 下完成套件安裝，產生本機 package-lock.json。
- 確認 ADK 與 devtools 均為 2.3.0。
- agent.ts 語法檢查與模組載入成功，匯出的 agent 沒有工具。
- CLI 成功顯示 `Running agent cafe_learning_agent` 與 `[user]:` 輸入提示。

同日另完成真實 Gemini API 與 ADK CLI 驗證：

- `gemini-flash-latest` 的直接呼叫在約 29 秒後收到 504；改用 `gemini-3.5-flash-lite`，約 1.35 秒回覆「連線成功」。這是本次觀察，不代表模型的長期效能或可用性保證。
- ADK 使用 `gemini-3.5-flash-lite`，回答「咖啡護照能幫我做什麼？」：「咖啡護照可以幫您整理咖啡廳的造訪紀錄與評分。目前尚未提供您的個人資料，無法顯示相關紀錄。」
- 再問「我這個月去了幾間店？」：「目前您尚未提供個人資料，因此我無法得知您這個月去了幾間店。」

本次已驗證 agent 的模型回覆與資料不足時的表現；尚未接上咖啡紀錄或 LINE。請親手重跑兩個問題，保留自己的畫面，再填入 Day 2 學習紀錄與文章。
