import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { ConvertDateToString } from "@/types/utils";
import type { TestResult } from "@prisma/client";
import { Info } from "lucide-react";
import type { TestResult as TestResultType } from "../types/index";
import { getStatusInfo } from "../utils";

interface TestResultItemProps {
  index: number;
  result: ConvertDateToString<TestResult> | TestResultType;
  testCase: {
    isHidden?: boolean;
    input: string;
    output: string;
  };
}

export function TestResultItem({ index, result, testCase }: TestResultItemProps) {
  const statusInfo = getStatusInfo(result.status);

  return (
    <div className="rounded border p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-2">
          <h3 className="text-sm font-medium">テストケース {index}</h3>
          {testCase.isHidden && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  このテストケースは、管理者によって 入力 及び 期待する出力 が非表示に設定されています。
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </span>
        <div className="flex items-center gap-1">
          <div className={`h-2 w-2 rounded-full ${statusInfo.color}`} />
          <span className={`text-xs font-medium ${statusInfo.text}`}>{statusInfo.label}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {testCase.isHidden || (
          <>
            <div className="space-y-1">
              <div className="text-xs font-medium">入力:</div>
              <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-20">{testCase.input}</pre>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium">期待する出力:</div>
              <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-20">{testCase.output}</pre>
            </div>
          </>
        )}
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
