"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CoursesCarouselCard from "@/features/courses/components/CoursesCarouselCard";
import Pagination from "@/features/courses/components/Pagination";
import type { CoursesCard } from "@/features/courses/types/Courses";
import { useCallback, useEffect, useRef, useState } from "react";

export default function CoursesCarousel({ courses }: { courses: CoursesCard[] }) {
  const cardWidth = 255;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [visibleSlides, setVisibleSlides] = useState<number>(4);

  const containerRef = useRef<HTMLDivElement>(null);

  // 現在の表示枚数を計算する関数
  const updateVisibleSlides = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;

    // Math.max(1, ...) を使うことで スライド数が 0 になる問題を防ぐ。
    setVisibleSlides(Math.max(1, Math.floor(containerWidth / cardWidth)));
  }, []);

  // 画面リサイズ時に表示枚数を更新
  useEffect(() => {
    if (!containerRef.current) return;
    updateVisibleSlides();
    window.addEventListener("resize", updateVisibleSlides);
    return () => window.removeEventListener("resize", updateVisibleSlides);
  }, [updateVisibleSlides]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - visibleSlides, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + visibleSlides, Math.max(0, courses.length - visibleSlides)));
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-5xl"
      >
        <CarouselContent
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)` }}
        >
          {courses.map((item) => (
            <CarouselItem key={item.id} style={{ flexBasis: `${100 / visibleSlides}%` }}>
              <CoursesCarouselCard {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious onClick={handlePrev} disabled={currentIndex === 0} />
        <CarouselNext onClick={handleNext} disabled={currentIndex >= courses.length - visibleSlides} />
      </Carousel>

      <div className="flex mt-4 space-x-2">
        <Pagination
          courses={courses}
          currentIndex={currentIndex}
          visibleSlides={visibleSlides}
          goToSlide={setCurrentIndex}
        />
      </div>
    </div>
  );
}
