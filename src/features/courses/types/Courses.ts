// カードの型
export type CoursesCard = {
  id: number;
  title: string;
  description: string;
  achievementLevel: number;
  maxAchievementLevel: number;
};

// カードスライダーの型
export type CoursesCarousel = {
  id: number;
  courses: CoursesCard[];
};
