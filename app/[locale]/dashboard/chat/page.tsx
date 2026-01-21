import { setRequestLocale } from "next-intl/server";
import DashboardAssistantChat from "@/components/DashboardAssistantChat";

export default async function DashboardChatPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isNorwegian = locale === "no";

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {isNorwegian ? "AI-assistent" : "AI Assistant"}
        </h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          {isNorwegian
            ? "Chatten viser en placeholder nå. Vi kobler på den ekte modellen snart."
            : "This chat is a placeholder for now. We'll plug in the real model soon."}
        </p>
      </div>

      <DashboardAssistantChat locale={locale} />
    </div>
  );
}
