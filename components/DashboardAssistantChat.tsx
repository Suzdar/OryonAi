"use client";

import { useMemo, useState } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function DashboardAssistantChat({ locale }: { locale: string }) {
  const isNorwegian = locale === "no";

  const initialMessages = useMemo<Message[]>(
    () => [
      {
        role: "assistant",
        text: isNorwegian
          ? "Hei! Jeg er OryonAi. Spør meg om Visma API-integrasjoner, så vil jeg snart kunne hjelpe."
          : "Hi! I'm OryonAi. Ask me about Visma API integrations, and I'll soon help you out."
      },
      {
        role: "user",
        text: isNorwegian
          ? "Hvordan kobler jeg til Visma API for første gang?"
          : "How do I connect to the Visma API for the first time?"
      },
      {
        role: "assistant",
        text: isNorwegian
          ? "AI-svar kommer snart. Vi jobber med å koble på modellen."
          : "AI reply coming soon. We're wiring up the model."
      }
    ],
    [isNorwegian]
  );

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages(prev => [
      ...prev,
      { role: "user", text: trimmed },
      {
        role: "assistant",
        text: isNorwegian
          ? "Foreløpig placeholder. Den ekte AI-modellen svarer snart."
          : "Placeholder for now. The real AI model will reply soon."
      }
    ]);
    setInput("");
  };

  return (
    <div className="cosmic-card flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-[#E8E8E8]">
            {isNorwegian ? "AI-assistent (placeholder)" : "AI Assistant (placeholder)"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-[#B0B0B0]">
            {isNorwegian
              ? "Send en melding for å se flyten. Svar fra modellen kommer snart."
              : "Send a message to see the flow. Model responses are coming soon."}
          </p>
        </div>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
          {isNorwegian ? "Snart" : "Soon"}
        </span>
      </div>

      <div className="mt-4 flex-1 space-y-3 overflow-y-auto rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#2A2732] p-3 shadow-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={`max-w-[75%] rounded-lg px-3 py-2 text-sm shadow-sm ${
                msg.role === "user"
                  ? "bg-cosmic-600 text-white"
                  : "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-[#E8E8E8]"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-[#2A2732] text-gray-900 dark:text-[#E8E8E8] focus:border-cosmic-500 focus:outline-none focus:ring-2 focus:ring-cosmic-200"
          placeholder={isNorwegian ? "Skriv en melding..." : "Type a message..."}
        />
        <button
          type="submit"
          className="cosmic-button px-4"
        >
          {isNorwegian ? "Send" : "Send"}
        </button>
      </form>
    </div>
  );
}
