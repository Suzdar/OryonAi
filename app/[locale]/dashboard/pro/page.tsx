import { requireSubscription } from "@/lib/auth-guards";

export default async function ProPage() {
  const session = await requireSubscription("PRO");

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pro Features</h1>
        <p className="mt-2 text-gray-700">
          Advanced capabilities for power users
        </p>
      </div>

      <div className="space-y-6">
        {/* Feature Showcase */}
        <div className="rounded-lg cosmic-bg-gradient p-8 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Welcome to Pro!</h2>
          <p className="text-cosmic-100">
            You now have access to all premium features including advanced analytics,
            custom integrations, and priority support.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Advanced Features */}
          <div className="cosmic-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Advanced Analytics
            </h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Custom dashboards
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Real-time monitoring
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Data export
              </li>
            </ul>
          </div>

          <div className="cosmic-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Custom Integrations
            </h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Webhook support
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                API access
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Third-party integrations
              </li>
            </ul>
          </div>
        </div>

        {/* Upgrade Notice */}
        <div className="rounded-lg bg-nebula-50 border border-nebula-200 p-6">
          <h3 className="text-lg font-semibold text-nebula-900 mb-2">
            Want even more?
          </h3>
          <p className="text-sm text-nebula-800 mb-4">
            Upgrade to ADVANCED tier for enterprise features, dedicated support, and custom SLAs.
          </p>
          <a
            href="/dashboard/upgrade"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-nebula-600 hover:bg-nebula-700"
          >
            View Advanced Tier
          </a>
        </div>
      </div>
    </div>
  );
}
