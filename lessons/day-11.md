# Day 11｜用 Workflow 串起固定的三個節點

Phase 3 · 約 30～45 分鐘 · [總路線](../ROADMAP.md) · [今天的文章](../articles/day-11.md)

## 今天只懂這件事

固定流程可以由圖保證必要步驟的順序。這裡先用一般函式完成讀資料、算統計與產生文字，學會圖的接法後才換成模型節點。

## 動手做（15～20 分鐘）

1. 打開官方 Graph Workflows 的 TypeScript 範例。
2. 在 starter 旁建立 `graph.ts`，用 Workflow 與 node 接成 START → fixture → statistics → render。
3. 節點先回傳簡單字串；執行並記錄順序。

## 做到這裡就好

- [ ] 三個節點依序執行，能指出 edges 決定了順序。
- [ ] 留下一項證據：程式差異、輸出、流程圖或口頭說明錄音。
- [ ] 花十分鐘完成[今日短文](../articles/day-11.md)，更新[學習紀錄](../learning-log.md)。

## 給協作 AI 的小任務

> 今天是此 repo 的 Day 11。請先讀本 lesson、README 與 docs/migration.md，只協助完成本日小任務。沿用 TypeScript／ADK 2.x；先解釋一個概念再做最小改動。不要擴大到後面天數。需要改程式時，確認當前套件版本與官方 API；最後解釋改了什麼及如何驗證，讓我自己完成一個小步驟。文稿中的成果只寫實際驗證過的內容。

## 只讀這個參考就夠

[Graph-based agent workflows](https://adk.dev/graphs/)。官方頁面內容很多時，只找今天提到的段落，不需要讀完。

[前一天](day-10.md) · [下一天](day-12.md)
