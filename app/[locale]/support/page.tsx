"use client";

import Link from "next/link";
import { HomeHeader } from "@/components/HomeHeader";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Support() {
  const params = useParams();
  const locale = params?.locale as string;
  const isNorwegian = locale === "no";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to an API
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#1F1D24]">
      <HomeHeader locale={locale} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold cosmic-text-gradient mb-2">
          {isNorwegian ? "Brukerstøtte" : "Support Center"}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
          {isNorwegian
            ? "Få hjelp med Visma API-integrasjon. OryonAi er her for å støtte deg."
            : "Get help with Visma API integration. OryonAi is here to support you."}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Support Channels */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {isNorwegian ? "Få hjelp" : "Get Help"}
            </h2>
            <div className="space-y-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {isNorwegian ? "E-postsupport" : "Email Support"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">support@oryonai.com</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isNorwegian ? "Svartid: 24 timer" : "Response time: 24 hours"}
                </p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {isNorwegian ? "Dokumentasjon" : "Documentation"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {isNorwegian ? "Besøk kunnskapsbasen" : "Visit our knowledge base"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{isNorwegian ? "Tilgjengelig 24/7" : "Available 24/7"}</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {isNorwegian ? "Community-forum" : "Community Forum"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {isNorwegian ? "Knytt kontakt med andre brukere" : "Connect with other users"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isNorwegian ? "Fellesskapsdrevet support" : "Community-driven support"}
                </p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {isNorwegian ? "Statusside" : "Status Page"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {isNorwegian ? "Sjekk systemstatus" : "Check system status"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isNorwegian ? "Oppdateres i sanntid" : "Real-time updates"}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {isNorwegian ? "Send oss en melding" : "Send us a Message"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {isNorwegian ? "Navn" : "Name"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-cosmic-600 focus:border-transparent outline-none transition bg-white dark:bg-[#1F1D24] text-gray-900 dark:text-white"
                  placeholder={isNorwegian ? "Ditt navn" : "Your name"}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {isNorwegian ? "E-post" : "Email"}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-cosmic-600 focus:border-transparent outline-none transition bg-white dark:bg-[#1F1D24] text-gray-900 dark:text-white"
                  placeholder={isNorwegian ? "deg@eksempel.no" : "your@email.com"}
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {isNorwegian ? "Emne" : "Subject"}
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-cosmic-600 focus:border-transparent outline-none transition bg-white dark:bg-[#1F1D24] text-gray-900 dark:text-white"
                >
                  <option value="">{isNorwegian ? "Velg et emne" : "Select a subject"}</option>
                  <option value="technical">{isNorwegian ? "Teknisk problem" : "Technical Issue"}</option>
                  <option value="billing">{isNorwegian ? "Fakturaspørsmål" : "Billing Question"}</option>
                  <option value="feature">{isNorwegian ? "Ønske om funksjon" : "Feature Request"}</option>
                  <option value="general">{isNorwegian ? "Generell forespørsel" : "General Inquiry"}</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {isNorwegian ? "Melding" : "Message"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-cosmic-600 focus:border-transparent outline-none transition resize-none bg-white dark:bg-[#1F1D24] text-gray-900 dark:text-white"
                  placeholder={isNorwegian ? "Hvordan kan vi hjelpe?" : "Tell us how we can help..."}
                />
              </div>
              <button
                type="submit"
                className="w-full cosmic-button justify-center"
              >
                {isNorwegian ? "Send melding" : "Send Message"}
              </button>
              {submitted && (
                <p className="text-green-600 text-center font-medium">
                  {isNorwegian
                    ? "Meldingen er sendt! Vi tar kontakt snart."
                    : "Message sent successfully! We'll get back to you soon."}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/faq`}
            className="inline-block cosmic-button"
          >
            {isNorwegian ? "Se FAQ" : "View FAQ"}
          </Link>
        </div>
      </main>
    </div>
  );
}
