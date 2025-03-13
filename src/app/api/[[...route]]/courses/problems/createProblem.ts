import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";
import type { Session } from "next-auth";
import { z } from "zod";
import { withAdmin } from "~/middleware/auth";

type Variables = {
  session: Session;
};

const factory = createFactory<{ Variables: Variables }>();

export const createProblem = factory.createHandlers(
  withAdmin,
  zValidator(
    "json",
    z.object({
      title: z.string(),
      description: z.string(),
      slug: z.string(),
      difficultyLevel: z.number(),
      constraints: z.string(),
      timeLimit: z.number(),
      memoryLimit: z.number(),
      version: z.number(),
      isPublic: z.boolean(),
      isArchived: z.boolean(),
      courseId: z.string().cuid(),
    }),
  ),
  async (c) => {
    const { courseId, ...rest } = c.req.valid("json");
    const session = c.get("session");

    try {
      const data = await prisma.problem.create({
        data: {
          Course: {
            connect: {
              id: courseId,
            },
          },
          ...rest,
          createdById: session.user.id,
          updatedById: session.user.id,
        },
      });
      return c.json(data);
    } catch (error) {
      return c.json(
        {
          error: "問題の作成中にエラーが発生しました",
          details: error instanceof Error ? error.message : String(error),
        },
        500,
      );
    }
  },
);
