# Quick Start: API Status Monitoring

## ✅ What's Already Done

1. Health check API: `/api/status/check` ✓
2. Database schema: `api_status_logs` table ✓
3. Status page UI with auto-refresh ✓
4. Usage tracker for real API calls ✓
5. Background cron job endpoint ✓

## 🚀 Setup Steps (5 minutes)

### 1. Create Database Table

Go to your Supabase SQL Editor and run:

```sql
CREATE TABLE IF NOT EXISTS api_status_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  api_id VARCHAR(100) NOT NULL,
  api_name VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('operational', 'degraded', 'outage')),
  response_time INTEGER NOT NULL,
  checked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_api_status_logs_api_id ON api_status_logs(api_id);
CREATE INDEX idx_api_status_logs_checked_at ON api_status_logs(checked_at DESC);

ALTER TABLE api_status_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read status logs"
  ON api_status_logs FOR SELECT TO authenticated USING (true);
```

### 2. Test Status Monitoring

Visit: `http://localhost:3000/dashboard/status`

You should see all Visma APIs with their current status!

### 3. Enable Background Checks (Optional)

Create `vercel.json` in project root:

```json
{
  "crons": [{
    "path": "/api/cron/status-check",
    "schedule": "*/5 * * * *"
  }]
}
```

### 4. Track Your API Calls (Recommended)

In any file making Visma API calls:

```typescript
// BEFORE:
const response = await fetch('https://api.visma.net/v1/companies', {
  headers: { Authorization: `Bearer ${token}` }
});

// AFTER:
import { trackedFetch } from '@/lib/api-tracker';

const response = await trackedFetch(
  'visma-erp',
  'https://api.visma.net/v1/companies',
  { headers: { Authorization: `Bearer ${token}` } }
);
```

That's it! Now you're tracking real usage.

## 📊 How It Works

### Automatic Health Checks
- HEAD requests to Visma API base URLs
- No data transfer, just connectivity check
- Response time monitoring
- Stores results in database

### Status Determination
- **Operational**: < 2s response, HTTP 2xx
- **Degraded**: 2-5s response or 4xx errors
- **Outage**: > 5s, 5xx errors, or timeout

### Uptime Calculation
Based on last 100 checks:
```
Uptime = (successful checks / total checks) × 100%
```

## 🧪 Test It

### Manual Test
```bash
# PowerShell
curl http://localhost:3000/api/status/check

# Should return:
# {
#   "overallStatus": "operational",
#   "apis": [...],
#   "lastUpdated": "2026-01-09T..."
# }
```

### Database Check
```sql
-- View recent status checks
SELECT 
  api_name,
  status,
  response_time,
  checked_at
FROM api_status_logs
ORDER BY checked_at DESC
LIMIT 10;
```

## 🎯 Features

✅ **Self-contained** - No third-party services  
✅ **Real-time** - Live status checks  
✅ **Historical** - Tracks trends over time  
✅ **Automatic** - Background monitoring  
✅ **Usage-based** - Monitors actual API calls  

## 📈 Next Steps

1. Run the database migration ⏳
2. Test the status page ⏳
3. Set up background cron ⏳
4. Wrap API calls with tracker ⏳
5. Monitor uptime trends 📊

Full documentation: `docs/api-status-monitoring.md`
