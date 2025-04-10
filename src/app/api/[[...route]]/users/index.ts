import { Hono } from "hono";
import { getUser } from "~/users/getUser";
import { updateUser } from "~/users/updateUser";

export const users = new Hono()
  .get("/:user_id", ...getUser)
  .patch("/:user_id", ...updateUser);
