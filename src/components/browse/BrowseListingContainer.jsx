"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EbookFilters from "./EbookFilters";
import EbookCard from "./EbookCard";

export default function BrowseListingContainer({ ebooks, filters, total }) {
  const router = useRouter();

  const [search, setSearch] = useState(filters.search || "");
  const [genre, setGenre] = useState(filters.genre || "All");
  const [minPrice, setMinPrice] = useState(filters.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || "");
  const [status, setStatus] = useState(filters.status || "all");
  const [sort, setSort] = useState(filters.sort || "Newest");
  const [page, setPage] = useState(parseInt(filters.page) || 1);

  const perPage = 8;
  const totalPages = Math.ceil(total / perPage);

  useEffect(() => {
    const sp = new URLSearchParams();

    if (search) sp.set("search", search);
    if (genre !== "All") sp.set("genre", genre);
    if (minPrice) sp.set("minPrice", minPrice);
    if (maxPrice) sp.set("maxPrice", maxPrice);
    if (status !== "all") sp.set("status", status);
    if (sort !== "Newest") sp.set("sort", sort);
    if (page > 1) sp.set("page", page.toString());

    router.push(`?${sp.toString()}`);
  }, [router, search, genre, minPrice, maxPrice, status, sort, page]);

  // Reset page pagination back to page 1 whenever filters change
  const handleFilterChange = (setter, value) => {
    setter(value);
    setPage(1);
  };

  return (
    <>
      <EbookFilters
        search={search}
        setSearch={(val) => handleFilterChange(setSearch, val)}
        genre={genre}
        setGenre={(val) => handleFilterChange(setGenre, val)}
        minPrice={minPrice}
        setMinPrice={(val) => handleFilterChange(setMinPrice, val)}
        maxPrice={maxPrice}
        setMaxPrice={(val) => handleFilterChange(setMaxPrice, val)}
        status={status}
        setStatus={(val) => handleFilterChange(setStatus, val)}
        sort={sort}
        setSort={(val) => handleFilterChange(setSort, val)}
      />

      <div className="max-w-7xl mx-auto mb-6 text-xs text-zinc-500 flex justify-between items-center">
        <span>
          Showing {ebooks.length} out of {total} manuscripts found
        </span>
      </div>

      {ebooks.length > 0 ? (
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ebooks.map((ebook) => (
              <EbookCard
                key={ebook._id || ebook.id}
                ebook={{ ...ebook, id: ebook._id }}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-white/5 pt-6 max-w-7xl mx-auto text-xs text-zinc-500">
              <div>
                Showing Page {page} of {totalPages}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3.5 py-2 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/5 text-zinc-400 hover:text-white transition disabled:opacity-30 disabled:pointer-events-none"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pNum = idx + 1;
                  return (
                    <button
                      key={pNum}
                      onClick={() => setPage(pNum)}
                      className={`h-9 w-9 flex items-center justify-center rounded-lg text-xs font-bold transition ${
                        page === pNum
                          ? "bg-amber-500 text-black"
                          : "bg-white/[0.02] border border-white/5 hover:bg-white/5 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3.5 py-2 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/5 text-zinc-400 hover:text-white transition disabled:opacity-30 disabled:pointer-events-none"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-24 border border-dashed border-white/5 rounded-[24px] max-w-7xl mx-auto">
          <p className="text-zinc-500 text-sm">
            No digital manuscripts matched your exact filters.
          </p>
        </div>
      )}
    </>
  );
}
