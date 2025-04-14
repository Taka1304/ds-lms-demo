import { Hono } from "hono";
import { createProblem } from "./createProblem";
import { getProblem } from "./getProblem";
import { getProblemList } from "./getProblemList";
import { submitProblem } from "./submitProblem";
import { getSubmission } from "~/courses/problems/getSubmission";

const problems = new Hono()
  .get("/", ...getProblemList)
  .post("/", ...createProblem)
  .get("/:problem_id", ...getProblem)
  .get("/:problem_id/submission", ...getSubmission)
  
  .post("/:problem_id/submit", ...submitProblem);

export default problems;
