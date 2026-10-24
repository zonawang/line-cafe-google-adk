# Day 21｜把 workflow 接回 LINE 的邊界

Phase 5 · 約 30～45 分鐘 · [總路線](../ROADMAP.md) · [今天的文章](../articles/day-21.md)

## 今天只懂這件事

LINE webhook 負責驗證、辨識發話者與選擇 handler；workflow 負責護照處理。回覆轉成 LINE 訊息是另一個邊界。

## 動手做（15～20 分鐘）

1. 參考原有 handlePassportText，只在「本月咖啡護照」入口呼叫新流程。
2. 把已驗證 actorId 傳進 adapter，將結果交給既有 createPassportMessages。
3. 先用模擬 event 驗證 handler，再有餘裕才接測試 LINE channel。

## 做到這裡就好

- [ ] 能指出入口、workflow 與訊息轉換三個責任，其他指令仍走原 handler。
- [ ] 留下一項證據：程式差異、輸出、流程圖或口頭說明錄音。
- [ ] 花十分鐘完成[今日短文](../articles/day-21.md)，更新[學習紀錄](../learning-log.md)。

## 給協作 AI 的小任務

> 今天是此 repo 的 Day 21。請先讀本 lesson、README 與 docs/migration.md，只協助完成本日小任務。沿用 TypeScript／ADK 2.x；先解釋一個概念再做最小改動。不要擴大到後面天數。需要改程式時，確認當前套件版本與官方 API；最後解釋改了什麼及如何驗證，讓我自己完成一個小步驟。文稿中的成果只寫實際驗證過的內容。

## 只讀這個參考就夠

[本 repo 的遷移指南](../docs/migration.md)。官方頁面內容很多時，只找今天提到的段落，不需要讀完。

[前一天](day-20.md) · [下一天](day-22.md)
