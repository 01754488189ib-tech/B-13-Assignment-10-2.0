"use client";

import { Card } from "@heroui/react";
import { Users, BookOpen, CreditCard, Star } from "@gravity-ui/icons";

export default function AdminDashboard() {
  const metrics = [
    { title: "Total Users Registered", value: "1,284 Accounts", icon: Users, bg: "from-blue-600/10 to-indigo-600/5", border: "border-blue-500/10", color: "text-blue-400" },
    { title: "Total Ebooks Published", value: "482 Volumes", icon: BookOpen, bg: "from-purple-600/10 to-pink-600/5", border: "border-purple-500/10", color: "text-purple-400" },
    { title: "Copies Sold", value: "3,829 Sales", icon: Star, bg: "from-amber-600/10 to-yellow-600/5", border: "border-amber-500/10", color: "text-amber-400" },
    { title: "Platform Revenue", value: "$45,920.00", icon: CreditCard, bg: "from-emerald-600/10 to-teal-600/5", border: "border-emerald-500/10", color: "text-emerald-400" },
  ];

  const recentTx = [
    { id: "TX_A9981", ebook: "Shadows in the Nebula", author: "Alina Vance", buyer: "reader@fable.com", amount: 12.99, type: "Purchase" },
    { id: "TX_A9982", ebook: "Writer Verification Fee", author: "Jasper Finch", buyer: "jasper@finch.com", amount: 20.00, type: "Publishing Fee" },
  ];

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
          Executive Workspace
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
          System Administration
        </h1>
        <p className="text-sm text-zinc-500 mt-2">
          Monitor system users, approve publishing applications, and trace platform transactions.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className={`bg-[#0b0b0f] border ${item.border} bg-gradient-to-br ${item.bg} p-6 rounded-2xl flex flex-row items-center gap-5 shadow-xl`}>
              <div className={`w-11 h-11 rounded-xl bg-white/[0.02] flex items-center justify-center border border-white/5 ${item.color} shrink-0`}>
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

      {/* Visual Analytics Grid: Line graph SVG & Genre Distribution bar progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* SVG Monthly Sales Line Graph */}
        <div className="bg-[#0b0b0f] border border-white/5 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
          <div>
            <h3 className="text-base font-bold text-white">Monthly Sales Volume Trend</h3>
            <p className="text-xs text-zinc-500 mt-1">Trace transaction scale for the previous six calendar cycles.</p>
          </div>
          
          <div className="w-full h-48 bg-white/[0.01] rounded-2xl flex items-end justify-center px-4 relative overflow-hidden">
            {/* Simple aesthetic grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:100%_40px]" />
            
            {/* Custom crafted SVG line chart representing actual professional developer aesthetics */}
            <svg viewBox="0 0 500 150" className="w-full h-full text-amber-500 overflow-visible relative z-10">
              <path
                d="M 20,130 C 50,110 100,70 150,90 C 200,110 250,30 300,50 C 350,70 400,20 480,10"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Dots */}
              <circle cx="20" cy="130" r="5" className="fill-amber-500" />
              <circle cx="150" cy="90" r="5" className="fill-amber-500" />
              <circle cx="300" cy="50" r="5" className="fill-amber-500" />
              <circle cx="480" cy="10" r="5" className="fill-amber-500" />
            </svg>
          </div>
          <div className="flex justify-between text-[10px] text-zinc-600 font-bold uppercase tracking-wider px-2">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>

        {/* Ebooks Genre Distribution Progress scale */}
        <div className="bg-[#0b0b0f] border border-white/5 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
          <div>
            <h3 className="text-base font-bold text-white">Ebooks by Genre</h3>
            <p className="text-xs text-zinc-500 mt-1">Volume ratios distributed across active editorial catalog filters.</p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-zinc-300">Sci-Fi & Cyberpunk</span>
                <span className="text-zinc-500">42%</span>
              </div>
              <div className="w-full bg-white/[0.02] h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: "42%" }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-zinc-300">Fantasy</span>
                <span className="text-zinc-500">28%</span>
              </div>
              <div className="w-full bg-white/[0.02] h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: "28%" }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-zinc-300">Romance</span>
                <span className="text-zinc-500">18%</span>
              </div>
              <div className="w-full bg-white/[0.02] h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: "18%" }} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* View All Transactions overview */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white pb-3 border-b border-white/5">
          System Transactions Log
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-zinc-400">
            <thead>
              <tr className="border-b border-white/5 text-zinc-500">
                <th className="py-4 px-2">Transaction ID</th>
                <th className="py-4 px-2">Target Asset</th>
                <th className="py-4 px-2">Writer / Account</th>
                <th className="py-4 px-2">Buyer Email</th>
                <th className="py-4 px-2">Ecosystem Type</th>
                <th className="py-4 px-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02] bg-white/[0.01]">
              {recentTx.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-2 font-mono text-zinc-500">{tx.id}</td>
                  <td className="py-4 px-2 font-semibold text-white">{tx.ebook}</td>
                  <td className="py-4 px-2 text-zinc-300">{tx.author}</td>
                  <td className="py-4 px-2 text-zinc-400">{tx.buyer}</td>
                  <td className="py-4 px-2">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${
                      tx.type === "Purchase" 
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20" 
                        : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right font-black text-amber-500">${tx.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}