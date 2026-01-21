import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "@/lib/db";

type TierCacheEntry = {
  tier: string;
  subscriptionStatus: string;
  expiresAt: number;
};

const TIER_CACHE_TTL_MS = 60_000; // 1 minute
const tierCache = new Map<string, TierCacheEntry>();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours in seconds
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          tier: user.subscription?.tier || "FREE",
          subscriptionStatus: user.subscription?.status || "active",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // On initial sign-in, copy details from the user object
      if (user) {
        token.id = user.id;
        token.tier = user.tier;
        token.subscriptionStatus = user.subscriptionStatus;
        return token;
      }

      // On subsequent requests, refresh tier/status from the DB to stay in sync
      if (token.email) {
        const email = token.email as string;
        const now = Date.now();
        const cached = tierCache.get(email);

        if (cached && cached.expiresAt > now) {
          token.tier = cached.tier;
          token.subscriptionStatus = cached.subscriptionStatus;
          return token;
        }

        if (cached) {
          tierCache.delete(email);
        }

        try {
          const dbUser = await db.user.findUnique({ where: { email } });
          if (dbUser) {
            const tier = dbUser.subscription?.tier || token.tier;
            const status = dbUser.subscription?.status || token.subscriptionStatus;
            token.tier = tier;
            token.subscriptionStatus = status;
            tierCache.set(email, {
              tier,
              subscriptionStatus: status,
              expiresAt: now + TIER_CACHE_TTL_MS,
            });
          }
        } catch (err) {
          console.error("JWT refresh error", err);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.tier = token.tier as string;
        session.user.subscriptionStatus = token.subscriptionStatus as string;
      }
      return session;
    },
  },
};
