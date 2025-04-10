import { Hono } from "hono";
import { getUser } from "~/users/getUser";


export const users = new Hono()
  .get("/:user_id", ...getUser)
