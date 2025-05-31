import ProblemCreator from "@/features/manage/problem/components";
import { client } from "@/lib/hono";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function NewProblemPage({ params }: { params: Promise<{ courseId: string }> }) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const headers: Record<string, string> = {};
  if (allCookies.length > 0) {
    headers.Cookie = allCookies.map((c) => `${c.name}=${c.value}`).join("; ");
  }
  const { courseId } = await params;

  // problemsで /api/courses/problems にリクエストを送ってしまうため、ここで除外する
  if (courseId === "problems") {
    notFound();
  }

  const res = await client.api.courses[":course_id"].$get(
    {
      param: { course_id: courseId },
    },
    {
      headers,
    },
  );

  if (!res.ok) {
    notFound();
  }

  return (
    <div className="p-4 flex justify-center">
      <ProblemCreator courseId={courseId} />
    </div>
  );
}
