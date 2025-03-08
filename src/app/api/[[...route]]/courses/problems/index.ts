import { Hono } from "hono";
import { getProblemList } from "./getProblemList";

const problems = new Hono()
  .get("/", ...getProblemList)

export default problems;
