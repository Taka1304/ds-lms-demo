"use client";

import type React from "react";

import type { ConvertDateToString } from "@/types/utils";
import type { TestCase } from "@prisma/client";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { usePython } from "react-py";
import type { ExecutionHistory } from "../types";

type TestCaseWithStringDate = ConvertDateToString<TestCase>;

interface PythonExecutionProviderProps {
  testCases: TestCaseWithStringDate[];
  children: (props: {
    isRunning: boolean;
    isReady: boolean;
    executionHistories: ExecutionHistory[];
    activeHistoryIndex: number;
    runCode: (code: string) => void;
    setActiveHistoryIndex: (index: number) => void;
  }) => React.ReactNode;
}

export function PythonExecutionProvider({ testCases, children }: PythonExecutionProviderProps) {
  const { runPython, sendInput, isRunning, isReady, isAwaitingInput, stderr, stdout } = usePython();
  const [executionHistories, setExecutionHistories] = useState<ExecutionHistory[]>([]);
  const [activeHistoryIndex, setActiveHistoryIndex] = useState(0);
  const nextInputRef = useRef<string>("");
  const stdoutRef = useRef<string>("");
  const stderrRef = useRef<string>("");

  // 標準出力を更新
  stdoutRef.current = stdout;
  stderrRef.current = stderr;

  // initialize Python interpreter
  useEffect(() => {
    navigator.serviceWorker
      .register("/react-py-sw.js")
      .then((registration) => console.log("Service Worker registration successful with scope: ", registration.scope))
      .catch((err) => console.log("Service Worker registration failed: ", err));
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isAwaitingInput) {
      sendInput(nextInputRef.current);
    }
  }, [isAwaitingInput, nextInputRef.current, sendInput]);

  const runCode = async (code: string) => {
    if (isRunning) return; // 実行中の場合は何もしない

    // 新しい履歴を追加
    setExecutionHistories((prevHistories) => [
      {
        id: prevHistories.length + 1,
        timestamp: dayjs().format("HH:mm:ss"),
        results: [],
        isRunning: true,
        hasError: false,
      },
      ...prevHistories,
    ]);

    for (const [index, testCase] of testCases.entries()) {
      // 入力を設定
      nextInputRef.current = testCase.input;

      // コードを実行
      const result = await executeTestCase(code, testCase, index);

      // 結果を履歴に追加
      setExecutionHistories((prevHistories) => {
        const updatedHistories = [...prevHistories];
        const currentHistory = updatedHistories[0]; // 最新の履歴を取得

        // すでに結果が追加されている場合は何もしない
        const isAlreadyProcessed = currentHistory.results.some((result) => result.id === index + 1);
        if (isAlreadyProcessed) return prevHistories;

        currentHistory.results.push(result);

        // エラーが発生した場合はフラグを設定
        if (result.status !== "AC") {
          currentHistory.hasError = true;
        }

        return updatedHistories;
      });
    }
    // 実行終了後に履歴を更新
    setExecutionHistories((prevHistories) => {
      const updatedHistories = [...prevHistories];
      updatedHistories[0].isRunning = false; // 最新の履歴の実行状態を更新
      return updatedHistories;
    });
  };

  // テストケースを実行する関数
  const executeTestCase = async (code: string, testCase: TestCaseWithStringDate, index: number) => {
    try {
      // 標準出力とエラーログをリセット
      stdoutRef.current = "";
      stderrRef.current = "";

      // コードを実行
      await runPython(code);

      // 出力が得られるまで待機
      await waitForOutput();

      // 出力を評価
      const status: "AC" | "WA" | "CE" | "RE" | "TLE" =
        stdoutRef.current.trim() === testCase.output.trim() ? "AC" : "WA";

      return {
        id: index + 1,
        status: status as "AC" | "WA" | "CE" | "RE" | "TLE",
        input: testCase.input,
        expectedOutput: testCase.output,
        actualOutput: stdoutRef.current.trim(),
        errorLog: stderrRef.current.trim(),
      };
    } catch (error) {
      return {
        id: index + 1,
        status: "RE" as "AC" | "WA" | "CE" | "RE" | "TLE",
        input: testCase.input,
        expectedOutput: testCase.output,
        actualOutput: stdoutRef.current.trim(),
        errorLog: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  // 出力を待機する関数
  const waitForOutput = async (): Promise<string> => {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve("");
      }, 1000); // 1秒でタイムアウト

      const interval = setInterval(() => {
        if (stdoutRef.current.trim() || stderrRef.current.trim()) {
          clearInterval(interval);
          clearTimeout(timeout);
          resolve(stdoutRef.current.trim());
        }
      }, 100); // 100ms ごとにチェック
    });
  };

  return children({
    isRunning,
    isReady,
    executionHistories,
    activeHistoryIndex,
    runCode,
    setActiveHistoryIndex,
  });
}
