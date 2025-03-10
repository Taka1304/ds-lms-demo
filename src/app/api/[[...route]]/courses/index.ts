import { Hono } from "hono";
import problems from "./problems";
import { getCourseList } from "./getCourseList";
import { createCourse } from "./createCourse";

export const courses = new Hono()
  .route("/problems", problems)
  .get("/", ...getCourseList)
  .post("/", ...createCourse)


