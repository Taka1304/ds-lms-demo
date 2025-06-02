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
  const allCookies = cookieStore.getAll();
  const headers: Record<string, string> = {};
  if (allCookies.length > 0) {
    headers.Cookie = allCookies.map((c) => `${c.name}=${c.value}`).join("; ");
  }
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
      headers,
    },
  );

  if (!data.ok) {
    console.error("Failed to fetch activity heatmap data:", data.statusText);
    return (
      <div className="flex items-center justify-center">
        <AlertCircle />
        エラーが発生しました
      </div>
    );
  }
  const activityData = await data.json();

  return <ActivityHeatmap activityData={activityData} />;
};

export default ActivityHeatmapContainer;
