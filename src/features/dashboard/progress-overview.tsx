"use client";
import { Progress } from "@/components/ui/progress";
import { client } from "@/lib/hono";
import type { InferResponseType } from "hono";

const req = client.api.courses.$get;

type CourseProgressOverviewProps = {
  courseProgress: InferResponseType<typeof req, 200>;
};

export function ProgressOverview({ courseProgress }: CourseProgressOverviewProps) {
  return (
    <div className="space-y-4">
      {courseProgress.map((course) => (
        <div key={course.id} className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">{course.title}</span>
            <span className="text-sm text-muted-foreground">
              {`${course.UserProgress[0].progress} / ${course._count.problems} 問`}
            </span>
          </div>
          <Progress
            value={course._count.problems === 0 ? 0 : (course.UserProgress[0].progress / course._count.problems) * 100}
            className="h-2"
          />
        </div>
      ))}
    </div>
  );
}
