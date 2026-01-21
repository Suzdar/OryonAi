/**
 * API Status Tracker
 * 
 * Tracks the success/failure of actual Visma API calls made by your application
 * This provides real-world monitoring based on user activity
 * 
 * Usage:
 * 
 * import { trackApiCall } from '@/lib/api-tracker';
 * 
 * // Wrap your API calls
 * try {
 *   const response = await fetch('https://api.visma.net/v1/companies', {
 *     headers: { Authorization: `Bearer ${token}` }
 *   });
 *   
 *   await trackApiCall('visma-erp', true, response.status, responseTime);
 *   
 *   return response.json();
 * } catch (error) {
 *   await trackApiCall('visma-erp', false, 0, responseTime);
 *   throw error;
 * }
 */

import { db } from './db';

export type ApiId = 
  | 'visma-erp'
  | 'business-nxt'
  | 'employee-api'
  | 'payroll-api'
  | 'calendar-api'
  | 'datamart-api';

const API_NAMES: Record<ApiId, string> = {
  'visma-erp': 'Visma.net ERP API',
  'business-nxt': 'Business NXT API',
  'employee-api': 'Employee API',
  'payroll-api': 'Payroll API',
  'calendar-api': 'Calendar API',
  'datamart-api': 'Datamart API',
};

interface ApiCallResult {
  apiId: ApiId;
  success: boolean;
  statusCode: number;
  responseTime: number;
  timestamp: Date;
}

/**
 * Track an API call result for monitoring
 * Determines status based on success and response time
 */
export async function trackApiCall(
  apiId: ApiId,
  success: boolean,
  statusCode: number,
  responseTime: number
): Promise<void> {
  try {
    // Determine status from call result
    let status: 'operational' | 'degraded' | 'outage';
    
    if (!success || statusCode >= 500) {
      status = 'outage';
    } else if (statusCode >= 400 || responseTime > 3000) {
      status = 'degraded';
    } else if (responseTime > 2000) {
      status = 'degraded';
    } else {
      status = 'operational';
    }

    // Store in database
    await db.apiStatusLog.create({
      data: {
        apiId,
        apiName: API_NAMES[apiId],
        status,
        responseTime,
        checkedAt: new Date(),
      },
    });
  } catch (error) {
    // Don't let tracking errors break the main application
    console.error('Failed to track API call:', error);
  }
}

/**
 * Wrapper for fetch that automatically tracks API calls
 * 
 * @example
 * const data = await trackedFetch('visma-erp', 'https://api.visma.net/v1/companies', {
 *   headers: { Authorization: `Bearer ${token}` }
 * });
 */
export async function trackedFetch(
  apiId: ApiId,
  url: string,
  options?: RequestInit
): Promise<Response> {
  const startTime = Date.now();
  let response: Response;
  let success = false;
  let statusCode = 0;

  try {
    response = await fetch(url, options);
    success = response.ok;
    statusCode = response.status;
    return response;
  } catch (error) {
    success = false;
    statusCode = 0;
    throw error;
  } finally {
    const responseTime = Date.now() - startTime;
    
    // Track in background (don't await)
    trackApiCall(apiId, success, statusCode, responseTime).catch(err => {
      console.error('Background tracking failed:', err);
    });
  }
}

/**
 * Get recent API usage statistics
 * Useful for dashboard widgets or admin panels
 */
export async function getApiStatistics(apiId: ApiId, minutes: number = 60) {
  const since = new Date(Date.now() - minutes * 60 * 1000);
  
  const logs = await db.apiStatusLog.findMany({
    where: { apiId },
    orderBy: { checkedAt: 'desc' },
  });

  const recentLogs = logs.filter(log => log.checkedAt >= since);

  if (recentLogs.length === 0) {
    return null;
  }

  const totalCalls = recentLogs.length;
  const successfulCalls = recentLogs.filter(log => log.status === 'operational').length;
  const avgResponseTime = recentLogs.reduce((sum, log) => sum + log.responseTime, 0) / totalCalls;
  const uptime = (successfulCalls / totalCalls) * 100;

  return {
    apiId,
    apiName: API_NAMES[apiId],
    totalCalls,
    successfulCalls,
    uptime: parseFloat(uptime.toFixed(2)),
    avgResponseTime: Math.round(avgResponseTime),
    timeRange: `Last ${minutes} minutes`,
  };
}
