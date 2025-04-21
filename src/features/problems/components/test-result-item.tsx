import type { TestResult } from "../types";
import { getStatusInfo } from "../utils";

interface TestResultItemProps {
  result: TestResult;
}

export function TestResultItem({ result }: TestResultItemProps) {
  const statusInfo = getStatusInfo(result.status);

  return (
    <div className="rounded border p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">テストケース {result.id}</h3>
        <div className="flex items-center gap-1">
          <div className={`h-2 w-2 rounded-full ${statusInfo.color}`} />
          <span className={`text-xs font-medium ${statusInfo.text}`}>{statusInfo.label}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="space-y-1">
          <div className="text-xs font-medium">入力:</div>
          <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-20">{result.input}</pre>
        </div>
        <div className="space-y-1">
          <div className="text-xs font-medium">期待する出力:</div>
          <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-20">{result.expectedOutput}</pre>
        </div>
        <div className="space-y-1">
          <div className="text-xs font-medium">実際の出力:</div>
          <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-20 min-h-8">{result.actualOutput}</pre>
        </div>
        <div className="space-y-1">
          <div className="text-xs font-medium">エラー:</div>
          <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-20">{result.errorLog || "なし"}</pre>
        </div>
      </div>
    </div>
  );
}
