import { requireRole } from "@/lib/core/session";
import { getAdminUsers } from "@/lib/api/ebooks";
import AdminUsersTable from "@/components/dashboard/AdminUsersTable";

export default async function AdminUsersPage() {
  await requireRole("admin");
  const users = (await getAdminUsers()) || [];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
          Platform Security
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-white mt-1">
          User Account Management
        </h2>
        <p className="text-sm text-zinc-500 mt-2">
          Verify authors, update accounts, and manage system roles.
        </p>
      </div>

      <AdminUsersTable users={users} />
    </div>
  );
}
