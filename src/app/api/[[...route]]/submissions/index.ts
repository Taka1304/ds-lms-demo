import { Hono } from "hono";
import { getSubmission } from "./getSubmission";
import { getSubmissionList } from "./getSubmissionList";
import { updateSubmission } from "./updateSubmission";

export const submissions = new Hono()
  .get("/", ...getSubmissionList)
  .get("/:submission_id", ...getSubmission)
  .patch("/:submission_id", ...updateSubmission);
