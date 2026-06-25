import { Card } from "@heroui/react";
import { Persons, BookOpen, CreditCard, Star } from "@gravity-ui/icons";
import { getAdminAnalytics, getAdminTransactions } from "@/lib/api/ebooks";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const analytics = (await getAdminAnalytics()) || {
    totalUsers: 0,
    totalWriters: 0,
    totalEbooks: 0,
    totalRevenue: 0,
    genreAnalytics: [],
    monthlySales: [],
  };

  const transactions = (await getAdminTransactions()) || [];
  const recentTx = transactions.slice(0, 5);

  const metrics = [
    {
      title: "Registered Users",
      value: `${analytics.totalUsers} Accounts`,
      icon: Persons,
      bg: "from-blue-600/10 to-indigo-600/5",
      border: "border-blue-500/10",
      color: "text-blue-400",
    },
    {
      title: "Ebooks Published",
      value: `${analytics.totalEbooks} Volumes`,
      icon: BookOpen,
      bg: "from-purple-600/10 to-pink-600/5",
      border: "border-purple-500/10",
      color: "text-purple-400",
    },
    {
      title: "Verifications (Writers)",
      value: `${analytics.totalWriters} Creators`,
      icon: Star,
      bg: "from-amber-600/10 to-yellow-600/5",
      border: "border-amber-500/10",
      color: "text-amber-400",
    },
    {
      title: "Gross Platform Revenue",
      value: `$${analytics.totalRevenue.toFixed(2)}`,
      icon: CreditCard,
      bg: "from-emerald-600/10 to-teal-600/5",
      border: "border-emerald-500/10",
      color: "text-emerald-400",
    },
  ];

  const salesData = analytics.monthlySales || [];
  const maxSale =
    salesData.length > 0
      ? Math.max(...salesData.map((s) => s.totalSales))
      : 100;

  let pathD = "M 20,130 L 480,130";
  let fillD = "M 20,130 L 480,130 L 480,130 L 20,130 Z";
  const circles = [];

  if (salesData.length > 1) {
    const points = salesData.map((s, idx) => {
      const x = 20 + idx * (460 / (salesData.length - 1));
      const val = s.totalSales;
      const pct = val / (maxSale || 1);
      const y = 130 - pct * 110;
      return { x, y };
    });

    pathD =
      `M ${points[0].x},${points[0].y} ` +
      points
        .slice(1)
        .map((p) => `L ${p.x},${p.y}`)
        .join(" ");

    fillD =
      `M ${points[0].x},140 ` +
      points.map((p) => `L ${p.x},${p.y}`).join(" ") +
      ` L ${points[points.length - 1].x},140 Z`;

    points.forEach((p) => circles.push({ x: p.x, y: p.y }));
  } else if (salesData.length === 1) {
    pathD = "M 20,75 L 480,75";
    fillD = "M 20,75 L 480,75 L 480,140 L 20,140 Z";
    circles.push({ x: 250, y: 75 });
  }

  return (
    <div className="space-y-10">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
          Executive Workspace
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
          System Administration
        </h1>
        <p className="text-sm text-zinc-500 mt-2">
          Monitor system users, approve publishing applications, and trace
          platform transactions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className={`bg-[#0b0b0f] border ${item.border} bg-gradient-to-br ${item.bg} p-6 rounded-2xl flex flex-row items-center gap-5 shadow-xl`}
            >
              <div
                className={`w-11 h-11 rounded-xl bg-white/[0.02] flex items-center justify-center border border-white/5 ${item.color} shrink-0`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-zinc-500 uppercase tracking-wider block font-semibold">
                  {item.title}
                </span>
                <span className="text-xl font-black text-white mt-1 block">
                  {item.value}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0b0b0f] border border-white/5 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
          <div>
            <h3 className="text-base font-bold text-white">
              Monthly Sales Volume Trend
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Trace transaction scale for the previous calendar cycles.
            </p>
          </div>

          <div className="w-full h-48 bg-white/[0.01] rounded-2xl flex items-end justify-center px-4 relative overflow-hidden border border-white/5">
            <svg
              viewBox="0 0 500 150"
              className="w-full h-full text-amber-500 overflow-visible relative z-10"
            >
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <g stroke="white" strokeOpacity="0.02" strokeWidth="1">
                <line x1="20" y1="30" x2="480" y2="30" />
                <line x1="20" y1="65" x2="480" y2="65" />
                <line x1="20" y1="100" x2="480" y2="100" />
              </g>
              <path d={fillD} fill="url(#chartGlow)" stroke="none" />
              <path
                d={pathD}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {circles.map((c, i) => (
                <g key={i}>
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r="8"
                    className="fill-amber-500/20"
                  />
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r="4"
                    className="fill-amber-500 stroke-black stroke-2"
                  />
                </g>
              ))}
            </svg>
          </div>
          <div className="flex justify-between text-[10px] text-zinc-600 font-bold uppercase tracking-wider px-2">
            {salesData.length > 0 ? (
              salesData.map((s) => <span key={s._id}>{s._id}</span>)
            ) : (
              <>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </>
            )}
          </div>
        </div>

        <div className="bg-[#0b0b0f] border border-white/5 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
          <div>
            <h3 className="text-base font-bold text-white">Ebooks by Genre</h3>
            <p className="text-xs text-zinc-500 mt-1">
              Volume ratios distributed across active editorial catalog filters.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {analytics.genreAnalytics && analytics.genreAnalytics.length > 0 ? (
              analytics.genreAnalytics.map((g, idx) => {
                const total = analytics.totalEbooks || 1;
                const percentage = Math.round((g.count / total) * 100);
                const colors = [
                  "bg-amber-500",
                  "bg-purple-500",
                  "bg-rose-500",
                  "bg-blue-500",
                  "bg-emerald-500",
                ];
                const color = colors[idx % colors.length];

                return (
                  <div key={g._id} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-zinc-300">
                        {g._id || "Uncategorized"}
                      </span>
                      <span className="text-zinc-500">{percentage}%</span>
                    </div>
                    <div className="w-full bg-white/[0.02] h-2 rounded-full overflow-hidden">
                      <div
                        className={`${color} h-full rounded-full`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-zinc-500">No genre data found.</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white pb-3 border-b border-white/5">
          System Transactions Log
        </h2>
        {recentTx.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs text-zinc-400">
              <thead>
                <tr className="border-b border-white/5 text-zinc-500 bg-white/[0.01]">
                  <th className="py-4 px-2">Transaction ID</th>
                  <th className="py-4 px-2">Ecosystem Type</th>
                  <th className="py-4 px-2">Buyer Email</th>
                  <th className="py-4 px-2">Purchase Date</th>
                  <th className="py-4 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {recentTx.map((tx) => (
                  <tr
                    key={tx._id}
                    className="hover:bg-white/[0.01] transition font-medium"
                  >
                    <td className="py-4 px-2 font-mono text-zinc-500">
                      <span
                        className="truncate max-w-[150px] block"
                        title={tx.transactionId}
                      >
                        {tx.transactionId}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                          tx.type === "purchase"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-zinc-300">{tx.buyerEmail}</td>
                    <td className="py-4 px-2 text-zinc-400">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-2 text-right font-bold text-amber-500">
                      ${tx.amount.toFixed(2)}
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
