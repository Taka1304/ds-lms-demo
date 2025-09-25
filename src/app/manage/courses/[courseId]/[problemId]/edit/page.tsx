import { redirect } from "next/navigation";

export default async function RedirectToEdit({
  params,
}: {
  params: Promise<{ courseId: string; problemId: string }>;
}) {
  const { problemId } = await params;
  redirect(`/manage/problems/${problemId}/edit`);
}
