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

export const deleteCourse = factory.createHandlers(
  withAdmin,
  zValidator(
    "param",
    z.object({
      course_id: z.string().cuid(),
    }),
  ),
  async (c) => {
    const { course_id } = c.req.valid("param");
    try {
      await prisma.course.delete({
        where: {
          id: course_id,
        },
      });
      const message = `コースID:${course_id}のコースが削除されました`;
      return c.json({ course_id, message }, 200);
    } catch (error) {
      console.error("コースの削除中にエラーが発生しました:", error);
      return c.json({ error: "コースの削除中にエラーが発生しました", details: error as string }, 500);
    }
  },
);
