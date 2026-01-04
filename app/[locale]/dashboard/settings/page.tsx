import { requireAuth } from "@/lib/auth-guards";

export default async function SettingsPage() {
  const session = await requireAuth();

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-700">
          Manage your account preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="cosmic-card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={session.user.name || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-cosmic-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={session.user.email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-gray-700">
                Email cannot be changed
              </p>
            </div>
            <button className="cosmic-button">
              Save Changes
            </button>
          </div>
        </div>

        {/* Security Section */}
        <div className="cosmic-card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Security</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-cosmic-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-cosmic-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-cosmic-500 focus:border-transparent"
              />
            </div>
            <button className="cosmic-button">
              Update Password
            </button>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="cosmic-card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscription</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">Current Plan</p>
              <p className="text-2xl font-bold cosmic-text-gradient">{session.user.tier}</p>
              <p className="text-sm text-gray-700 mt-1">
                Status: {session.user.subscriptionStatus}
              </p>
            </div>
            <a
              href="/dashboard/upgrade"
              className="cosmic-button"
            >
              Manage Subscription
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
