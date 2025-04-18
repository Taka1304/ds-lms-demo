import { Hono } from "hono";
import { createProblem } from "./createProblem";
import { getProblem } from "./getProblem";
import { getProblemList } from "./getProblemList";
import { submitProblem } from "./submitProblem";
import { getSubmission } from "~/courses/problems/getSubmission";
import { updateSubmission } from "~/courses/problems/updateSubmission";

const problems = new Hono()
  .get("/", ...getProblemList)
  .post("/", ...createProblem)
  .get("/:problem_id", ...getProblem)
  .get("/:problem_id/:submission_id", ...getSubmission)
  .patch("/:problem_id/:submission_id", ...updateSubmission)
  .post("/:problem_id/submit", ...submitProblem);

export default problems;
