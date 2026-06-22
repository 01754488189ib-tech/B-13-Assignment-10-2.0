import { getUserSession } from "@/lib/core/session";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({ children }) {
  // Query actual session from request headers
  const user = await getUserSession();

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-[#050508] border-t border-white/5">
      <DashboardSidebar userRole={user?.role || "user"} />
      <div className="flex-1 overflow-y-auto p-6 sm:p-10">
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
