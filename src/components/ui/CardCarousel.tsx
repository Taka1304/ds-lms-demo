"use client";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SlideCard from "./SlideCard";

type Course = {
  id: number;
  title: string;
  description: string;
  achievementLevel: number;
  maxAchievementLevel: number;
};

type CardCarouselProps = {
  courses: Course[];
};

export default function CardCarousel({ courses }: CardCarouselProps) {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* カスタムナビゲーションボタン */}
      <Button
        variant="ghost"
        className="absolute left-0 z-10 -ml-4 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full shadow-md"
        id="prevButton"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        className="absolute right-0 z-10 -mr-4 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full shadow-md"
        id="nextButton"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1.5}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation={{ prevEl: "#prevButton", nextEl: "#nextButton" }}
        pagination={{ clickable: true }}
        loop={true}
        className="pb-8"
      >
        {courses.map((course) => (
          <SwiperSlide key={course.id}>
            <SlideCard {...course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
