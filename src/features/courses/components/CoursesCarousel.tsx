"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CoursesCarouselCard from "@/features/courses/components/CoursesCarouselCard";
import Pagination from "@/features/courses/components/Pagination";
import type { CoursesCard } from "@/features/courses/types/Courses";
import { useCallback, useEffect, useRef, useState } from "react";

// カードスライダーコンポーネント
export default function CoursesCarousel({ courses, cardWidth }: { courses: CoursesCard[]; cardWidth: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(4); // 表示枚数
  const containerRef = useRef<HTMLDivElement>(null);

  // 現在の表示枚数を計算する関数
  const updateVisibleSlides = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      setVisibleSlides(Math.floor(containerWidth / cardWidth)); // コンテナの幅 ÷ カードの幅
    }
  }, [cardWidth]);

  // 画面リサイズ時に表示枚数を更新
  useEffect(() => {
    updateVisibleSlides(); // 初回実行
    window.addEventListener("resize", updateVisibleSlides);
    return () => window.removeEventListener("resize", updateVisibleSlides);
  }, [updateVisibleSlides]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, courses.length - visibleSlides));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
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
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/4">
              <CoursesCarouselCard {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious onClick={handlePrev} disabled={currentIndex === 0} />
        <CarouselNext onClick={handleNext} disabled={currentIndex >= courses.length - visibleSlides} />
      </Carousel>

      {/* TODO: ページネーション（ドットナビゲーション） */}
      <div className="flex mt-4 space-x-2">
        <Pagination courses={courses} currentIndex={currentIndex} visibleSlides={visibleSlides} goToSlide={goToSlide} />
      </div>
    </div>
  );
}
