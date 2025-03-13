import { Hono } from "hono";
import problems from "./problems";
import { getCourseList } from "./getCourseList";
import { createCourse } from "./createCourse";
import { getCourse } from "./getCourse";

export const courses = new Hono()
  .route("/problems", problems)
  .get("/", ...getCourseList)
  .post("/", ...createCourse)
  .get("/:course_id", ...getCourse);


