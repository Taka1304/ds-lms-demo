import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ThemeEditor from "@/components/ui/editor";
import EvaluationResultContainer from "@/features/problems/components/evaluation-result";
import { TestResultItem } from "@/features/problems/components/test-result-item";
import { client } from "@/lib/hono";
import { notFound } from "next/navigation";

export default async function ({ params }: { params: Promise<{ submissionId: string }> }) {
  const { submissionId } = await params;
  const res = await client.api.courses.problems.submission[":submission_id"].$get({
    param: { submission_id: submissionId },
  });

  if (400 <= res.status && res.status < 500) return notFound();
  if (!res.ok) return console.error(res.status, await res.json());
  const submission = await res.json();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">{submission.problem.title}</h1>
      <Card className="p-4 h-[300px] flex flex-col">
        <CardTitle className="text-lg font-bold">提出されたコード</CardTitle>
        <CardContent className="flex-1 overflow-hidden p-4">
          <ThemeEditor
            className="w-full h-full"
            defaultValue={submission.code}
            language={"python"}
            options={{
              readOnly: true,
            }}
          />
        </CardContent>
      </Card>
      {
        submission.status === "PENDING" ? (
          <EvaluationResultContainer submission={submission} />
        ): (
          // TODO: 採点済みの場合の結果を表示
          <>
            {submission.TestResult.map((result, index) => (
              <TestResultItem key={result.id} index={index + 1} result={result} testCase={result.testCase} />
            ))}
          </>
        )
      }
    </div>
  );
}
