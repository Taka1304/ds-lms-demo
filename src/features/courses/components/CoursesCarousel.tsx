"use client";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import CoursesCarouselCard from "@/features/courses/components/CoursesCarouselCard";
import type { client } from "@/lib/hono";
import type { InferResponseType } from "hono";

type Props = {
  courses: InferResponseType<typeof client.api.courses.$get, 200>;
};

export default function CoursesCarousel({ courses }: Props) {
  return (
    <Carousel>
      <CarouselContent className="-ml-2 md:-ml-4">
        {courses.map((course) => (
          <CarouselItem key={course.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
            <CoursesCarouselCard
              id={course.id}
              title={course.title}
              description={course.description || ""}
              achievementLevel={course.UserProgress?.[0]?.progress || 0}
              maxAchievementLevel={course._count.problems}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
