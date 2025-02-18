"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import CardCarousel from "@/features/courses/components/CardCarousel";
import type { Course } from "@/features/courses/types/CardCarousel";

// ダミーデータ
const allCourses: Course[] = [];
for (let i = 1; i <= 10; i++) {
  allCourses.push({
    id: i,
    title: "Data Analysis",
    description: "Learn how to analyze data",
    achievementLevel: 10,
    maxAchievementLevel: 23,
  });
}

const relatedCourses: Course[] = [];
for (let i = 11; i <= 20; i++) {
  relatedCourses.push({
    id: i,
    title: "Data Analysis",
    description: "Learn how to analyze data",
    achievementLevel: 10,
    maxAchievementLevel: 23,
  });
}

export default function CourseList() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h2 className="text-3xl">COURSES</h2>
        </div>
      </header>
      <div className="space-y-6 container mx-auto px-4 py-8 min-h-[calc(100vh-60px)]">
        {/* カードスライダー */}
        {/* Most Popular */}
        <h1 className="text-xl font-bold pl-6">Most Popular</h1>
        <CardCarousel courses={allCourses} id={1} />
        {/* Related Courses */}
        <h1 className="text-xl font-bold pl-6">Related Courses</h1>
        <CardCarousel courses={relatedCourses} id={2} />
      </div>
    </>
  );
}
