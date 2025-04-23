import { Hono } from "hono";
import { createProblem } from "./createProblem";
import { getProblem } from "./getProblem";
import { getProblemList } from "./getProblemList";
import { submitProblem } from "./submitProblem";
import { getSubmission } from "~/courses/problems/getSubmission";
import { updateSubmission } from "~/courses/problems/updateSubmission";

// BaseAPIPath is /api/courses/problems
const problems = new Hono()
  .get("/", ...getProblemList)
  .post("/", ...createProblem)
  .get("/:problem_id", ...getProblem)
  .get("/submission/:submission_id", ...getSubmission)
  .patch("/submission/:submission_id", ...updateSubmission)
  .post("/:problem_id/submit", ...submitProblem);

export default problems;
