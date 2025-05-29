"use server";

import { ProgressOverview } from "@/features/dashboard/progress-overview";
import { client } from "@/lib/hono";
import { AlertCircle } from "lucide-react";
import { cookies } from "next/headers";

const ProgressOverviewContainer = async () => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("next-auth.session-token")?.value || "";
  const res = await client.api.courses.$get(
    {},
    {
      headers: {
        Cookie: `next-auth.session-token=${sessionToken}`,
      },
    },
  );

  if (!res.ok) {
    console.error("Failed to fetch course progress res:", res.statusText);
    return (
      <div>
        <AlertCircle />
        エラーが発生しました
      </div>
    );
  }
  const data = await res.json();
  const courseProgress = data.filter((course) => course.UserProgress?.length);
  if (courseProgress.length === 0) {
    return <div className="text-center text-muted-foreground">現在、進捗状況はありません。</div>;
  }

  return <ProgressOverview courseProgress={courseProgress} />;
};

export default ProgressOverviewContainer;
