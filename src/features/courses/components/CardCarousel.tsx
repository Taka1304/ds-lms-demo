import { Button } from "@/components/ui/button";
import type { CardCarouselProps } from "@/features/courses/types/CardCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

// カードスライダー(カルーセル)コンポーネント
export default function CardCarousel({ id }: CardCarouselProps) {
  return (
    <div className="relative w-full max-w-[1150px] h-auto mx-auto">
      {/* カスタムナビゲーションボタン */}
      {/* 左矢印ボタン */}
      <Button
        variant="ghost"
        className="absolute left-[-30px] z-10 top-1/2 transform -translate-y-1/2 bg-white/90"
        id={`prevButton${id}`}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      {/* 右矢印ボタン */}
      <Button
        variant="ghost"
        className="absolute right-[-30px] z-10 top-1/2 transform -translate-y-1/2 bg-white/90"
        id={`nextButton${id}`}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* スライダー */}
    </div>
  );
}
