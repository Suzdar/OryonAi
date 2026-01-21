"use client";

import { useLocale } from "next-intl";
import { locales } from "@/i18n/request";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const pathWithoutLocale = locales.some((loc) => pathname?.startsWith(`/${loc}`))
    ? (pathname || "/").replace(`/${locale}`, "") || "/"
    : pathname || "/";

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    const targetPath = `/${nextLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
    router.push(targetPath);
  };

  const getLanguageLabel = (loc: string) => {
    return loc === "en" ? "English" : "Norsk";
  };

  const getLanguageFlag = (loc: string) => {
    return loc === "en" ? "🇺🇸" : "🇳🇴";
  };

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-[#B0B0B0]">
      <span className="sr-only">Change language</span>
      <div className="relative inline-block">
        <select
          value={locale}
          onChange={handleChange}
          className="appearance-none cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1F1D24] px-4 py-2 pr-10 text-sm font-medium text-gray-900 dark:text-[#E8E8E8] transition-all duration-200 hover:border-cosmic-400 dark:hover:border-cosmic-600 focus:border-cosmic-500 focus:outline-none focus:ring-2 focus:ring-cosmic-500/20"
        >
          {locales.map((loc) => (
            <option key={loc} value={loc}>
              {getLanguageFlag(loc)} {getLanguageLabel(loc)}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[#808080]">
          ▾
        </span>
      </div>
    </label>
  );
}
