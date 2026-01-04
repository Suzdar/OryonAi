import { requireAuth } from "@/lib/auth-guards";
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
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
        <p className="mt-2 text-gray-600">
          Learn how to use OryonAi to its full potential
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Documentation
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
                    className="block px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
                  >
                    {title}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white p-8 shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Welcome to the Documentation
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">
                Select a topic from the sidebar to get started.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border-2 border-gray-200 p-4 hover:border-primary-500 hover:bg-primary-50 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Getting Started
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Learn the basics and set up your account
                  </p>
                  <Link
                    href="/dashboard/docs/getting-started"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Read more →
                  </Link>
                </div>

                <div className="rounded-lg border-2 border-gray-200 p-4 hover:border-primary-500 hover:bg-primary-50 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    API Reference
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Explore our comprehensive API documentation
                  </p>
                  <Link
                    href="/dashboard/docs/api-reference"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
