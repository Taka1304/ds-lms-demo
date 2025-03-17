"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { usePython } from "react-py";
import type { ExecutionHistory } from "../types";
import { generateMockTestResults } from "../utils";

interface TestExecutionProviderProps {
  children: (props: {
    isRunning: boolean;
    executionHistories: ExecutionHistory[];
    activeHistoryIndex: number;
    runTestCases: (code: string) => void;
    setActiveHistoryIndex: (index: number) => void;
  }) => React.ReactNode;
}

export function TestExecutionProvider({ children }: TestExecutionProviderProps) {
  const { runPython, sendInput, isReady, isRunning, isAwaitingInput, stderr, stdout } = usePython();
  const [executionHistories, setExecutionHistories] = useState<ExecutionHistory[]>([]);
  const [activeHistoryIndex, setActiveHistoryIndex] = useState(0);

  // initialize Python interpreter
  useEffect(() => {
    navigator.serviceWorker
      .register("/react-py-sw.js")
      .then((registration) => console.log("Service Worker registration successful with scope: ", registration.scope))
      .catch((err) => console.log("Service Worker registration failed: ", err));
  }, []);

  // モックテストケース実行関数
  const runTestCases = (code: string) => {
    if (isRunning) return;

    // 新しい実行履歴を作成
    const newHistoryId = executionHistories.length > 0 ? Math.max(...executionHistories.map((h) => h.id)) + 1 : 1;

    const newHistory: ExecutionHistory = {
      id: newHistoryId,
      timestamp: new Date(),
      results: [],
      isRunning: true,
      hasError: false,
    };

    // 履歴を更新（最大3件まで保持）
    setExecutionHistories((prevHistories) => {
      const updatedHistories = [newHistory, ...prevHistories].slice(0, 3);
      return updatedHistories;
    });
    setActiveHistoryIndex(0);

    // モックテスト実行（遅延をシミュレート）
    setTimeout(() => {
      // テスト結果を生成
      const results = generateMockTestResults();

      // エラーがあるかチェック
      const hasError = results.some((r) => r.status !== "AC");

      // 履歴を更新（関数型更新を使用して最新の状態を確実に取得）
      setExecutionHistories((prevHistories) => {
        return prevHistories.map((history, index) => {
          if (index === 0) {
            return {
              ...history,
              results,
              isRunning: false,
              hasError,
            };
          }
          return history;
        });
      });
    }, 2000); // 2秒後に結果を表示
  };

  return children({
    isRunning,
    executionHistories,
    activeHistoryIndex,
    runTestCases,
    setActiveHistoryIndex,
  });
}
