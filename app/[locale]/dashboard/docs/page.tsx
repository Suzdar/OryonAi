import { requireAuth } from "@/lib/auth-guards";
import { EmptyState } from "@/components/EmptyState";
import fs from "fs";
import path from "path";
import Link from "next/link";

export default async function DocsPage() {
  await requireAuth();

  // Get list of documentation files
  const docsDirectory = path.join(process.cwd(), "docs");
  let docFiles: string[] = [];

  try {
    docFiles = fs
      .readdirSync(docsDirectory)
      .filter((file) => file.endsWith(".md"));
  } catch (error) {
    // Docs directory doesn't exist yet
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Visma API Documentation</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Explore documentation and integration guides for Visma products
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Visma.net ERP */}
        <div className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1F1D24] p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cosmic-500 to-nebula-500 flex items-center justify-center text-white font-bold text-xl">
                VE
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cosmic-600 transition-colors">
                Visma.net ERP
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Spend less time on configuration, and more time growing your business.
              </p>
              <Link
                href="/dashboard/docs/visma-net-erp"
                className="inline-flex items-center text-sm font-medium text-cosmic-600 hover:text-cosmic-700"
              >
                View Documentation
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Business NXT API */}
        <div className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1F1D24] p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-nebula-500 to-galaxy-500 flex items-center justify-center text-white font-bold text-xl">
                BN
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cosmic-600 transition-colors">
                Business NXT API
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Making integrations simple with next-generation business platform.
              </p>
              <Link
                href="/dashboard/docs/business-nxt"
                className="inline-flex items-center text-sm font-medium text-cosmic-600 hover:text-cosmic-700"
              >
                View Documentation
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Employee */}
        <div className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1F1D24] p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-galaxy-500 to-cosmic-500 flex items-center justify-center text-white font-bold text-xl">
                EM
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cosmic-600 transition-colors">
                Employee API
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Manage employee data, payslips, expenses and time registrations.
              </p>
              <Link
                href="/dashboard/docs/employee"
                className="inline-flex items-center text-sm font-medium text-cosmic-600 hover:text-cosmic-700"
              >
                View Documentation
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Payroll */}
        <div className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1F1D24] p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cosmic-600 to-nebula-600 flex items-center justify-center text-white font-bold text-xl">
                PR
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cosmic-600 transition-colors">
                Payroll API
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Comprehensive payroll processing and reporting capabilities.
              </p>
              <Link
                href="/dashboard/docs/payroll"
                className="inline-flex items-center text-sm font-medium text-cosmic-600 hover:text-cosmic-700"
              >
                View Documentation
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1F1D24] p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-nebula-600 to-galaxy-600 flex items-center justify-center text-white font-bold text-xl">
                CA
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cosmic-600 transition-colors">
                Calendar API
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Manage calendars, scheduling, and time-based resources.
              </p>
              <Link
                href="/dashboard/docs/calendar"
                className="inline-flex items-center text-sm font-medium text-cosmic-600 hover:text-cosmic-700"
              >
                View Documentation
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Datamart */}
        <div className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1F1D24] p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-galaxy-600 to-cosmic-600 flex items-center justify-center text-white font-bold text-xl">
                DM
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cosmic-600 transition-colors">
                Datamart API
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Access data warehouse and analytics for business intelligence.
              </p>
              <Link
                href="/dashboard/docs/datamart"
                className="inline-flex items-center text-sm font-medium text-cosmic-600 hover:text-cosmic-700"
              >
                View Documentation
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {docFiles.length > 0 && (
        <div className="mt-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1F1D24] p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Additional Resources
          </h2>
          <nav className="space-y-2">
            {docFiles.map((file) => {
              const slug = file.replace(".md", "");
              const title = slug
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

              return (
                <Link
                  key={slug}
                  href={`/dashboard/docs/${slug}`}
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                >
                  {title}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
