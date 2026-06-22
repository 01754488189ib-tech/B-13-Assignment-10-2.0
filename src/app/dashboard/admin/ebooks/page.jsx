import { requireRole } from "@/lib/core/session";
import { getAdminEbooks } from "@/lib/api/ebooks";
import AdminEbooksTable from "./AdminEbooksTable";

export default async function AdminEbooksPage() {
  await requireRole("admin");
  const ebooks = (await getAdminEbooks()) || [];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
          Ebook Catalog Security
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-white mt-1">
          Catalog Management
        </h2>
        <p className="text-sm text-zinc-500 mt-2">
          Review details, toggle active visibility, and delete manuscripts from
          the catalog.
        </p>
      </div>

      <AdminEbooksTable ebooks={ebooks} />
    </div>
  );
}
