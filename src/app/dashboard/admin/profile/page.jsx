import { requireRole } from "@/lib/core/session";
import { getAdminUsers, getAdminEbooks } from "@/lib/api/ebooks";
import UserProfileSettings from "@/components/dashboard/UserProfileSettings";

export default async function AdminProfilePage() {
  const user = await requireRole("admin");
  const users = (await getAdminUsers()) || [];
  const ebooks = (await getAdminEbooks()) || [];

  const stats = [
    { label: "System Users", value: `${users.length} Accounts` },
    { label: "Global Catalog", value: `${ebooks.length} Ebooks` },
  ];

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
          Executive Workspace
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
          Profile Settings
        </h1>
        <p className="text-sm text-zinc-500 mt-2">
          Verify root level clearance and update your admin avatar.
        </p>
      </div>

      <UserProfileSettings user={user} stats={stats} />
    </div>
  );
}
