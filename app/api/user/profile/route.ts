import { withAuth } from "@/lib/api-guards";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return withAuth(async (session: any) => {
    return NextResponse.json({
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        tier: session.user.tier,
        subscriptionStatus: session.user.subscriptionStatus,
      },
    });
  });
}
