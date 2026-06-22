import { requireRole } from "@/lib/core/session";
import UploadEbookForm from "@/components/dashboard/UploadEbookForm";

export default async function NewEbookPage() {
  // Access gate enforcing Writer privileges
  await requireRole("writer");

  return (
    <div className="py-6">
      <UploadEbookForm />
    </div>
  );
}
