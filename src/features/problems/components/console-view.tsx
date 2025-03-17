"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { ExecutionHistory } from "../types";
import { HistorySelector } from "./history-selector";
import { TestResultItem } from "./test-result-item";

interface ConsoleViewProps {
  histories: ExecutionHistory[];
  activeHistoryIndex: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onSelectHistory: (index: number) => void;
}

export function ConsoleView({
  histories,
  activeHistoryIndex,
  isExpanded,
  onToggleExpand,
  onSelectHistory,
}: ConsoleViewProps) {
  const currentHistory = histories[activeHistoryIndex] || {
    id: 0,
    timestamp: new Date(),
    results: [],
    isRunning: false,
    hasError: false,
  };

  const getConsoleBackgroundClass = () => {
    if (!isExpanded && histories.length > 0) {
      if (histories[0].hasError) return "bg-red-50 dark:bg-red-950/20";
      if (!histories[0].isRunning) return "bg-green-50 dark:bg-green-950/20";
    }
    return "bg-muted/30";
  };

  return (
    <div
      className={cn(
        "border-t transition-all duration-300",
        isExpanded ? "h-[30vh]" : "h-10",
        getConsoleBackgroundClass(),
      )}
    >
      <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium">Console</h2>
          <HistorySelector histories={histories} activeIndex={activeHistoryIndex} onSelectHistory={onSelectHistory} />
        </div>
        <Button variant="ghost" size="sm" onClick={onToggleExpand} className="h-7 w-7 p-0">
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </div>
      {isExpanded && (
        <div className="h-[calc(100%-28px)] overflow-auto p-4">
          <Card className="h-full border p-4">
            {currentHistory.isRunning ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-sm">テストケースを実行中...</p>
              </div>
            ) : currentHistory.results.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <p className="text-sm">テストケースを実行するには「Run Code」ボタンを押してください</p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentHistory.results.map((result) => (
                  <TestResultItem key={result.id} result={result} />
                ))}
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
