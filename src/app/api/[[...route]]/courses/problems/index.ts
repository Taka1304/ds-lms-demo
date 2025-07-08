import { Hono } from "hono";
import { deleteProblem } from "~/courses/problems/deleteProblem";
import { getSubmission } from "~/courses/problems/getSubmission";
import { updateProblem } from "~/courses/problems/updateProblem";
import { updateSubmission } from "~/courses/problems/updateSubmission";
import { createProblem } from "./createProblem";
import { getAnswer } from "./getAnswer";
import { getAnswers } from "./getAnswers";
import { getProblem } from "./getProblem";
import { getProblemList } from "./getProblemList";
import { submitProblem } from "./submitProblem";

// BaseAPIPath is /api/courses/problems
const problems = new Hono()
  .get("/", ...getProblemList)
  .post("/", ...createProblem)
  .get("/:problem_id", ...getProblem)
  .patch("/:problem_id", ...updateProblem)
  .delete("/:problem_id", ...deleteProblem)
  .post("/:problem_id/submit", ...submitProblem)
  .get("/:problem_id/answers", ...getAnswers)
  .get("/answers/:answer_id", ...getAnswer)
  .get("/submission/:submission_id", ...getSubmission)
  .patch("/submission/:submission_id", ...updateSubmission);

export default problems;
