# 官方資源與版本筆記

查核日：2026-10-24。這份教材使用 TypeScript；Python 範例只作觀念參考，不能直接把 import 或執行指令搬進 TypeScript。

| 資源 | 何時讀 | 抓哪個重點 |
| --- | --- | --- |
| [ADK 首頁](https://adk.dev/) | Day 1 | 框架與模型的分工 |
| [Welcome to ADK 2.0](https://adk.dev/2.0/) | 起步時 | 2.x graph 與 1.x 相容性說明 |
| [TypeScript Quickstart](https://adk.dev/get-started/typescript/) | Day 2 | 環境、LlmAgent、開發 CLI |
| [Function tools](https://adk.dev/tools-custom/function-tools/) | Day 3～4 | 工具描述、參數與 execute |
| [Conversational context](https://adk.dev/sessions/) | Day 4 | Session、state、memory |
| [Graph Workflows](https://adk.dev/graphs/) | Day 6 | Workflow、node、edges |
| [Data handling](https://adk.dev/graphs/data-handling/) | Day 6 | 節點資料與 schema |
| [Graph routes](https://adk.dev/graphs/routes/) | Day 7 | 條件、分支與匯合 |
| [Why evaluate agents](https://adk.dev/evaluate/) | Day 13 | 結果與執行路徑；頁面工具流程主要標示 Python |
| [google/adk-js](https://github.com/google/adk-js) | 查 API 時 | TypeScript 原始碼與版本 |

## 本次確認的版本差異

- 官方列出 TypeScript 2.0 已於 2026-08-21 GA；graph 支援不再只是 Python 的選項。
- 2.x 說明把 SequentialAgent、ParallelAgent、LoopAgent 列入棄用項目。先學 Workflow，看到舊文章時辨認其版本。
- 官方 TypeScript Quickstart 在查核日要求 Node.js ≥24.13.0、npm ≥11.8.0。舊 Bot 的 Node ≥20 與新學習環境需分開看。
- 查閱 `google/adk-js` 的 core/package.json 與 dev/package.json，確認核心與 devtools 均為 2.3.0。starter 固定兩者版本，第一次安裝後保存 package-lock.json；實作 API 仍需與實際安裝版本核對。
- TypeScript starter 採 Quickstart 的 `GEMINI_API_KEY`；舊 Bot 則透過 Google Cloud ADC 呼叫服務。兩種設定不要混用。未來接回既有 GCP 專案時，再依官方模型與驗證文件設定。

ADK 是開源框架；呼叫模型及雲端服務的費用與配額依帳號設定而異，本教材不假設永遠免費。先以小 fixture 完成概念練習。
