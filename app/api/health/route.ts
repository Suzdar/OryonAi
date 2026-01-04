import { withAuth } from "@/lib/api-guards";
import { NextResponse } from "next/server";

export async function GET() {
  return withAuth(async (session: any) => {
    return NextResponse.json({
      message: "API is running",
      version: "1.0.0",
      user: session.user.email,
      tier: session.user.tier,
    });
  });
}
