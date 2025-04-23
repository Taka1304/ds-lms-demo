"use client";

import { PythonExecutionProvider } from "@/features/problems/components/python-execution-provider";
import { getStatusInfo } from "@/features/problems/utils";
import { client } from "@/lib/hono";
import type { InferResponseType } from "hono";
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

const EvaluationResultContainer = ({ submission }: ContainerProps) => {
  return (
    <PythonProvider packages={packages}>
      <PythonExecutionProvider testCases={submission.problem.testCases} timeLimit={submission.problem.timeLimit * 1000}>
        {({ isRunning, isReady, executionHistories, runCode }) => {
          if (isReady && executionHistories.length < 1) runCode(submission.code); // 初回実行

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
