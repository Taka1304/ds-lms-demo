import { Button } from "@/components/ui/button";
import type { CoursesCard } from "@/features/courses/types/Courses";

export default function Pagination({
  courses,
  currentIndex,
  visibleSlides,
  goToSlide,
}: { courses: CoursesCard[]; currentIndex: number; visibleSlides: number; goToSlide: (index: number) => void }) {
  // スライドがない場合、ページネーションを非表示にする
  if (courses.length === 0) return null;

  // currentIndex が NaN の場合は 0 にフォールバックし、比較エラーを防ぐ。
  const safeCurrentIndex = Number.isNaN(currentIndex) ? 0 : currentIndex;

  // courses.length = 0 でもページネーションが表示されるようにする。
  const totalPages = Math.max(1, Math.ceil(courses.length / visibleSlides));

  // Math.max(0, courses.length - visibleSlides) により、
  // courses.length - visibleSlides が負の値にならないよう保証する。
  const maxSlideIndex = Math.max(0, courses.length - visibleSlides);

  return (
    <>
      {Array.from({ length: totalPages }).map((_, index) => {
        // Math.min() で、現在の index * visibleSlides が courses.length - visibleSlides を超えないようにする。
        const safeIndex = Math.min(index * visibleSlides, maxSlideIndex);
        return (
          <Button
            key={courses[index * visibleSlides]?.id}
            onClick={() => {
              goToSlide(safeIndex);
            }}
            disabled={safeCurrentIndex === index * visibleSlides}
            title={`Go to slide ${index + 1}`}
            variant="ghost"
            size="icon"
            aria-label={`Go to slide ${index + 1}`}
            className={`w-[20px] h-[20px] rounded-full transition-all duration-300 ${
              safeCurrentIndex === index * visibleSlides ? "bg-gray-800 cursor-not-allowed" : "bg-gray-400"
            }`}
          />
        );
      })}
    </>
  );
}
