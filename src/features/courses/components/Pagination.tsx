import { Button } from "@/components/ui/button";
import type { CoursesCard } from "@/features/courses/types/Courses";

export default function Pagination({
  courses,
  currentIndex,
  goToSlide,
}: { courses: CoursesCard[]; currentIndex: number; goToSlide: (index: number) => void }) {
  return (
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
  );
}
