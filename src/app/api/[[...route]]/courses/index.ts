import { Hono } from "hono";
import { createCourse } from "./createCourse";
import { deleteCourse } from "./deleteCourse";
import { getCourse } from "./getCourse";
import { getCourseList } from "./getCourseList";
import problems from "./problems";
import { updateCourse } from "./updateCourse";

export const courses = new Hono()
  .route("/problems", problems)
  .post("/", ...createCourse)
  .delete("/:course_id", ...deleteCourse)
  .get("/:course_id", ...getCourse)
  .patch("/:course_id", ...updateCourse)
  .get("/", ...getCourseList);
