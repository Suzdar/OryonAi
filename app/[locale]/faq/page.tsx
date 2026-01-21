"use client";

import Link from "next/link";
import { HomeHeader } from "@/components/HomeHeader";
import { useParams } from "next/navigation";

export default function FAQ() {
  const params = useParams();
  const locale = params?.locale as string;
  const isNorwegian = locale === "no";

  const faqs = isNorwegian
    ? [
        {
          question: "Hva er OryonAi?",
          answer:
            "OryonAi er en AI-agent laget for Visma-partnere og ISV-er. Den gir umiddelbar, intelligent veiledning om Visma API-er, implementering, beste praksis, kodeeksempler og feilsøking."
        },
        {
          question: "Hvem er OryonAi for?",
          answer:
            "OryonAi er bygget for Visma-partnere, ISV-er og utviklere som integrerer med Visma-systemer. Enten du er ny eller erfaren, hjelper vi deg å komme raskere i mål."
        },
        {
          question: "Hvordan hjelper OryonAi med Visma-integrasjon?",
          answer:
            "OryonAi svarer umiddelbart på API-spørsmål, gir klare kodeeksempler, integrasjonsguider, beste praksis og sanntids feilsøking. Det er som å ha en Visma-ekspert i teamet 24/7."
        },
        {
          question: "Hvilke Visma API-er støttes?",
          answer:
            "OryonAi dekker de viktigste Visma-produktene og API-ene, inkludert eAccounting, Payroll, HR og flere. Kunnskapsbasen oppdateres fortløpende."
        },
        {
          question: "Kan OryonAi generere kode?",
          answer:
            "Ja. OryonAi kan foreslå kode, maler og eksempler for vanlige språk i Visma-integrasjoner, slik at du raskt kommer i gang."
        },
        {
          question: "Hvilke abonnement finnes?",
          answer:
            "Vi tilbyr Lite (testing), Pro (produksjon) og Advanced (enterprise med dedikert støtte). Hvert nivå øker tilgang og støtte."
        },
        {
          question: "Hvor raskt får jeg svar?",
          answer:
            "OryonAi svarer umiddelbart. Ingen venting på supportsaker – bare spør og få AI-veiledning med én gang."
        },
        {
          question: "Finnes menneskelig support?",
          answer:
            "Ja. I tillegg til AI-hjelp får Pro- og Advanced-kunder tilgang til eksperter for komplekse saker."
        }
      ]
    : [
        {
          question: "What is OryonAi?",
          answer:
            "OryonAi is an AI Agent specifically designed to help Visma partners and ISVs integrate with Visma APIs. It provides instant, intelligent guidance on API implementation, best practices, code examples, and troubleshooting."
        },
        {
          question: "Who is OryonAi for?",
          answer:
            "OryonAi is built for Visma partners, ISVs, and developers who are integrating with Visma systems. Whether you're new to Visma APIs or an experienced integrator, OryonAi accelerates your development process."
        },
        {
          question: "How does OryonAi help with Visma API integration?",
          answer:
            "OryonAi provides instant answers to your API questions, ready-to-use code examples, integration guides, best practices, and real-time troubleshooting assistance. It's like having a Visma API expert on your team 24/7."
        },
        {
          question: "What Visma APIs does OryonAi support?",
          answer:
            "OryonAi covers major Visma product lines and their APIs including eAccounting, Payroll, HR, and other Visma solutions. Our knowledge base is continuously updated with the latest API documentation."
        },
        {
          question: "Can OryonAi generate code for me?",
          answer:
            "Yes! OryonAi can provide code samples, templates, and implementation examples for various programming languages commonly used in Visma integrations, helping you get started quickly."
        },
        {
          question: "What subscription plans are available?",
          answer:
            "We offer three plans: Lite (for small projects and testing), Pro (for production integrations), and Advanced (for enterprise partners with dedicated support). Each tier includes increasing levels of API access and support."
        },
        {
          question: "How quickly can I get answers?",
          answer:
            "OryonAi provides instant responses to your questions. No waiting for support tickets - just ask your question and get AI-powered guidance immediately."
        },
        {
          question: "Is there human support available?",
          answer:
            "Yes! While OryonAi provides instant AI assistance, Pro and Advanced tier users also have access to human experts for complex integration scenarios and dedicated support."
        }
      ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#1F1D24]">
      <HomeHeader locale={locale} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold cosmic-text-gradient mb-2">
          {isNorwegian ? "Ofte stilte spørsmål" : "Frequently Asked Questions"}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
          {isNorwegian
            ? "Få svar på vanlige spørsmål om OryonAi og Visma API-integrasjon."
            : "Find answers to common questions about OryonAi and Visma API integration."}
        </p>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow dark:bg-[#1F1D24]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {isNorwegian ? "Fant du ikke det du lette etter?" : "Didn't find what you're looking for?"}
          </p>
          <Link href={`/${locale}/support`} className="inline-block cosmic-button">
            {isNorwegian ? "Kontakt support" : "Contact Support"}
          </Link>
        </div>
      </main>
    </div>
  );
}
