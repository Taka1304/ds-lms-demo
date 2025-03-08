import { Hono } from "hono";
import problems from "./problems";
import { getCourseList } from "./getCourseList";

export const courses = new Hono()
  .route("/problems", problems)
  .get("/", ...getCourseList)


