"use client";

import { PythonExecutionProvider } from "@/features/problems/components/python-execution-provider";
import { TestResultItem } from "@/features/problems/components/test-result-item";
import { client } from "@/lib/hono";
import type { InferResponseType } from "hono";
import { useRef } from "react";
import { PythonProvider } from "react-py";
import type { Packages } from "react-py/dist/types/Packages";
import { toast } from "sonner";

const req = client.api.submissions[":submission_id"].$get;

const packages: Packages = {
  official: ["numpy", "pandas"],
  micropip: [],
};

type ContainerProps = {
  submission: InferResponseType<typeof req, 200>;
};

type TestResult = {
  status: "AC" | "WA" | "TLE" | "RE" | "CE";
  output: string;
  testCaseId: string;
  error?: string | undefined;
};

const EvaluationResultContainer = ({ submission }: ContainerProps) => {
  const submissionRef = useRef(false);

  const updateSubmission = async (testResults: TestResult[], score: number) => {
    const toastId = toast.loading("採点結果を更新しています...");
    const res = await client.api.submissions[":submission_id"].$patch({
      param: { submission_id: submission.id },
      json: {
        status: "EVALUATED",
        TestResult: testResults,
        score: score,
      },
    });

    if (res.status !== 200) {
      toast.error("採点結果の更新に失敗しました", {
        id: toastId,
      });
      console.error("Error updating submission:", await res.json());
      return;
    }
    toast.success("採点結果を更新しました", {
      id: toastId,
    });
  };

  return (
    <PythonProvider packages={packages}>
      <PythonExecutionProvider testCases={submission.problem.testCases} timeLimit={submission.problem.timeLimit * 1000}>
        {({ isRunning, isReady, executionHistories, runCode }) => {
          if (isReady && executionHistories.length < 1) runCode(submission.code); // 初回実行
          if (!isRunning && executionHistories.length > 0 && !submissionRef.current) {
            const results = executionHistories[0].results.map((result) => ({
              testCaseId: result.id,
              status: result.status,
              output: result.actualOutput,
              error: result.errorLog ?? "",
            }));
            const score =
              (executionHistories[0].results.filter((result) => result.status === "AC").length /
                submission.problem.testCases.length) *
              100;

            updateSubmission(results, score);
            submissionRef.current = true; // 2回目以降の実行を防ぐ
          }

          return (
            <>
              {executionHistories.length > 0 && executionHistories[0].results[0]?.expectedOutput ? (
                executionHistories[0].results.map((result) => {
                  return (
                    <TestResultItem
                      key={result.id}
                      index={result.index}
                      result={result}
                      testCase={{ input: result.input, output: result.expectedOutput, isHidden: result.isHidden }}
                    />
                  );
                })
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-lg text-muted-foreground">実行中...</p>
                </div>
              )}
            </>
          );
        }}
      </PythonExecutionProvider>
    </PythonProvider>
  );
};

export default EvaluationResultContainer;
