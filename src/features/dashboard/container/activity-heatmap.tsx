"use server";

import { ActivityHeatmap } from "@/features/dashboard/activity-heatmap";
import { authOptions } from "@/lib/auth";
import { client } from "@/lib/hono";
import dayjs from "dayjs";
import { AlertCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

type Props = {
  dateRange?: {
    from: string | undefined;
    to: string | undefined;
  };
};

const ActivityHeatmapContainer = async ({ dateRange }: Props) => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("next-auth.session-token")?.value || "";
  const session = await getServerSession(authOptions);
  const data = await client.api.dashboard["activity-heatmap"].$get(
    {
      query: {
        user_id: session?.user.id || undefined,
        from: dateRange?.from ?? dayjs().startOf("year").toISOString(),
        to: dateRange?.to ?? dayjs().toISOString(),
      },
    },
    {
      headers: {
        Cookie: `next-auth.session-token=${sessionToken}`,
      },
    },
  );

  if (!data.ok) {
    console.error("Failed to fetch activity heatmap data:", data.statusText);
    return (
      <div>
        <AlertCircle />
        エラーが発生しました
      </div>
    );
  }
  const activityData = await data.json();

  return <ActivityHeatmap activityData={activityData} />;
};

export default ActivityHeatmapContainer;
