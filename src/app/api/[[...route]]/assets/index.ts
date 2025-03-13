import { Hono } from "hono";
import { uploadAsset } from "./uploadAsset";

export const assets = new Hono()
  .post("/", ...uploadAsset);
  