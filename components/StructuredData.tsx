import Script from "next/script";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Oryon",
    "description": "AI-powered assistant for Visma API integration. Helps partners and ISVs quickly understand, implement, and optimize Visma APIs.",
    "url": "https://oryonai.com",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "offers": [
        {
          "@type": "Offer",
          "name": "Lite Plan",
          "price": "29",
          "description": "Perfect for small projects and testing"
        },
        {
          "@type": "Offer",
          "name": "Pro Plan",
          "price": "99",
          "description": "For production integrations"
        },
        {
          "@type": "Offer",
          "name": "Advanced Plan",
          "price": "299",
          "description": "For enterprise partners with dedicated support"
        }
      ]
    },
    "author": {
      "@type": "Organization",
      "name": "Oryon",
      "url": "https://oryonai.com"
    }
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      strategy="afterInteractive"
    />
  );
}
