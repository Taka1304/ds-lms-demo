import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";
import { getServerSession } from "next-auth";
import { z } from "zod";

const factory = createFactory();

export const createProblem = factory.createHandlers(
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
      courseId: z.number(),
    }),
  ),
  async (c) => {
    const json = c.req.valid("json");
    const session = await getServerSession();

    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    try {
      const data = await prisma.problem.create({
        data: {
          ...json,
          createdById: session.user.id,
          updatedById: session.user.id,
        },
      });
      return c.json(data);
    } catch (error) {
      console.error("問題の作成中にエラーが発生しました:", error);
      return c.json({ error: "問題の作成中にエラーが発生しました", details: error as string }, 500);
    }
  },
);
