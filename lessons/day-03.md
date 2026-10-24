# Day 03｜Instruction＋FunctionTool：讓回答有資料來源

Phase 2 · 約 45～60 分鐘 · [總路線](../ROADMAP.md) · [今日文章](../articles/day-03.md)

## 先懂這兩件相連的事（10～15 分鐘）

**用任務與限制寫 instruction**

Instruction 應說清楚任務、資料來源與不知道時的行為。只寫「你是專業助理」無法交代哪些資料能用，也無法保證數字正確。

**把既有函式包成 FunctionTool**

Tool 是 agent 可以呼叫的程式能力。ADK 的 FunctionTool 描述名稱、用途與參數；真正讀取資料的是 execute 內的程式。

## 用咖啡 Bot 想一遍

同樣問造訪數，為什麼「沒有資料」與「工具回傳 3 次」應有不同回答？

先自己回答兩三句，再動手驗證；答不出來可回看[概念速查](../docs/concepts.md)，不用讀完整份官方文件。

## 動手做（25～30 分鐘）

1. 將 instruction 改為兩句繁中、不得猜個人紀錄，先問一次個人造訪數。
2. 參照官方 FunctionTool 範例新增 `get_demo_passport`，用空 Zod object 作參數，固定回傳 `{totalVisits: 3, uniqueCafeCount: 2}`。
3. 把工具加入 tools，再問示範護照；對照有無工具的回覆與呼叫紀錄。

## 做到這裡就好

- [ ] 一次帶工具結果的回答；能指出限制寫在哪裡，數字由哪個函式提供。
- [ ] 用自己的話回答上方情境題，指出觀念與實作的關係。
- [ ] 留一張圖、一段輸出或一個程式差異，標記資料來源與未完成部分。

## 寫今天的一篇文章（10～15 分鐘）

打開[今日草稿](../articles/day-03.md)，用 300～500 字串起兩個觀念，加入一個真實結果與一個原本的誤解。最後在[學習紀錄](../learning-log.md)寫下一句理解。今天只完成圖解也可以如實記錄。

## 給協作 AI 的小任務

> 今天是此 repo 15 天版的 Day 03。先讀本 lesson、README 與 docs/migration.md，只協助本日三步小任務。沿用 TypeScript／ADK 2.x，解釋觀念後做最小改動，讓我自己完成一個步驟。需要寫程式時核對實際套件與官方 API；最後說明改動與驗證。若超過一小時，優先完成本日成果並記下卡點，不擴增後續功能，也不把預期結果寫成已完成。

## 只查今天需要的段落

[TypeScript Quickstart](https://adk.dev/get-started/typescript/)、[Function tools](https://adk.dev/tools-custom/function-tools/)。

[前一天](day-02.md) · [下一天](day-04.md)
