import { requireAuth } from "@/lib/auth-guards";

const plans = [
  {
    name: "Free",
    tier: "FREE",
    price: "$0",
    period: "/month",
    description: "Perfect for trying out the platform",
    features: [
      "Basic dashboard access",
      "Limited API calls",
      "Community support",
      "Basic documentation",
    ],
    cta: "Switch to Free",
    highlighted: false,
  },
  {
    name: "Lite",
    tier: "LITE",
    price: "$29",
    period: "/month",
    description: "Great for small teams and projects",
    features: [
      "Everything in Free",
      "Analytics dashboard",
      "Increased API limits",
      "Email support",
      "Priority documentation access",
    ],
    cta: "Upgrade to Lite",
    highlighted: false,
  },
  {
    name: "Pro",
    tier: "PRO",
    price: "$99",
    period: "/month",
    description: "For professional teams and businesses",
    features: [
      "Everything in Lite",
      "Advanced analytics",
      "Custom integrations",
      "Webhook support",
      "Priority support",
      "Custom reports",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    name: "Advanced",
    tier: "ADVANCED",
    price: "$299",
    period: "/month",
    description: "Enterprise-grade features and support",
    features: [
      "Everything in Pro",
      "Dedicated support",
      "Custom SLAs",
      "Advanced security",
      "Unlimited API calls",
      "White-label options",
      "Custom training",
    ],
    cta: "Upgrade to Advanced",
    highlighted: false,
  },
];

export default async function UpgradePage() {
  const session = await requireAuth();
  const currentTier = (session.user.tier || "").toUpperCase();

  return (
    <div className="max-w-7xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Choose Your Plan</h1>
        <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
          Select the perfect plan for your needs
        </p>
        <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-cosmic-100 text-cosmic-800">
          Current Plan: <span className="ml-2 font-semibold">{currentTier}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.tier}
            className={`rounded-lg ${
              plan.highlighted
                ? "border-2 border-cosmic-500 shadow-xl scale-105 cosmic-bg-gradient/10"
                : "border border-gray-200 shadow"
            } cosmic-card relative`}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <div className="mt-4 flex flex-wrap items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold leading-tight cosmic-text-gradient">
                  {plan.price}
                </span>
                <span className="text-base sm:text-xl text-gray-700 dark:text-gray-300 leading-tight">{plan.period}</span>
              </div>
              <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">{plan.description}</p>
            </div>

            <ul className="mb-8 space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-galaxy-500 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-800 dark:text-gray-200">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              disabled={currentTier === plan.tier}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                currentTier === plan.tier
                  ? "bg-gray-200 dark:bg-[#2A2732] text-gray-700 dark:text-[#B0B0B0] cursor-not-allowed"
                  : plan.highlighted
                  ? "cosmic-button"
                    : "bg-white dark:bg-[#1F1D24] text-cosmic-600 dark:text-cosmic-400 border-2 border-cosmic-600 dark:border-cosmic-500 hover:bg-cosmic-50 dark:hover:bg-[#2A2732]"
              }`}
            >
              {currentTier === plan.tier ? "Current Plan" : plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-gray-100 dark:bg-[#1F1D24] p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Need a custom plan?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Contact our sales team for enterprise solutions and volume pricing.
        </p>
          <button className="px-6 py-3 bg-gray-900 dark:bg-[#1F1D24] dark:border dark:border-gray-700 text-white dark:text-[#E8E8E8] rounded-lg hover:bg-gray-800 dark:hover:bg-[#2A2732] transition-colors">
          Contact Sales
        </button>
      </div>
    </div>
  );
}
