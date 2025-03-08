import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { $Enums } from "@prisma/client";
import { createFactory } from "hono/factory";
import { getServerSession } from "next-auth";
import { z } from "zod";

const factory = createFactory();

export const createCourse = factory.createHandlers(
  zValidator(
    "json",
    z.object({
      title: z.string(),
      image: z.string().optional(),
      description: z.string().optional(),
      isPublic: z.boolean().optional(),
    }),
  ),
  async (c) => {
    const json = c.req.valid("json");
    const session = await getServerSession(authOptions);

    // TODO: middleware に置き換える
    if (!session) {
      return c.json({ error: "認証されていません" }, 401);
    }
    if (session.user.role !== $Enums.SystemRole.ADMIN) {
      return c.json({ error: "権限がありません" }, 403);
    }

    try {
      const data = await prisma.course.create({
        data: {
          ...json,
        },
      });
      return c.json(data);
    } catch (error) {
      console.error("コースの作成中にエラーが発生しました:", error);
      return c.json({ error: "コースの作成中にエラーが発生しました", details: error as string }, 500);
    }
  },
);