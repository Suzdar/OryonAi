import { requireAuth } from "@/lib/auth-guards";
import fs from "fs";
import path from "path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function DocPage({ params }: { params: { slug: string } }) {
  await requireAuth();

  const docsDirectory = path.join(process.cwd(), "docs");
  const filePath = path.join(docsDirectory, `${params.slug}.md`);

  let content = "";
  let title = "";
  let error = false;

  try {
    content = fs.readFileSync(filePath, "utf-8");
    // Extract title from first H1
    const titleMatch = content.match(/^#\s+(.+)$/m);
    title = titleMatch ? titleMatch[1] : params.slug;
  } catch (err) {
    error = true;
  }

  // Get all doc files for sidebar
  let docFiles: string[] = [];
  try {
    docFiles = fs
      .readdirSync(docsDirectory)
      .filter((file) => file.endsWith(".md"));
  } catch (err) {
    // Ignore
  }

  if (error) {
    return (
      <div className="max-w-7xl">
        <div className="rounded-lg bg-red-50 border border-red-200 p-6">
          <h2 className="text-xl font-semibold text-red-900 mb-2">
            Document Not Found
          </h2>
          <p className="text-red-700">
            The requested documentation page could not be found.
          </p>
          <Link
            href="/dashboard/docs"
            className="mt-4 inline-block text-red-600 hover:text-red-700 font-medium"
          >
            ← Back to Documentation
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl">
      <div className="mb-6">
        <Link
          href="/dashboard/docs"
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          ← Back to Documentation
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-white p-6 shadow sticky top-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Documentation
            </h2>
            <nav className="space-y-2">
              {docFiles.map((file) => {
                const slug = file.replace(".md", "");
                const isActive = slug === params.slug;
                const fileTitle = slug
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");

                return (
                  <Link
                    key={slug}
                    href={`/dashboard/docs/${slug}`}
                    className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive
                        ? "bg-primary-100 text-primary-900 font-medium"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {fileTitle}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white p-8 shadow">
            <article className="prose prose-primary max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const docsDirectory = path.join(process.cwd(), "docs");

  try {
    const files = fs
      .readdirSync(docsDirectory)
      .filter((file) => file.endsWith(".md"));

    return files.map((file) => ({
      slug: file.replace(".md", ""),
    }));
  } catch (error) {
    return [];
  }
}
