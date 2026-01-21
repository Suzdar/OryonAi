"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import {
  HomeIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  SparklesIcon,
} from "@/components/icons";
import { LogoOryon } from "@/components/Logo";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  requiredTier?: string;
}

export const navigation: NavItem[] = [
  { name: "dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "aiAssistant", href: "/dashboard/chat", icon: SparklesIcon },
  { name: "analytics", href: "/dashboard/analytics", icon: ChartBarIcon, requiredTier: "LITE" },
  { name: "status", href: "/dashboard/status", icon: ChartBarIcon },
  { name: "proFeatures", href: "/dashboard/pro", icon: SparklesIcon, requiredTier: "PRO" },
  { name: "documentation", href: "/dashboard/docs", icon: DocumentTextIcon },
  { name: "settings", href: "/dashboard/settings", icon: CogIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const locale = useLocale();
  const t = useTranslations("nav");

  const handleSignOut = () => {
    signOut({ callbackUrl: `/${locale}/login` });
  };

  return (
    <div className="hidden h-screen w-64 flex-col bg-gradient-to-b from-cosmic-900 via-cosmic-950 to-dark-50 dark:from-gray-900 dark:via-gray-950 dark:to-black lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-cosmic-800 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <LogoOryon className="text-2xl text-white" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const localizedHref = `/${locale}${item.href}`;
          const isActive = pathname === localizedHref;
          const Icon = item.icon;
          const userTier = session?.user?.tier || "FREE";
          const isLocked = item.requiredTier && userTier === "FREE";

          return (
            <Link
              key={item.name}
              href={localizedHref}
              className={`
                group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-cosmic-600 to-nebula-600 text-white shadow-lg shadow-cosmic-500/50"
                    : "text-gray-300 hover:bg-cosmic-800/50 dark:hover:bg-gray-800 hover:text-white"
                }
                ${isLocked ? "opacity-50" : ""}
              `}
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {t(item.name)}
              {isLocked && (
                <svg
                  className="ml-auto h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User info and logout */}
      <div className="border-t border-cosmic-800 dark:border-gray-800 p-4">
        <div className="mb-3">
          <p className="text-sm font-medium text-white">{session?.user?.name}</p>
          <p className="text-xs text-gray-400">{session?.user?.email}</p>
          <div className="mt-2">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-cosmic-600 to-nebula-600 px-2.5 py-0.5 text-xs font-medium text-white shadow-lg">
              {session?.user?.tier}
            </span>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-cosmic-800/50 dark:hover:bg-gray-800 hover:text-white"
        >
          <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
          {t("signOut")}
        </button>
      </div>
    </div>
  );
}
