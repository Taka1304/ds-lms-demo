"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ExecutionHistory } from "@/features/problems/types";

import { AlertCircle, CheckCircle2, Loader2, PenBox, Play, Send } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ActionBarProps {
  mode?: "debug" | "challenge";
  isRunning: boolean;
  isReady: boolean;
  onRunCode: () => void;
  recentHistory?: ExecutionHistory;
  onSubmitCode?: () => Promise<void>;
}

export function ActionBar({ mode, isRunning, isReady, onRunCode, recentHistory, onSubmitCode }: ActionBarProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      {mode === "debug" && (
        <Link href={pathname.replace("debug", "edit")} className="flex items-center">
          <Button variant="outline" size="sm">
            <PenBox className="h-4 w-4 mr-2" />
            内容を修正する
          </Button>
        </Link>
      )}
      <Button variant="default" size="sm" onClick={onRunCode} disabled={isRunning || !isReady}>
        {isRunning || !isReady ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-4 w-4 mr-2" />}
        <span>{isRunning ? "実行中..." : !isReady ? "Loading..." : "実行する"}</span>
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" size="sm" disabled={!recentHistory}>
            <Send className="h-4 w-4 mr-2" />
            提出する
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="mb-2">提出前に確認</DialogTitle>
            コードを提出します。よろしいですか？
            {recentHistory?.hasError ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="m-0">テストケースでエラーが発生しています</AlertTitle>
              </Alert>
            ) : (
              <Alert variant={"success"}>
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle className="m-0">全てのテストケースを通過しています</AlertTitle>
                <AlertDescription>※評価では、他のテストケースも存在します</AlertDescription>
              </Alert>
            )}
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">キャンセル</Button>
            </DialogClose>
            <Button type="submit" onClick={onSubmitCode}>
              提出する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
