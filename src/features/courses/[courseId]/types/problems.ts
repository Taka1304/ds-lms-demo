// src/features/courses/[courseId]/types.ts
import { client } from "@/lib/hono";
import type { InferResponseType } from "hono";

const req = client.api.courses[":course_id"].$get({ param: { course_id: "" } }, { headers: {} });

// コース API のレスポンス型
export type CourseResponse = InferResponseType<typeof req, 200>;

// その中の problems 配列の要素型
export type Problem = CourseResponse["problems"][number];
