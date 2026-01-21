"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import { navigation } from "@/components/Sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ArrowRightOnRectangleIcon, HomeIcon, SpeedGaugeIcon } from "@/components/icons";

export function DashboardMobileNav({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const t = useTranslations("nav");
  const currentLocale = useLocale();

  const localePrefix = locale ? `/${locale}` : "";

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden border-b border-cosmic-800 bg-gradient-to-b from-cosmic-900 via-cosmic-950 to-dark-50 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cosmic-700 bg-white/95 text-cosmic-600 shadow-sm transition hover:shadow"
            aria-label="Go to homepage"
            title="Homepage"
            onClick={close}
          >
            <HomeIcon className="h-5 w-5" />
          </Link>
          {session?.user && (
            <Link
              href={`${localePrefix}/dashboard`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cosmic-700 bg-white/95 text-cosmic-600 shadow-sm transition hover:shadow"
              aria-label={t("dashboard")}
              title={t("dashboard")}
              onClick={close}
            >
              <SpeedGaugeIcon className="h-6 w-6" />
            </Link>
          )}
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cosmic-700 bg-white/95 text-cosmic-600 shadow-sm ring-1 ring-black/10 transition hover:shadow-md"
          aria-label="Toggle dashboard menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="mt-3 space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
          <div className="space-y-3">
            {navigation.map((item) => {
              const localizedHref = `/${currentLocale}${item.href}`;
              return (
                <Link
                  key={item.href}
                  href={localizedHref}
                  className="block rounded-lg px-3 py-2 text-gray-900 hover:bg-gray-50 font-medium"
                  onClick={close}
                >
                  {t(item.name)}
                </Link>
              );
            })}
          </div>
          <div className="border-t border-gray-200 pt-4 space-y-3">
            <LanguageSwitcher />
            {session?.user ? (
              <div className="flex items-center gap-3">
                <Link
                  href={`${localePrefix}/dashboard`}
                  className="flex-1 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-cosmic-700 font-semibold shadow-sm hover:shadow-md transition"
                  onClick={close}
                >
                  {t("dashboard")}
                </Link>
                <button
                  onClick={() => {
                    close();
                    signOut({ callbackUrl: `/${currentLocale}` });
                  }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-cosmic-600 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
                  aria-label={t("signOut")}
                  title={t("signOut")}
                  type="button"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href={`${localePrefix}/login`}
                  className="flex-1 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 font-semibold shadow-sm hover:shadow-md transition"
                  onClick={close}
                >
                  {t("login")}
                </Link>
                <Link
                  href={`${localePrefix}/signup`}
                  className="flex-1 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cosmic-600 to-nebula-600 px-4 py-2 text-white font-semibold shadow-sm hover:shadow-md transition"
                  onClick={close}
                >
                  {t("signup")}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
