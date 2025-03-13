import { authOptions } from "@/lib/auth";
import { $Enums } from "@prisma/client";
import type { MiddlewareHandler } from "hono";
import { getServerSession } from "next-auth";

export const withSession: MiddlewareHandler = async (c, next) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  c.set("session", session);
  await next();
};

export const withAdmin: MiddlewareHandler = async (c, next) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  if (session.user.role !== $Enums.SystemRole.ADMIN) {
    return c.json({ error: "Forbidden" }, 403);
  }
  c.set("session", session);
  await next();
};
