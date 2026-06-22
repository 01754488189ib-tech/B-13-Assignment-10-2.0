"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import {
  Calendar,
  Bookmark,
  CircleDollar,
  MapPin,
  ArrowLeft,
  ChevronRight,
  Sparkles,
} from "@gravity-ui/icons";

export default function EbookDetailsPage({ params }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  // High fidelity mock data for visual render matching
  const mockEbook = {
    id: "eb_1",
    title: "Shadows in the Nebula",
    writer: "Alina Vance",
    writerId: "wr_44",
    genre: "Sci-Fi",
    price: 12.99,
    status: "Available",
    uploadDate: "June 14, 2026",
    coverGradient: "from-blue-600 via-indigo-700 to-purple-800",
    description:
      "The year is 2248. High-intensity cosmic storms have permanently severed communication lines between Earth and the colony grids of outer Nebula. Inside the drifting sector 9, cybernetic engineer Alina Vance discovers a cryptic distress signal buried deep within an abandoned atmospheric mining vessel.\n\nWhat unfolds is a high-octane mystery containing corporate sabotage, sentient machines, and the dark reality of interstellar colonization. A must-read for fans of classic deep-space cyberpunk.",
  };

  return (
    <div className="min-h-screen bg-[#050508] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-8 select-none">
          <Link href="/" className="hover:text-zinc-300 transition">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <Link href="/browse" className="hover:text-zinc-300 transition">
            Browse
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <span className="text-zinc-400 font-medium">{mockEbook.title}</span>
        </div>

        {/* Back Link */}
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Ebook Catalog
        </Link>

        {/* Main Grid Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT BLOCK: Cover Graphic + Meta Table (Spans 5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="relative aspect-[3/4] w-full rounded-[32px] bg-gradient-to-br from-zinc-900 to-black p-8 flex flex-col justify-between overflow-hidden border border-white/5 shadow-2xl">
              {/* Outer decorative ambient blur behind book cover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

              {/* Actual graphic representation of book */}
              <div
                className={`w-full h-full rounded-2xl bg-gradient-to-br ${mockEbook.coverGradient} p-8 flex flex-col justify-between relative shadow-2xl overflow-hidden border border-white/10`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:20px_20px]" />

                <div className="flex justify-between items-start z-10">
                  <span className="rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                    {mockEbook.genre}
                  </span>
                  <span className="rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Fable Original
                  </span>
                </div>

                <div className="z-10">
                  <span className="text-[11px] font-semibold text-white/50 tracking-widest uppercase block mb-1">
                    Exquisite Manuscript
                  </span>
                  <h2 className="text-3xl font-bold font-serif leading-tight text-white tracking-tight">
                    {mockEbook.title}
                  </h2>
                </div>
              </div>
            </Card>

            {/* Quick Metadata Stats */}
            <div className="bg-[#0b0b0f] border border-white/5 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                <span className="text-zinc-500">Language</span>
                <span className="font-semibold text-zinc-300">
                  English (US)
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                <span className="text-zinc-500">Format</span>
                <span className="font-semibold text-zinc-300">
                  Digital EPUB / PDF
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500">Security</span>
                <span className="font-semibold text-zinc-300">
                  Stripe Encrypted
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT BLOCK: Information details, interactive purchases (Spans 7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="rounded-full bg-amber-500/10 text-amber-400 px-3 py-1 text-xs font-bold uppercase tracking-wider border border-amber-500/10">
                  {mockEbook.genre}
                </span>
                <span className="rounded-full bg-white/[0.02] text-zinc-400 border border-white/5 px-3 py-1 text-xs">
                  EPUB Edition
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {mockEbook.title}
              </h1>

              <p className="text-sm text-zinc-400">
                Created by{" "}
                <Link
                  href={`/browse?writer=${mockEbook.writer}`}
                  className="font-semibold text-amber-400 hover:underline transition"
                >
                  {mockEbook.writer}
                </Link>
              </p>
            </div>

            <hr className="border-white/5" />

            {/* Book Description Box */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
                Synopsis
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line bg-[#0b0b0f] border border-white/5 p-6 rounded-2xl shadow-inner">
                {mockEbook.description}
              </p>
            </div>

            {/* Metadata Overview Shelf Widget */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-amber-500" />
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase font-bold">
                    Uploaded
                  </span>
                  <span className="text-xs font-medium text-zinc-300">
                    {mockEbook.uploadDate}
                  </span>
                </div>
              </div>

              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                <CircleDollar className="w-5 h-5 text-amber-500" />
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase font-bold">
                    Pricing tier
                  </span>
                  <span className="text-xs font-medium text-zinc-300">
                    Standard Tier
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing Card Section with CTA */}
            <div className="bg-[#0b0b0f] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex justify-between items-baseline gap-4 flex-wrap">
                <div>
                  <span className="text-xs text-zinc-500 block uppercase tracking-wider font-semibold mb-1">
                    Book price
                  </span>
                  <span className="text-4xl font-black text-white tracking-tight">
                    ${mockEbook.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs text-zinc-400 font-medium">
                    Digital asset available instantly
                  </span>
                </div>
              </div>

              <div className="flex gap-3 flex-wrap sm:flex-nowrap">
                <Button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  variant="bordered"
                  className={`h-14 px-5 rounded-2xl transition border-white/10 ${
                    isBookmarked
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                      : "text-zinc-400 hover:bg-white/5"
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                  {isBookmarked ? "Bookmarked" : "Bookmark Ebook"}
                </Button>

                <Button
                  onClick={() => setIsPurchased(true)}
                  disabled={isPurchased}
                  className={`w-full h-14 rounded-2xl text-sm font-bold shadow-xl transition-all ${
                    isPurchased
                      ? "bg-zinc-800 text-zinc-500 border border-zinc-700/50 cursor-not-allowed shadow-none"
                      : "bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/10 hover:-translate-y-0.5"
                  }`}
                >
                  {isPurchased ? "Already Purchased" : "Purchase Manuscript"}
                </Button>
              </div>

              {isPurchased && (
                <div className="p-4 bg-emerald-950/20 border border-emerald-500/10 rounded-xl text-xs text-emerald-400 leading-relaxed">
                  <strong>Access Granted:</strong> Thank you for your purchase.
                  You can now download the full EPUB / PDF formats inside your
                  Seeker Dashboard workspace.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
