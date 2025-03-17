// テストケース結果の型定義
export type TestResult = {
  id: number;
  status: "AC" | "WA" | "CE" | "RE" | "TLE";
  input: string;
  expectedOutput: string;
  actualOutput: string;
  errorLog: string | null;
};

// 実行履歴の型定義
export type ExecutionHistory = {
  id: number;
  timestamp: Date;
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
