import type { CoursesCard } from "@/features/courses/types/Courses";
import type { Meta, StoryObj } from "@storybook/react";
import CoursesCarousel from "./CoursesCarousel";

const meta: Meta<typeof CoursesCarousel> = {
  title: "features/Courses/CoursesCarousel",
  component: CoursesCarousel,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof CoursesCarousel>;

const sampleCourses: CoursesCard[] = [
  {
    id: 1,
    title: "Course 1",
    description: "Description for Course 1",
    achievementLevel: 1,
    maxAchievementLevel: 5,
  },
  {
    id: 2,
    title: "Course 2",
    description: "Description for Course 2",
    achievementLevel: 2,
    maxAchievementLevel: 5,
  },
  {
    id: 3,
    title: "Course 3",
    description: "Description for Course 3",
    achievementLevel: 3,
    maxAchievementLevel: 5,
  },
  {
    id: 4,
    title: "Course 4",
    description: "Description for Course 4",
    achievementLevel: 4,
    maxAchievementLevel: 5,
  },
  {
    id: 5,
    title: "Course 5",
    description: "Description for Course 5",
    achievementLevel: 5,
    maxAchievementLevel: 5,
  },
];

export const Default: Story = {
  args: {
    courses: sampleCourses,
  },
};
