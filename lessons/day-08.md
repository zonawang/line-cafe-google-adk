# Day 08｜Session、state、memory 分別記什麼？

Phase 2 · 約 30～45 分鐘 · [總路線](../ROADMAP.md) · [今天的文章](../articles/day-08.md)

## 今天只懂這件事

Session 是一次對話脈絡，state 是執行時可讀寫的欄位，memory 用於跨對話回憶。永久咖啡足跡仍是應用資料，保存在 Firestore；節點間的結果也能直接傳遞，不必全塞進 state。

## 動手做（15～20 分鐘）

1. 列出「這次選 month」「上一句訊息」「完成的咖啡足跡」三種資料。
2. 分別標註屬於執行欄位、對話歷史或應用資料庫。
3. 設計兩位測試使用者，寫出同一對話設定不能共用的欄位。

## 做到這裡就好

- [ ] 能解釋為什麼重開 session 不等於刪除 Firestore 咖啡紀錄。
- [ ] 留下一項證據：程式差異、輸出、流程圖或口頭說明錄音。
- [ ] 花十分鐘完成[今日短文](../articles/day-08.md)，更新[學習紀錄](../learning-log.md)。

## 給協作 AI 的小任務

> 今天是此 repo 的 Day 08。請先讀本 lesson、README 與 docs/migration.md，只協助完成本日小任務。沿用 TypeScript／ADK 2.x；先解釋一個概念再做最小改動。不要擴大到後面天數。需要改程式時，確認當前套件版本與官方 API；最後解釋改了什麼及如何驗證，讓我自己完成一個小步驟。文稿中的成果只寫實際驗證過的內容。

## 只讀這個參考就夠

[Conversational context](https://adk.dev/sessions/)。官方頁面內容很多時，只找今天提到的段落，不需要讀完。

[前一天](day-07.md) · [下一天](day-09.md)
