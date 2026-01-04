import { requireAuth } from "@/lib/auth-guards";

export default async function DashboardPage() {
  const session = await requireAuth();

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session.user.name}!
        </h1>
        <p className="mt-2 text-gray-700">
          Here's an overview of your account
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Subscription Card */}
        <div className="cosmic-card">
          <h3 className="text-sm font-medium text-gray-700">Current Plan</h3>
          <p className="mt-2 text-3xl font-bold cosmic-text-gradient">
            {session.user.tier}
          </p>
          <p className="mt-1 text-sm text-gray-700">
            Status: {session.user.subscriptionStatus}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="cosmic-card">
          <h3 className="text-sm font-medium text-gray-700">Account Status</h3>
          <p className="mt-2 text-3xl font-bold text-galaxy-700">Active</p>
          <p className="mt-1 text-sm text-gray-700">Member since today</p>
        </div>

        {/* Usage */}
        <div className="cosmic-card">
          <h3 className="text-sm font-medium text-gray-700">API Usage</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
          <p className="mt-1 text-sm text-gray-700">Requests this month</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 cosmic-card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <a
            href="/dashboard/docs"
            className="rounded-lg border-2 border-dark-200 p-4 transition-colors hover:border-cosmic-500 hover:bg-cosmic-50"
          >
            <h3 className="font-semibold text-gray-900">View Documentation</h3>
            <p className="mt-1 text-sm text-gray-700">
              Learn how to get started
            </p>
          </a>
          <a
            href="/dashboard/settings"
            className="rounded-lg border-2 border-dark-200 p-4 transition-colors hover:border-nebula-500 hover:bg-nebula-50"
          >
            <h3 className="font-semibold text-gray-900">Account Settings</h3>
            <p className="mt-1 text-sm text-gray-700">
              Manage your preferences
            </p>
          </a>
          <a
            href="/dashboard/upgrade"
            className="rounded-lg border-2 border-cosmic-500 bg-cosmic-50 p-4 transition-colors hover:bg-cosmic-100"
          >
            <h3 className="font-semibold text-cosmic-900">Upgrade Plan</h3>
            <p className="mt-1 text-sm text-cosmic-700">
              Unlock more features
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
