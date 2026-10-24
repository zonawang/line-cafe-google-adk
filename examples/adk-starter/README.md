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

用編輯器在 `.env` 的 `GEMINI_API_KEY` 填入自己的 key，再執行：

```bash
npm run agent
```

輸入「咖啡護照能幫我做什麼？」與「我這個月去了幾間店？」。前者應簡短說明用途，後者應說明尚未接上資料；實際模型句子不必逐字一致。若要觀察開發介面，執行 `npm run web`，依終端提示開啟本機網址。ADK Web 用於開發與除錯。

## 常見卡點

- Node 或 npm 不符：先完成環境更新，再安裝；Day 1 仍可先做。
- 401／403：確認 key、帳號權限與 API 設定；不要把 key 貼到文章或 repo。
- 模型不存在：將 `GEMINI_MODEL` 改成自己帳號可用的 ID，記下版本。
- 429：查看帳號配額並減少重跑，可先完成流程圖與筆記。

## 驗證狀態

agent 結構依官方範例編寫；本次交付未安裝 ADK 相依套件、未使用個人 API key，也未執行真實模型連線。Day 2 以自己的環境跑完後，把實際套件版本與回覆加入學習紀錄。離線練習的驗證不代表此模型範例已完成整合驗證。
