'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, ChevronDown, ChevronRight } from 'lucide-react';

type ApiStatus = 'operational' | 'degraded' | 'outage';

interface EndpointStatusData {
  id: string;
  name: string;
  url: string;
  status: ApiStatus;
  responseTime?: number;
  error?: string;
}

interface ApiStatusData {
  id: string;
  name: string;
  status: ApiStatus;
  uptime: number;
  responseTime?: number;
  lastChecked: string;
  endpoints: EndpointStatusData[];
}

interface StatusResponse {
  overallStatus: ApiStatus;
  apis: ApiStatusData[];
  lastUpdated: string;
}

export default function StatusPageClient() {
  const [apiStatuses, setApiStatuses] = useState<ApiStatusData[]>([]);
  const [overallStatus, setOverallStatus] = useState<ApiStatus>('operational');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedApis, setExpandedApis] = useState<Set<string>>(new Set());

  // Fetch API status from backend
  const fetchStatus = async ({ silent = false }: { silent?: boolean } = {}) => {
    if (!silent) {
      setIsLoading(true);
      setError(null);
    }
    
    try {
      const response = await fetch('/api/status/check');
      
      if (!response.ok) {
        throw new Error('Failed to fetch API status');
      }
      
      const data: StatusResponse = await response.json();
      
      setApiStatuses(data.apis);
      setOverallStatus(data.overallStatus);
      setLastUpdated(new Date(data.lastUpdated).toLocaleString());

      // cache in sessionStorage for faster subsequent views
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(
          'oryon-status-cache',
          JSON.stringify({ data, ts: Date.now() })
        );
      }
    } catch (err: any) {
      console.error('Error fetching API status:', err);
      setError(err.message || 'Failed to load API status');
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  };

  // Fetch on mount, using cached data if fresh
  useEffect(() => {
    const CACHE_TTL = 2 * 60 * 1000; // 2 minutes
    let usedCache = false;

    if (typeof window !== 'undefined') {
      const cached = sessionStorage.getItem('oryon-status-cache');
      if (cached) {
        try {
          const { data, ts } = JSON.parse(cached) as { data: StatusResponse; ts: number };
          if (Date.now() - ts < CACHE_TTL) {
            setApiStatuses(data.apis);
            setOverallStatus(data.overallStatus);
            setLastUpdated(new Date(data.lastUpdated).toLocaleString());
            setIsLoading(false);
            usedCache = true;
          }
        } catch (err) {
          // ignore cache parsing errors
        }
      }
    }

    fetchStatus({ silent: usedCache });
    
    // Auto-refresh every 2 minutes
    const interval = setInterval(fetchStatus, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const toggleApiExpanded = (apiId: string) => {
    setExpandedApis(prev => {
      const newSet = new Set(prev);
      if (newSet.has(apiId)) {
        newSet.delete(apiId);
      } else {
        newSet.add(apiId);
      }
      return newSet;
    });
  };

  const getStatusColor = (status: ApiStatus) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'outage':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: ApiStatus) => {
    switch (status) {
      case 'operational':
        return (
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'degraded':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'outage':
        return (
          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusText = (status: ApiStatus) => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'degraded':
        return 'Degraded Performance';
      case 'outage':
        return 'Outage';
    }
  };

  const overallStatusText = overallStatus === 'operational'
    ? 'All Systems Operational'
    : overallStatus === 'outage'
    ? 'Service Disruption'
    : 'Partial Outage';

  const overallStatusColor = overallStatus === 'operational'
    ? 'from-green-500 to-green-600'
    : overallStatus === 'outage'
    ? 'from-red-500 to-red-600'
    : 'from-yellow-500 to-yellow-600';

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-900">Error Loading Status</h2>
          <p className="mt-2 text-red-700">{error}</p>
          <button
            onClick={fetchStatus}
            className="mt-4 flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-[#E8E8E8]">API Status</h1>
          <p className="mt-2 text-gray-600 dark:text-[#B0B0B0]">
            Current operational status of all Visma APIs
          </p>
        </div>
        <button
          onClick={fetchStatus}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1F1D24] px-4 py-2 text-gray-700 dark:text-[#B0B0B0] hover:bg-gray-50 dark:hover:bg-[#2A2732] transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Overall Status */}
      <div className={`mb-8 rounded-lg bg-gradient-to-r ${overallStatusColor} p-6 text-white shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{overallStatusText}</h2>
            <p className="mt-1 text-white/90">
              Last checked: {lastUpdated || 'Loading...'}
            </p>
          </div>
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* API Status Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {apiStatuses.map((api) => {
          const isExpanded = expandedApis.has(api.id);
          const hasEndpoints = api.endpoints && api.endpoints.length > 0;
          
          return (
            <div
              key={api.id}
              className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div 
                className={`p-6 ${hasEndpoints ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                onClick={() => hasEndpoints && toggleApiExpanded(api.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {getStatusIcon(api.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">{api.name}</h3>
                        {hasEndpoints && (
                          <span className="text-xs text-gray-500">
                            ({api.endpoints.length} endpoints)
                          </span>
                        )}
                      </div>
                      <p className={`text-sm font-medium ${getStatusColor(api.status)}`}>
                        {getStatusText(api.status)}
                      </p>
                      {api.responseTime && (
                        <p className="text-xs text-gray-500 mt-1">
                          Avg response time: {api.responseTime}ms
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Uptime</p>
                      <p className="text-lg font-bold text-gray-900">{api.uptime}%</p>
                    </div>
                    {hasEndpoints && (
                      <div className="text-gray-400">
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Expandable Endpoint Details */}
              {hasEndpoints && isExpanded && (
                <div className="border-t border-gray-200 bg-gray-50 p-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">Endpoints</h4>
                  <div className="space-y-3">
                    {api.endpoints.map((endpoint) => (
                      <div
                        key={endpoint.id}
                        className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="flex-shrink-0">
                            {getStatusIcon(endpoint.status)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              {endpoint.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {endpoint.url.split('?')[0]}
                            </p>
                            {endpoint.error && (
                              <p className="text-xs text-red-600 mt-1">
                                {endpoint.error}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0">
                          {endpoint.responseTime !== undefined && (
                            <span className="text-xs text-gray-600">
                              {endpoint.responseTime}ms
                            </span>
                          )}
                          <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(endpoint.status)}`}>
                            {getStatusText(endpoint.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Status Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-900">Operational</p>
              <p className="text-xs text-gray-600">Service is running normally</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-900">Degraded</p>
              <p className="text-xs text-gray-600">Service experiencing issues</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-900">Outage</p>
              <p className="text-xs text-gray-600">Service is unavailable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
