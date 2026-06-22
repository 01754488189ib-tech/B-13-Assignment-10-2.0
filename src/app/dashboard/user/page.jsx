"use client";

import Link from "next/link";
import { Card, Button } from "@heroui/react";
import {
  BookOpen,
  Bookmark,
  CreditCard,
  Person,
  Sparkles,
} from "@gravity-ui/icons";

export default function UserDashboard() {
  const purchasedBooks = [
    {
      id: "eb_1",
      title: "Shadows in the Nebula",
      writer: "Alina Vance",
      genre: "Sci-Fi",
      coverGradient: "from-blue-600 to-purple-800",
    },
    {
      id: "eb_4",
      title: "Echoes of the Void",
      writer: "Alina Vance",
      genre: "Sci-Fi",
      coverGradient: "from-teal-600 to-blue-800",
    },
  ];

  const purchaseHistory = [
    {
      id: "TX_1001",
      title: "Shadows in the Nebula",
      writer: "Alina Vance",
      price: 12.99,
      date: "June 14, 2026",
      status: "Successful",
    },
    {
      id: "TX_1002",
      title: "Echoes of the Void",
      writer: "Alina Vance",
      price: 19.99,
      date: "June 20, 2026",
      status: "Successful",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Dashboard Welcome Header */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
          Reader Workspace
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
          Welcome back, Reader
        </h1>
        <p className="text-sm text-zinc-500 mt-2">
          Access your digital library bookshelf and monitor your transactional
          logs.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-[#0b0b0f] border border-white/5 p-5 rounded-2xl flex flex-row items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-zinc-500 block">
              Ebooks Purchased
            </span>
            <span className="text-2xl font-black text-white">2 Volumes</span>
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
            <span className="text-2xl font-black text-white">5 Items</span>
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
            <span className="text-2xl font-black text-white">$32.98</span>
          </div>
        </Card>
      </div>

      {/* Grid: Bookshelf (2/3) + Profile Panel (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Purchased Gallery */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {purchasedBooks.map((book) => (
              <Card
                key={book.id}
                className="bg-[#0b0b0f] border border-white/5 p-4 rounded-2xl flex flex-row gap-4 items-center hover:border-white/10 transition"
              >
                <div
                  className={`w-16 aspect-[3/4] rounded-lg bg-gradient-to-br ${book.coverGradient} flex-shrink-0 flex items-center justify-center`}
                >
                  <span className="text-xs font-serif font-black text-white/55">
                    F
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-white truncate">
                    {book.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">{book.writer}</p>
                  <Button
                    as={Link}
                    href={`/browse/${book.id}`}
                    className="h-7 px-3 bg-white/[0.04] text-zinc-300 hover:bg-white/10 rounded-lg text-[10px] font-bold mt-3"
                    size="sm"
                  >
                    Open Reader
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Mini Profile card */}
        <div className="bg-[#0b0b0f] border border-white/5 p-6 rounded-3xl space-y-6 h-fit">
          <h2 className="text-base font-bold text-white">
            Reader Account Profile
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 font-black">
              RD
            </div>
            <div>
              <span className="text-sm font-bold text-white block">
                John Reader
              </span>
              <span className="text-xs text-zinc-500 block">
                reader@fable.com
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
            <div className="flex justify-between">
              <span>Joined</span>
              <span className="font-semibold text-zinc-300">June 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Transaction History */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white pb-3 border-b border-white/5">
          Recent Purchase Transactions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-zinc-400">
            <thead>
              <tr className="border-b border-white/5 text-zinc-500">
                <th className="py-4 px-2">Transaction ID</th>
                <th className="py-4 px-2">Ebook Manuscript</th>
                <th className="py-4 px-2">Author</th>
                <th className="py-4 px-2">Date Purchased</th>
                <th className="py-4 px-2 text-right">Paid Amount</th>
                <th className="py-4 px-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02] bg-white/[0.01]">
              {purchaseHistory.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-2 font-mono text-zinc-500">{tx.id}</td>
                  <td className="py-4 px-2 font-semibold text-white">
                    {tx.title}
                  </td>
                  <td className="py-4 px-2 text-zinc-300">{tx.writer}</td>
                  <td className="py-4 px-2 text-zinc-400">{tx.date}</td>
                  <td className="py-4 px-2 text-right font-black text-amber-500">
                    ${tx.price.toFixed(2)}
                  </td>
                  <td className="py-4 px-2 text-right">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      {tx.status}
                    </span>
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
