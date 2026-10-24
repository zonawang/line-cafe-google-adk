// Day 1 概念練習：一般 JavaScript 資料流，並非 ADK runtime。
// 所有資料均為虛構；不讀取使用者或雲端資料。
const empty = process.argv.includes('--empty');

function loadRecords() {
  console.log('1. loadRecords：讀取示範足跡');
  return empty ? [] : [
    { cafeId: 'demo-a', cafeName: '示範咖啡 A', rating: 5 },
    { cafeId: 'demo-b', cafeName: '示範咖啡 B', rating: 4 },
    { cafeId: 'demo-a', cafeName: '示範咖啡 A', rating: 3 },
  ];
}

function calculateStats(records) {
  console.log('2. calculateStats：由程式計算');
  return {
    totalVisits: records.length,
    uniqueCafeCount: new Set(records.map(record => record.cafeId)).size,
    averageRating: records.length
      ? Number((records.reduce((sum, record) => sum + record.rating, 0) / records.length).toFixed(1))
      : null,
  };
}

function renderSummary(stats) {
  console.log('3. renderSummary：固定文案，沒有呼叫 AI');
  if (!stats.totalVisits) return '目前沒有示範紀錄，可以先記下第一次咖啡體驗。';
  return `示範資料共有 ${stats.totalVisits} 次造訪、${stats.uniqueCafeCount} 家店，平均 ${stats.averageRating} 分。`;
}

const stats = calculateStats(loadRecords());
console.log(JSON.stringify(stats, null, 2));
console.log(renderSummary(stats));
