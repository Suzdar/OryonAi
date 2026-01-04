import { HomeHeader } from "@/components/HomeHeader";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from 'next-intl/server';
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations("home");

  return (
    <div className="min-h-screen bg-white">
      <HomeHeader locale={locale} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cosmic-950 via-cosmic-900 to-cosmic-800 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-nebula-200 to-galaxy-300 bg-clip-text text-transparent">
              {t("hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-nebula-200 mb-4">
              {t("hero.subtitle")}
            </p>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/signup`}
                className="px-8 py-4 bg-gradient-to-r from-nebula-500 to-galaxy-500 text-white rounded-lg font-semibold hover:from-nebula-600 hover:to-galaxy-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {t("hero.startFreeTrial")}
              </Link>
              <Link
                href={`/${locale}/login`}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                {t("hero.signIn")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-cosmic-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cosmic-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t("features.instantGuidance.title")}</h3>
              <p className="text-gray-600">{t("features.instantGuidance.description")}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-nebula-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-nebula-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t("features.codeExamples.title")}</h3>
              <p className="text-gray-600">{t("features.codeExamples.description")}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-galaxy-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-galaxy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t("features.expertKnowledge.title")}</h3>
              <p className="text-gray-600">{t("features.expertKnowledge.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t("pricing.title")}</h2>
            <p className="text-xl text-gray-600">{t("pricing.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* LITE Tier */}
            <div className="bg-white rounded-xl p-8 border-2 border-cosmic-300 shadow-lg">
              <h3 className="text-2xl font-bold text-cosmic-600 mb-2">{t("pricing.lite.name")}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{t("pricing.lite.price")}</span>
                <span className="text-gray-600">{t("pricing.lite.period")}</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">{t("pricing.lite.features.calls")}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">{t("pricing.lite.features.support")}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">{t("pricing.lite.features.analytics")}</span>
                </li>
              </ul>
              <Link href={`/${locale}/signup`} className="block w-full px-6 py-3 bg-cosmic-600 text-white rounded-lg font-semibold text-center hover:bg-cosmic-700 transition-colors">
                {t("pricing.lite.button")}
              </Link>
            </div>

            {/* PRO Tier */}
            <div className="bg-white rounded-xl p-8 border-2 border-cosmic-300 shadow-lg">
                <h3 className="text-2xl font-bold text-cosmic-600 mb-2">{t("pricing.pro.name")}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{t("pricing.pro.price")}</span>
                  <span className="text-gray-600">{t("pricing.pro.period")}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                    <span className="text-gray-600">{t("pricing.pro.features.calls")}</span>
                </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                    <span className="text-gray-600">{t("pricing.pro.features.support")}</span>
                </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                    <span className="text-gray-600">{t("pricing.pro.features.analytics")}</span>
                </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                    <span className="text-gray-600">{t("pricing.pro.features.docs")}</span>
                </li>
              </ul>
                <Link href={`/${locale}/signup`} className="block w-full px-6 py-3 bg-cosmic-600 text-white rounded-lg font-semibold text-center hover:bg-cosmic-700 transition-colors">
                  {t("pricing.pro.button")}
                </Link>
            </div>

            {/* ADVANCED Tier */}
            <div className="bg-white rounded-xl p-8 border-2 border-galaxy-300 shadow-lg">
              <h3 className="text-2xl font-bold text-galaxy-600 mb-2">{t("pricing.advanced.name")}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{t("pricing.advanced.price")}</span>
                <span className="text-gray-600">{t("pricing.advanced.period")}</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">{t("pricing.advanced.features.calls")}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">{t("pricing.advanced.features.support")}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">{t("pricing.advanced.features.integrations")}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">{t("pricing.advanced.features.sla")}</span>
                </li>
              </ul>
              <Link href={`/${locale}/signup`} className="block w-full px-6 py-3 bg-galaxy-600 text-white rounded-lg font-semibold text-center hover:bg-galaxy-700 transition-colors">
                {t("pricing.advanced.button")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cosmic-900 via-cosmic-700 to-nebula-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">{t("cta.title")}</h2>
          <p className="text-xl text-nebula-100 mb-8">{t("cta.description")}</p>
          <Link
            href={`/${locale}/signup`}
            className="inline-block px-8 py-4 bg-white text-cosmic-900 rounded-lg font-semibold hover:bg-nebula-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Oryon</h3>
              <p className="text-sm">AI-powered Visma API integration assistant</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href={`/${locale}/about`} className="hover:text-white transition-colors">{t("footer.about")}</Link></li>
                <li><Link href={`/${locale}/faq`} className="hover:text-white transition-colors">{t("footer.faq")}</Link></li>
                <li><Link href={`/${locale}/support`} className="hover:text-white transition-colors">{t("footer.support")}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href={`/${locale}/terms`} className="hover:text-white transition-colors">{t("footer.terms")}</Link></li>
                <li><Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">{t("footer.privacy")}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <p className="text-sm">Stay updated with the latest API integrations and features.</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Oryon. {t("footer.rights")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}