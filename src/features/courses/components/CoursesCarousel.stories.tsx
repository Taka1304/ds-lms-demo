import type { client } from "@/lib/hono";
import type { Meta, StoryObj } from "@storybook/react";
import type { InferResponseType } from "hono";
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

type Course = InferResponseType<typeof client.api.courses.$get, 200>;

const sampleCourses: Course = [
  {
    id: "1",
    title: "Sample Course 1",
    description: "This is a sample course description.",
    image: "",
    isPublic: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
    UserProgress: {
      progress: 5,
    },
    _count: { problems: 10 },
  },
  {
    id: "2",
    title: "Sample Course 2",
    description: "This is another sample course description.",
    image: "",
    isPublic: false,
    createdAt: "2023-02-01T00:00:00Z",
    updatedAt: "2023-02-02T00:00:00Z",
    UserProgress: {
      progress: 15,
    },
    _count: { problems: 15 },
  },
  {
    id: "3",
    title: "Sample Course 3",
    description: "Yet another sample course description.",
    image: "",
    isPublic: true,
    createdAt: "2023-03-01T00:00:00Z",
    updatedAt: "2023-03-02T00:00:00Z",
    UserProgress: {
      progress: 15,
    },
    _count: { problems: 15 },
  },
  {
    id: "4",
    title: "Sample Course 4",
    description: "A fourth sample course description.",
    image: "",
    isPublic: true,
    createdAt: "2023-04-01T00:00:00Z",
    updatedAt: "2023-04-02T00:00:00Z",
    UserProgress: {
      progress: 25,
    },
    _count: { problems: 5 },
  },
  {
    id: "5",
    title: "Sample Course 5",
    description: "The fifth sample course description.",
    image: "",
    isPublic: false,
    createdAt: "2023-05-01T00:00:00Z",
    updatedAt: "2023-05-02T00:00:00Z",
    UserProgress: {
      progress: 0,
    },
    _count: { problems: 8 },
  },
];

export const Default: Story = {
  args: {
    courses: sampleCourses,
  },
};
