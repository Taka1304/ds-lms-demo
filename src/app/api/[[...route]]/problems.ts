import { Hono } from "hono";

// TDDO: 
const app = new Hono()
  .get("/", (c) => c.text("Hello World"))
  .get("/:id", (c) => c.text(`Hello ${c.req.param("id")}`));

export default app