# Day 12｜讓上一個節點的輸出，成為下一個的輸入

Phase 3 · 約 30～45 分鐘 · [總路線](../ROADMAP.md) · [今天的文章](../articles/day-12.md)

## 今天只懂這件事

節點間需要資料契約。讀取結果可以包含 visits 與 wishlistItems，統計結果才包含 totalVisits；下游不應猜測上游回傳格式。

## 動手做（15～20 分鐘）

1. 替 Day 11 的資料定義 `recordsSchema` 與 `statsSchema`。
2. 參照官方 node 範例設定 inputSchema、outputSchema。
3. 故意把 totalVisits 換成字串，觀察驗證錯誤並改回。

## 做到這裡就好

- [ ] 能畫出兩個節點之間實際傳遞的 JSON，且格式錯誤被發現。
- [ ] 留下一項證據：程式差異、輸出、流程圖或口頭說明錄音。
- [ ] 花十分鐘完成[今日短文](../articles/day-12.md)，更新[學習紀錄](../learning-log.md)。

## 給協作 AI 的小任務

> 今天是此 repo 的 Day 12。請先讀本 lesson、README 與 docs/migration.md，只協助完成本日小任務。沿用 TypeScript／ADK 2.x；先解釋一個概念再做最小改動。不要擴大到後面天數。需要改程式時，確認當前套件版本與官方 API；最後解釋改了什麼及如何驗證，讓我自己完成一個小步驟。文稿中的成果只寫實際驗證過的內容。

## 只讀這個參考就夠

[Data handling](https://adk.dev/graphs/data-handling/)。官方頁面內容很多時，只找今天提到的段落，不需要讀完。

[前一天](day-11.md) · [下一天](day-13.md)
