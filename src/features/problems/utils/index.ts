import type { StatusInfo, TestResult } from "../types";

// 結果ステータスに応じた色とテキストを取得
export const getStatusInfo = (status: TestResult["status"]): StatusInfo => {
  switch (status) {
    case "AC":
      return { color: "bg-green-500", text: "text-green-600", label: "AC (Accepted)" };
    case "WA":
      return { color: "bg-red-500", text: "text-red-600", label: "WA (Wrong Answer)" };
    case "CE":
      return { color: "bg-purple-500", text: "text-purple-600", label: "CE (Compilation Error)" };
    case "RE":
      return { color: "bg-orange-500", text: "text-orange-600", label: "RE (Runtime Error)" };
    case "TLE":
      return { color: "bg-yellow-500", text: "text-yellow-600", label: "TLE (Time Limit Exceeded)" };
  }
};

// モックテスト結果を生成
export const generateMockTestResults = (): TestResult[] => {
  return [
    {
      id: 1,
      status: "AC",
      input: "[1, -4, 7, 12, -5, 0]",
      expectedOutput: "20",
      actualOutput: "20",
      errorLog: null,
    },
    {
      id: 2,
      status: Math.random() > 0.5 ? "WA" : "AC", // ランダムに成功/失敗
      input: "[-1, -2, -3]",
      expectedOutput: "0",
      actualOutput: Math.random() > 0.5 ? "-6" : "0",
      errorLog: null,
    },
    {
      id: 3,
      status: Math.random() > 0.7 ? "TLE" : "AC", // ランダムにタイムアウト
      input: "[1, 2, 3, 4, 5, ... (large array with 10000 elements)]",
      expectedOutput: "50005000",
      actualOutput: Math.random() > 0.7 ? "実行時間制限超過" : "50005000",
      errorLog: Math.random() > 0.7 ? "実行時間が2000msを超過しました" : null,
    },
    {
      id: 4,
      status: Math.random() > 0.8 ? "RE" : "AC", // ランダムに実行時エラー
      input: "null",
      expectedOutput: "0",
      actualOutput: Math.random() > 0.8 ? "実行時エラー" : "0",
      errorLog:
        Math.random() > 0.8
          ? "TypeError: Cannot read property 'filter' of null\nat sumPositiveNumbers (line 2)\nat Object.<anonymous> (line 8)"
          : null,
    },
  ];
};
