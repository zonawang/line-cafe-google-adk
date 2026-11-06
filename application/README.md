# Cafe Bot 的 ADK 應用

這是可執行的第一個改造切面：**咖啡護照與唯讀自然語言查詢**。沿用舊 Passport 的統計及 LINE 卡片，使用 TypeScript ADK 2.3.0 Workflow、LlmAgent、FunctionTool、Runner 與 Session。

已提供 Firestore 讀取 adapter 和 LINE webhook。這次驗證使用合成紀錄、腳本模型和模擬 LINE 回覆，沒有連線 Gemini、真實 Firestore 或正式 LINE 帳號，也沒有部署服務。

## 先跑離線 Demo

需要 Node.js >=24.13.0 與 pnpm 11.25.0。在本目錄執行：

```bash
corepack enable
corepack prepare pnpm@11.25.0 --activate
pnpm install --frozen-lockfile --ignore-scripts
pnpm build
pnpm test
pnpm demo --output demo-report.json
```

離線 demo 會執行真正的 ADK runtime，但模型由 `ScriptedDemoModel` 取代，不呼叫外部 API。資料時間固定為台北 2026-11-06 12:00。正常護照有 3 次造訪、2 間店、平均 4 分；另外展示零筆、模型故障、跨工具查詢與追問。

執行紀錄中的 `summaryMode: model` 表示走過 LlmAgent 模型介面。是否使用真實 Gemini，請看報告最上方的 `disclosure`，不能只靠 summaryMode 判斷。

## 接真實 Gemini，仍使用合成資料

```bash
cp .env.example .env
# 在本機 .env 設定自己的 GEMINI_API_KEY 與可用的 GEMINI_MODEL
pnpm demo --live --output live-demo-report.json
```

模型 ID 沿用 starter 的預設值，可依帳號權限調整。請勿把 key 貼進聊天室或提交到 Git。live demo 的模型故障案例仍使用腳本注入，報告有註記。

這個步驟才開始觀察真實模型是否選對工具、是否正確追問與忠於資料。離線測試不能代替這些生成行為評估。

## 接測試 LINE Channel 與既有 Firestore

設定本機 `.env`：

```dotenv
LINE_CHANNEL_SECRET=your_channel_secret
LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token
RECORDS_MODE=firestore
MODEL_MODE=live
GEMINI_API_KEY=your_key
GOOGLE_CLOUD_PROJECT=your_project
```

Firestore 使用 ADC，模型的 Gemini API key 與 Firestore ADC 是兩個獨立的設定：

```bash
gcloud auth application-default login
pnpm start
```

入口為 `GET /health` 與 `POST /webhook`。以測試 channel 的 webhook 指向公開 HTTPS URL，傳送：

```text
本月咖啡護照
今年咖啡護照
我的咖啡護照
我這個月最常去哪間？收藏裡還有哪些沒去過？
只看適合工作的呢？
```

只在一對一聊天室查詢個人資料。使用者身分由已驗證的 LINE event 帶入，模型不能指定 ownerId。群組事件會引導到私訊。

Firestore adapter 使用原 collection：

- `cafe-user-journeys/{userId}/visits`：status=completed，completedAt 由新到舊，最多 500 筆。
- `cafe-user-wishlists/{userId}/entries`：createdAt 由新到舊，最多 200 筆。

若第一個查詢要求索引，依 Firestore 回傳的索引提示建立。若舊專案 collection 名稱不同，使用 .env.example 裡的覆寫參數。讀取達到上限時，護照會提示可能不完整。查詢工具的「未造訪」僅代表在已讀取的完成足跡裡找不到該店。

## 程式分工

```text
src/domain/       舊統計算法、資料型別與擁有者驗證
src/adapters/     合成資料、Firestore、沿用的 LINE 卡片
src/agents/       固定護照 Workflow、唯讀查詢 Agent
src/runtime/      腳本模型、移除個資的診斷紀錄
src/line/         LINE handler 與 webhook
src/demo.ts       可重現示範與 JSON 證據
src/server.ts     測試服務啟動點
test/            統計、流程、工具、身分、傳輸與 adapter 驗證
```

## 本次範圍與限制

- ADK 2.3.0 實際執行時對 Workflow 顯示 experimental 提示。固定版本並保存 lockfile。
- Session 使用記憶體，閒置 30 分鐘或容量超過 200 筆後逐步清理。重啟與跨實例不保留對話。
- webhook 去重只有單一行程內有效。正式多實例需持久化 event receipts。
- webhook 等待處理及 LINE reply 完成後才回 200，避免 HTTP 結束後的背景工作遺失。正式服務應評估耐久佇列、reply token 有效期及平台 timeout。
- 舊摘要的 Firestore 持久快取與分享指令尚未遷移。
- 收藏、刪除、提醒、Maps 搜尋、群組投票與寫入確認尚未整合進本應用。
- 不宣稱更快、更省或更準。尚未進行真實 Gemini 的品質、延遲、token 或費用比較。

原始碼與移植資訊見 [SOURCES.md](SOURCES.md)。演講提綱見 [talk-35min.md](../docs/talk-35min.md)。

