"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import CardCarousel from "@/features/courses/components/CoursesCarousel";
import type { CoursesCard } from "@/features/courses/types/Courses";

// ダミーデータ
// ダミーデータのallCoursesとrelatedCoursesはidが重複してはいけません。
// ここでは、allCoursesのidは1から10、relatedCoursesのidは11から20としています。
// START:dummy
const allCourses: CoursesCard[] = [];
for (let i = 0; i < 10; i++) {
  allCourses.push({
    id: i,
    title: "Data Analysis",
    description: "Learn how to analyze data",
    achievementLevel: 10,
    maxAchievementLevel: 23,
  });
}

const relatedCourses: CoursesCard[] = [];
for (let i = 10; i < 20; i++) {
  relatedCourses.push({
    id: i,
    title: "Data Analysis",
    description: "Learn how to analyze data",
    achievementLevel: 10,
    maxAchievementLevel: 23,
  });
}
// END:dummy

// コースページ
export default function CoursesPage() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-[#5198de] bg-opacity-40">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h2 className="text-3xl font-bold">COURSES</h2>
        </div>
      </header>
      <div className="space-y-6 container mx-auto px-4 py-8 min-h-[calc(100vh-60px)]">
        <h1 className="text-xl font-bold pl-6">Most Popular</h1>
        <CardCarousel courses={allCourses} cardWidth={255} />
        <h1 className="text-xl font-bold pl-6">Related Courses</h1>
        <CardCarousel courses={relatedCourses} cardWidth={255} />
      </div>
    </>
  );
}
