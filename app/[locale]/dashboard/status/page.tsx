import { requireAuth } from "@/lib/auth-guards";
import StatusPageClient from "@/components/StatusPageClient";

export default async function StatusPage() {
  await requireAuth();

  return <StatusPageClient />;
}