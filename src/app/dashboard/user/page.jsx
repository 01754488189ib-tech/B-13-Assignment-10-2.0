import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { BookOpen, Bookmark, CreditCard } from "@gravity-ui/icons";
import { requireRole } from "@/lib/core/session";
import {
  getUserPurchasedEbooks,
  getBookmarks,
  getUserPurchases,
} from "@/lib/api/ebooks";

export const dynamic = "force-dynamic";

export default async function UserDashboard() {
  const user = await requireRole("user");

  const purchasedBooks = (await getUserPurchasedEbooks()) || [];
  const bookmarks = (await getBookmarks()) || [];
  const purchaseHistory = (await getUserPurchases()) || [];

  const totalInvestment = purchaseHistory.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  );

  return (
    <div className="space-y-10">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
          Reader Workspace
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
          Welcome back, {user.name}
        </h1>
        <p className="text-sm text-zinc-500 mt-2">
          Access your digital library bookshelf and monitor your transactional
          logs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-[#0b0b0f] border border-white/5 p-5 rounded-2xl flex flex-row items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-zinc-500 block">
              Ebooks Purchased
            </span>
            <span className="text-2xl font-black text-white">
              {purchasedBooks.length} Volumes
            </span>
          </div>
        </Card>

        <Card className="bg-[#0b0b0f] border border-white/5 p-5 rounded-2xl flex flex-row items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-zinc-500 block">
              Wishlisted Manuscripts
            </span>
            <span className="text-2xl font-black text-white">
              {bookmarks.length} Items
            </span>
          </div>
        </Card>

        <Card className="bg-[#0b0b0f] border border-white/5 p-5 rounded-2xl flex flex-row items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-zinc-500 block">
              Total Investment
            </span>
            <span className="text-2xl font-black text-white">
              ${totalInvestment.toFixed(2)}
            </span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <h2 className="text-lg font-bold text-white">
              Your Ebook Bookshelf
            </h2>
            <Link
              href="/browse"
              className="text-xs text-amber-500 hover:underline"
            >
              Browse Catalog
            </Link>
          </div>

          {purchasedBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {purchasedBooks.slice(0, 4).map((book) => (
                <Card
                  key={book._id}
                  className="bg-[#0b0b0f] border border-white/5 p-4 rounded-2xl flex flex-row gap-4 items-center hover:border-white/10 transition"
                >
                  <div className="w-16 aspect-[3/4] rounded-lg overflow-hidden relative bg-gradient-to-br from-zinc-800 to-zinc-900 shrink-0 flex items-center justify-center">
                    {book.coverImage ? (
                      <img
                        src={book.coverImage}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="Cover"
                      />
                    ) : (
                      <span className="text-xs font-serif font-black text-white/55">
                        F
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-white truncate">
                      {book.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      {book.writerName}
                    </p>
                    <Link href={`/browse/${book._id}`}>
                      <Button
                        className="h-7 px-3 bg-white/[0.04] text-zinc-300 hover:bg-white/10 rounded-lg text-[10px] font-bold mt-3"
                        size="sm"
                      >
                        Open Reader
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white/[0.01] border border-white/5 rounded-2xl">
              <p className="text-zinc-500 text-xs">
                No manuscripts purchased yet.
              </p>
            </div>
          )}
        </div>

        <div className="bg-[#0b0b0f] border border-white/5 p-6 rounded-3xl space-y-6 h-fit">
          <h2 className="text-base font-bold text-white">
            Reader Account Profile
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center shrink-0">
              {user.image ? (
                <img
                  src={user.image}
                  className="w-full h-full object-cover"
                  alt="Avatar"
                />
              ) : (
                <span className="text-sm font-bold text-amber-500">
                  {user.name ? user.name[0].toUpperCase() : "R"}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-sm font-bold text-white block truncate">
                {user.name}
              </span>
              <span className="text-xs text-zinc-500 block truncate">
                {user.email}
              </span>
            </div>
          </div>
          <div className="pt-4 border-t border-white/5 text-xs text-zinc-500 space-y-2">
            <div className="flex justify-between">
              <span>Account Role</span>
              <span className="font-semibold text-zinc-300 capitalize">
                Reader
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white pb-3 border-b border-white/5">
          Recent Purchase Transactions
        </h2>
        {purchaseHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs text-zinc-400">
              <thead>
                <tr className="border-b border-white/5 text-zinc-500">
                  <th className="py-4 px-2">Transaction ID</th>
                  <th className="py-4 px-2">Ebook Manuscript</th>
                  <th className="py-4 px-2">Date Purchased</th>
                  <th className="py-4 px-2 text-right">Paid Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02] bg-white/[0.01]">
                {purchaseHistory.map((tx) => (
                  <tr key={tx._id} className="hover:bg-white/[0.02] transition">
                    <td className="py-4 px-2 font-mono text-zinc-500">
                      <span
                        className="truncate max-w-[150px] block"
                        title={tx.transactionId}
                      >
                        {tx.transactionId}
                      </span>
                    </td>
                    <td className="py-4 px-2 font-semibold text-white">
                      {tx.ebookTitle || "Original Ebook"}
                    </td>
                    <td className="py-4 px-2 text-zinc-400">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-2 text-right font-black text-amber-500">
                      ${parseFloat(tx.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 bg-white/[0.01] border border-white/5 rounded-2xl">
            <p className="text-zinc-500 text-xs">
              No transactions recorded yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
