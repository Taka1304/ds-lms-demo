"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { SlideCard } from "@/features/courses/types/CardSlider";
import Image from "next/image";
import Link from "next/link";

// ダミーデータ
// ダミーデータのallCoursesとrelatedCoursesはidが重複してはいけません。
// ここでは、allCoursesのidは1から10、relatedCoursesのidは11から20としています。
// START:dummy
const allCourses: SlideCard[] = [];
for (let i = 1; i <= 10; i++) {
  allCourses.push({
    id: i,
    title: "Data Analysis",
    description: "Learn how to analyze data",
    achievementLevel: 10,
    maxAchievementLevel: 23,
  });
}

const relatedCourses: SlideCard[] = [];
for (let i = 11; i <= 20; i++) {
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
        {/* カードスライダー */}
        {/* 
        CardCarouselコンポーネントのidは一意にしてください。
        そうしないとナビゲーションボタンの紐付けがうまくできません。
        */}
        {/* Most Popular */}
        <h1 className="text-xl font-bold pl-6">Most Popular</h1>
        {/* カードスライダー */}
        <div>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-sm"
          >
            <CarouselContent>
              {allCourses.map((item, _) => (
                <CarouselItem key={item.id}>
                  <CardSlider {...allCourses[item.id]} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        {/* Related Courses */}
        <h1 className="text-xl font-bold pl-6">Related Courses</h1>
        {/* カードスライダー */}
      </div>
    </>
  );
}

// カードコンポーネント
function CardSlider({
  id,
  title,
  description,
  achievementLevel,
  maxAchievementLevel,
}: { id: number; title: string; description: string; achievementLevel: number; maxAchievementLevel: number }) {
  const progressValue = (achievementLevel / maxAchievementLevel) * 100;

  return (
    <Card className="w-full max-w-[255px] shadow-md rounded-[36px] mb-11">
      <div className="relative w-full h-[184px]">
        <Image src={"/courseLogo.webp"} alt={title} layout="fill" objectFit="cover" className="rounded-t-[36px]" />
      </div>

      <CardHeader className="pl-3 pb-2 pt-2">
        <CardTitle className="text-lg font-semibold leading-tight">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-500 leading-normal">{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        {/* プログレスバー */}
        <div className="w-full flex items-center justify-between">
          <Progress value={progressValue} className="h-2 bg-gray-200 w-full" />
          <p className="min-w-[50px] max-w-[70px] text-[9px] text-right text-gray-500 ml-2">
            {achievementLevel} / {maxAchievementLevel} 完了
          </p>
        </div>

        {/* ボタン */}
        <div className="w-full flex justify-center mt-2">
          <Link href={`/students/courses/${id}`} className="rounded-md shadow-md">
            <Button className="w-[93px] h-[40px] bg-[#327fd6]">はじめる</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
