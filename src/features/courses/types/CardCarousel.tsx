export type Course = {
  id: number;
  title: string;
  description: string;
  achievementLevel: number;
  maxAchievementLevel: number;
};

export type CardCarouselProps = {
  courses: Course[];
};
