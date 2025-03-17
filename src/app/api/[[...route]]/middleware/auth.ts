import { authOptions } from "@/lib/auth";
import { $Enums } from "@prisma/client";
import { createFactory } from "hono/factory";
import { getServerSession } from "next-auth";

const factory = createFactory();

export const getSession = factory.createMiddleware(async (c, next) => {
  const session = await getServerSession(authOptions);

  c.set("session", session);
  await next();
});

export const withSession = factory.createMiddleware(async (c, next) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  c.set("session", session);
  await next();
});

export const withAdmin = factory.createMiddleware(async (c, next) => {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  if (session.user.role !== $Enums.SystemRole.ADMIN) {
    return c.json({ error: "Forbidden" }, 403);
  }
  c.set("session", session);
  await next();
});
