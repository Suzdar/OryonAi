import { withSubscription } from "@/lib/api-guards";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return withSubscription(async (session: any) => {
    // Mock analytics data
    const analyticsData = {
      overview: {
        totalRequests: 1234,
        averageResponseTime: 245,
        errorRate: 0.5,
        uptime: 99.9,
      },
      timeSeries: [
        { date: "2026-01-01", requests: 150, avgResponseTime: 240 },
        { date: "2026-01-02", requests: 180, avgResponseTime: 250 },
      ],
      topEndpoints: [
        { endpoint: "/api/user/profile", requests: 450 },
        { endpoint: "/api/user/usage", requests: 320 },
      ],
    };

    return NextResponse.json(analyticsData);
  }, "PRO"); // Requires PRO tier or higher
}
