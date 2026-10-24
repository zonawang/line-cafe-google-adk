# Day 17｜用 adapter 換掉資料來源

Phase 4 · 約 30～45 分鐘 · [總路線](../ROADMAP.md) · [今天的文章](../articles/day-17.md)

## 今天只懂這件事

Adapter 是轉接層：workflow 要求某種輸入，轉接層負責向既有 store 取得並整理資料。這樣可先用 fixture，之後再換 Firestore。

## 動手做（15～20 分鐘）

1. 定義 `loadPassportRecords(actorId, period)` 的回傳格式。
2. 先實作 fixture adapter，把它放進讀取節點。
3. 列出未來連接 listPassportJourneys 與 listPassportWishlistItems 所需的設定，今天不搬整個 webhook。

## 做到這裡就好

- [ ] 切換讀取函式不需要重寫統計與摘要節點。
- [ ] 留下一項證據：程式差異、輸出、流程圖或口頭說明錄音。
- [ ] 花十分鐘完成[今日短文](../articles/day-17.md)，更新[學習紀錄](../learning-log.md)。

## 給協作 AI 的小任務

> 今天是此 repo 的 Day 17。請先讀本 lesson、README 與 docs/migration.md，只協助完成本日小任務。沿用 TypeScript／ADK 2.x；先解釋一個概念再做最小改動。不要擴大到後面天數。需要改程式時，確認當前套件版本與官方 API；最後解釋改了什麼及如何驗證，讓我自己完成一個小步驟。文稿中的成果只寫實際驗證過的內容。

## 只讀這個參考就夠

[本 repo 的遷移指南](../docs/migration.md)。官方頁面內容很多時，只找今天提到的段落，不需要讀完。

[前一天](day-16.md) · [下一天](day-18.md)
