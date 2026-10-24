# Day 04｜Schema＋session：把輸入與記憶分清楚

Phase 2 · 約 45～60 分鐘 · [總路線](../ROADMAP.md) · [今日文章](../articles/day-04.md)

## 先懂這兩件相連的事（10～15 分鐘）

**工具的參數就是一份小契約**

Schema 約束可以傳入的資料形狀。例如期間只接受 all、month、year，能讓不合理值及早被發現。使用者身分則由已驗證的應用 context 提供。

**Session、state、memory 分別記什麼？**

Session 是一次對話脈絡，state 是執行時可讀寫的欄位，memory 用於跨對話回憶。永久咖啡足跡仍是應用資料，保存在 Firestore；節點間的結果也能直接傳遞，不必全塞進 state。

## 用咖啡 Bot 想一遍

Schema 接受某個 userId，是否就表示可以讀那個人的資料？用 A、B 例子解釋。

先自己回答兩三句，再動手驗證；答不出來可回看[概念速查](../docs/concepts.md)，不用讀完整份官方文件。

## 動手做（25～30 分鐘）

1. 將工具參數改為 `period: z.enum(["all", "month", "year"])`，分別驗證 month 與 banana。
2. 列出「上一句話」「這次選 month」「永久足跡」，標示 session 歷史、執行欄位或 Firestore。
3. 畫 A、B 兩位使用者的資料邊界，寫下 actorId 由驗證後的應用事件提供，不由模型自由填入。

## 做到這裡就好

- [ ] 一個期間 schema、一次無效參數結果與一張資料歸屬表。
- [ ] 用自己的話回答上方情境題，指出觀念與實作的關係。
- [ ] 留一張圖、一段輸出或一個程式差異，標記資料來源與未完成部分。

## 寫今天的一篇文章（10～15 分鐘）

打開[今日草稿](../articles/day-04.md)，用 300～500 字串起兩個觀念，加入一個真實結果與一個原本的誤解。最後在[學習紀錄](../learning-log.md)寫下一句理解。今天只完成圖解也可以如實記錄。

## 給協作 AI 的小任務

> 今天是此 repo 15 天版的 Day 04。先讀本 lesson、README 與 docs/migration.md，只協助本日三步小任務。沿用 TypeScript／ADK 2.x，解釋觀念後做最小改動，讓我自己完成一個步驟。需要寫程式時核對實際套件與官方 API；最後說明改動與驗證。若超過一小時，優先完成本日成果並記下卡點，不擴增後續功能，也不把預期結果寫成已完成。

## 只查今天需要的段落

[Function tools](https://adk.dev/tools-custom/function-tools/)、[Conversational context](https://adk.dev/sessions/)。

[前一天](day-03.md) · [下一天](day-05.md)
