import 'dotenv/config';
import {LlmAgent} from '@google/adk';

// Day 2 起點：還沒有工具或真實咖啡資料。
// 改用其他模型時，以自己帳號可用的 model ID 為準。
export const rootAgent = new LlmAgent({
  name: 'cafe_learning_agent',
  model: process.env.GEMINI_MODEL || 'gemini-flash-latest',
  description: '用繁體中文簡短說明咖啡護照的學習助理。',
  instruction: [
    '請用繁體中文，最多兩句話，說明咖啡護照可以整理造訪紀錄與評分。',
    '目前沒有接上使用者資料；不要猜測造訪次數、店名、金額或個人偏好。',
    '若被問到個人紀錄，清楚說明尚未提供資料。',
  ].join('\n'),
});
