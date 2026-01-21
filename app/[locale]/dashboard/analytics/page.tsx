import { requireSubscription } from "@/lib/auth-guards";
import { EmptyState } from "@/components/EmptyState";

export default async function AnalyticsPage() {
  const session = await requireSubscription("LITE");
  const hasData = false; // TODO: Check if user has actual data

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Track your usage and performance metrics
        </p>
      </div>

      {!hasData ? (
        <div className="space-y-4">
          <EmptyState
            icon={
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            title="No analytics data yet"
            description="Start making API requests to see your usage metrics, response times, and error rates here."
            action={{
              label: "Go to Dashboard",
              href: "/dashboard",
            }}
          />
          
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Chart Placeholder 1 */}
          <div className="cosmic-card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              API Requests Over Time
            </h3>
            <div className="h-64 flex items-center justify-center bg-cosmic-50 rounded">
              <p className="text-gray-700 dark:text-gray-300">Chart visualization would go here</p>
            </div>
          </div>

          {/* Chart Placeholder 2 */}
          <div className="cosmic-card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Response Times
            </h3>
            <div className="h-64 flex items-center justify-center bg-nebula-50 rounded">
              <p className="text-gray-700 dark:text-gray-300">Chart visualization would go here</p>
            </div>
          </div>

          {/* Metrics Table */}
          <div className="cosmic-card md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Detailed Metrics
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-dark-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Metric
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-dark-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Total Requests
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      1,234
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-galaxy-600">
                      +12%
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Avg Response Time
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      245ms
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-galaxy-600">
                      -5%
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Error Rate
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      0.5%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-galaxy-600">
                      -2%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
