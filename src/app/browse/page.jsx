"use client";

import { useState } from "react";
import EbookFilters from "@/components/browse/EbookFilters";
import EbookCard from "@/components/browse/EbookCard";

const initialMockEbooks = [
  {
    id: "eb_1",
    title: "Shadows in the Nebula",
    writer: "Alina Vance",
    genre: "Sci-Fi",
    price: 12.99,
    status: "Available",
    coverGradient: "from-blue-600 via-indigo-700 to-purple-800",
  },
  {
    id: "eb_2",
    title: "The Clockwork Key",
    writer: "Jasper Finch",
    genre: "Mystery",
    price: 8.5,
    status: "Available",
    coverGradient: "from-amber-600 via-orange-700 to-red-800",
  },
  {
    id: "eb_3",
    title: "Embers of Romance",
    writer: "Evelyn Thorne",
    genre: "Romance",
    price: 15.0,
    status: "Sold",
    coverGradient: "from-rose-500 via-pink-600 to-red-700",
  },
  {
    id: "eb_4",
    title: "Echoes of the Void",
    writer: "Alina Vance",
    genre: "Sci-Fi",
    price: 19.99,
    status: "Available",
    coverGradient: "from-teal-600 via-cyan-700 to-blue-800",
  },
  {
    id: "eb_5",
    title: "The Sorcerer's Pact",
    writer: "Morgan Sterling",
    genre: "Fantasy",
    price: 11.25,
    status: "Available",
    coverGradient: "from-violet-600 via-fuchsia-700 to-pink-800",
  },
  {
    id: "eb_6",
    title: "Whispers in the Crypt",
    writer: "Vesper Thorne",
    genre: "Horror",
    price: 9.99,
    status: "Available",
    coverGradient: "from-zinc-800 via-neutral-900 to-black",
  },
  {
    id: "eb_7",
    title: "Chronicles of Olympus",
    writer: "Helena West",
    genre: "Fantasy",
    price: 14.5,
    status: "Available",
    coverGradient: "from-amber-400 via-orange-500 to-red-600",
  },
  {
    id: "eb_8",
    title: "Starlight Rendezvous",
    writer: "Evelyn Thorne",
    genre: "Romance",
    price: 7.99,
    status: "Available",
    coverGradient: "from-pink-500 via-rose-600 to-purple-700",
  },
];

export default function BrowsePage() {
  const [ebooks] = useState(initialMockEbooks);
  const [page, setPage] = useState(1);

  return (
    <div className="w-full min-h-screen bg-[#050508] py-12 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <span className="text-xs font-semibold tracking-wider text-amber-500 uppercase">
          Ebook Catalog
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mt-1">
          Explore Ebooks
        </h1>
        <p className="text-zinc-500 mt-2 text-sm">
          Discover original digital manuscripts published by creators worldwide.
        </p>
      </div>

      {/* Render Dynamic Filter Bar */}
      <EbookFilters />

      {/* Grid Alignment Layout */}
      <div className="max-w-7xl mx-auto mb-6 text-xs text-zinc-500 flex justify-between items-center">
        <span>
          Showing {ebooks.length} position{ebooks.length !== 1 && "s"} found
        </span>
        <span className="text-zinc-600">No login required to view catalog</span>
      </div>

      {ebooks.length > 0 ? (
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ebooks.map((ebook) => (
              <EbookCard key={ebook.id} ebook={ebook} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between border-t border-white/5 pt-6 max-w-7xl mx-auto text-xs text-zinc-500">
            <div>Showing 1-8 of 48 items</div>
            <div className="flex items-center gap-1.5">
              <button
                disabled={page === 1}
                className="px-3.5 py-2 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/5 text-zinc-400 hover:text-white transition disabled:opacity-30 disabled:pointer-events-none"
              >
                Previous
              </button>
              <button className="h-9 w-9 flex items-center justify-center bg-amber-500 text-black font-bold rounded-lg text-xs">
                1
              </button>
              <button className="h-9 w-9 flex items-center justify-center bg-white/[0.02] border border-white/5 hover:bg-white/5 text-zinc-400 hover:text-white font-medium rounded-lg text-xs transition">
                2
              </button>
              <button className="h-9 w-9 flex items-center justify-center bg-white/[0.02] border border-white/5 hover:bg-white/5 text-zinc-400 hover:text-white font-medium rounded-lg text-xs transition">
                3
              </button>
              <button className="px-3.5 py-2 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/5 text-zinc-400 hover:text-white transition">
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-white/5 rounded-[24px] max-w-7xl mx-auto">
          <p className="text-zinc-600 text-base">
            No manuscripts matched your exact filters.
          </p>
        </div>
      )}
    </div>
  );
}
