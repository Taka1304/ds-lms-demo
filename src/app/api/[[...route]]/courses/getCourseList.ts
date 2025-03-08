import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";
import { z } from "zod";

const factory = createFactory();

export const getCourseList = factory.createHandlers(
  zValidator(
    "query",
    z.object({
      search: z.string().optional(),
    }),
  ),
  async (c) => {
    const { search } = c.req.valid("query");
    try {
      const data = await prisma.course.findMany({
        where: {
          title: {
            contains: search, // 部分一致で検索
          },
        },
      });
      return c.json(data);
    } catch (error) {
      console.error("問題の取得中にエラーが発生しました:", error);
      return c.json({ error: "問題の取得中にエラーが発生しました", details: error as string }, 500);
    }
  },
);
