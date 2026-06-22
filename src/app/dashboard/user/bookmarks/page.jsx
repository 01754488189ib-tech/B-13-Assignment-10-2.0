import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { Bookmark } from "@gravity-ui/icons";
import { requireRole } from "@/lib/core/session";
import { getBookmarks } from "@/lib/api/ebooks";
import { deleteBookmark } from "@/lib/actions/bookmarks";

export default async function UserBookmarksPage() {
  await requireRole("user");
  const bookmarks = (await getBookmarks()) || [];

  async function handleRemove(formData) {
    "use server";
    const ebookId = formData.get("ebookId");
    await deleteBookmark(ebookId);
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
          Saved Manuscripts
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-white mt-1">
          Bookmark Shelf
        </h2>
        <p className="text-sm text-zinc-500 mt-2">
          Your curated selection of manuscripts saved for reading or buying
          later.
        </p>
      </div>

      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((b) => (
            <Card
              key={b._id}
              className="bg-[#0b0b0f] border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-white/10 transition shadow-xl"
            >
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden relative">
                  {b.ebookCover ? (
                    <img
                      src={b.ebookCover}
                      alt={b.ebookTitle}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Bookmark className="w-8 h-8 text-zinc-600" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm truncate">
                    {b.ebookTitle}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    By {b.ebookWriter}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-amber-500">
                  ${parseFloat(b.ebookPrice).toFixed(2)}
                </span>
                <div className="flex gap-2">
                  <form action={handleRemove}>
                    <input type="hidden" name="ebookId" value={b.ebookId} />
                    <Button
                      type="submit"
                      variant="flat"
                      size="sm"
                      className="bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-bold rounded-lg px-3"
                    >
                      Remove
                    </Button>
                  </form>
                  <Button
                    as={Link}
                    href={`/browse/${b.ebookId}`}
                    className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-lg px-4"
                    size="sm"
                  >
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#0b0b0f] border border-white/5 rounded-2xl">
          <p className="text-zinc-500 text-xs">
            No bookmarked ebooks. Explore our catalog to add books.
          </p>
        </div>
      )}
    </div>
  );
}
