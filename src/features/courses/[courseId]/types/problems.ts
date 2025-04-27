import { client } from "@/lib/hono";
import type { InferResponseType } from "hono";

const req = client.api.courses[":course_id"].$get({ param: { course_id: "courseId" } });

export type Problem = InferResponseType<typeof req, 200>;
