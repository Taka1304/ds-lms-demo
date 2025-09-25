import { redirect } from "next/navigation";

export default async function RedirectToProblem({
  params,
}: {
  params: Promise<{ courseId: string; problemId: string }>;
}) {
  const { problemId } = await params;
  redirect(`/students/problems/${problemId}`);
}
