import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { $Enums } from "@prisma/client";
import { createFactory } from "hono/factory";
import type { Session } from "next-auth";
import { z } from "zod";
import { withSession } from "~/middleware/auth";

type Variables = {
  session: Session;
};

const factory = createFactory<{ Variables: Variables }>();

export const updateSubmission = factory.createHandlers(
  withSession,
  zValidator(
    "param",
    z.object({
      submission_id: z.string().cuid(),
    }),
  ),
  zValidator(
    "json",
    z.object({
      TestResult: z.array(
        z.object({
          testCaseId: z.string().cuid(),
          status: z.enum([
            $Enums.ResultStatus.AC,
            $Enums.ResultStatus.WA,
            $Enums.ResultStatus.TLE,
            $Enums.ResultStatus.RE,
            $Enums.ResultStatus.CE,
          ]),
          output: z.string(),
          error: z.string().optional(),
        }),
      ),
      score: z.number().min(0).max(100),
      status: z.enum(["PENDING", "EVALUATED"]),
    }),
  ),
  async (c) => {
    const { submission_id } = c.req.valid("param");
    const json = c.req.valid("json");
    const session = c.get("session");

    try {
      const data = await prisma.submission.update({
        where: {
          id: submission_id,
          userId: session.user.role === "ADMIN" ? undefined : session.user.id,
        },
        data: {
          ...json,
          TestResult: {
            createMany: {
              data: json.TestResult.map((result) => ({
                testCaseId: result.testCaseId,
                status: result.status,
                actualOutput: result.output,
                errorLog: result.error ?? null,
              })),
            },
          },
        },
      });
      return c.json(data);
    } catch (error) {
      return c.json(
        {
          error: "提出内容の更新中にエラーが発生しました",
          details: error instanceof Error ? error.message : String(error),
        },
        500,
      );
    }
  },
);
