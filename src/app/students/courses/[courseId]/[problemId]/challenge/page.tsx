import ProgrammingInterface from "@/features/problems/container";
import { client } from "@/lib/hono";
import { notFound } from "next/navigation";

export default async function ({ params }: { params: Promise<{ problemId: string }> }) {
  const { problemId } = await params;
  const res = await client.api.courses.problems[":problem_id"].$get({ param: { problem_id: problemId } });

  if (res.status === 404) return notFound();
  if (!res.ok) return new Error("Failed to fetch problem");
  const problem = await res.json();

  return <ProgrammingInterface problem={problem} />;
}
