"use server";

import { ProgressOverview } from "@/features/dashboard/progress-overview";
import { authOptions } from "@/lib/auth";
import { client } from "@/lib/hono";
import { AlertCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

const ProgressOverviewContainer = async () => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("next-auth.session-token")?.value || "";
  const session = await getServerSession(authOptions);
  const res = await client.api.courses.$get(
    {
      query: {
        user_id: session?.user.id || undefined,
      },
    },
    {
      headers: {
        Cookie: `next-auth.session-token=${sessionToken}`,
      },
    },
  );

  if (!res.ok) {
    console.error("Failed to fetch course progress res:", res.statusText);
    if (res.status === 401) {
      console.error(`Unauthorized: ${sessionToken}`);
    }
    return (
      <div className="flex items-center justify-center">
        <AlertCircle />
        エラーが発生しました
      </div>
    );
  }
  const data = await res.json();
  const courseProgress = data.filter((course) => course.UserProgress.progress);

  if (courseProgress.length === 0) {
    return <div className="text-center text-muted-foreground">現在、進捗状況はありません。</div>;
  }

  return <ProgressOverview courseProgress={courseProgress} />;
};

export default ProgressOverviewContainer;
