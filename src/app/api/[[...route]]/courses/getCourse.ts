import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";
import { getServerSession } from "next-auth";
import { z } from "zod";

const factory = createFactory();

export const getCourse = factory.createHandlers(
  zValidator(
    "param",
    z.object({
      course_id: z.string().cuid(),
    }),
  ),
  async (c) => {
    const { course_id } = c.req.valid("param");

    const session = await getServerSession(authOptions);
    const isAdmin = session?.user.role === "ADMIN";

    try {
      const data = await prisma.course.findFirst({
        include: {
          problems: {
            include: {
              tags: true,
            }
          },
          UserProgress: isAdmin ? true : {
            where: {
              userId: session?.user.id,
            },
          }
        },
        where: {
          id: course_id,
        },
      });

      if (!data) {
        return c.json({ error: "指定されたコースが見つかりませんでした" }, 404);
      }
      return c.json(data);
    } catch (error) {
      console.error("データの取得中にエラーが発生しました:", error);
      return c.json({ error: "データの取得中にエラーが発生しました", details: error as string }, 500);
    }
  },
);