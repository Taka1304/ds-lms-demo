import { redirect } from "next/navigation";

export default async function RedirectToSubmission({
  params,
}: {
  params: Promise<{ courseId: string; problemId: string; submissionId: string }>;
}) {
  const { submissionId } = await params;
  redirect(`/students/submissions/${submissionId}`);
}
