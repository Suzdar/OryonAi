"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const t = useTranslations("auth.signup");
  const locale = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t("errorMismatch"));
      return;
    }

    if (password.length < 8) {
      setError(t("errorShortPassword"));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t("errorGeneric"));
        setLoading(false);
        return;
      }

      // Redirect to login page after successful signup
      router.push(`/${locale}/login?message=${encodeURIComponent(t("successMessage"))}`);
    } catch (error) {
      setError(t("errorGeneric"));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cosmic-100 via-nebula-50 to-galaxy-100 dark:from-[#1F1D24] dark:via-[#2A2732] dark:to-[#1F1D24] px-4">
      <div className="max-w-md w-full cosmic-card p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold cosmic-text-gradient">{t("title")}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{t("subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("name")}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-cosmic-500 focus:border-transparent bg-white dark:bg-[#1F1D24] text-gray-900 dark:text-white"
              placeholder={t("namePlaceholder")}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("email")}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-cosmic-500 focus:border-transparent bg-white dark:bg-[#1F1D24] text-gray-900 dark:text-white"
              placeholder={t("emailPlaceholder")}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("password")}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-cosmic-500 focus:border-transparent bg-white dark:bg-[#1F1D24] text-gray-900 dark:text-white"
              placeholder={t("passwordPlaceholder")}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("confirmPassword")}
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-cosmic-500 focus:border-transparent bg-white dark:bg-[#1F1D24] text-gray-900 dark:text-white"
              placeholder={t("confirmPasswordPlaceholder")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cosmic-button w-full"
          >
            {loading ? t("submitLoading") : t("submit")}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
          {t("hasAccount")} {" "}
          <Link href={`/${locale}/login`} className="text-cosmic-600 hover:text-cosmic-700 font-medium">
            {t("loginLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
