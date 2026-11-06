# Cafe Bot 的逐步遷移

## 第一個切面已實作

| 來源 | 新位置 | 狀態 |
| --- | --- | --- |
| Passport 統計 | application/src/domain/passportStatistics.ts | 保留算法，替換型別 import |
| journey／wishlist 型別 | application/src/domain/types.ts | 必要型別與 runtime 驗證 |
| Firestore 足跡與收藏查詢 | application/src/adapters/firestoreRecords.ts | 唯讀 adapter，尚待真實連線 |
| 摘要任務 | application/src/agents/passportWorkflow.ts | LlmAgent、分支、fallback 與 timeout |
| LINE 卡片 | application/src/adapters/lineMessages.ts | 沿用既有呈現 |
| 護照指令與查詢入口 | application/src/line/handler.ts | 一對一身分與 dispatch |
| 工具查詢 | application/src/agents/queryAgent.ts | 兩個唯讀 FunctionTool 與 Session |

來源 blob 與範圍見 [SOURCES](../application/SOURCES.md)。

## 現在可驗證的範圍

以合成紀錄與腳本模型，驗證真正的 ADK Workflow、Runner、工具結果回傳與對話脈絡。包含零筆、模型故障與超時、工具故障、身分隔離與 LINE 簽章。這些不是 Gemini 品質或費用 benchmark。

## 下一個整合步驟

1. 使用合成紀錄連線真實 Gemini，保存模型 ID、工具路徑與回答，評估多輪行為。
2. 以測試 LINE channel 和既有 Firestore 讀取唯讀資料，核對索引、筆數上限與欄位。
3. 補齊舊摘要快取與分享入口，讓護照功能更接近原版。
4. 再評估 Maps、收藏確認或行程健檢，每次只新增一條能驗證的流程。
5. 正式多實例部署前，完成持久 Session 與 webhook receipts。

完整 Bot 的功能基準可參考 line-cafe-trip-checker。本次沒有複製其整套 webhook，也沒有改動任何舊 repo 或正式服務。

