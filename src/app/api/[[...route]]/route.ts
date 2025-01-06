import { Hono } from "hono"
import { handle } from "hono/vercel"

export const runtime = "edge"

const app = new Hono().basePath("/api")

export const GET = handle(app)
export const POST = handle(app)