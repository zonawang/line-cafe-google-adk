# Day 23｜認識 human-in-the-loop，先畫一個確認點

Phase 5 · 約 30～45 分鐘 · [總路線](../ROADMAP.md) · [今天的文章](../articles/day-23.md)

## 今天只懂這件事

Human-in-the-loop 是在必要時讓人參與決定。舊 action-agent 已有 pending action 與 Postback 確認，適合拿來理解「提出操作」和「真正執行」的差別。

## 動手做（15～20 分鐘）

1. 讀 action-agent README 的二次確認流程。
2. 畫出模型提出收藏 → 待確認 → 使用者按鈕 → 驗證後寫入。
3. 寫出確認應綁定 actor、conversation、操作內容與期限；本月主線只讀資料，這題畫圖即可。

## 做到這裡就好

- [ ] 能解釋確認點的目的，也知道 ADK 暫停能力與 LINE 跨 webhook 確認仍需要轉接。
- [ ] 留下一項證據：程式差異、輸出、流程圖或口頭說明錄音。
- [ ] 花十分鐘完成[今日短文](../articles/day-23.md)，更新[學習紀錄](../learning-log.md)。

## 給協作 AI 的小任務

> 今天是此 repo 的 Day 23。請先讀本 lesson、README 與 docs/migration.md，只協助完成本日小任務。沿用 TypeScript／ADK 2.x；先解釋一個概念再做最小改動。不要擴大到後面天數。需要改程式時，確認當前套件版本與官方 API；最後解釋改了什麼及如何驗證，讓我自己完成一個小步驟。文稿中的成果只寫實際驗證過的內容。

## 只讀這個參考就夠

[本 repo 的舊專案盤點](../docs/repo-audit.md)。官方頁面內容很多時，只找今天提到的段落，不需要讀完。

[前一天](day-22.md) · [下一天](day-24.md)
