# 逐步重用舊 Cafe Bot

## 已有與待做

這個 repo 目前是教材與起步範例。完整 `application/`、Firestore adapter、ADK graph 與 LINE handler 尚未建立，將在對應天數實作。下方路徑是建議的新結構，不是目前已完成的程式。

## 最小搬移清單

| 來源（line-cafe-passport） | 新位置建議 | 為什麼 |
| --- | --- | --- |
| src/services/passportStatistics.ts | application/domain/passportStatistics.ts | 保留期間、去重與評分算法 |
| 統計需要的 CafeJourney、WishlistItem、JourneyTag 等型別 | application/domain/types.ts | 只取必要型別，避免連帶載入 Firestore 與 env |
| listPassportJourneys／listPassportWishlistItems | application/adapters/records.ts | 暫用 fixture 實作同樣的資料契約 |
| getPassportSummary 的任務與限制 | application/agents/summary.ts | 轉成小摘要任務，沿用 fallback 設計 |
| createPassportMessages | application/adapters/lineMessages.ts | 最後才接 LINE 呈現 |
| handlePassportText 的指令分流 | application/handlers/passport.ts | 僅替換護照指令進入點 |

來源：[統計](https://github.com/zonawang/line-cafe-passport/blob/main/src/services/passportStatistics.ts)、[handler](https://github.com/zonawang/line-cafe-passport/blob/main/src/handlers/passportTextHandler.ts)、[journey store](https://github.com/zonawang/line-cafe-passport/blob/main/src/services/journeyStore.ts)、[wishlist store](https://github.com/zonawang/line-cafe-passport/blob/main/src/services/wishlistStore.ts)。

取用原始碼時保留來源與授權資訊；先確認來源 repo 有哪些授權檔案。不要從舊專案複製 `.env`、Cloud Run 設定密鑰或真實使用者紀錄。

## 四個小步驟

1. **Day 6～8：先懂圖。** 使用固定字串／JSON 建立順序與零筆分支，對照官方當前 TypeScript Workflow 範例。
2. **Day 8～9：接入領域邏輯。** 用必要型別隔離既有統計，fixture adapter 返回相容紀錄，前後輸出比較一致。
3. **Day 9～10：加入模型節點。** 精簡統計進入摘要，保留空紀錄與模型故障的固定輸出，完成本機案例。
4. **Day 11～13：接邊界。** 在新 repo 的應用目錄接回一個 handler；使用獨立測試設定，驗證 actor 隔離。若串接所需時間超出預算，先用模擬 event 展示，並標註限制。

## 避免第一次整合膨脹

完整 `trip-checker` 包含許多相依功能。第一次只要抽取 passport 切面即可。若之後要保留全功能，可另在此 repo 規畫整合目錄；不要覆蓋教材，或把所有舊程式一次複製到 repo 根目錄。

身分、使用者資料儲存與任務可靠性仍由應用負責。舊 Reminder 的 OIDC endpoint 與 Follow-up 的密鑰 endpoint 是不同版本的實作，不要假設每個 repo 使用同一種認證方式。

## 驗證最少做到哪裡

同一 fixture 的核心統計一致；零筆不呼叫摘要模型；模型失敗仍顯示統計；A 使用者不能指定 B 資料；模糊期間有明確處理。詳見 [demo 表](demo.md)。不把真實雲端部署當作理解 ADK 的必要門檻。
