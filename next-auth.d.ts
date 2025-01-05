import type { $Enums } from "@prisma/client";
import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: $Enums.SystemRole;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: $Enums.SystemRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: $Enums.SystemRole;
  }
}
