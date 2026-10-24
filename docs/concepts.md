# ADK 概念速查：先懂這些就夠

| 名詞 | 一句話 | Cafe Bot 裡的例子 |
| --- | --- | --- |
| Model | 理解或生成內容的模型 | Gemini 把統計寫成兩句話 |
| Agent | 帶著任務、模型與可用工具執行工作的角色 | 只負責護照摘要的 LlmAgent |
| Tool | 可讓 agent 呼叫的程式能力 | 取得示範護照統計 |
| Function calling | 模型提出呼叫哪個函式、傳什麼參數 | 選擇查 month 的資料 |
| Workflow | 多步工作的執行安排 | 讀取 → 統計 → 摘要 |
| Graph | 用節點與連線表達流程 | 統計後分成零筆與有資料 |
| Node／edge | 工作單位／工作的關係 | 統計函式／先統計再摘要 |
| Schema | 資料形狀與可接受值的契約 | period 只接受 all、month、year |
| Runner | 驅動 agent／workflow 執行的機制 | 接收一次護照請求後推進流程 |
| Event | 執行過程可觀察到的事件 | 工具呼叫、工具結果與回覆 |
| Session | 一段對話與相關執行脈絡 | 這次與 Bot 的對話 |
| State | 執行時保存的欄位 | 本次選定的期間 |
| Memory | 跨對話回憶資訊的能力 | 未來回想曾談過的內容 |
| Adapter | 轉接既有服務與新介面的程式 | 把 Firestore 紀錄整理成節點輸入 |
| Trace | 一次請求各步驟的觀察紀錄 | 哪個節點等待最久 |
| Fallback | 預期失敗時的替代結果 | 模型失敗改用固定摘要 |
| Human-in-the-loop | 在流程需要時讓人參與決定 | 收藏前按下確認 |

## 容易混在一起的四件事

Graph 的順序可由程式規定，但模型產生的內容仍有變動；順序固定不等於回答必然正確。Tool 是能力，agent 是使用能力的角色；固定 graph 也可以直接執行函式，而不用先問模型選工具。Firestore 的足跡是應用資料，不會因為建立 session 就自動搬進 ADK memory。Cloud Tasks 提供持久排程，與一次 workflow 執行的順序控制負責不同問題。

先用單一 agent 加幾個節點理解上述分工，再依需求評估多 agent。多個節點不一定需要多個模型角色。

官方參考：[技術首頁](https://adk.dev/)、[graph](https://adk.dev/graphs/)、[tools](https://adk.dev/tools-custom/function-tools/)、[對話脈絡](https://adk.dev/sessions/)。
