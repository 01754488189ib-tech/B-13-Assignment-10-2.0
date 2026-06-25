import { requireRole } from "@/lib/core/session";
import { getWriterEbooks, getWriterSales } from "@/lib/api/ebooks";
import UserProfileSettings from "@/components/dashboard/UserProfileSettings";

export default async function WriterProfilePage() {
  const user = await requireRole("writer");
  const ebooks = (await getWriterEbooks()) || [];
  const sales = (await getWriterSales()) || [];
  const totalRoyalties = sales.reduce((acc, curr) => acc + curr.amount, 0);

  const stats = [
    { label: "Published Ebooks", value: `${ebooks.length} Volumes` },
    { label: "Accrued Royalties", value: `$${totalRoyalties.toFixed(2)}` },
  ];

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
          Creator Workspace
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
          Profile Settings
        </h1>
        <p className="text-sm text-zinc-500 mt-2">
          Monitor publishing authorizations and customize your creator avatar.
        </p>
      </div>

      <UserProfileSettings user={user} stats={stats} />
    </div>
  );
}
