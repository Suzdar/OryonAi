import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { HomeIcon } from "@/components/icons";
import { DashboardMobileNav } from "@/components/DashboardMobileNav";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="flex h-screen overflow-hidden text-gray-900 dark:text-gray-100 bg-white dark:bg-[#1F1D24]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-[#1F1D24] dark:via-[#2A2732] dark:to-[#1F1D24]">
        <DashboardMobileNav locale={locale} />
        <div className="hidden lg:flex justify-end gap-3 p-6">
          <Link
            href={`/${locale}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1F1D24] text-cosmic-600 dark:text-cosmic-400 shadow-sm transition hover:shadow"
            aria-label="Go to homepage"
            title="Homepage"
          >
            <HomeIcon className="h-5 w-5" />
          </Link>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        <div className="px-4 pb-6 sm:px-6 md:px-8 md:pb-8">{children}</div>
      </main>
    </div>
  );
}
