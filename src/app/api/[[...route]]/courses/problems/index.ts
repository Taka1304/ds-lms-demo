import { Hono } from "hono";
import { getSubmission } from "~/courses/problems/getSubmission";
import { updateProblem } from "~/courses/problems/updateProblem";
import { updateSubmission } from "~/courses/problems/updateSubmission";
import { createProblem } from "./createProblem";
import { getProblem } from "./getProblem";
import { getProblemList } from "./getProblemList";
import { submitProblem } from "./submitProblem";

// BaseAPIPath is /api/courses/problems
const problems = new Hono()
  .get("/", ...getProblemList)
  .post("/", ...createProblem)
  .get("/:problem_id", ...getProblem)
  .patch("/:problem_id", ...updateProblem)
  .post("/:problem_id/submit", ...submitProblem)
  .get("/submission/:submission_id", ...getSubmission)
  .patch("/submission/:submission_id", ...updateSubmission);

export default problems;
