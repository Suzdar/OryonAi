"use client";

import Link from "next/link";

export default function FAQ() {
  const faqs = [
    {
      question: "What is OryonAi?",
      answer: "OryonAi is an AI Agent specifically designed to help Visma partners and ISVs integrate with Visma APIs. It provides instant, intelligent guidance on API implementation, best practices, code examples, and troubleshooting."
    },
    {
      question: "Who is OryonAi for?",
      answer: "OryonAi is built for Visma partners, ISVs, and developers who are integrating with Visma systems. Whether you're new to Visma APIs or an experienced integrator, OryonAi accelerates your development process."
    },
    {
      question: "How does OryonAi help with Visma API integration?",
      answer: "OryonAi provides instant answers to your API questions, ready-to-use code examples, integration guides, best practices, and real-time troubleshooting assistance. It's like having a Visma API expert on your team 24/7."
    },
    {
      question: "What Visma APIs does OryonAi support?",
      answer: "OryonAi covers major Visma product lines and their APIs including eAccounting, Payroll, HR, and other Visma solutions. Our knowledge base is continuously updated with the latest API documentation."
    },
    {
      question: "Can OryonAi generate code for me?",
      answer: "Yes! OryonAi can provide code samples, templates, and implementation examples for various programming languages commonly used in Visma integrations, helping you get started quickly."
    },
    {
      question: "What subscription plans are available?",
      answer: "We offer three plans: Lite (for small projects and testing), Pro (for production integrations), and Advanced (for enterprise partners with dedicated support). Each tier includes increasing levels of API access and support."
    },
    {
      question: "How quickly can I get answers?",
      answer: "OryonAi provides instant responses to your questions. No waiting for support tickets - just ask your question and get AI-powered guidance immediately."
    },
    {
      question: "Is there human support available?",
      answer: "Yes! While OryonAi provides instant AI assistance, Pro and Advanced tier users also have access to human experts for complex integration scenarios and dedicated support."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold cosmic-text-gradient">
              OryonAi
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-cosmic-600 font-medium transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="cosmic-button">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold cosmic-text-gradient mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-600 text-lg mb-8">Find answers to common questions about OryonAi and Visma API integration.</p>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Didn't find what you're looking for?</p>
          <Link href="/support" className="inline-block cosmic-button">
            Contact Support
          </Link>
        </div>
      </main>
    </div>
  );
}
