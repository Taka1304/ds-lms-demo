import ProblemCreator from "@/features/manage/problem/components";
import { client } from "@/lib/hono";
import { notFound } from "next/navigation";

export default async function ProblemEditPage({
  params,
}: { params: Promise<{ courseId: string; problemId: string }> }) {
  const { courseId, problemId } = await params;
  const res = await client.api.courses.problems[":problem_id"].$get({ param: { problem_id: problemId } });

  if (res.status === 404) return notFound();
  if (!res.ok) return new Error("Failed to fetch problem");
  const problem = await res.json();

  return (
    <div className="p-4 flex justify-center">
      <ProblemCreator courseId={courseId} problem={problem} />
    </div>
  );
}
