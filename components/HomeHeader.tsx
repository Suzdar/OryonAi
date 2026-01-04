"use client";

import Link from "next/link";
import { LogoOryon } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslations } from 'next-intl';

export function HomeHeader({ locale }: { locale?: string }) {
  const localePrefix = locale ? `/${locale}` : '';
  const t = useTranslations('nav');
  
  return (
    <header className="border-b border-gray-200 bg-white backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <LogoOryon className="text-3xl sm:text-4xl text-cosmic-600" />
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href={`${localePrefix}/about`}
              className="text-gray-700 hover:text-cosmic-600 font-medium transition-colors"
            >
              {t('about')}
            </Link>
            <Link
              href={`${localePrefix}/faq`}
              className="text-gray-700 hover:text-cosmic-600 font-medium transition-colors"
            >
              {t('faq')}
            </Link>
            <Link
              href={`${localePrefix}/support`}
              className="text-gray-700 hover:text-cosmic-600 font-medium transition-colors"
            >
              {t('support')}
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
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
          </div>
        </div>
      </div>
    </header>
  );
}
