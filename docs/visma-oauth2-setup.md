# Visma OAuth2 Setup Guide

## Overview

OryonAI now uses authenticated OAuth2 calls to check Visma API status. This ensures we're testing actual API functionality, not just server availability.

## Step 1: Create Visma OAuth2 Application

1. Go to https://developer.visma.com/
2. Sign in (or create account)
3. Navigate to **My Applications**
4. Click **Create New Application**
5. Fill in details:
   - Name: "OryonAI Status Monitor"
   - Description: "Automated API health monitoring"
   - Redirect URI: `http://localhost:3000/api/auth/callback/visma` (or your deployed URL)
6. Select **Client Credentials** grant type
7. Copy the **Client ID** and **Client Secret**

## Step 2: Add Credentials to Environment

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your credentials:
   ```env
   VISMA_CLIENT_ID=your_client_id_from_visma
   VISMA_CLIENT_SECRET=your_client_secret_from_visma
   CRON_SECRET=generate_random_string_here
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. To generate `CRON_SECRET`:
   ```bash
   # PowerShell
   [System.Security.Cryptography.RNGCryptoServiceProvider]::new().GetBytes(32) | ForEach-Object { $_.ToString("X2") } | Join-String
   
   # Or just use any random 32-character string
   ```

## Step 3: Test the Setup

### Test OAuth2 Token
```bash
# PowerShell
$body = @{
  grant_type = "client_credentials"
  client_id = "your_client_id"
  client_secret = "your_client_secret"
  scope = "api"
} | ConvertTo-Json

curl -X POST https://connect.visma.com/connect/token `
  -H "Content-Type: application/x-www-form-urlencoded" `
  -Body ([System.Web.HttpUtility]::UrlEncode($body))
```

Should return:
```json
{
  "access_token": "eyJ0...",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

### Test Health Check Endpoint
```bash
curl http://localhost:3000/api/status/check
```

Should return:
```json
{
  "overallStatus": "operational",
  "apis": [
    {
      "id": "visma-erp",
      "name": "Visma.net ERP API",
      "status": "operational",
      "uptime": 99.9,
      "responseTime": 234,
      "lastChecked": "2026-01-09T10:30:00.000Z"
    }
  ],
  "lastUpdated": "2026-01-09T10:30:00.000Z"
}
```

### Test Status Page
Visit: `http://localhost:3000/dashboard/status`

You should see live API status with:
- ✅ Real-time status checks
- 📊 Historical uptime percentages
- ⚡ Response times
- 🔄 Auto-refresh every 2 minutes

## How It Works

### 1. Token Management
- Obtains access token using client credentials
- Caches token for ~1 hour
- Automatically refreshes when expired
- File: `/lib/visma-auth.ts`

### 2. Health Checks
- Makes authenticated GET requests to real API endpoints
- Measures response time (determines if degraded)
- Checks HTTP status (determines if operational/degraded/outage)
- Stores results in database
- File: `/app/api/status/check/route.ts`

### 3. Status Logic
```
Operational: 200-299 + responseTime < 5s
Degraded: 4xx errors OR responseTime 5-8s
Outage: 5xx errors OR timeout OR 401/403 auth failure
```

### 4. Database Storage
Every check is stored with:
- API ID and name
- Status (operational/degraded/outage)
- Response time (milliseconds)
- Timestamp

Uptime calculated from last 100 checks.

## Troubleshooting

### "Missing Visma OAuth2 credentials"

**Solution**: Add to `.env.local`:
```env
VISMA_CLIENT_ID=your_id
VISMA_CLIENT_SECRET=your_secret
```

### "Visma auth failed: 401"

**Cause**: Invalid credentials

**Solution**:
1. Verify credentials in Visma developer portal
2. Check they're copied correctly (no extra spaces)
3. Ensure app has "api" scope enabled

### "All APIs showing outage"

**Possible causes**:
- Visma APIs actually down
- Network/firewall blocking requests
- Invalid test endpoints
- Rate limit exceeded

**Debug**:
Check server logs for:
```
[visma-erp] Authentication failed: 401
[visma-erp] Server error: 503
[visma-erp] Request timeout after 8000ms
```

## Production Deployment

### For Vercel:
1. Add environment variables in Vercel Dashboard:
   - `VISMA_CLIENT_ID`
   - `VISMA_CLIENT_SECRET`
   - `CRON_SECRET`
   - `NEXT_PUBLIC_BASE_URL=https://your-domain.com`

2. Update Visma OAuth app redirect URI to production URL

### For Other Platforms:
Set the same environment variables as shown above.

## Files Modified

- `lib/visma-auth.ts` - OAuth2 token management
- `app/api/status/check/route.ts` - Health check with authenticated calls
- `.env.example` - Template for environment variables
- `lib/db.ts` - Database methods for storing logs

## Next Steps

1. ✅ Create OAuth2 app in Visma
2. ✅ Add credentials to `.env.local`
3. ✅ Test `/api/status/check` endpoint
4. ✅ Visit `/dashboard/status` page
5. ⏳ Set up background cron monitoring
6. ⏳ Monitor uptime trends

Ready to monitor! 🚀
