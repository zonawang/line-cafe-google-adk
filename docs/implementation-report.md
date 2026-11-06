# 第一版實作狀態

查核日：2026-11-06。這是護照與唯讀查詢切面的實作，尚非完整 Cafe Bot 遷移。

## 已實作

- TypeScript ADK 2.3.0 的護照 Workflow、零筆分支與模型備援。
- 沿用原 Passport 統計，保留台北期間、去重、評分與收藏後造訪定義。
- 兩個唯讀 FunctionTool：get_passport_stats、list_unvisited_wishlist。
- Runner 工具呼叫迴圈、同一 Session 追問、不同 actor／conversation 的隔離。
- 合成資料 adapter、既有 Firestore schema 的唯讀 adapter、沿用 Flex Message。
- LINE 簽章、body 上限、事件處理、失敗重試與單一行程內去重。
- Dockerfile 與 GitHub Actions 驗證流程。

## 驗證與證據

26 項 Node 測試通過，TypeScript strict 編譯通過。包括原統計案例、正常與零筆分支、模型故障、錯誤輸出、節點 timeout、資料讀取失敗、工具迴圈、追問、身分隔離、偽造參數、LINE 簽章與傳輸重試、Firestore timestamp 轉換。

Firestore adapter 測試使用模擬的 Firestore snapshot；LINE transport 測試使用 loopback HTTP 與模擬 reply。離線模型是 ScriptedDemoModel，沒有外部 Gemini 呼叫。

可重現輸出見 [demo-report.json](../application/docs/demo-report.json)。實際 ADK 事件含節點／工具名稱，對外診斷移除紀錄內容與 LINE 身分。

## 已知缺口

- 尚未使用真實 Gemini、Firestore 或測試 LINE channel 連線驗證。
- 尚未部署或切換正式 webhook。
- 無真實模型品質、延遲、token 或費用 benchmark。
- Session 與 webhook receipts 尚未持久化。
- 舊摘要快取與分享指令未遷移。
- Maps、寫入、提醒與群組功能仍由舊專案提供。
- 2.3.0 Workflow runtime 顯示 experimental 提示。

完整啟動與設定見 [application/README.md](../application/README.md)。

