import { requireRole } from "@/lib/core/session";
import { getWriterSales } from "@/lib/api/ebooks";

export default async function WriterSalesPage() {
  await requireRole("writer");
  const sales = (await getWriterSales()) || [];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
          Financial Statements
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-white mt-1">
          Sales History
        </h2>
        <p className="text-sm text-zinc-500 mt-2">
          Verify individual manuscript royalties and platform purchase receipts.
        </p>
      </div>

      {sales.length > 0 ? (
        <div className="w-full bg-[#0b0b0f] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs text-zinc-400">
              <thead>
                <tr className="border-b border-white/5 text-zinc-500 font-semibold bg-white/[0.01]">
                  <th className="py-5 px-6">Transaction ID</th>
                  <th className="py-5 px-6">Ebook Manuscript</th>
                  <th className="py-5 px-6">Buyer Email</th>
                  <th className="py-5 px-6">Date</th>
                  <th className="py-5 px-6 text-right">Royalties Earned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {sales.map((log) => (
                  <tr
                    key={log._id}
                    className="hover:bg-white/[0.01] transition-colors"
                  >
                    <td className="py-4 px-6 font-mono text-zinc-500">
                      {log.transactionId}
                    </td>
                    <td className="py-4 px-6 font-semibold text-white">
                      {log.ebookTitle || "Original Manuscript"}
                    </td>
                    <td className="py-4 px-6 text-zinc-300">
                      {log.buyerEmail}
                    </td>
                    <td className="py-4 px-6 text-zinc-500">
                      {new Date(log.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-amber-500">
                      ${log.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-[#0b0b0f] border border-white/5 rounded-2xl">
          <p className="text-zinc-500 text-xs">
            No sales recorded in the system ledger yet.
          </p>
        </div>
      )}
    </div>
  );
}
