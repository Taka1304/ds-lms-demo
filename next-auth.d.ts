import type { $Enums } from "@prisma/client";
import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: $Enums.SystemRole;
    displayName?: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: $Enums.SystemRole;
      displayName: string;
    } & DefaultSession["user"];
  }

  interface Profile extends DefaultProfile {
    emails?: string[];
    given_name?: string;
    family_name?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: $Enums.SystemRole;
    displayName: string;
  }
}
