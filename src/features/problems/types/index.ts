// テストケース結果の型定義
export type TestResult = {
  id: string;
  index: number;
  status: "AC" | "WA" | "CE" | "RE" | "TLE";
  input: string;
  isHidden?: boolean;
  expectedOutput: string;
  actualOutput: string;
  errorLog: string | null;
};

// 実行履歴の型定義
export type ExecutionHistory = {
  id: number;
  timestamp: string; // hh:mm:ss
  results: TestResult[];
  isRunning: boolean;
  hasError: boolean;
};

// 結果ステータスの情報
export type StatusInfo = {
  color: string;
  text: string;
  label: string;
};
