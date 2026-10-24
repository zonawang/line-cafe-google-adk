# Day 06｜把既有函式包成 FunctionTool

Phase 2 · 約 30～45 分鐘 · [總路線](../ROADMAP.md) · [今天的文章](../articles/day-06.md)

## 今天只懂這件事

Tool 是 agent 可以呼叫的程式能力。ADK 的 FunctionTool 描述名稱、用途與參數；真正讀取資料的是 execute 內的程式。

## 動手做（15～20 分鐘）

1. 照官方 TypeScript Quickstart 的 FunctionTool 範例新增 `get_demo_passport`。
2. 工具先固定回傳 `{totalVisits: 3, uniqueCafeCount: 2}`，參數用空的 Zod object。
3. 把它放入 tools，再問「幫我整理示範護照」，觀察是否有工具呼叫。

## 做到這裡就好

- [ ] 能看到工具回傳，並指出數字是函式提供的。
- [ ] 留下一項證據：程式差異、輸出、流程圖或口頭說明錄音。
- [ ] 花十分鐘完成[今日短文](../articles/day-06.md)，更新[學習紀錄](../learning-log.md)。

## 給協作 AI 的小任務

> 今天是此 repo 的 Day 06。請先讀本 lesson、README 與 docs/migration.md，只協助完成本日小任務。沿用 TypeScript／ADK 2.x；先解釋一個概念再做最小改動。不要擴大到後面天數。需要改程式時，確認當前套件版本與官方 API；最後解釋改了什麼及如何驗證，讓我自己完成一個小步驟。文稿中的成果只寫實際驗證過的內容。

## 只讀這個參考就夠

[Function tools](https://adk.dev/tools-custom/function-tools/)。官方頁面內容很多時，只找今天提到的段落，不需要讀完。

[前一天](day-05.md) · [下一天](day-07.md)
