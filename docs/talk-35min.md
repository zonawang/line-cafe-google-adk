# 我的咖啡 Bot 已經會用工具，為什麼還需要 Google ADK？

開發者分享，35 分鐘內容＋5 分鐘問答。投影片共 15 張，簡報檔另於本次交付提供。以下備註也寫入每張投影片。

## 1. 我的咖啡 Bot 已經會用工具 為什麼還需要 Google ADK？（1 分鐘）

時間 1 分鐘。開場先說明自己原本已經做過會找咖啡廳、收藏與提醒的 LINE Bot。今天分享的是在既有程式中導入框架的實際經驗。這一版完成護照與唯讀查詢切面，使用合成紀錄和腳本模型驗證真正 ADK runtime。不要把示範稱作 Gemini 實測或正式上線。
來源：https://github.com/zonawang/line-cafe-google-adk
封面：使用內建 imagegen 生成的示意照片，並非實際店家照片。

## 2. Cafe Bot 的能力演進（2 分鐘）

時間 2 分鐘。用自己的專案歷程說明需求怎麼成長，避免逐一介紹十三個 repo。這些是各 repo README 與代表程式看到的能力，並不表示所有服務都已部署、也不表示它們同時運行。指出護照的責任已分得很清楚，這讓前後比較可控。
來源：https://github.com/zonawang/line-cafe-action-agent
https://github.com/zonawang/line-cafe-passport
https://github.com/zonawang/line-cafe-trip-checker

## 3. 既有 Agent 已經會選工具（2 分鐘）

時間 2 分鐘。原始 Action Agent 宣告 save_cafe、list_saved_cafes、remove_saved_cafe、plan_cafe_visit，讀取第一個 function call 後轉成應用 decision。它已經有 Agent 的重要機制。這頁顯示的是概念摘錄，不是原檔逐字複製。ADK 的比較焦點是共通的執行組織。
來源：https://github.com/zonawang/line-cafe-action-agent/blob/main/src/services/geminiActionAgent.ts

## 4. 模型、Agent 與 ADK 的分工（3 分鐘）

時間 3 分鐘。避免把一般 Agent 和 ADK 當成互斥產品。Agent 描述系統的設計和行為，ADK 是實作框架。工具、Session、Workflow 也存在於其他框架，這場分享不宣稱 ADK 獨有或全面優於其他選擇。先建立分工，後面每個例子都回到這張表。
來源：https://adk.dev/
https://adk.dev/sessions/

## 5. 第一個改造範圍：咖啡護照（2 分鐘）

時間 2 分鐘。護照適合第一步，因為它已把讀紀錄、統計、摘要、卡片分開。原本的平均分、去重、台北月份邊界與收藏後造訪規則已存在。改造沿用統計與卡片實作。單純兩句摘要不能充分證明需要 Agent 框架，所以後面另加工具查詢。
來源：https://github.com/zonawang/line-cafe-passport/blob/main/src/handlers/passportTextHandler.ts
https://github.com/zonawang/line-cafe-passport/blob/main/src/services/passportStatistics.ts

## 6. 改造後的責任配置（3 分鐘）

時間 3 分鐘。逐項說明哪些能力真的遷移，哪些保留。Firestore adapter 是唯讀介面，沒有讓模型選擇 userId。固定計算沒有轉成 AI 任務。這一版的對話 Session 用記憶體保存，正式擴容前需要持久化。ADK 不取代 Firestore、LINE 或排程服務。
來源：https://github.com/zonawang/line-cafe-google-adk/tree/codex/adk-passport-talk/application
https://adk.dev/graphs/

## 7. 護照 Workflow 的執行路徑（3 分鐘）

時間 3 分鐘。先講 START、資料讀取、統計、has_visits 的分支。empty 路徑不呼叫模型，summarize 節點內捕捉模型失敗並回傳固定摘要。資料讀取失敗則回報失敗，不能冒充零筆。重要版本細節：這次實裝的 2.3.0 runtime 仍會對 Workflow 顯示 experimental 提示，所以固定版本並保留驗收案例。
來源：https://github.com/zonawang/line-cafe-google-adk/tree/codex/adk-passport-talk/application/src/agents/passportWorkflow.ts
https://adk.dev/graphs/
https://adk.dev/2.0/

## 8. 工具參數與使用者身分（2 分鐘）

時間 2 分鐘。強調身份不能交給模型生成，也不能單靠 prompt 阻止跨帳號。工具透過閉包綁定 actor，Zod strict 拒絕額外 ownerId 參數，資料 adapter 再次驗證記錄擁有者。群組事件在第一版引導到一對一聊天。這些是應用的權限設計，ADK 讓工具更好組織，但不會自動完成授權。
來源：https://github.com/zonawang/line-cafe-google-adk/tree/codex/adk-passport-talk/application/src/agents/queryAgent.ts
https://adk.dev/tools-custom/function-tools/

## 9. 示範護照的實際輸出（2 分鐘）

時間 2 分鐘。此時切到 demo-report.json 或終端執行。資料全部是 synthetic fixture，不是真實使用者紀錄。統計值與原始演算法一致。summaryMode=model 代表經過 LlmAgent 模型介面，但這次該介面接的是腳本模型，不是 Gemini。這個區別一定口頭說明，避免把系統整合測試說成生成品質驗證。
證據：application/docs/demo-report.json
來源：https://github.com/zonawang/line-cafe-google-adk/tree/codex/adk-passport-talk/application/src/demo.ts

## 10. 沒有資料與執行失敗（2 分鐘）

時間 2 分鐘。這頁重點是定義錯誤語義，不用把所有失敗說成同一種 fallback。模型故障時資料還在，所以統計可以繼續顯示。資料讀取故障時我們不知道使用者有沒有紀錄，所以不能回覆零筆。示範中的故障由測試注入，並非聲稱真的發生 Gemini 服務中斷。
證據：application/test/workflow.test.ts
來源：https://github.com/zonawang/line-cafe-google-adk/tree/codex/adk-passport-talk/application

## 11. 跨工具查詢與接續追問（3 分鐘）

時間 3 分鐘。用這個情境說明兩個工具的結果如何回到模型，以及同一 Session 的追問如何保留上文。實際 Gemini 的自主選擇仍需另測，腳本只驗證 framework 能正確執行、傳回結果及隔離 session。收藏工具以讀取範圍內的全部完成足跡判斷未造訪，不能宣稱終身未去過。工作標籤是使用者紀錄的體驗，不是 Maps 驗證的設施事實。
證據：application/docs/demo-report.json
來源：https://github.com/zonawang/line-cafe-google-adk/tree/codex/adk-passport-talk/application/src/agents/queryAgent.ts

## 12. 答案之外的執行紀錄（2 分鐘）

時間 2 分鐘。這是系統真的發出的事件名稱，不是模型的隱藏推理。故障例子在 passport_summary 有 errorCode，接著 summarize_with_fallback 和 passport_result 仍會輸出。redacted trace 只保留結構，不輸出 token、提示詞和紀錄內容。ADK 原始 session events 仍可能含工具結果，因此正式儲存與觀測需要另訂存取和保留政策。
證據：application/docs/demo-report.json
來源：https://github.com/zonawang/line-cafe-google-adk/tree/codex/adk-passport-talk/application/src/runtime/trace.ts
https://adk.dev/runtime/web-interface/

## 13. 目前有證據支持的比較（3 分鐘）

時間 3 分鐘。誠實說明原本就有 fallback 和清楚分工，避免把框架功勞放大。這一版增加依賴、資料契約和版本維護成本。舊版摘要有 Firestore 快取，新切面尚未遷移持久快取，所以也不能把目前示範稱作完整的功能等價替換。沒有真實模型實測，不能宣稱更快、更省或更準。
來源：https://github.com/zonawang/line-cafe-passport/blob/main/src/services/passportSummary.ts
https://github.com/zonawang/line-cafe-google-adk/tree/codex/adk-passport-talk/application

## 14. ADK 對我的下一階段的價值（2 分鐘）

時間 2 分鐘。這頁是個人判斷與學習收穫。不要宣稱所有專案都應該採用 ADK。單一 API 請求、固定簡短流程可能用一般函式更簡單。當工具、分支、對話狀態和觀測需求開始重複時，才評估框架成本是否值得。後續優先驗證真實 Gemini 的工具選擇，再接 Firestore 與測試 LINE channel，最後才評估新增寫入功能。
來源：https://adk.dev/
個人觀點，依此次專案改造提出

## 15. 我的下一步（1 分鐘）

時間 1 分鐘，接續 5 分鐘問答。收尾說明可下載程式並先跑離線 demo。常見問答：一個 Agent 就能完成這次任務；Cloud Tasks 仍處理定時工作；Firestore 仍保存永久紀錄；Session 是對話脈絡而非所有業務資料；框架不保證無幻覺。正式部署前應補持久 Session、跨實例 webhook 去重、資料索引、摘要快取與真實模型案例。來源：https://github.com/zonawang/line-cafe-google-adk

## Demo 操作順序

1. 在 application 執行 `pnpm build`。
2. 執行 `pnpm demo --output demo-report.json`。
3. 看 passport.normal 的統計與節點事件。
4. 看 passport.empty，指出沒有模型節點。
5. 看 simulatedModelFailure，指出 errorCode 後仍有 passport_result。
6. 看 query.question，辨認兩次工具呼叫與回傳。
7. 看 followup，說明 Session 與個人紀錄的差別。

每次展示先說明：真正的 ADK runtime、合成資料、腳本模型，沒有呼叫 Gemini。真實模型 demo 另用 `pnpm demo --live`，需要自己帳號可用的模型與 key。

## 常見問答

- **為什麼選 ADK？** 現有 TypeScript／Google Cloud 經驗能延續，也能比較共通執行層的效益。沒有宣稱所有框架比較後 ADK 最佳。
- **一般函式做不到嗎？** 固定護照流程做得到。此例用同一算法比較框架組織、事件與擴充成本。
- **一定要多 Agent 嗎？** 目前每條任務用一個 LlmAgent 即可，不必為展示而增加角色。
- **用了就不會幻覺嗎？** 仍需限制資料、驗證輸出並以真實模型案例評估。腳本通過不能推論 Gemini 的回答品質。
- **排程與資料庫能移除嗎？** Cloud Tasks 仍負責定時觸發，Firestore 仍保存業務紀錄。
- **目前能上正式環境嗎？** 已有 adapters 和 Dockerfile，尚需驗證真實服務並補持久 Session、跨實例去重、索引與快取。

