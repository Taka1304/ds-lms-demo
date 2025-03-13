import { env } from "@/lib/env";
import { hc } from "hono/client";
import type { AppType } from "~/route";

export const client = hc<AppType>(env.NEXT_PUBLIC_APP_URL);
