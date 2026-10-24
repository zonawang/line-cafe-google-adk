# Day 04｜建立第一個 LlmAgent

Phase 1 · 約 30～45 分鐘 · [總路線](../ROADMAP.md) · [今天的文章](../articles/day-04.md)

## 今天只懂這件事

LlmAgent 把模型、任務說明與可用工具放在一起。最小 agent 可以先只有一項任務；本日只請它解釋咖啡護照，不接資料庫。

## 動手做（15～20 分鐘）

1. 照 `examples/adk-starter/README.md` 檢查 Node 與 npm，安裝獨立練習套件。
2. 複製 `.env.example` 為 `.env` 並設定自己的 Gemini key。
3. 執行 `npm run agent`，輸入「咖啡護照可以幫我做什麼？」。

## 做到這裡就好

- [ ] 看到繁體中文短回覆，並能指出 name、model、instruction 三個欄位。
- [ ] 留下一項證據：程式差異、輸出、流程圖或口頭說明錄音。
- [ ] 花十分鐘完成[今日短文](../articles/day-04.md)，更新[學習紀錄](../learning-log.md)。

## 給協作 AI 的小任務

> 今天是此 repo 的 Day 04。請先讀本 lesson、README 與 docs/migration.md，只協助完成本日小任務。沿用 TypeScript／ADK 2.x；先解釋一個概念再做最小改動。不要擴大到後面天數。需要改程式時，確認當前套件版本與官方 API；最後解釋改了什麼及如何驗證，讓我自己完成一個小步驟。文稿中的成果只寫實際驗證過的內容。

## 只讀這個參考就夠

[TypeScript Quickstart](https://adk.dev/get-started/typescript/)。官方頁面內容很多時，只找今天提到的段落，不需要讀完。

[前一天](day-03.md) · [下一天](day-05.md)
