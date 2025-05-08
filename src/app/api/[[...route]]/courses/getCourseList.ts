import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";
import type { Session } from "next-auth";
import { z } from "zod";
import { getSession } from "~/middleware/auth";

type Variables = {
  session: Session;
};

const factory = createFactory<{ Variables: Variables }>();

export const getCourseList = factory.createHandlers(
  getSession,
  zValidator(
    "query",
    z
      .object({
        search: z.string().optional(),
      })
      .optional(), // query全体をオプショナルにする
  ),
  async (c) => {
    const query = c.req.valid("query");
    const search = query?.search;
    const session = c.get("session");

    try {
      const data = await prisma.course.findMany({
        where: {
          ...(search && { title: { contains: search } }),
          ...(session?.user.role !== "ADMIN" && { isPublic: true }),
        },
        include: {
          UserProgress: session?.user.id ? { where: { userId: session.user.id } } : false,
          _count: { select: { problems: true } },
        },
      });
      return c.json(data);
    } catch (error) {
      console.error("問題の取得中にエラーが発生しました:", error);
      return c.json({ error: "問題の取得中にエラーが発生しました", details: error as string }, 500);
    }
  },
);
