import { Hono } from "hono";
import { createProblem } from "./createProblem";
import { getProblemList } from "./getProblemList";

const problems = new Hono()
  .get("/", ...getProblemList)
  .post("/", ...createProblem);

export default problems;
