import { prisma } from "@/lib/prisma";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

// Check if the email is from the university
const checkDomain = (email: string) => {
  const arrowDomains = [
    "@planet.kanazawa-it.ac.jp",
    "@st.kanazawa-it.ac.jp",
  ]
  return arrowDomains.some((domain) => email.endsWith(domain));
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // TODO: 
    // GithubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID || "",
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    // }),
    // AzureADProvider({
    //   clientId: process.env.AZURE_CLIENT_ID || "",
    //   clientSecret: process.env.AZURE_CLIENT_SECRET || "",
    //   tenantId: process.env.AZURE_TENANT_ID || "",
    // }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
    async signIn({ account, profile }) {
      if (profile?.email && account?.provider === "google") {

        const googleProfile = profile as GoogleProfile;

        if (checkDomain(googleProfile.email)) {
          // Access Granted
          const user = await prisma.user.upsert({
            where: { email: googleProfile.email },
            update: {},
            create: {
              email: googleProfile.email,
              name: googleProfile.name || "No Name",
              displayName: googleProfile.name || "No Name",
              iconImage: googleProfile.picture,
            },
          })
          await prisma.userProvider.upsert({
            where: { provider_providerId: { provider: account.provider, providerId: account.providerAccountId } },
            update: {},
            create: {
              providerId: account.providerAccountId,
              provider: account.provider,
              email: googleProfile.email,
              userId: user.id,
              iconImage: googleProfile.picture,
              displayName: googleProfile.name || "No Name",
            },
          });
          
          return true;
        }
        // Access Denied
        return false;
      }
      // TODO: Add other providers
      return true
    }
  },
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // newUser: '/auth/new-user',
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };