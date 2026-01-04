import { withSubscription } from "@/lib/api-guards";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return withSubscription(async (session: any) => {
    // Mock usage data
    const usageLimits: Record<string, { limit: number; daily?: boolean }> = {
      FREE: { limit: 100, daily: true },
      LITE: { limit: 1000, daily: true },
      PRO: { limit: 10000, daily: true },
      ADVANCED: { limit: -1 }, // Unlimited
    };

    const tier = session.user.tier;
    const limits = usageLimits[tier] || usageLimits.FREE;

    return NextResponse.json({
      requests: Math.floor(Math.random() * 500),
      limit: limits.limit,
      period: limits.daily ? "daily" : "monthly",
      tier: tier,
    });
  }, "LITE"); // Requires at least LITE tier
}
