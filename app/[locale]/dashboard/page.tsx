import { getTranslations, setRequestLocale } from "next-intl/server";
import { requireAuth } from "@/lib/auth-guards";
import { StatusPrefetcher } from "@/components/StatusPrefetcher";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("dashboard");
  const session = await requireAuth();
  const isNorwegian = locale === "no";

  return (
    <div className="max-w-7xl">
      <StatusPrefetcher />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t("welcome")}, {session.user.name}!
        </h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{t("overview")}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="cosmic-card">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400">{t("currentPlan")}</h3>
          <p className="mt-2 text-3xl font-bold cosmic-text-gradient">
            {session.user.tier}
          </p>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
            {t("subscriptionStatus")}: {session.user.subscriptionStatus}
          </p>
        </div>

        <div className="cosmic-card">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400">{t("accountStatusTitle")}</h3>
          <p className="mt-2 text-3xl font-bold text-galaxy-700 dark:text-galaxy-400">{t("accountStatusActive")}</p>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">{t("memberSince")}</p>
        </div>

        <div className="cosmic-card">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400">{t("apiUsage")}</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">0</p>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">{t("requestsThisMonth")}</p>
        </div>
      </div>

      <div className="mt-8 cosmic-card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t("quickActions")}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <a
            href={`/${locale}/dashboard/docs`}
            className="rounded-lg border-2 border-dark-200 dark:border-gray-700 p-4 transition-colors hover:border-cosmic-500 hover:bg-cosmic-50 dark:hover:bg-gray-800"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white">{t("viewDocs")}</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">{t("viewDocsDesc")}</p>
          </a>
          <a
            href={`/${locale}/dashboard/settings`}
            className="rounded-lg border-2 border-dark-200 dark:border-gray-700 p-4 transition-colors hover:border-nebula-500 hover:bg-nebula-50 dark:hover:bg-gray-800"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white">{t("accountSettings")}</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">{t("accountSettingsDesc")}</p>
          </a>
          <a
            href={`/${locale}/dashboard/upgrade`}
            className="rounded-lg border-2 border-cosmic-500 bg-cosmic-50 dark:bg-cosmic-900/20 p-4 transition-colors hover:bg-cosmic-100 dark:hover:bg-cosmic-900/30"
          >
            <h3 className="font-semibold text-cosmic-900 dark:text-cosmic-300">{t("upgradePlan")}</h3>
            <p className="mt-1 text-sm text-cosmic-700 dark:text-cosmic-400">{t("upgradePlanDesc")}</p>
          </a>
          <a
            href={`/${locale}/dashboard/chat`}
            className="rounded-lg border-2 border-amber-200 dark:border-amber-800 p-4 transition-colors hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white">{isNorwegian ? "AI-assistent" : "AI Assistant"}</h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
              {isNorwegian ? "Åpne chatten" : "Open the chat"}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
