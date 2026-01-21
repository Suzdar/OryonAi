import { NextResponse } from 'next/server';

/**
 * Background Cron Job: API Status Monitoring
 * 
 * This endpoint should be called periodically (every 5 minutes recommended)
 * by Vercel Cron, GitHub Actions, or external cron service
 * 
 * Setup Instructions:
 * 
 * 1. Vercel Cron (Recommended):
 *    Create vercel.json in project root:
 *    {
 *      "crons": [{
 *        "path": "/api/cron/status-check",
 *        "schedule": "*/5 * * * *"
 *      }]
 *    }
 * 
 * 2. External Cron (cron-job.org, EasyCron):
 *    Set up job to call: https://your-domain.com/api/cron/status-check
 *    Authorization: Bearer YOUR_CRON_SECRET
 *    Schedule: */5 * * * * (every 5 minutes)
 * 
 * 3. Add to .env.local:
 *    CRON_SECRET=your-random-secret-here
 */

export async function GET(request: Request) {
  // Verify cron authorization
  const authHeader = request.headers.get('authorization');
  const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;
  
  // For Vercel Cron, they provide special headers
  const isVercelCron = request.headers.get('user-agent')?.includes('vercel-cron');
  
  if (!isVercelCron && authHeader !== expectedAuth) {
    return NextResponse.json(
      { error: 'Unauthorized - Invalid cron secret' },
      { status: 401 }
    );
  }

  try {
    // Call the main status check endpoint
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/status/check`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Status check failed: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Status check completed',
      timestamp: new Date().toISOString(),
      overallStatus: data.overallStatus,
      checkedApis: data.apis.length,
    });
  } catch (error: any) {
    console.error('Cron job failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Prevent route from being cached
export const dynamic = 'force-dynamic';
export const revalidate = 0;
