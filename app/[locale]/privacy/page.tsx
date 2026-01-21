import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Oryon",
  description: "Privacy Policy for Oryon.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-6 min-h-screen bg-white dark:bg-[#1F1D24]">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-[#E8E8E8]">Privacy Policy</h1>
      <p className="text-gray-700 dark:text-[#B0B0B0]">
        We collect only what is needed to provide and improve Oryon. We do not sell your data.
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-[#B0B0B0]">
        <li>Data is used to operate and secure the service.</li>
        <li>We may use analytics to improve features and performance.</li>
        <li>You can request data deletion by contacting support.</li>
      </ul>
      <p className="text-gray-700 dark:text-[#B0B0B0]">
        For questions, contact <a className="text-cosmic-600" href="mailto:support@oryonai.com">support@oryonai.com</a>.
      </p>
      <Link href="/" className="text-cosmic-600 font-medium">Back to home</Link>
    </main>
  );
}
