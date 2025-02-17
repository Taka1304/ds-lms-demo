"use client";
import CardCarousel from "@/components/ui/CardCarousel";
import {} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {} from "react";

// TODO: dummy
// dummy
const allCourses = [
  {
    id: 1,
    title: "Beginner Programming",
    description: "Learn how to resolve problem by using programming",
    achievementLevel: 10,
    maxAchievementLevel: 23,
  },
  {
    id: 2,
    title: "Beginner Programming",
    description: "Learn how to resolve problem by using programming",
    achievementLevel: 10,
    maxAchievementLevel: 23,
  },
  {
    id: 3,
    title: "Beginner Programming",
    description: "Learn how to resolve problem by using programming",
    achievementLevel: 10,
    maxAchievementLevel: 23,
  },
  {
    id: 4,
    title: "Beginner Programming",
    description: "Learn how to resolve problem by using programming",
    achievementLevel: 10,
    maxAchievementLevel: 23,
  },
  {
    id: 5,
    title: "Beginner Programming",
    description: "Learn how to resolve problem by using programming",
    achievementLevel: 10,
    maxAchievementLevel: 23,
  },
  {
    id: 6,
    title: "Beginner Programming",
    description: "Learn how to resolve problem by using programming",
    achievementLevel: 10,
    maxAchievementLevel: 23,
  },
  {
    id: 7,
    title: "Beginner Programming",
    description: "Learn how to resolve problem by using programming",
    achievementLevel: 10,
    maxAchievementLevel: 23,
  },
  {
    id: 8,
    title: "Beginner Programming",
    description: "Learn how to resolve problem by using programming",
    achievementLevel: 10,
    maxAchievementLevel: 23,
  },
];

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
