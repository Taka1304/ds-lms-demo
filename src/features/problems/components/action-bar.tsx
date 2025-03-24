"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Maximize2, Play, SquareSplitHorizontal } from "lucide-react";

interface ActionBarProps {
  viewMode: "tabs" | "split";
  isRunning: boolean;
  onToggleViewMode: () => void;
  onRunCode: () => void;
}

export function ActionBar({ viewMode, isRunning, onToggleViewMode, onRunCode }: ActionBarProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={onToggleViewMode}>
        {viewMode === "tabs" ? <SquareSplitHorizontal className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        <span className="ml-2">{viewMode === "tabs" ? "Split View" : "Tab View"}</span>
      </Button>
      <Button variant="default" size="sm" onClick={onRunCode} disabled={isRunning}>
        {isRunning ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Running...
          </>
        ) : (
          <>
            <Play className="h-4 w-4 mr-2" />
            Run Code
          </>
        )}
      </Button>
    </div>
  );
}
