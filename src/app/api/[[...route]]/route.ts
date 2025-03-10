import { Hono } from "hono"
import { handle } from "hono/vercel"
import { courses } from "./courses"

export const runtime = "nodejs"

const app = new Hono()
  .basePath("/api")
  .route("/courses", courses)

export type AppType = typeof app

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)