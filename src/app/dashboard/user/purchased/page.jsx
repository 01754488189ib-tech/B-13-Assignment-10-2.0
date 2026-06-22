import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { BookOpen } from "@gravity-ui/icons";
import { requireRole } from "@/lib/core/session";
import { getUserPurchasedEbooks } from "@/lib/api/ebooks";

export default async function PurchasedEbooksPage() {
  await requireRole("user");
  const purchased = (await getUserPurchasedEbooks()) || [];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
          Personal Collection
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-white mt-1">
          Purchased Ebooks
        </h2>
        <p className="text-sm text-zinc-500 mt-2">
          Your fully unlocked collection of original digital publications.
        </p>
      </div>

      {purchased.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchased.map((book) => (
            <Card
              key={book._id}
              className="bg-[#0b0b0f] border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-white/10 transition shadow-xl"
            >
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden relative">
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-zinc-600" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm truncate">
                    {book.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    By {book.writerName}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold uppercase tracking-wider">
                  Unlocked
                </span>
                <Button
                  as={Link}
                  href={`/browse/${book._id}`}
                  className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-lg px-4"
                  size="sm"
                >
                  Read Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#0b0b0f] border border-white/5 rounded-2xl">
          <p className="text-zinc-500 text-xs">
            No publications purchased yet. Explore our browse catalog.
          </p>
        </div>
      )}
    </div>
  );
}
