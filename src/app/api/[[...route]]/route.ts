import { Hono } from "hono"
import { handle } from "hono/vercel"
import problems from "./problems"

export const runtime = "edge"

const app = new Hono().basePath("/api")
const route = app.route("/problems", problems)

export type AppType = typeof route

export const GET = handle(app)
export const POST = handle(app)