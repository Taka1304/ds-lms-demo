"use client";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";
import type { CardCarouselProps } from "@/features/courses/types/CardCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SlideCard from "./SlideCard";

export default function CardCarousel({ courses }: CardCarouselProps) {
  return (
    <div className="relative w-full max-w-[1150px] h-2/3 mx-auto">
      {/* カスタムナビゲーションボタン */}
      <Button
        variant="ghost"
        className="absolute left-[-30px] z-10 top-1/2 transform -translate-y-1/2 bg-white/90"
        id="prevButton"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        className="absolute right-[-30px] z-10 top-1/2 transform -translate-y-1/2 bg-white/90"
        id="nextButton"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={1}
        slidesPerView={1.5}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        navigation={{ prevEl: "#prevButton", nextEl: "#nextButton" }}
        pagination={{ clickable: true }}
        loop={true}
        mousewheel={true}
      >
        {courses.map((course) => (
          <SwiperSlide key={course.id}>
            <SlideCard {...course} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* 
      <div
        id="customPagination"
        className="swiper-pagination absolute bottom-[20px] left-1/2 transform -translate-x-1/2"
      />
       */}
    </div>
  );
}
