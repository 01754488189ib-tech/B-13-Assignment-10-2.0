"use client";

import { useState } from "react";
import { Card, Button } from "@heroui/react";
import {
  BookOpen,
  CreditCard,
  Star,
  Sparkles,
  Pencil,
  Trash,
} from "@gravity-ui/icons";

export default function WriterDashboard() {
  const [ebooks, setEbooks] = useState([
    {
      id: "eb_1",
      title: "Shadows in the Nebula",
      genre: "Sci-Fi",
      price: 12.99,
      status: "Published",
      salesCount: 42,
      earnings: 545.58,
    },
    {
      id: "eb_4",
      title: "Echoes of the Void",
      genre: "Sci-Fi",
      price: 19.99,
      status: "Published",
      salesCount: 18,
      earnings: 359.82,
    },
    {
      id: "eb_9",
      title: "Cybernetic Genesis",
      genre: "Sci-Fi",
      price: 15.0,
      status: "Draft",
      salesCount: 0,
      earnings: 0.0,
    },
  ]);

  const [sales] = useState([
    {
      id: "tx_201",
      ebook: "Shadows in the Nebula",
      buyer: "John Reader",
      date: "June 14, 2026",
      amount: 12.99,
    },
    {
      id: "tx_202",
      ebook: "Echoes of the Void",
      buyer: "Sarah Connor",
      date: "June 20, 2026",
      amount: 19.99,
    },
  ]);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
            Creator Workspace
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
            Author Console
          </h1>
          <p className="text-sm text-zinc-500 mt-2">
            Publish new manuscripts, monitor reader transactions, and evaluate
            royalty earnings.
          </p>
        </div>

        {/* Creator CTA */}
        <Button className="h-12 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl text-xs shrink-0 shadow-lg shadow-amber-500/10">
          Upload New Ebook
        </Button>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-[#0b0b0f] border border-white/5 p-5 rounded-2xl">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-xs text-zinc-500 block">
            Total Publications
          </span>
          <span className="text-2xl font-black text-white mt-1 block">
            3 Ebooks
          </span>
        </Card>

        <Card className="bg-[#0b0b0f] border border-white/5 p-5 rounded-2xl">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
            <Star className="w-4 h-4" />
          </div>
          <span className="text-xs text-zinc-500 block">Copies Sold</span>
          <span className="text-2xl font-black text-white mt-1 block">
            60 Volumes
          </span>
        </Card>

        <Card className="bg-[#0b0b0f] border border-white/5 p-5 rounded-2xl">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
            <CreditCard className="w-4 h-4" />
          </div>
          <span className="text-xs text-zinc-500 block">Gross Royalty</span>
          <span className="text-2xl font-black text-white mt-1 block">
            $905.40
          </span>
        </Card>

        <Card className="bg-[#0b0b0f] border border-white/5 p-5 rounded-2xl">
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs text-zinc-500 block">Creator Status</span>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded border border-emerald-500/20 w-fit mt-1 block">
            Approved Writer
          </span>
        </Card>
      </div>

      {/* Main Table: Own Ebooks */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white pb-3 border-b border-white/5">
          Manage Your Manuscripts
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-zinc-400">
            <thead>
              <tr className="border-b border-white/5 text-zinc-500">
                <th className="py-4 px-2">Manuscript Title</th>
                <th className="py-4 px-2">Genre</th>
                <th className="py-4 px-2">Standard Price</th>
                <th className="py-4 px-2">Status</th>
                <th className="py-4 px-2 text-right">Volume Sold</th>
                <th className="py-4 px-2 text-right">Royalties</th>
                <th className="py-4 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02] bg-white/[0.01]">
              {ebooks.map((book) => (
                <tr key={book.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-2 font-semibold text-white">
                    {book.title}
                  </td>
                  <td className="py-4 px-2 text-zinc-300">{book.genre}</td>
                  <td className="py-4 px-2 text-amber-500 font-bold">
                    ${book.price.toFixed(2)}
                  </td>
                  <td className="py-4 px-2">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        book.status === "Published"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-zinc-800 text-zinc-400 border-white/5"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right font-semibold text-white">
                    {book.salesCount}
                  </td>
                  <td className="py-4 px-2 text-right font-black text-amber-500">
                    ${book.earnings.toFixed(2)}
                  </td>
                  <td className="py-4 px-2 text-right space-x-1">
                    <Button
                      variant="flat"
                      size="sm"
                      className="h-8 w-8 min-w-0 bg-white/5 text-zinc-300 hover:bg-white/10 rounded-lg p-0"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="flat"
                      size="sm"
                      className="h-8 w-8 min-w-0 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg p-0"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Secondary Table: Recent Royalty Sales */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white pb-3 border-b border-white/5">
          Recent Royalty Sales Log
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-zinc-400">
            <thead>
              <tr className="border-b border-white/5 text-zinc-500">
                <th className="py-4 px-2">Transaction ID</th>
                <th className="py-4 px-2">Ebook Purchased</th>
                <th className="py-4 px-2">Buyer Account</th>
                <th className="py-4 px-2">Date Purchased</th>
                <th className="py-4 px-2 text-right">Earning Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {sales.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.01]">
                  <td className="py-4 px-2 font-mono text-zinc-500">
                    {item.id}
                  </td>
                  <td className="py-4 px-2 font-semibold text-zinc-200">
                    {item.ebook}
                  </td>
                  <td className="py-4 px-2 text-zinc-400">{item.buyer}</td>
                  <td className="py-4 px-2 text-zinc-500">{item.date}</td>
                  <td className="py-4 px-2 text-right font-bold text-amber-500">
                    ${item.amount.toFixed(2)}
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
