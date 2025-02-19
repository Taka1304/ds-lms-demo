// カードの型
type SlideCard = {
  id: number;
  title: string;
  description: string;
  achievementLevel: number;
  maxAchievementLevel: number;
};

// カードスライダーの型
type CardCarousel = {
  id: number;
  courses: SlideCard[];
};

export type Course = SlideCard;
export type CardCarouselProps = CardCarousel;
export type SlideCardProps = SlideCard;
