# 30 天學習、實作與寫作路線

建議起算日：2026-10-24；Day 30 為 2026-11-22。若分享在約 11/24，可留最後一兩天緩衝；實際上台日期尚未指定，可整份平移。每天約 30～45 分鐘，總計約 15～22.5 小時。

完成標準是「能用自己的 Bot 說明 ADK，展示一條小流程」，不是三十天熟悉全部功能。每天文章預設 200～400 字；Day 1 有完整概念文，其他是待補實作證據的短文草稿，最後編成一篇主文。

## Phase 1｜建立心智模型（Day 1～5）

知道 ADK 在整個 Bot 中的位置，跑出第一個小 agent。

**階段成果：**一張系統圖＋第一個 agent 回覆

| 完成 | Day／建議日期 | 今日一個主題 | 文章題目 |
| --- | --- | --- | --- |
| ☐ | 01／10/24 | [什麼是 graph workflow？先畫出咖啡 Bot 的流程](lessons/day-01.md) | [咖啡 Bot 已經有流程，為什麼還要認識 graph workflow？](articles/day-01.md) |
| ☐ | 02／10/25 | [ADK、Gemini、LINE 各自做什麼？](lessons/day-02.md) | [把咖啡 Bot 的五個角色分清楚，就比較懂 Google ADK 在做什麼](articles/day-02.md) |
| ☐ | 03／10/26 | [從舊 repo 選一條最小改造路線](lessons/day-03.md) | [第一次導入 ADK，我會先挑哪一個咖啡 Bot 功能？](articles/day-03.md) |
| ☐ | 04／10/27 | [建立第一個 LlmAgent](lessons/day-04.md) | [第一個 ADK agent：先給它一個很小的工作](articles/day-04.md) |
| ☐ | 05／10/28 | [用任務與限制寫 instruction](lessons/day-05.md) | [給 agent 一個角色之後，還要告訴它哪些事不能猜](articles/day-05.md) |

## Phase 2｜讓 agent 使用程式能力（Day 6～10）

認識 tool、schema、session 與執行事件。

**階段成果：**一次可觀察的工具呼叫＋第一輪複習

| 完成 | Day／建議日期 | 今日一個主題 | 文章題目 |
| --- | --- | --- | --- |
| ☐ | 06／10/29 | [把既有函式包成 FunctionTool](lessons/day-06.md) | [讓 agent 能做事的第一步：把函式變成 tool](articles/day-06.md) |
| ☐ | 07／10/30 | [工具的參數就是一份小契約](lessons/day-07.md) | [Tool schema：讓 AI 與程式對同一份輸入有共識](articles/day-07.md) |
| ☐ | 08／10/31 | [Session、state、memory 分別記什麼？](lessons/day-08.md) | [Agent 的記憶不是一個大抽屜：先分清對話與資料](articles/day-08.md) |
| ☐ | 09／11/01 | [Runner 與 event：流程是怎麼被執行的？](lessons/day-09.md) | [除了答案，我還想知道 agent 中途做了什麼](articles/day-09.md) |
| ☐ | 10／11/02 | [第一次整理：五分鐘講清楚 agent 與 tool](lessons/day-10.md) | [第一個十天：我能用咖啡 Bot 解釋哪些 ADK 概念？](articles/day-10.md) |

## Phase 3｜把流程寫成 graph（Day 11～15）

理解順序、資料契約、分支與匯合。

**階段成果：**護照流程圖＋本機固定資料 workflow

| 完成 | Day／建議日期 | 今日一個主題 | 文章題目 |
| --- | --- | --- | --- |
| ☐ | 11／11/03 | [用 Workflow 串起固定的三個節點](lessons/day-11.md) | [從一個 agent，到一條有明確順序的 workflow](articles/day-11.md) |
| ☐ | 12／11/04 | [讓上一個節點的輸出，成為下一個的輸入](lessons/day-12.md) | [Graph 的連線除了先後，還承載了資料契約](articles/day-12.md) |
| ☐ | 13／11/05 | [資料為空時，走另一條路](lessons/day-13.md) | [第一個 graph 分支：沒有資料，就不必硬做 AI 摘要](articles/day-13.md) |
| ☐ | 14／11/06 | [哪些工作可以一起做？認識 parallel 與 join](lessons/day-14.md) | [兩條支線一起跑之後，誰負責等結果到齊？](articles/day-14.md) |
| ☐ | 15／11/07 | [第二次整理：一張圖講完護照流程](lessons/day-15.md) | [一張流程圖，能不能讓別人看懂我的咖啡護照？](articles/day-15.md) |

## Phase 4｜逐步重用既有 Cafe Bot（Day 16～20）

保留統計，加入 adapter、AI 摘要與 fallback。

**階段成果：**正常／零筆／模型失敗三種本機案例

| 完成 | Day／建議日期 | 今日一個主題 | 文章題目 |
| --- | --- | --- | --- |
| ☐ | 16／11/08 | [重用舊 repo 的統計規則](lessons/day-16.md) | [導入 ADK 時，我最想保留的是原本可靠的統計](articles/day-16.md) |
| ☐ | 17／11/09 | [用 adapter 換掉資料來源](lessons/day-17.md) | [把 Firestore 留在轉接層，讓 workflow 先跑起來](articles/day-17.md) |
| ☐ | 18／11/10 | [只讓模型把統計寫成兩句話](lessons/day-18.md) | [AI 摘要的好用範圍：把事實說清楚](articles/day-18.md) |
| ☐ | 19／11/11 | [模型失敗，護照仍然能顯示](lessons/day-19.md) | [即使 AI 暫時不能回答，咖啡護照還能提供什麼？](articles/day-19.md) |
| ☐ | 20／11/12 | [第三次整理：完成本機最小展示](lessons/day-20.md) | [我的第一個 ADK 展示，先回答三種情境](articles/day-20.md) |

## Phase 5｜接回 LINE 與檢查邊界（Day 21～25）

小範圍整合，檢查身分、觀察紀錄與驗收案例。

**階段成果：**一個 LINE handler 入口＋五案例紀錄

| 完成 | Day／建議日期 | 今日一個主題 | 文章題目 |
| --- | --- | --- | --- |
| ☐ | 21／11/13 | [把 workflow 接回 LINE 的邊界](lessons/day-21.md) | [ADK 接回 LINE 時，webhook 應該負責什麼？](articles/day-21.md) |
| ☐ | 22／11/14 | [個人化之前，先確定是誰的資料](lessons/day-22.md) | [個人化 agent 的第一個問題：這份紀錄屬於誰？](articles/day-22.md) |
| ☐ | 23／11/15 | [認識 human-in-the-loop，先畫一個確認點](lessons/day-23.md) | [Agent 提議收藏時，誰來按下最後的確認？](articles/day-23.md) |
| ☐ | 24／11/16 | [用 trace 找到哪一步出了問題](lessons/day-24.md) | [看懂一次 trace，比猜 agent 為什麼失敗更有效](articles/day-24.md) |
| ☐ | 25／11/17 | [用五個案例檢查結果與路徑](lessons/day-25.md) | [Agent 測試除了答對，還要檢查它怎麼到達答案](articles/day-25.md) |

## Phase 6｜準備文章與上台分享（Day 26～30）

比較前後、編輯主文、錄影與彩排。

**階段成果：**十五分鐘講稿＋三分鐘 demo＋一篇主文

| 完成 | Day／建議日期 | 今日一個主題 | 文章題目 |
| --- | --- | --- | --- |
| ☐ | 26／11/18 | [比較導入前後，說清楚值得與代價](lessons/day-26.md) | [把既有 Bot 改成 ADK 後，我要怎麼判斷有沒有幫助？](articles/day-26.md) |
| ☐ | 27／11/19 | [把一個月整理成十五分鐘故事](lessons/day-27.md) | [上台談 ADK，我想先讓大家看見一個咖啡問題](articles/day-27.md) |
| ☐ | 28／11/20 | [彩排一次完整 demo，也準備斷網版本](lessons/day-28.md) | [Demo 的準備，也包含 AI 暫時不能工作的那一刻](articles/day-28.md) |
| ☐ | 29／11/21 | [把每日筆記編成一篇可發布主文](lessons/day-29.md) | [從三十篇小筆記，到一篇能說清楚 ADK 的文章](articles/day-29.md) |
| ☐ | 30／11/22 | [最後一天：凍結功能，留下分享與下一步](lessons/day-30.md) | [一個月後，我想帶走的 ADK 理解](articles/day-30.md) |

## 時間不足的縮小方式

主線優先保留 Day 1～13、16～20、25～30。Day 14 的並行只畫圖；Day 21 的 LINE 使用模擬 event，實機可延後；Day 23 的確認流程只做概念圖。資料庫未接通時使用 fixture，分享時標示資料來源。其餘天數仍可各寫一段概念小文。

## 最終可檢查成果

- [ ] 能用三分鐘解釋 model、agent、tool、workflow 的差別。
- [ ] 有原本流程與 ADK 流程的比較圖。
- [ ] 一條 TypeScript ADK graph 使用示範或測試資料可重現。
- [ ] 正常、零筆、模型失敗三個案例可展示；五個驗收案例有記錄。
- [ ] 每日筆記有完成狀態，未完成實作誠實標示。
- [ ] 有十五分鐘提綱、三分鐘 demo 與斷網備援。
- [ ] 有一篇整合主文，含版本、實作證據與限制。
