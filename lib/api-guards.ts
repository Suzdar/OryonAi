import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { SubscriptionTier, TIER_HIERARCHY } from "./auth-guards";

export async function withAuth(handler: Function) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  return handler(session);
}

export async function withSubscription(
  handler: Function,
  minTier: SubscriptionTier = "LITE"
) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  const userTier = session.user.tier as SubscriptionTier;
  const userTierLevel = TIER_HIERARCHY[userTier];
  const requiredTierLevel = TIER_HIERARCHY[minTier];
  
  if (userTierLevel < requiredTierLevel) {
    return NextResponse.json(
      { error: "Subscription tier too low", required: minTier, current: userTier },
      { status: 403 }
    );
  }
  
  if (session.user.subscriptionStatus !== "active") {
    return NextResponse.json(
      { error: "Inactive subscription" },
      { status: 403 }
    );
  }
  
  return handler(session);
}
