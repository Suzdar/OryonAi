"use client";

import Link from "next/link";
import { HomeHeader } from "@/components/HomeHeader";
import { useParams } from "next/navigation";

export default function About() {
  const params = useParams();
  const locale = params?.locale as string;
  const isNorwegian = locale === "no";

  return (
    <div className="min-h-screen bg-white dark:bg-[#1F1D24]">
      <HomeHeader locale={locale} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold cosmic-text-gradient mb-6">
          {isNorwegian ? "Om OryonAi" : "About OryonAi"}
        </h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {isNorwegian ? "Vårt oppdrag" : "Our Mission"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4">
            {isNorwegian
              ? "OryonAi er en AI-agent laget for Visma-partnere og ISV-er. Vi skal korte ned time-to-market ved å gi smart, umiddelbar veiledning på Visma API-er. Vi hjelper utviklere å forstå, implementere og optimalisere integrasjoner med AI-drevet assistanse."
              : "OryonAi is an AI Agent designed specifically for Visma partners and ISVs. Our mission is to accelerate your time-to-market by providing intelligent, instant guidance on Visma APIs. We help developers understand, implement, and optimize Visma integrations with AI-powered assistance."}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {isNorwegian ? "Hvem vi er" : "Who We Are"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4">
            {isNorwegian
              ? "Vi er et team av utviklere og API-eksperter som kjenner utfordringene partnere møter med Visma-systemer. OryonAi kombinerer dyp Visma-kunnskap med AI for å gi en assistent som faktisk forstår integrasjonsbehovene dine."
              : "We are a team of developers and API experts who understand the challenges partners face when integrating with Visma systems. OryonAi combines deep knowledge of Visma APIs with AI technology to create an assistant that truly understands your integration needs."}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {isNorwegian ? "Våre verdier" : "Our Values"}
          </h2>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300 text-lg">
            <li className="flex items-start">
              <span className="text-cosmic-600 font-bold mr-3">•</span>
              <span>
                <strong>{isNorwegian ? "Hastighet:" : "Speed:"}</strong>{" "}
                {isNorwegian
                  ? "Få svar umiddelbart uten å vente på support"
                  : "Get answers instantly without waiting for support"}
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-cosmic-600 font-bold mr-3">•</span>
              <span>
                <strong>{isNorwegian ? "Presisjon:" : "Accuracy:"}</strong>{" "}
                {isNorwegian
                  ? "Stol på ekspertkunnskap om Visma API-er"
                  : "Rely on expert knowledge of Visma APIs"}
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-cosmic-600 font-bold mr-3">•</span>
              <span>
                <strong>{isNorwegian ? "Tilgjengelighet:" : "Accessibility:"}</strong>{" "}
                {isNorwegian
                  ? "Gjør API-integrasjon tilgjengelig for alle nivåer"
                  : "Make API integration accessible to all skill levels"}
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-cosmic-600 font-bold mr-3">•</span>
              <span>
                <strong>{isNorwegian ? "Partnerskap:" : "Partnership:"}</strong>{" "}
                {isNorwegian
                  ? "Vi lykkes når partnerne våre lykkes"
                  : "We succeed when our partners succeed"}
              </span>
            </li>
          </ul>
        </section>

        <div className="mt-12 text-center">
          <Link href={locale ? `/${locale}` : "/"} className="inline-block cosmic-button">
            {isNorwegian ? "Tilbake til forsiden" : "Back to Home"}
          </Link>
        </div>
      </main>
    </div>
  );
}
