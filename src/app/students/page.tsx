import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityHeatmapContainer from "@/features/dashboard/container/activity-heatmap";
import ProgressOverviewContainer from "@/features/dashboard/container/progress-overview";
import { RecentSubmissionsContainer } from "@/features/dashboard/container/recent-submissions";
import { UserGreeting } from "@/features/dashboard/user-greeting";
import { authOptions } from "@/lib/auth";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: {
    template: "%s - ds-lms-demo",
    absolute: "Dashboard",
  },
  description: "学習進捗状況の確認と最近の活動",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <UserGreeting user={session?.user} />
        {/* <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
        </div> */}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>アクティビティ</CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <ActivityHeatmapContainer />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>進捗状況</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressOverviewContainer />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>最近のコース</CardTitle>
            <CardDescription>最近追加されたコースと進行中のコース</CardDescription>
          </CardHeader>
          <CardContent>
            Coming soon...
            {/* <RecentCourses /> */}
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>最近の提出</CardTitle>
            <CardDescription>最近解いた問題と結果</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSubmissionsContainer />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
