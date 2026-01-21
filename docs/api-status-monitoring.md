# API Status Monitoring - Self-Contained System

## Overview

OryonAI independently monitors Visma API health without relying on third-party services. The system uses **lightweight HEAD requests**, **historical tracking**, and **usage-based monitoring** to provide accurate real-time status.

## Architecture

### 1. **Lightweight Health Checks**
- Makes minimal HEAD requests to Visma API base URLs
- No data transfer, just connectivity verification
- Checks response time and HTTP status codes
- Runs in parallel for fast results

### 2. **Historical Database Tracking**
- Every check is stored in `api_status_logs` table
- Calculates uptime from last 100 checks
- Provides trend data over time
- Enables incident tracking

### 3. **Usage-Based Monitoring**
- Tracks actual API calls made by your application
- Real-world performance data from user requests
- Automatic failure detection
- Response time monitoring

### 4. **Background Monitoring**
- Optional cron job runs checks every 5 minutes
- Keeps status data fresh even without user visits
- No performance impact on user requests

## Status Determination Logic

```typescript
// Operational: Fast response, HTTP 2xx
if (response.ok && responseTime < 2000) → 'operational'

// Degraded: Slow or client errors
if (responseTime > 2000 || statusCode 4xx) → 'degraded'

// Outage: Very slow, server errors, or network failure
if (responseTime > 5000 || statusCode 5xx || timeout) → 'outage'
```

## Setup Instructions

### Step 1: Create Database Table

Run the migration in your Supabase dashboard:

```sql
-- Copy from database/migrations/002_api_status_logs.sql
CREATE TABLE api_status_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  api_id VARCHAR(100) NOT NULL,
  api_name VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL,
  response_time INTEGER NOT NULL,
  checked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
```

### Step 2: Update API Endpoints (Optional)

Edit [/app/api/status/check/route.ts](/app/api/status/check/route.ts) if you want to check specific endpoints:

```typescript
const VISMA_APIS = [
  {
    id: 'visma-erp',
    name: 'Visma.net ERP API',
    baseUrl: 'https://integration.visma.net', // Update if needed
    checkMethod: 'HEAD' as const,
  },
];
```

### Step 3: Track Your API Calls

Wrap your Visma API calls with the tracker:

```typescript
import { trackedFetch } from '@/lib/api-tracker';

// Instead of:
const response = await fetch('https://api.visma.net/v1/companies', options);

// Use:
const response = await trackedFetch(
  'visma-erp',
  'https://api.visma.net/v1/companies',
  options
);
```

This automatically tracks success/failure and response times!

### Step 4: Enable Background Checks (Recommended)

**Option A: Vercel Cron (Free)**

Create `vercel.json` in project root:

```json
{
  "crons": [{
    "path": "/api/cron/status-check",
    "schedule": "*/5 * * * *"
  }]
}
```

**Option B: External Cron Service**

1. Sign up at cron-job.org or EasyCron
2. Create job:
   - URL: `https://your-domain.com/api/cron/status-check`
   - Schedule: Every 5 minutes
   - Headers: `Authorization: Bearer YOUR_CRON_SECRET`
3. Add to `.env.local`:
   ```
   CRON_SECRET=your-random-secret-here
   NEXT_PUBLIC_BASE_URL=https://your-domain.com
   ```

## How It Works

### Real-Time Checks
When users visit `/dashboard/status`:
1. Page calls `/api/status/check`
2. Backend makes HEAD requests to all Visma APIs
3. Results stored in database
4. Page shows current status + historical uptime

### Background Monitoring
Every 5 minutes (via cron):
1. Cron job calls `/api/cron/status-check`
2. Triggers full health check
3. Updates database with results
4. Status page always shows fresh data

### Usage Tracking
When your app calls Visma APIs:
1. Use `trackedFetch()` wrapper
2. Automatically logs success/failure
3. Tracks response time
4. Updates status based on real usage

## Uptime Calculation

```typescript
// From last 100 checks:
const uptime = (successfulChecks / totalChecks) * 100;

// Example:
// 98 operational + 2 degraded = 98% uptime
// 95 operational + 5 outage = 95% uptime
```

## Advanced Features

### 1. View API Statistics

```typescript
import { getApiStatistics } from '@/lib/api-tracker';

// Get last hour stats
const stats = await getApiStatistics('visma-erp', 60);

console.log(stats);
// {
//   apiId: 'visma-erp',
//   totalCalls: 45,
//   successfulCalls: 44,
//   uptime: 97.78,
//   avgResponseTime: 234,
// }
```

### 2. Manual Status Tracking

```typescript
import { trackApiCall } from '@/lib/api-tracker';

try {
  const response = await fetch(url);
  const responseTime = Date.now() - startTime;
  
  await trackApiCall('visma-erp', true, response.status, responseTime);
} catch (error) {
  await trackApiCall('visma-erp', false, 0, 5000);
}
```

### 3. Cleanup Old Logs

```sql
-- Delete logs older than 30 days
DELETE FROM api_status_logs 
WHERE checked_at < NOW() - INTERVAL '30 days';
```

Run this monthly via Supabase cron or manually.

## Monitoring Best Practices

### 1. Check Frequency
- **User-triggered**: Instant (on page load)
- **Background**: Every 5 minutes
- **Usage-based**: Real-time (with every API call)

### 2. Data Retention
- Keep last 30 days for uptime calculation
- Archive older data for historical analysis
- Limit to 100 most recent checks per API

### 3. Alert Thresholds
- **Operational**: ≥ 98% uptime
- **Degraded**: 90-98% uptime
- **Outage**: < 90% uptime

## Troubleshooting

### Issue: Database errors

**Check Supabase connection:**
```bash
# Test database connection
curl https://your-project.supabase.co/rest/v1/api_status_logs \
  -H "apikey: YOUR_ANON_KEY"
```

### Issue: Cron not running

**Verify Vercel Cron:**
1. Check Vercel Dashboard → Project → Cron Jobs
2. View execution logs
3. Ensure `vercel.json` is committed

### Issue: All APIs show outage

**Possible causes:**
- Network/firewall blocking requests
- Incorrect base URLs
- CORS issues (only affects browser, not server)

**Solution:**
Test manually:
```bash
curl -I https://integration.visma.net
```

## Benefits of This Approach

✅ **Independent**: No third-party dependencies  
✅ **Real-time**: Reflects actual API performance  
✅ **Historical**: Track trends over time  
✅ **Cost-free**: No monitoring service fees  
✅ **Accurate**: Based on real usage patterns  
✅ **Lightweight**: Minimal server load  

## Next Steps

1. ✅ Database table created
2. ✅ Health check API implemented
3. ✅ Usage tracker ready
4. ⏳ Run database migration
5. ⏳ Set up background cron
6. ⏳ Wrap your API calls with tracker
7. ⏳ Test status page

Your monitoring system is ready! 🎯
