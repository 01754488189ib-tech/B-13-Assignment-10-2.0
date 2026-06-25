import { requireRole } from "@/lib/core/session";
import { getWriterEbooks } from "@/lib/api/ebooks";
import WriterEbooksTable from "./WriterEbooksTable";

export default async function WriterEbooksPage() {
  await requireRole("writer");
  const ebooks = (await getWriterEbooks()) || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
            Catalog Administration
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mt-1">
            Manage Ebooks
          </h2>
          <p className="text-sm text-zinc-500 mt-2">
            Publish, unpublish, edit, or delete your original manuscripts.
          </p>
        </div>
      </div>

      <WriterEbooksTable ebooks={ebooks} />
    </div>
  );
}
