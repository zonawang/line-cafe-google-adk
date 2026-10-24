# 起步範例

## Day 1：離線資料流

需要 Node.js。於 repo 根目錄執行：

```bash
node examples/day01-flow.mjs
node examples/day01-flow.mjs --empty
```

一般情境會依序印出 loadRecords、calculateStats、renderSummary；結果為 3 次造訪、2 家店、平均 4 分。`--empty` 會顯示零筆與空狀態。

這是三個一般 JavaScript 函式串接，用來理解資料流，**沒有安裝或執行 Google ADK、沒有模型或 LINE 連線**。店名與資料均為虛構。試著調整一個評分，預測平均數再執行。

## Day 2：真正的最小 ADK agent

前往 [adk-starter](adk-starter/README.md)。這個起點只有單一 LlmAgent，需安裝套件並設定自己的模型憑證。完整 graph、tools 與 LINE 接合依每日任務逐步新增。
