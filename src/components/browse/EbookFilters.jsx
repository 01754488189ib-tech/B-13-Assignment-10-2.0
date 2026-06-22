"use client";

import { Magnifier, ChevronDown } from "@gravity-ui/icons";

export default function EbookFilters() {
  const genres = [
    "All",
    "Sci-Fi",
    "Fantasy",
    "Romance",
    "Mystery",
    "Horror",
    "Fiction",
  ];
  const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low"];

  return (
    <div className="flex flex-col gap-6 bg-[#0b0b0f] p-6 rounded-[24px] border border-white/5 max-w-7xl mx-auto mb-10 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* 1. Text Search Input */}
        <div className="md:col-span-4 flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Search catalog
          </label>
          <div className="relative flex items-center bg-white/[0.02] border border-white/5 rounded-xl px-3.5 h-11 focus-within:border-amber-500/50 transition">
            <Magnifier className="w-4 h-4 text-zinc-500 shrink-0 mr-2.5" />
            <input
              type="text"
              placeholder="Search by title or writer name..."
              className="bg-transparent text-white placeholder-zinc-600 text-sm outline-none w-full"
            />
          </div>
        </div>

        {/* 2. Genre Dropdown filter */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Genre
          </label>
          <div className="relative">
            <select className="w-full bg-white/[0.02] border border-white/5 text-zinc-300 rounded-xl h-11 px-3 text-sm outline-none appearance-none cursor-pointer focus:border-amber-500/50 transition">
              {genres.map((g) => (
                <option key={g} value={g} className="bg-[#050508]">
                  {g}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          </div>
        </div>

        {/* 3. Price Range Grid */}
        <div className="md:col-span-3 flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Price Range ($)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full bg-white/[0.02] border border-white/5 text-zinc-300 rounded-xl h-11 px-3 text-sm placeholder-zinc-600 outline-none focus:border-amber-500/50 transition"
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full bg-white/[0.02] border border-white/5 text-zinc-300 rounded-xl h-11 px-3 text-sm placeholder-zinc-600 outline-none focus:border-amber-500/50 transition"
            />
          </div>
        </div>

        {/* 4. Availability Checkbox Toggle */}
        <div className="md:col-span-1.5 flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Availability
          </label>
          <div className="relative">
            <select className="w-full bg-white/[0.02] border border-white/5 text-zinc-300 rounded-xl h-11 px-3 text-sm outline-none appearance-none cursor-pointer focus:border-amber-500/50 transition">
              <option value="all" className="bg-[#050508]">
                All
              </option>
              <option value="available" className="bg-[#050508]">
                In Stock
              </option>
              <option value="sold" className="bg-[#050508]">
                Sold Out
              </option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          </div>
        </div>

        {/* 5. Sort Ordering Dropdown */}
        <div className="md:col-span-1.5 flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Sort By
          </label>
          <div className="relative">
            <select className="w-full bg-white/[0.02] border border-white/5 text-zinc-300 rounded-xl h-11 px-3 text-sm outline-none appearance-none cursor-pointer focus:border-amber-500/50 transition">
              {sortOptions.map((o) => (
                <option key={o} value={o} className="bg-[#050508]">
                  {o}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
