# Day 06｜Workflow＋節點契約：串起三步小 graph

Phase 3 · 約 45～60 分鐘 · [總路線](../ROADMAP.md) · [今日文章](../articles/day-06.md)

## 先懂這兩件相連的事（10～15 分鐘）

**用 Workflow 串起固定的三個節點**

固定流程可以由圖保證必要步驟的順序。這裡先用一般函式完成讀資料、算統計與產生文字，學會圖的接法後才換成模型節點。

**讓上一個節點的輸出，成為下一個的輸入**

節點間需要資料契約。讀取結果可以包含 visits 與 wishlistItems，統計結果才包含 totalVisits；下游不應猜測上游回傳格式。

## 用咖啡 Bot 想一遍

上游傳出 `{totalVisits: "3"}`，下游期望數字，錯誤應該在哪裡被發現？

先自己回答兩三句，再動手驗證；答不出來可回看[概念速查](../docs/concepts.md)，不用讀完整份官方文件。

## 動手做（25～30 分鐘）

1. 參照官方 TypeScript graph 範例，在 starter 旁新增 `graph.ts`，接成 START → fixture → statistics → render。
2. 先以簡單字串跑通，再改成 records 與 stats 兩份 JSON；設定 inputSchema、outputSchema。
3. 故意把 totalVisits 改成字串，觀察驗證位置，再修正並記錄執行順序。

## 做到這裡就好

- [ ] 一條可執行的小 graph、節點資料契約與一次格式錯誤紀錄。
- [ ] 用自己的話回答上方情境題，指出觀念與實作的關係。
- [ ] 留一張圖、一段輸出或一個程式差異，標記資料來源與未完成部分。

## 寫今天的一篇文章（10～15 分鐘）

打開[今日草稿](../articles/day-06.md)，用 300～500 字串起兩個觀念，加入一個真實結果與一個原本的誤解。最後在[學習紀錄](../learning-log.md)寫下一句理解。今天只完成圖解也可以如實記錄。

## 給協作 AI 的小任務

> 今天是此 repo 15 天版的 Day 06。先讀本 lesson、README 與 docs/migration.md，只協助本日三步小任務。沿用 TypeScript／ADK 2.x，解釋觀念後做最小改動，讓我自己完成一個步驟。需要寫程式時核對實際套件與官方 API；最後說明改動與驗證。若超過一小時，優先完成本日成果並記下卡點，不擴增後續功能，也不把預期結果寫成已完成。

## 只查今天需要的段落

[Graph Workflows](https://adk.dev/graphs/)、[Data handling](https://adk.dev/graphs/data-handling/)。

[前一天](day-05.md) · [下一天](day-07.md)
