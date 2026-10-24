# Day 16｜重用舊 repo 的統計規則

Phase 4 · 約 30～45 分鐘 · [總路線](../ROADMAP.md) · [今天的文章](../articles/day-16.md)

## 今天只懂這件事

改造先保留已經驗證過的領域邏輯。咖啡護照的期間切分、店家去重與平均分數是確定性規則，適合繼續由程式負責。

## 動手做（15～20 分鐘）

1. 依 `docs/migration.md` 建立 application/domain 小資料夾。
2. 從 passport 取出 passportStatistics 與必要型別，先用 fixture 呼叫。
3. 比較原程式與節點版的 totalVisits、uniqueCafeCount、averageRating。

## 做到這裡就好

- [ ] 同一份測試資料在前後兩版產生相同核心統計。
- [ ] 留下一項證據：程式差異、輸出、流程圖或口頭說明錄音。
- [ ] 花十分鐘完成[今日短文](../articles/day-16.md)，更新[學習紀錄](../learning-log.md)。

## 給協作 AI 的小任務

> 今天是此 repo 的 Day 16。請先讀本 lesson、README 與 docs/migration.md，只協助完成本日小任務。沿用 TypeScript／ADK 2.x；先解釋一個概念再做最小改動。不要擴大到後面天數。需要改程式時，確認當前套件版本與官方 API；最後解釋改了什麼及如何驗證，讓我自己完成一個小步驟。文稿中的成果只寫實際驗證過的內容。

## 只讀這個參考就夠

[本 repo 的舊專案盤點](../docs/repo-audit.md)。官方頁面內容很多時，只找今天提到的段落，不需要讀完。

[前一天](day-15.md) · [下一天](day-17.md)
