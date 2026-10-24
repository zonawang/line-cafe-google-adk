# Day 07｜工具的參數就是一份小契約

Phase 2 · 約 30～45 分鐘 · [總路線](../ROADMAP.md) · [今天的文章](../articles/day-07.md)

## 今天只懂這件事

Schema 約束可以傳入的資料形狀。例如期間只接受 all、month、year，能讓不合理值及早被發現。使用者身分則由已驗證的應用 context 提供。

## 動手做（15～20 分鐘）

1. 替昨日工具加入 `period: z.enum(["all", "month", "year"])`。
2. 執行一般函式驗證，分別試 month 與 banana。
3. 寫下 userId 為何不能由模型自由填入；今天先不接真實帳號。

## 做到這裡就好

- [ ] 無效期間能被拒絕，且工具沒有讓模型指定任意使用者的參數。
- [ ] 留下一項證據：程式差異、輸出、流程圖或口頭說明錄音。
- [ ] 花十分鐘完成[今日短文](../articles/day-07.md)，更新[學習紀錄](../learning-log.md)。

## 給協作 AI 的小任務

> 今天是此 repo 的 Day 07。請先讀本 lesson、README 與 docs/migration.md，只協助完成本日小任務。沿用 TypeScript／ADK 2.x；先解釋一個概念再做最小改動。不要擴大到後面天數。需要改程式時，確認當前套件版本與官方 API；最後解釋改了什麼及如何驗證，讓我自己完成一個小步驟。文稿中的成果只寫實際驗證過的內容。

## 只讀這個參考就夠

[Function tools](https://adk.dev/tools-custom/function-tools/)。官方頁面內容很多時，只找今天提到的段落，不需要讀完。

[前一天](day-06.md) · [下一天](day-08.md)
