# 移植來源

所有來源皆為 zonawang 的既有專案。本次只移植護照切面。

| 檔案 | 來源 | 處理 |
| --- | --- | --- |
| src/domain/passportStatistics.ts | line-cafe-passport/src/services/passportStatistics.ts，blob badb21b61764846dc575b8340626e02eb565345c | 只更換型別 import，計算實作保留 |
| src/adapters/lineMessages.ts | line-cafe-passport/src/messages/passportMessages.ts，blob bb417f07a9b0d46558072cfa0c26a5014a00cff9 | 只調整統計型別 import |
| test/passportStatistics.test.ts | line-cafe-passport/src/services/passportStatistics.test.ts，blob 27d3bb7b4b30c93c1deba0af0673e3e18c56058a | 改 import 路徑，移除不需要的 env |
| domain/types.ts、Firestore adapter | 參考 journeyStore.ts 與 wishlistStore.ts | 取出必要資料契約，新增 runtime 驗證 |

來源 commit：5ff1bc78d2991d7d161037760ca1e7842ea25b9f
來源：https://github.com/zonawang/line-cafe-passport/tree/5ff1bc78d2991d7d161037760ca1e7842ea25b9f

ADK 以實際安裝的 @google/adk 2.3.0 型別和實作驗證。外部函式庫各自保留原套件授權。

官方參考：

- https://adk.dev/get-started/typescript/
- https://adk.dev/graphs/
- https://adk.dev/graphs/routes/
- https://adk.dev/sessions/
- https://adk.dev/tools-custom/function-tools/
- https://adk.dev/runtime/web-interface/
- https://adk.dev/evaluate/ （此教學標示 Python 支援，沒有冒用為 TypeScript 內建驗收）

