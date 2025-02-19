// カードの型
export type SlideCard = {
  id: number;
  title: string;
  description: string;
  achievementLevel: number;
  maxAchievementLevel: number;
};

// カードスライダーの型
export type SlideCarousel = {
  id: number;
  courses: SlideCard[];
};
