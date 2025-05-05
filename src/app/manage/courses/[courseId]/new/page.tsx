import ProblemCreator from "@/features/manage/problem/components";
import { client } from "@/lib/hono";
import type { InferRequestType } from "hono/client";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

type PostCourseProblemRequest = InferRequestType<typeof client.api.courses.problems.$post>["json"];

export default async function NewProblemPage({ params }: { params: Promise<{ courseId: string }> }) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("next-auth.session-token")?.value || "";
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
      headers: {
        Cookie: `next-auth.session-token=${sessionToken}`,
      },
    },
  );

  if (!res.ok) {
    notFound();
  }

  const createProblem = async (value: PostCourseProblemRequest) => {
    "use server";
    return await client.api.courses.problems.$post(
      {
        json: value,
      },
      {
        headers: {
          Cookie: `next-auth.session-token=${sessionToken}`,
        },
      },
    );
  };

  return (
    <div className="p-4 flex justify-center">
      <ProblemCreator courseId={courseId} createProblem={createProblem} />
    </div>
  );
}
