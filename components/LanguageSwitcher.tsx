"use client";

import { useLocale } from "next-intl";
import { locales } from "@/i18n/request";
import Link from "next/link";

export function LanguageSwitcher() {
  const locale = useLocale();

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      {locales.map((loc) => (
        <Link
          key={loc}
          href={"/" + loc}
          className={
            "px-3 py-1.5 rounded-md text-sm font-medium transition-all " +
            (locale === loc
              ? "bg-white text-cosmic-600 shadow-sm"
              : "text-gray-600 hover:text-cosmic-600")
          }
          aria-label={"Switch to " + (loc === "en" ? "English" : "Norwegian")}
        >
          {loc === "en" ? "🇬🇧 EN" : "🇳🇴 NO"}
        </Link>
      ))}
    </div>
  );
}
