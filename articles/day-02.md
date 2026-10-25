# 第一個 ADK agent 一直沒有回答：我從 504 逾時，開始看懂模型與任務的分工

上一篇，我帶著原本的 LINE Cafe Bot 認識 Google ADK，也先畫出咖啡護照的流程：讀取紀錄、計算統計，再把結果交給 Gemini 寫成回顧。

昨天先看懂圖，今天想往前走一小步，讓第一個 agent 真的回一句話。

Google ADK 是用來開發與組織 agent 應用的框架。今天用到的 LlmAgent，可以先理解成一個帶著任務說明、透過模型處理文字的角色。

我給它的工作很單純：用兩句繁體中文，介紹咖啡護照能做什麼。個人足跡與資料庫先留到後面，今天先確認它知道自己的任務，也知道資料不足時該怎麼回答。

沒想到，第一個需要處理的問題，是它一直沒有回答。

## 先挑一段熟悉的流程，把第一步縮小

原本的咖啡護照已經把資料讀取、統計、摘要和訊息呈現分開。這讓我能保留既有規則，逐步觀察 ADK 接進來之後的變化。

但今天的第一個 agent，還不用接完這條流程。打開 agent.ts，先抓住三個欄位就好：

- name：讓我辨認這個 agent 的名稱。
- model：指定使用哪個模型。
- instruction：交代它要完成的工作，以及回答的限制。

我把 instruction 寫成：用繁體中文、最多兩句話，說明咖啡護照能整理造訪紀錄與評分。因為目前沒有接上使用者資料，不能猜測造訪次數、店名、金額或個人偏好。

這樣就有兩個很清楚的驗收問題：

> 咖啡護照能幫我做什麼？

> 我這個月去了幾間店？

第一題應該能介紹用途，第二題則應該說明還沒有資料。

![第一個 ADK agent 的任務與模型分工](https://raw.githubusercontent.com/zonawang/line-cafe-google-adk/main/assets/day-02/01-agent-scope.png)

圖 1｜今天先完成一個小 agent：接收問題、依任務說明呼叫模型，再回傳答案。工具、個人紀錄與 LINE 串接還沒有接入。

## 畫面顯示 Sending out request，接著就沒有動靜

建立 Gemini API key、放進本機的 .env 後，我用 npm run agent 啟動程式。

原本的模型設定是 gemini-flash-latest。送出問題後，終端機出現了「Sending out request」的 INFO 訊息，後面還列著模型名稱、GEMINI_API 和 stream: false。

一開始，我不確定這代表什麼：程式還在執行，還是已經卡住了？

和 Codex 一起看過後，我才比較清楚，這行只是請求開始送出的進度訊息。它還不能證明模型已經成功回覆。

而 stream: false，表示這次會等整段回答完成後一起顯示。在結果回來以前，畫面不會逐字往下跑。

但等了一段時間，依然沒有回答。我就把這個狀況貼給 Codex，先處理「怎麼知道它為什麼一直等」這件事。

## 加上三十秒上限，才看見真正的錯誤

Codex 替這個入門範例加了兩個設定：每次模型請求最多等待三十秒，而且只嘗試一次，先關掉自動重試。

重新啟動、再送出問題後，這次終於出現明確訊息：

> 504: Deadline expired before operation could complete.

意思是這次請求沒有在期限內完成。加上等待上限沒有直接解決問題，但讓「好像停住了」變成一個可以繼續排查的錯誤。

接下來，Codex 用同一把 key、同一個模型，直接呼叫 Gemini API，先觀察不經過 ADK 時會發生什麼。

結果在大約二十九秒後，也收到相同的 504。

這個對照很有幫助：相同的逾時能在 ADK 之外重現，接下來就可以先縮小範圍，檢查模型呼叫這一段。

## 先只換一個模型，再回到原本的 agent

參考官方模型文件後，Codex 選了一個固定的模型名稱 gemini-3.5-flash-lite，再做一次簡短呼叫。[官方模型文件](https://ai.google.dev/gemini-api/docs/models)

這次沿用同一把 key，大約一點三五秒就收到「連線成功」。

因此，今天不需要先重建 key，而是把這個成功的設定接回原本的 ADK agent，再測一次完整流程。

驗證時還碰到一個小細節：雖然在啟動命令指定了新模型，ADK 的紀錄卻仍顯示 gemini-flash-latest。

Codex 確認啟動流程會重新載入 .env 後，直接把檔案裡的 GEMINI_MODEL 改成 gemini-3.5-flash-lite，再重新啟動。範例的預設值與 .env.example 也一起更新，讓設定保持一致。

![Day 2 的 504 逾時排查流程](https://raw.githubusercontent.com/zonawang/line-cafe-google-adk/main/assets/day-02/02-timeout-investigation.png)

圖 2｜依今天實際發生的順序整理：取得逾時錯誤、直接呼叫對照、換固定模型，最後回到 ADK 驗證。時間是這次測試的觀察，不代表模型長期的速度或穩定性。

這次先找到一個能讓入門範例正常運作的設定。至於原模型為什麼逾時，目前還沒有足夠資料斷言，不能只憑這次結果就說某個模型永遠不能用。

## 第一個回答，是介紹用途；第二個回答，是承認不知道

調整後，Codex 透過 ADK CLI，代為跑了今天的兩個驗收問題。

第一題問「咖啡護照能幫我做什麼？」，agent 回覆：

> 咖啡護照可以幫您整理咖啡廳的造訪紀錄與評分。目前尚未提供您的個人資料，無法顯示相關紀錄。

第二題問「我這個月去了幾間店？」，它回覆：

> 目前您尚未提供個人資料，因此我無法得知您這個月去了幾間店。

![ADK CLI 的兩題實際回覆整理](https://raw.githubusercontent.com/zonawang/line-cafe-google-adk/main/assets/day-02/03-verified-replies.png)

圖 3｜根據 Codex 代驗證時的 ADK CLI 實際輸出整理。這兩則回覆沒有使用個人咖啡紀錄。

第一題確認它能完成介紹任務，第二題則讓我看見 instruction 裡的資料邊界，有反映在這次回答上。

有了模型和任務說明，agent 可以理解問題、生成文字；要回答我的個人造訪次數，仍然需要真正的資料來源。下一步就會從這裡往下接。

## 今天學到的，是把「能啟動」和「能完成任務」分開看

這一天原本只安排建立一個小 agent，實際卻先經過了等待、逾時、直接 API 對照，以及模型與 .env 設定的調整。

我也更能理解，看到程式啟動、看到一行 INFO，和真的收到符合任務的回答，是不同階段的驗證。

這次的合作很具體：我把自己在終端機看到的狀況貼出來，Codex 協助加上可控的等待時間，再用小範圍對照找出能繼續前進的設定。

今天的成果是一個可以介紹咖啡護照，也會在資料不足時說明不知道的 ADK agent。它還沒有工具，還沒讀取 Firestore，也還沒接回 LINE。

兩題成功回覆已經由 Codex 代驗證並記錄下來，個人操作的截圖則還可以繼續補進學習紀錄。

下一篇，我想讓它多一個真正能使用的能力：把函式包成 FunctionTool，看看一份工具回傳的資料，會怎麼改變 agent 的回答。

## 完整程式碼與參考資料

- [本篇完整程式碼](https://github.com/zonawang/line-cafe-google-adk/tree/main/examples/adk-starter)
- [Day 2 實際回覆與排查紀錄](https://github.com/zonawang/line-cafe-google-adk/blob/main/examples/adk-starter/README.md#驗證狀態)
- [15 天學習紀錄](https://github.com/zonawang/line-cafe-google-adk/blob/main/learning-log.md)
- [上一篇：帶著原本的咖啡專案認識 Google ADK](https://github.com/zonawang/line-cafe-google-adk/blob/main/articles/day-01.md)
- [Google ADK TypeScript Quickstart](https://adk.dev/get-started/typescript/)
- [Gemini API Troubleshooting](https://ai.google.dev/gemini-api/docs/troubleshooting)
