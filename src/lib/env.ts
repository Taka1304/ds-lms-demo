import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]),
    DATABASE_URL: z.string().url(),
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    AZURE_AD_B2C_TENANT_NAME: z.string(),
    AZURE_AD_B2C_CLIENT_ID: z.string(),
    AZURE_AD_B2C_CLIENT_SECRET: z.string(),
    AZURE_AD_B2C_PRIMARY_USER_FLOW: z.string(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    AZURE_AD_B2C_TENANT_NAME: process.env.AZURE_AD_B2C_TENANT_NAME,
    AZURE_AD_B2C_CLIENT_ID: process.env.AZURE_AD_B2C_CLIENT_ID,
    AZURE_AD_B2C_CLIENT_SECRET: process.env.AZURE_AD_B2C_CLIENT_SECRET,
    AZURE_AD_B2C_PRIMARY_USER_FLOW: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
  },
});
