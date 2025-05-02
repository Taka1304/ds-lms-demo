import ProblemCreator from "@/features/manage/problem/components";
import { createClient } from "@/lib/hono";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function NewProblemPage({ params }: { params: Promise<{ courseId: string }> }) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("next-auth.session-token")?.value || "";
  const { courseId } = await params;
  const client = createClient(sessionToken);
  const res = await client.api.courses[":course_id"].$get(
    {
      param: { course_id: courseId },
    },
    {
      headers: {
        Cookie: `next-auth.session-token=${sessionToken}`,
      },
    }
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
