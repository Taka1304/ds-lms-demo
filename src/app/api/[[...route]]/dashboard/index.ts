import { Hono } from "hono";
import { activityHeatmap } from "~/dashboard/activityHeatmap";

export const dashboard = new Hono().get("/activity-heatmap", ...activityHeatmap);
