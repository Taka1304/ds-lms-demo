"use client";

import { PythonExecutionProvider } from "@/features/problems/components/python-execution-provider";
import { getStatusInfo } from "@/features/problems/utils";
import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/hono";
import type { InferResponseType } from "hono";
import { useState } from "react";
import { PythonProvider } from "react-py";
import type { Packages } from "react-py/dist/types/Packages";

const req = client.api.courses.problems.submission[":submission_id"].$get;

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
  const toast = useToast();
  const [isSubmissionUpdated, setIsSubmissionUpdated] = useState(false);

  const updateSubmission = async (testResults: TestResult[], score: number) => {
    toast.toast({
      title: "採点結果を更新しています...",
    });
    const res = await client.api.courses.problems.submission[":submission_id"].$patch({
      param: { submission_id: submission.id },
      json: {
        status: "EVALUATED",
        TestResult: testResults,
        score: score,
      },
    });

    if (res.status !== 200) {
      toast.toast({
        title: "採点結果の更新に失敗しました",
        variant: "destructive",
      });
      console.error("Error updating submission:", res.statusText);
      return;
    }
    toast.toast({
      title: "採点結果を更新しました",
    });
  };

  return (
    <PythonProvider packages={packages}>
      <PythonExecutionProvider testCases={submission.problem.testCases} timeLimit={submission.problem.timeLimit * 1000}>
        {({ isRunning, isReady, executionHistories, runCode }) => {
          if (isReady && executionHistories.length < 1) runCode(submission.code); // 初回実行
          if (!isRunning && executionHistories.length > 0 && !isSubmissionUpdated) {
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
            setIsSubmissionUpdated(true); // フラグを更新して再実行を防ぐ
          }

          return (
            <>
              {executionHistories.length > 0 &&
                executionHistories[0].results.map((result, index) => {
                  const statusInfo = getStatusInfo(result.status);

                  return (
                    <div
                      key={result.id}
                      className="flex items-center justify-between gap-2 p-4 border-b border-gray-200"
                    >
                      <h3 className="text-lg font-bold">Test Case {index + 1}</h3>
                      <div className="flex items-center gap-1">
                        <div className={`h-2 w-2 rounded-full ${statusInfo.color}`} />
                        <span className={`text-xs font-medium ${statusInfo.text}`}>{statusInfo.label}</span>
                      </div>
                    </div>
                  );
                })}
            </>
          );
        }}
      </PythonExecutionProvider>
    </PythonProvider>
  );
};

export default EvaluationResultContainer;
