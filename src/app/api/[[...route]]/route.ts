import { Hono } from "hono";
import { handle } from "hono/vercel";
import { assets } from "~/assets";
import { courses } from "~/courses";
import { dashboard } from "~/dashboard";
import { problems } from "~/problems";
import { submissions } from "~/submissions";
import { users } from "~/users";

export const runtime = "nodejs";

const app = new Hono()
  .basePath("/api")
  .route("/courses", courses)
  .route("/problems", problems)
  .route("/submissions", submissions)
  .route("/assets", assets)
  .route("/users", users)
  .route("/dashboard", dashboard);

export type AppType = typeof app;

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
