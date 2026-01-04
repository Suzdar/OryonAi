"use client";

import Link from "next/link";

export default function About() {
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
        <h1 className="text-4xl font-bold cosmic-text-gradient mb-6">About OryonAi</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            OryonAi is an AI Agent designed specifically for Visma partners and ISVs. Our mission is to accelerate your time-to-market by providing intelligent, instant guidance on Visma APIs. We help developers understand, implement, and optimize Visma integrations with AI-powered assistance.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Who We Are</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            We are a team of developers and API experts who understand the challenges partners face when integrating with Visma systems. OryonAi combines deep knowledge of Visma APIs with AI technology to create an assistant that truly understands your integration needs.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
          <ul className="space-y-3 text-gray-600 text-lg">
            <li className="flex items-start">
              <span className="text-cosmic-600 font-bold mr-3">•</span>
              <span><strong>Speed:</strong> Get answers instantly without waiting for support</span>
            </li>
            <li className="flex items-start">
              <span className="text-cosmic-600 font-bold mr-3">•</span>
              <span><strong>Accuracy:</strong> Rely on expert knowledge of Visma APIs</span>
            </li>
            <li className="flex items-start">
              <span className="text-cosmic-600 font-bold mr-3">•</span>
              <span><strong>Accessibility:</strong> Make API integration accessible to all skill levels</span>
            </li>
            <li className="flex items-start">
              <span className="text-cosmic-600 font-bold mr-3">•</span>
              <span><strong>Partnership:</strong> We succeed when our partners succeed</span>
            </li>
          </ul>
        </section>

        <div className="mt-12 text-center">
          <Link href="/" className="inline-block cosmic-button">
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
