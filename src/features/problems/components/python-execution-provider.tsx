"use client";

import type React from "react";

import type { ConvertDateToString } from "@/types/utils";
import type { TestCase } from "@prisma/client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { usePython } from "react-py";
import type { ExecutionHistory } from "../types";

type TestCaseWithStringDate = ConvertDateToString<TestCase>;

interface PythonExecutionProviderProps {
  testCases: TestCaseWithStringDate[];
  children: (props: {
    isRunning: boolean;
    executionHistories: ExecutionHistory[];
    activeHistoryIndex: number;
    runCode: (code: string) => void;
    setActiveHistoryIndex: (index: number) => void;
  }) => React.ReactNode;
}

export function PythonExecutionProvider({ testCases, children }: PythonExecutionProviderProps) {
  const { runPython, sendInput, isRunning, isAwaitingInput, stderr, stdout } = usePython();
  const [executionHistories, setExecutionHistories] = useState<ExecutionHistory[]>([]);
  const [activeHistoryIndex, setActiveHistoryIndex] = useState(0);
  const [testCaseIndex, setTestCaseIndex] = useState<number>(0);

  // initialize Python interpreter
  useEffect(() => {
    navigator.serviceWorker
      .register("/react-py-sw.js")
      .then((registration) => console.log("Service Worker registration successful with scope: ", registration.scope))
      .catch((err) => console.log("Service Worker registration failed: ", err));
  }, []);

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

    for (const _ of testCases) {
      await runPython(code);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isAwaitingInput) {
      console.log("Send input: ", testCases[testCaseIndex].input);
      sendInput(testCases[testCaseIndex].input);
    }
  }, [isAwaitingInput, testCaseIndex, sendInput]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (stdout || stderr) {
      const currentTestCase = testCases[testCaseIndex];

      // 現在のテストケースが存在しない場合は終了
      if (!currentTestCase) return;

      // 現在の履歴を取得
      setExecutionHistories((prevHistories) => {
        const updatedHistories = [...prevHistories];
        const currentHistory = updatedHistories[0]; // 最新の履歴を取得

        // すでに結果が追加されている場合は何もしない
        const isAlreadyProcessed = currentHistory.results.some((result) => result.id === currentTestCase.id);
        if (isAlreadyProcessed) return prevHistories;

        // 出力を評価
        const status: "AC" | "WA" | "CE" | "RE" | "TLE" = stdout.trim() === currentTestCase.output.trim() ? "AC" : "WA";

        currentHistory.results.push({
          id: currentTestCase.id,
          status,
          input: currentTestCase.input,
          expectedOutput: currentTestCase.output,
          actualOutput: stdout.trim(),
          errorLog: stderr.trim(),
        });

        // エラーが発生した場合はフラグを設定
        if (status !== "AC") {
          currentHistory.hasError = true;
        }

        return updatedHistories;
      });

      // 次のテストケースに進む
      setTestCaseIndex((prevIndex) => prevIndex + 1);

      // 次のテストケースが存在しない場合は終了
      if (!testCases[testCaseIndex + 1]) {
        setTestCaseIndex(0);
        setExecutionHistories((prevHistories) => {
          const updatedHistories = [...prevHistories];
          updatedHistories[0].isRunning = false; // 最新の履歴の実行状態を更新
          return updatedHistories;
        });
      }
    }
  }, [stdout, stderr]);

  return children({
    isRunning,
    executionHistories,
    activeHistoryIndex,
    runCode,
    setActiveHistoryIndex,
  });
}
