import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    tier: string;
    subscriptionStatus: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      tier: string;
      subscriptionStatus: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    tier: string;
    subscriptionStatus: string;
  }
}
