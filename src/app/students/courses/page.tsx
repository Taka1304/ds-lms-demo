"use client";
import {} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import CardCarousel from "@/features/courses/components/CardCarousel";
import type { Course } from "@/features/courses/components/CardCarousel";
import {} from "react";

// TODO: dummy
const allCourses: Course[] = [];

for (let i = 0; i < 10; i++) {
  allCourses.push({
    id: i + 1,
    title: "Beginner Programming",
    description: "Learn how to resolve problem by using programming",
    achievementLevel: 10,
    maxAchievementLevel: 23,
  });
}

export default function ProblemList() {
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
        <CardCarousel courses={allCourses} />
        {/* TODO: Pagination */}
      </div>
    </>
  );
}
