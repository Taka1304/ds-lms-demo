import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/hono";
import type { ConvertDateToString } from "@/types/utils";
import type { TestResult } from "@prisma/client";
import dayjs from "dayjs";
import type { InferResponseType } from "hono";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

const req = client.api.submissions.$get;
type RecentSubmission = InferResponseType<typeof req, 200>;

type Props = {
  recentSubmissions: RecentSubmission;
};

// 提出状態に応じたバッジの色とアイコンを設定
const resolveStatus = (testResults: ConvertDateToString<TestResult>[]) => {
  if (testResults.length === 0) {
    return { color: "bg-gray-500", icon: <XCircle className="h-4 w-4" />, label: "未評価" };
  }
  for (const testResult of testResults) {
    switch (testResult.status) {
      case "WA":
        return { color: "bg-red-500", icon: <XCircle className="h-4 w-4" />, label: "WA" };
      case "TLE":
        return { color: "bg-yellow-500", icon: <XCircle className="h-4 w-4" />, label: "TLE" };
      case "CE":
        return { color: "bg-orange-500", icon: <XCircle className="h-4 w-4" />, label: "CE" };
      case "RE":
        return { color: "bg-purple-500", icon: <XCircle className="h-4 w-4" />, label: "RE" };
    }
  }
  return { color: "bg-green-500", icon: <CheckCircle className="h-4 w-4" />, label: "AC" };
};

export function RecentSubmissions({ recentSubmissions }: Props) {
  if (recentSubmissions.length === 0) {
    return <div className="text-center text-muted-foreground">最近の提出はありません</div>;
  }

  return (
    <div className="space-y-4">
      {recentSubmissions.map((submission) => {
        const status = resolveStatus(submission.TestResult);

        return (
          <div key={submission.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className={`${status.color} text-white`}>
                {status.label}
              </Badge>
              <div>
                <p className="text-sm font-medium">{submission.problem.title}</p>
                <p className="text-xs text-muted-foreground">
                  {submission.language} • {dayjs(submission.createdAt).format("YYYY年MM月DD日 HH:mm")}
                </p>
              </div>
            </div>
            <Link href={`/students/submissions/${submission.id}`}>
              <Button variant="ghost" size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
