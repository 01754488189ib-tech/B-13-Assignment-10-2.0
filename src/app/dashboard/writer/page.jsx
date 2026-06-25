import Link from "next/link";
import { Button, Card } from "@heroui/react";
import {
  BookOpen,
  CreditCard,
  Star,
  Sparkles,
  Pencil,
} from "@gravity-ui/icons";
import { requireRole } from "@/lib/core/session";
import { getWriterEbooks, getWriterSales } from "@/lib/api/ebooks";

export default async function WriterDashboardPage() {
  const user = await requireRole("writer");

  const ebooks = (await getWriterEbooks()) || [];
  const sales = (await getWriterSales()) || [];

  const totalSalesCount = sales.length;
  const grossEarnings = sales.reduce((acc, curr) => acc + curr.amount, 0);

  if (!user.verifiedWriter) {
    return (
      <div className="max-w-2xl mx-auto my-12 space-y-6">
        <div className="bg-[#0b0b0f] border border-white/5 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto border border-amber-500/20">
            <Sparkles size={24} className="text-amber-500 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Activate Ebook Publishing Privileges
            </h2>
            <p className="text-sm text-zinc-500 max-w-sm mx-auto leading-relaxed">
              To upload original manuscripts and collect royalty shares,
              complete a one-time account verification payment.
            </p>
          </div>

          <div className="bg-white/[0.01] border border-white/5 p-5 rounded-2xl max-w-sm mx-auto flex items-center justify-between text-left text-xs">
            <div>
              <span className="text-zinc-500 block uppercase font-bold text-[9px] tracking-wider">
                Verification Fee
              </span>
              <span className="text-lg font-black text-white">
                $20.00{" "}
                <span className="text-xs font-normal text-zinc-500">
                  / lifetime
                </span>
              </span>
            </div>
            <span className="text-emerald-400 font-semibold bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
              Lifetime Access
            </span>
          </div>

          <form
            action="/api/checkout_sessions"
            method="POST"
            className="max-w-sm mx-auto"
          >
            <input type="hidden" name="checkout_type" value="verification" />
            <Button
              type="submit"
              className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl text-xs transition duration-200 shadow-xl shadow-amber-500/10"
            >
              Verify Writer Account Now
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
            Creator Workspace
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
            Author Console
          </h1>
          <p className="text-sm text-zinc-500 mt-2">
            Publish original ebooks, check buyer transactions, and monitor
            earnings.
          </p>
        </div>
        <Link href="/dashboard/writer/new">
          <Button className="h-12 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl text-xs shrink-0 shadow-lg shadow-amber-500/10 transition-transform hover:-translate-y-0.5">
            Publish New Ebook
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-[#0b0b0f] border border-white/5 p-5 rounded-2xl flex flex-row items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-zinc-500 block">
              Manuscripts Published
            </span>
            <span className="text-2xl font-black text-white">
              {ebooks.length} Ebooks
            </span>
          </div>
        </Card>

        <Card className="bg-[#0b0b0f] border border-white/5 p-5 rounded-2xl flex flex-row items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-zinc-500 block">
              Total Copies Sold
            </span>
            <span className="text-2xl font-black text-white">
              {totalSalesCount} Sales
            </span>
          </div>
        </Card>

        <Card className="bg-[#0b0b0f] border border-white/5 p-5 rounded-2xl flex flex-row items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-zinc-500 block">
              Accrued Royalties
            </span>
            <span className="text-2xl font-black text-white">
              ${grossEarnings.toFixed(2)}
            </span>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white pb-3 border-b border-white/5">
          Manage Manuscripts
        </h2>
        {ebooks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs text-zinc-400">
              <thead>
                <tr className="border-b border-white/5 text-zinc-500">
                  <th className="py-4 px-2">Ebook Title</th>
                  <th className="py-4 px-2">Genre</th>
                  <th className="py-4 px-2">Pricing</th>
                  <th className="py-4 px-2">Status</th>
                  <th className="py-4 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {ebooks.map((book) => (
                  <tr
                    key={book._id}
                    className="hover:bg-white/[0.01] transition"
                  >
                    <td className="py-4 px-2 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-10 aspect-[3/4] rounded-lg overflow-hidden relative bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 shrink-0">
                          {book.coverImage && (
                            <img
                              src={book.coverImage}
                              className="absolute inset-0 w-full h-full object-cover"
                              alt="Cover"
                            />
                          )}
                        </div>
                        <span className="truncate max-w-xs">{book.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-zinc-300">{book.genre}</td>
                    <td className="py-4 px-2 text-amber-500 font-bold">
                      ${book.price.toFixed(2)}
                    </td>
                    <td className="py-4 px-2">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
                        {book.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Link href={`/dashboard/writer/edit/${book._id}`}>
                        <Button
                          variant="flat"
                          size="sm"
                          className="h-8 w-8 min-w-0 bg-white/5 text-zinc-300 hover:bg-white/10 rounded-lg p-0"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 bg-white/[0.01] border border-white/5 rounded-2xl">
            <p className="text-zinc-500 text-xs">
              No manuscripts published yet. Click Publish New Ebook to begin.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white pb-3 border-b border-white/5">
          Royalty Sales Logs
        </h2>
        {sales.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs text-zinc-400">
              <thead>
                <tr className="border-b border-white/5 text-zinc-500">
                  <th className="py-4 px-2">Transaction ID</th>
                  <th className="py-4 px-2">Purchased By</th>
                  <th className="py-4 px-2">Purchase Date</th>
                  <th className="py-4 px-2 text-right">Amount Earned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {sales.map((log) => (
                  <tr
                    key={log._id}
                    className="hover:bg-white/[0.01] transition"
                  >
                    <td className="py-4 px-2 font-mono text-zinc-500">
                      {log.transactionId}
                    </td>
                    <td className="py-4 px-2 text-zinc-300">
                      {log.buyerEmail}
                    </td>
                    <td className="py-4 px-2 text-zinc-400">
                      {new Date(log.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-2 text-right font-bold text-amber-500">
                      ${log.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 bg-white/[0.01] border border-white/5 rounded-2xl">
            <p className="text-zinc-500 text-xs">
              No royalty sales recorded yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
