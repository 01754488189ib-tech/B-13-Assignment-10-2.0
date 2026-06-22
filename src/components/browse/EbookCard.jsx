"use client";

import Link from "next/link";
import { Card } from "@heroui/react";

export default function EbookCard({ ebook }) {
  const isSold = ebook.status === "Sold";

  return (
    <Card className="group relative overflow-hidden border border-white/5 bg-[#0b0b0f] p-4 rounded-[20px] transition-all hover:border-white/10 hover:shadow-2xl">
      <Link href={`/browse/${ebook.id}`} className="block">
        {/* Cover Thumbnail Representation */}
        <div
          className={`relative aspect-[3/4] w-full rounded-xl bg-gradient-to-br ${ebook.coverGradient || "from-zinc-800 to-zinc-900"} p-5 flex flex-col justify-between overflow-hidden shadow-md`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:12px_12px]" />

          <div className="flex justify-between items-start relative z-10">
            <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
              {ebook.genre}
            </span>
            {isSold && (
              <span className="rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/30 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-red-400">
                Sold
              </span>
            )}
          </div>

          <div className="relative z-10">
            <span className="block text-[10px] font-medium text-white/50 tracking-widest uppercase mb-0.5">
              Fable Library
            </span>
            <h4 className="text-base font-bold font-serif leading-tight text-white line-clamp-2">
              {ebook.title}
            </h4>
          </div>
        </div>
      </Link>

      {/* Meta Content Row */}
      <div className="mt-4">
        <Link href={`/browse/${ebook.id}`}>
          <h3 className="font-bold text-zinc-100 text-sm tracking-tight hover:text-amber-400 transition truncate">
            {ebook.title}
          </h3>
        </Link>
        <p className="text-xs text-zinc-500 mt-1">
          By{" "}
          <span className="hover:text-amber-400 transition cursor-pointer font-medium">
            {ebook.writer}
          </span>
        </p>
      </div>

      {/* Price & Action Row */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
        <span className="text-base font-black text-amber-500">
          ${ebook.price.toFixed(2)}
        </span>
        <Link
          href={`/browse/${ebook.id}`}
          className="text-xs font-bold text-zinc-300 hover:text-white transition"
        >
          Details →
        </Link>
      </div>
    </Card>
  );
}
