import { HomeHeader } from "@/components/HomeHeader";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from 'next-intl/server';
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations("home");

  return (
    <div className="min-h-screen bg-white dark:bg-[#1F1D24]">
      <HomeHeader locale={locale} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-nebula-50 to-cosmic-50 dark:from-cosmic-950 dark:via-cosmic-900 dark:to-cosmic-800 text-gray-900 dark:text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cosmic-700 via-nebula-600 to-galaxy-600 dark:from-white dark:via-nebula-200 dark:to-galaxy-300 bg-clip-text text-transparent leading-tight pb-2">
              {t("hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-cosmic-800 dark:text-nebula-200 mb-4 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/signup`}
                className="px-8 py-4 bg-gradient-to-r from-nebula-600 to-galaxy-600 text-white rounded-lg font-semibold hover:from-nebula-500 hover:to-galaxy-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {t("hero.startFreeTrial")}
              </Link>
              <Link
                href={`/${locale}/login`}
                className="px-8 py-4 bg-white text-cosmic-800 dark:bg-white/10 dark:text-white backdrop-blur-sm rounded-lg font-semibold hover:bg-nebula-50 dark:hover:bg-white/20 transition-all duration-300 border border-white/20 transform hover:scale-105"
              >
                {t("hero.signIn")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-[#1F1D24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[#1F1D24] p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up delay-100">
              <div className="w-12 h-12 bg-cosmic-100 dark:bg-cosmic-900 rounded-lg flex items-center justify-center mb-4 animate-float">
                <svg className="w-6 h-6 text-cosmic-600 dark:text-cosmic-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t("features.instantGuidance.title")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("features.instantGuidance.description")}</p>
            </div>
            <div className="bg-white dark:bg-[#1F1D24] p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up delay-200">
              <div className="w-12 h-12 bg-nebula-100 dark:bg-nebula-900 rounded-lg flex items-center justify-center mb-4 animate-float" style={{animationDelay: '0.5s'}}>
                <svg className="w-6 h-6 text-nebula-600 dark:text-nebula-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t("features.codeExamples.title")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("features.codeExamples.description")}</p>
            </div>
            <div className="bg-white dark:bg-[#1F1D24] p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up delay-300">
              <div className="w-12 h-12 bg-galaxy-100 dark:bg-galaxy-900 rounded-lg flex items-center justify-center mb-4 animate-float" style={{animationDelay: '1s'}}>
                <svg className="w-6 h-6 text-galaxy-600 dark:text-galaxy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t("features.expertKnowledge.title")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("features.expertKnowledge.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white dark:bg-[#1F1D24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t("pricing.title")}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">{t("pricing.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* LITE Tier */}
            <div className="bg-white dark:bg-[#1F1D24] rounded-xl p-8 border-2 border-cosmic-300 dark:border-cosmic-700 shadow-lg flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up delay-100">
              <div>
                <h3 className="text-2xl font-bold text-cosmic-600 dark:text-cosmic-400 mb-2">{t("pricing.lite.name")}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{t("pricing.lite.price")}</span>
                  <span className="text-gray-600 dark:text-gray-400">{t("pricing.lite.period")}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{t("pricing.lite.features.calls")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{t("pricing.lite.features.support")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{t("pricing.lite.features.analytics")}</span>
                  </li>
                </ul>
              </div>
              <Link href={`/${locale}/signup`} className="block w-full px-6 py-3 bg-cosmic-600 hover:bg-cosmic-700 text-white rounded-lg font-semibold text-center transition-all duration-300 transform hover:scale-105">
                {t("pricing.lite.button")}
              </Link>
            </div>

            {/* PRO Tier */}
            <div className="bg-white dark:bg-[#1F1D24] rounded-xl p-8 border-2 border-cosmic-300 dark:border-cosmic-700 shadow-lg flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up delay-200">
                <div>
                  <h3 className="text-2xl font-bold text-cosmic-600 dark:text-cosmic-400 mb-2">{t("pricing.pro.name")}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{t("pricing.pro.price")}</span>
                    <span className="text-gray-600 dark:text-gray-400">{t("pricing.pro.period")}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                      <span className="text-gray-600 dark:text-gray-300">{t("pricing.pro.features.calls")}</span>
                  </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                      <span className="text-gray-600 dark:text-gray-300">{t("pricing.pro.features.support")}</span>
                  </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                      <span className="text-gray-600 dark:text-gray-300">{t("pricing.pro.features.analytics")}</span>
                  </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                      <span className="text-gray-600 dark:text-gray-300">{t("pricing.pro.features.docs")}</span>
                  </li>
                </ul>
                </div>
                <Link href={`/${locale}/signup`} className="block w-full px-6 py-3 bg-cosmic-600 text-white rounded-lg font-semibold text-center hover:bg-cosmic-700 transition-all duration-300 transform hover:scale-105">
                  {t("pricing.pro.button")}
                </Link>
            </div>

            {/* ADVANCED Tier */}
            <div className="bg-white dark:bg-[#1F1D24] rounded-xl p-8 border-2 border-galaxy-300 dark:border-galaxy-700 shadow-lg flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up delay-300">
              <div>
                <h3 className="text-2xl font-bold text-galaxy-600 dark:text-galaxy-400 mb-2">{t("pricing.advanced.name")}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{t("pricing.advanced.price")}</span>
                  <span className="text-gray-600 dark:text-gray-400">{t("pricing.advanced.period")}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{t("pricing.advanced.features.calls")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{t("pricing.advanced.features.support")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{t("pricing.advanced.features.integrations")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{t("pricing.advanced.features.sla")}</span>
                  </li>
                </ul>
              </div>
              <Link href={`/${locale}/signup`} className="block w-full px-6 py-3 bg-galaxy-600 text-white rounded-lg font-semibold text-center hover:bg-galaxy-700 transition-all duration-300 transform hover:scale-105">
                {t("pricing.advanced.button")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cosmic-900 via-cosmic-700 to-nebula-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">{t("cta.title")}</h2>
          <p className="text-xl text-nebula-100 mb-8 animate-fade-in-up delay-100">{t("cta.description")}</p>
          <Link
            href={`/${locale}/signup`}
            className="inline-block px-8 py-4 bg-white text-cosmic-900 rounded-lg font-semibold hover:bg-nebula-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-fade-in-up delay-200"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-300 py-12">
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