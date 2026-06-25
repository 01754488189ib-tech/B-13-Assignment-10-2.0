import { requireRole } from "@/lib/core/session";
import { getEbookById } from "@/lib/api/ebooks";
import EditEbookForm from "@/components/dashboard/EditEbookForm";

export default async function EditEbookPage({ params }) {
  await requireRole("writer");
  const { id } = await params;
  const ebook = await getEbookById(id);

  if (!ebook) {
    return (
      <div className="text-center py-20 text-sm text-zinc-500">
        The requested manuscript could not be found.
      </div>
    );
  }

  return (
    <div className="py-6">
      <EditEbookForm ebook={ebook} />
    </div>
  );
}
