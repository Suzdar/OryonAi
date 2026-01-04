import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export type SubscriptionTier = "FREE" | "LITE" | "PRO" | "ADVANCED";

export const TIER_HIERARCHY: Record<SubscriptionTier, number> = {
  FREE: 0,
  LITE: 1,
  PRO: 2,
  ADVANCED: 3,
};

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }
  
  return session;
}

export async function requireSubscription(minTier: SubscriptionTier = "LITE") {
  const session = await requireAuth();
  
  const userTier = session.user.tier as SubscriptionTier;
  const userTierLevel = TIER_HIERARCHY[userTier];
  const requiredTierLevel = TIER_HIERARCHY[minTier];
  
  if (userTierLevel < requiredTierLevel) {
    redirect("/dashboard/upgrade");
  }
  
  return session;
}

export function hasAccess(userTier: SubscriptionTier, requiredTier: SubscriptionTier): boolean {
  return TIER_HIERARCHY[userTier] >= TIER_HIERARCHY[requiredTier];
}

export function isActiveSubscription(status: string): boolean {
  return status === "active";
}
