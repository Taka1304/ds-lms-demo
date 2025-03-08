import { Hono } from "hono";
import problems from "./problems";


export const courses = new Hono()
  .route("/problems", problems)

