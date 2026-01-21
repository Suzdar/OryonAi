import { NextResponse } from 'next/server';
import { getVismaAccessToken } from '@/lib/visma-auth';

/**
 * GET /api/test/visma-token
 * Test endpoint to verify Visma OAuth2 connection
 * Returns token info (without exposing the actual token)
 */
export async function GET() {
  try {
    console.log('[Token Test] Attempting to obtain Visma access token...');
    
    const token = await getVismaAccessToken();
    
    // Don't expose the full token - just show it's working
    const tokenPreview = `${token.substring(0, 20)}...${token.substring(token.length - 10)}`;
    
    return NextResponse.json({
      success: true,
      message: 'Successfully obtained Visma access token',
      tokenPreview,
      tokenLength: token.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[Token Test] Failed:', error);
    
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
