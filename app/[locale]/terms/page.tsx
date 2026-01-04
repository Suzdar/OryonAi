import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Oryon",
  description: "Terms of Service for Oryon.",
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
      <p className="text-gray-700">
        These terms govern your use of Oryon. By using the service, you agree to these terms.
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>Use the service responsibly and comply with applicable laws.</li>
        <li>Do not misuse the service, including attempting to disrupt or reverse-engineer it.</li>
        <li>Accounts may be suspended for violations of these terms.</li>
      </ul>
      <p className="text-gray-700">
        For questions, contact <a className="text-cosmic-600" href="mailto:support@oryonai.com">support@oryonai.com</a>.
      </p>
      <Link href="/" className="text-cosmic-600 font-medium">Back to home</Link>
    </main>
  );
}
