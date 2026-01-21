-- API Status Logs Table
-- Stores historical status check results for Visma APIs
-- Used to calculate uptime percentages and track incidents

CREATE TABLE IF NOT EXISTS api_status_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  api_id VARCHAR(100) NOT NULL,
  api_name VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('operational', 'degraded', 'outage')),
  response_time INTEGER NOT NULL,
  checked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_api_status_logs_api_id ON api_status_logs(api_id);
CREATE INDEX IF NOT EXISTS idx_api_status_logs_checked_at ON api_status_logs(checked_at DESC);
CREATE INDEX IF NOT EXISTS idx_api_status_logs_composite ON api_status_logs(api_id, checked_at DESC);

-- Enable Row Level Security
ALTER TABLE api_status_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all authenticated users to read status logs
CREATE POLICY "Allow authenticated users to read status logs"
  ON api_status_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only service role can insert logs (backend only)
CREATE POLICY "Only service role can insert logs"
  ON api_status_logs
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Optional: Auto-cleanup old logs (keep last 30 days)
-- Run this periodically via a cron job or scheduled function
-- DELETE FROM api_status_logs WHERE checked_at < NOW() - INTERVAL '30 days';

-- Verify table creation
SELECT 
  api_id,
  COUNT(*) as total_checks,
  ROUND(AVG(CASE WHEN status = 'operational' THEN 100 ELSE 0 END), 2) as uptime_percent,
  AVG(response_time) as avg_response_time
FROM api_status_logs
GROUP BY api_id;
