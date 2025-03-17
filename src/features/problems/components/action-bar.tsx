"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Maximize2, Minimize2, Play } from "lucide-react";

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
        {viewMode === "tabs" ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
        <span className="ml-2">{viewMode === "tabs" ? "Split View" : "Tab View"}</span>
      </Button>
      <Button variant="outline" size="sm" onClick={onRunCode} disabled={isRunning}>
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
