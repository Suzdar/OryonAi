"use client";

import Link from "next/link";
import { LogoOryon } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTranslations } from 'next-intl';
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { SpeedGaugeIcon, ArrowRightOnRectangleIcon } from "@/components/icons";

export function HomeHeader({ locale }: { locale?: string }) {
  const localePrefix = locale ? `/${locale}` : '';
  const t = useTranslations('nav');
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isLoading = status === "loading";

  const navItems = [
    { href: `${localePrefix}/about`, label: t('about') },
    { href: `${localePrefix}/faq`, label: t('faq') },
    { href: `${localePrefix}/support`, label: t('support') },
  ];
  
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1F1D24] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={localePrefix || '/'} className="flex items-center gap-2">
            <LogoOryon className="text-3xl sm:text-4xl text-cosmic-600" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 dark:text-[#B0B0B0] hover:text-cosmic-600 dark:hover:text-cosmic-400 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            {/* Mobile theme toggle */}
            <div className="md:hidden">
              <ThemeToggle />
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1F1D24] text-cosmic-600 shadow-sm ring-1 ring-black/5 dark:ring-white/5 transition hover:shadow-md transform hover:scale-105 md:hidden"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>

            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <LanguageSwitcher />
              {isLoading ? (
                // Reserve space while loading to prevent layout shift
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 animate-pulse"></div>
                  <div className="h-10 w-10 rounded-full bg-gray-100 animate-pulse"></div>
                </div>
              ) : session?.user ? (
                <>
                  <div className="relative group">
                    <Link
                      href={`${localePrefix}/dashboard`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white dark:border-gray-700 dark:bg-[#1F1D24] text-cosmic-600 shadow-sm ring-1 ring-black/5 dark:ring-white/5 transition hover:shadow-md transform hover:scale-105"
                      aria-label={t('dashboard')}
                      title={t('dashboard')}
                    >
                      <SpeedGaugeIcon className="h-7 w-7" />
                    </Link>
                    <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900/95 px-3.5 py-1.5 text-sm text-white opacity-0 translate-y-1 scale-95 shadow-xl ring-1 ring-black/15 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 z-50">
                      {t('dashboard')}
                    </div>
                  </div>
                  <div className="relative group">
                    <button
                      onClick={() => signOut({ callbackUrl: locale ? `/${locale}` : '/' })}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white dark:border-gray-700 dark:bg-[#1F1D24] text-cosmic-600 shadow-sm ring-1 ring-black/5 dark:ring-white/5 transition hover:shadow-md transform hover:scale-105"
                      aria-label={t('signOut')}
                      title={t('signOut')}
                      type="button"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    </button>
                    <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900/95 px-3.5 py-1.5 text-sm text-white opacity-0 translate-y-1 scale-95 shadow-xl ring-1 ring-black/15 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 z-50">
                      {t('signOut')}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href={`${localePrefix}/login`}
                    className="text-gray-700 hover:text-cosmic-600 font-medium transition-colors"
                  >
                    {t('login')}
                  </Link>
                  <Link
                    href={`${localePrefix}/signup`}
                    className="cosmic-button"
                  >
                    {t('signup')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg md:hidden">
            <div className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-800 hover:text-cosmic-600 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 border-t border-gray-200 pt-4 space-y-3">
              <LanguageSwitcher />
              {session?.user ? (
                <div className="flex items-center gap-3">
                  <Link
                    href={`${localePrefix}/dashboard`}
                    className="flex-1 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white dark:border-gray-700 dark:bg-[#1F1D24] px-4 py-2 text-cosmic-700 dark:text-cosmic-400 font-semibold shadow-sm hover:shadow-md transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('dashboard')}
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      signOut({ callbackUrl: locale ? `/${locale}` : '/' });
                    }}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white dark:border-gray-700 dark:bg-[#1F1D24] text-cosmic-600 shadow-sm ring-1 ring-black/5 dark:ring-white/5 transition hover:shadow-md"
                    aria-label={t('signOut')}
                    title={t('signOut')}
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
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('login')}
                  </Link>
                  <Link
                    href={`${localePrefix}/signup`}
                    className="flex-1 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cosmic-600 to-nebula-600 px-4 py-2 text-white font-semibold shadow-sm hover:shadow-md transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('signup')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
