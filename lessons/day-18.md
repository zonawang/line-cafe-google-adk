# Day 18｜只讓模型把統計寫成兩句話

Phase 4 · 約 30～45 分鐘 · [總路線](../ROADMAP.md) · [今天的文章](../articles/day-18.md)

## 今天只懂這件事

摘要節點接受精簡統計，不自行查詢或計算次數。這能縮小任務，也避免把不必要的個人資訊送入提示。

## 動手做（15～20 分鐘）

1. 把 Day 11 的固定摘要節點換成 LlmAgent。
2. 只提供 periodLabel、totalVisits、uniqueCafeCount 與 averageRating。
3. 要求兩句繁中，不推測消費金額或個性，保留一次實際輸出。

## 做到這裡就好

- [ ] 摘要裡的每個數字都能在統計 JSON 找到來源。
- [ ] 留下一項證據：程式差異、輸出、流程圖或口頭說明錄音。
- [ ] 花十分鐘完成[今日短文](../articles/day-18.md)，更新[學習紀錄](../learning-log.md)。

## 給協作 AI 的小任務

> 今天是此 repo 的 Day 18。請先讀本 lesson、README 與 docs/migration.md，只協助完成本日小任務。沿用 TypeScript／ADK 2.x；先解釋一個概念再做最小改動。不要擴大到後面天數。需要改程式時，確認當前套件版本與官方 API；最後解釋改了什麼及如何驗證，讓我自己完成一個小步驟。文稿中的成果只寫實際驗證過的內容。

## 只讀這個參考就夠

[Graph-based agent workflows](https://adk.dev/graphs/)。官方頁面內容很多時，只找今天提到的段落，不需要讀完。

[前一天](day-17.md) · [下一天](day-19.md)
