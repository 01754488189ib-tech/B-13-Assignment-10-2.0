import { requireRole } from "@/lib/core/session";
import { getBookmarks, getUserPurchasedEbooks } from "@/lib/api/ebooks";
import UserProfileSettings from "@/components/dashboard/UserProfileSettings";

export default async function UserProfilePage() {
  const user = await requireRole("user");
  const purchased = (await getUserPurchasedEbooks()) || [];
  const bookmarks = (await getBookmarks()) || [];

  const stats = [
    { label: "Purchases", value: `${purchased.length} Ebooks` },
    { label: "Bookmarks", value: `${bookmarks.length} Items` },
  ];

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
          Account Workspace
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
          Profile Settings
        </h1>
        <p className="text-sm text-zinc-500 mt-2">
          Manage your reader coordinates and upload custom profile images.
        </p>
      </div>

      <UserProfileSettings user={user} stats={stats} />
    </div>
  );
}
