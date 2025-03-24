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
