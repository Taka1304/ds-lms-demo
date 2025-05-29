import { Hono } from "hono";
import { getSubmission } from "~/submission/getSubmission";
import { getSubmissionList } from "~/submission/getSubmissionList";
import { updateSubmission } from "~/submission/updateSubmission";

export const submissions = new Hono()
  .get("/", ...getSubmissionList)
  .get("/:submission_id", ...getSubmission)
  .patch("/:submission_id", ...updateSubmission);
