import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import "../globals.css";
import { Providers } from "../providers";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Oryon - AI Agent for Visma API Integration | Partners & ISVs",
  description: "Oryon is an AI-powered assistant helping Visma partners and ISVs quickly integrate and optimize Visma APIs. Get instant guidance, code examples, and best practices.",
  keywords: ["Visma API", "API integration", "ISV", "developer tools", "AI assistant"],
  authors: [{ name: "Oryon" }],
  creator: "Oryon",
  publisher: "Oryon",
  robots: "index, follow",
  openGraph: {
    title: "Oryon - AI Agent for Visma API Integration",
    description: "Accelerate your Visma API integration with AI-powered guidance",
    url: "https://oryonai.com",
    siteName: "Oryon",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oryon - AI Agent for Visma API Integration",
    description: "Accelerate your Visma API integration with AI-powered guidance",
  },
  alternates: {
    canonical: "https://oryonai.com",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Pre-hydration theme script to prevent flash and ensure correct initial class */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = saved ? saved : 'light';
                  document.documentElement.classList.remove('dark');
                  document.body && document.body.classList.remove('dark');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.body && document.body.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
        <StructuredData />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
