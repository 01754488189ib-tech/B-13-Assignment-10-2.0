import { requireRole } from "@/lib/core/session";
import { getAdminTransactions } from "@/lib/api/ebooks";

export default async function AdminTransactionsPage() {
  await requireRole("admin");
  const transactions = (await getAdminTransactions()) || [];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
          Financial Records
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-white mt-1">
          Ecosystem Transactions Log
        </h2>
        <p className="text-sm text-zinc-500 mt-2">
          Verify real-time system purchase payments and creator verification
          royalties.
        </p>
      </div>

      <div className="w-full bg-[#0b0b0f] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-zinc-400">
            <thead>
              <tr className="border-b border-white/5 text-zinc-500 font-semibold bg-white/[0.01]">
                <th className="py-5 px-6">Transaction ID</th>
                <th className="py-5 px-6">Ecosystem Type</th>
                <th className="py-5 px-6">Buyer Email</th>
                <th className="py-5 px-6">Date</th>
                <th className="py-5 px-6 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {transactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="hover:bg-white/[0.01] transition-colors"
                >
                  <td className="py-4 px-6 font-mono text-zinc-500">
                    {tx.transactionId}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                        tx.type === "purchase"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-zinc-300">{tx.buyerEmail}</td>
                  <td className="py-4 px-6 text-zinc-500">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-amber-500">
                    ${parseFloat(tx.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
