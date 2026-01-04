"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
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

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Analytics", href: "/dashboard/analytics", icon: ChartBarIcon, requiredTier: "LITE" },
  { name: "Pro Features", href: "/dashboard/pro", icon: SparklesIcon, requiredTier: "PRO" },
  { name: "Documentation", href: "/dashboard/docs", icon: DocumentTextIcon },
  { name: "Settings", href: "/dashboard/settings", icon: CogIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-gradient-to-b from-cosmic-900 via-cosmic-950 to-dark-50">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-cosmic-800">
        <div className="flex items-center gap-2">
          <LogoOryon className="text-2xl text-white" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const userTier = session?.user?.tier || "FREE";
          const isLocked = item.requiredTier && userTier === "FREE";

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-cosmic-600 to-nebula-600 text-white shadow-lg shadow-cosmic-500/50"
                    : "text-gray-300 hover:bg-cosmic-800/50 hover:text-white"
                }
                ${isLocked ? "opacity-50" : ""}
              `}
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
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
      <div className="border-t border-cosmic-800 p-4">
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
          className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-cosmic-800/50 hover:text-white"
        >
          <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
