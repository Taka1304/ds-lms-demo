import { Hono } from "hono";
import { createProblem } from "./createProblem";
import { getProblem } from "./getProblem";
import { getProblemList } from "./getProblemList";

const problems = new Hono()
  .get("/", ...getProblemList)
  .post("/", ...createProblem)
  .get("/:problem_id", ...getProblem);

export default problems;
