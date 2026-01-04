import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import HomeHeader from "@/components/HomeHeader";
import { getTranslations } from 'next-intl/server';

export default async function Page({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const session = await getServerSession(authOptions);
  const t = await getTranslations('home');

  // If already logged in, redirect to dashboard
  if (session) {
    redirect(`/${locale}/dashboard`);
  }

  return (
    <div className="min-h-screen bg-white">
      <HomeHeader locale={locale} />

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold cosmic-text-gradient sm:text-6xl md:text-7xl">
              {t('hero.title')}
              <span className="block cosmic-text-gradient mt-2">
                {t('hero.subtitle')} <span className="logo-planet">O</span>ryon
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
              {t('hero.description')}
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href={`/${locale}/signup`}
                className="cosmic-button text-lg px-8 py-4"
              >
                {t('hero.startFreeTrial')}
              </Link>
              <Link
                href={`/${locale}/login`}
                className="bg-white text-cosmic-600 border-2 border-cosmic-600 px-8 py-4 rounded-lg hover:bg-gray-50 font-semibold text-lg transition-colors"
              >
                {t('hero.signIn')}
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-32 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="cosmic-card">
              <div className="w-12 h-12 bg-cosmic-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-cosmic-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold cosmic-text-gradient mb-2">
                {t('features.instantGuidance.title')}
              </h3>
              <p className="text-gray-600">
                {t('features.instantGuidance.description')}
              </p>
            </div>

            <div className="cosmic-card">
              <div className="w-12 h-12 bg-nebula-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-nebula-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold cosmic-text-gradient mb-2">
                {t('features.codeExamples.title')}
              </h3>
              <p className="text-gray-600">
                {t('features.codeExamples.description')}
              </p>
            </div>

            <div className="cosmic-card">
              <div className="w-12 h-12 bg-galaxy-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-galaxy-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold cosmic-text-gradient mb-2">
                {t('features.expertKnowledge.title')}
              </h3>
              <p className="text-gray-600">
                {t('features.expertKnowledge.description')}
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-32 text-center cosmic-card">
            <h2 className="text-3xl font-bold cosmic-text-gradient mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('cta.description')}
            </p>
            <Link
              href={`/${locale}/signup`}
              className="cosmic-button inline-block text-lg px-8 py-4"
            >
              {t('cta.getStarted')}
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-4">
          <div className="space-y-2">
            <div className="text-lg font-semibold text-gray-900">Oryon</div>
            <p className="text-sm text-gray-600">AI guidance for Visma API integrations.</p>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900 mb-3">Explore</div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><Link className="hover:text-cosmic-600" href={`/${locale}/about`}>About</Link></li>
              <li><Link className="hover:text-cosmic-600" href={`/${locale}/faq`}>FAQ</Link></li>
              <li><Link className="hover:text-cosmic-600" href={`/${locale}/support`}>Support</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900 mb-3">Account</div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><Link className="hover:text-cosmic-600" href={`/${locale}/login`}>Sign In</Link></li>
              <li><Link className="hover:text-cosmic-600" href={`/${locale}/signup`}>Create Account</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900 mb-3">Contact</div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a className="hover:text-cosmic-600" href="mailto:support@oryonai.com">support@oryonai.com</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span>© 2026 Oryon. All rights reserved.</span>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${locale}/terms`} className="hover:text-cosmic-600">Terms</Link>
              <Link href={`/${locale}/privacy`} className="hover:text-cosmic-600">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
