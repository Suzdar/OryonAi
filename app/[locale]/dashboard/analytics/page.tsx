import { requireSubscription } from "@/lib/auth-guards";

export default async function AnalyticsPage() {
  const session = await requireSubscription("LITE");

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-2 text-gray-700">
          Track your usage and performance metrics
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Chart Placeholder 1 */}
        <div className="cosmic-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            API Requests Over Time
          </h3>
          <div className="h-64 flex items-center justify-center bg-cosmic-50 rounded">
            <p className="text-gray-700">Chart visualization would go here</p>
          </div>
        </div>

        {/* Chart Placeholder 2 */}
        <div className="cosmic-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Response Times
          </h3>
          <div className="h-64 flex items-center justify-center bg-nebula-50 rounded">
            <p className="text-gray-700">Chart visualization would go here</p>
          </div>
        </div>

        {/* Metrics Table */}
        <div className="cosmic-card md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Detailed Metrics
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-dark-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-dark-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Total Requests
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    1,234
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-galaxy-600">
                    +12%
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Avg Response Time
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    245ms
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-galaxy-600">
                    -5%
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Error Rate
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
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

      <div className="mt-6 rounded-lg bg-cosmic-50 border border-cosmic-200 p-4">
        <p className="text-sm text-cosmic-800">
          <span className="font-semibold">LITE tier feature:</span> You have access to basic analytics. Upgrade to PRO for advanced insights and custom reports.
        </p>
      </div>
    </div>
  );
}
