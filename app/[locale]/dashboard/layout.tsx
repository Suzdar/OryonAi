import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden text-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
