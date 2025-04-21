"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type { ExecutionHistory } from "../types";

interface HistorySelectorProps {
  histories: ExecutionHistory[];
  activeIndex: number;
  onSelectHistory: (index: number) => void;
}

export function HistorySelector({ histories, activeIndex, onSelectHistory }: HistorySelectorProps) {
  if (histories.length === 0) return null;

  return (
    <div className="flex items-center gap-1 ml-4">
      {histories.map((history, index) => (
        <Button
          key={history.id}
          variant="ghost"
          size="sm"
          className={cn("h-6 px-2 text-xs", activeIndex === index && "bg-muted", history.isRunning && "text-blue-600")}
          onClick={() => onSelectHistory(index)}
        >
          {history.isRunning ? (
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          ) : history.hasError ? (
            <div className="h-2 w-2 rounded-full bg-red-500 mr-1" />
          ) : (
            <div className="h-2 w-2 rounded-full bg-green-500 mr-1" />
          )}
          実行履歴 {history.id}
          {index === 0 && " (最新)"}
        </Button>
      ))}
    </div>
  );
}
