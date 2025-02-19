"use client";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CoursesCarouselCard from "@/features/courses/components/CoursesCarouselCard";
import type { CoursesCard } from "@/features/courses/types/Courses";
import { useCallback, useEffect, useRef, useState } from "react";

// ✅ カードスライダーコンポーネント
export default function CoursesCarousel({ courses, cardWidth }: { courses: CoursesCard[]; cardWidth: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1); // 表示枚数
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ 現在の表示枚数を計算する関数
  const updateVisibleSlides = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      setVisibleSlides(Math.floor(containerWidth / cardWidth)); // コンテナの幅 ÷ カードの幅
    }
  }, [cardWidth]);

  // ✅ 画面リサイズ時に表示枚数を更新
  useEffect(() => {
    updateVisibleSlides(); // 初回実行
    window.addEventListener("resize", updateVisibleSlides);
    return () => window.removeEventListener("resize", updateVisibleSlides);
  }, [updateVisibleSlides]);

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + visibleSlides, courses.length - visibleSlides));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - visibleSlides, 0));
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
        <CarouselPrevious onClick={handlePrev} />
        <CarouselNext onClick={handleNext} />
      </Carousel>

      {/* ✅ ページネーション（ドットナビゲーション） */}
      <div className="flex mt-4 space-x-2">
        {courses.map((item) => (
          <Button
            key={item.id}
            onClick={() => goToSlide(item.id)}
            variant="ghost"
            size="icon"
            className={`w-[20px] h-[20px] rounded-full transition-all duration-301 ${
              currentIndex === item.id ? "bg-gray-800" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
