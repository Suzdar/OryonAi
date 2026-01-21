import { getTranslations, setRequestLocale } from "next-intl/server";
import { requireAuth } from "@/lib/auth-guards";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("settings");
  const session = await requireAuth();

  return (
    <div className="max-w-4xl space-y-6">
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{t("description")}</p>
      </div>

      <div className="cosmic-card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t("profile.title")}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              {t("profile.name")}
            </label>
            <input
              type="text"
              defaultValue={session.user.name || ""}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#1F1D24] text-gray-900 dark:text-white focus:ring-2 focus:ring-cosmic-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              {t("profile.email")}
            </label>
            <input
              type="email"
              defaultValue={session.user.email}
              disabled
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-gray-700 dark:text-gray-400">
              {t("profile.emailNote")}
            </p>
          </div>
          <button className="cosmic-button">{t("profile.save")}</button>
        </div>
      </div>

      <div className="cosmic-card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t("security.title")}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              {t("security.current")}
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#1F1D24] text-gray-900 dark:text-white focus:ring-2 focus:ring-cosmic-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              {t("security.new")}
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#1F1D24] text-gray-900 dark:text-white focus:ring-2 focus:ring-cosmic-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              {t("security.confirm")}
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#1F1D24] text-gray-900 dark:text-white focus:ring-2 focus:ring-cosmic-500 focus:border-transparent"
            />
          </div>
          <button className="cosmic-button">{t("security.update")}</button>
        </div>
      </div>

      <div className="cosmic-card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t("language.title")}</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{t("language.description")}</p>
        <LanguageSwitcher />
      </div>

      <div className="cosmic-card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t("subscription.title")}</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{t("subscription.currentPlan")}</p>
            <p className="text-2xl font-bold cosmic-text-gradient">{session.user.tier}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              {t("subscription.status")}: {session.user.subscriptionStatus}
            </p>
          </div>
          <a
            href={`/${locale}/dashboard/upgrade`}
            className="cosmic-button"
          >
            {t("subscription.manage")}
          </a>
        </div>
      </div>
    </div>
  );
}
