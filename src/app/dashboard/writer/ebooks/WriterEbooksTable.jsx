"use client";

import React, { useState } from "react";
import Link from "next/link";
import { updateEbook, deleteEbook } from "@/lib/actions/ebooks";

export default function WriterEbooksTable({ ebooks }) {
  const [loadingId, setLoadingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(ebooks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ebooks.slice(indexOfFirstItem, indexOfLastItem);

  async function handleToggleStatus(id, currentStatus) {
    setLoadingId(id);
    const newStatus =
      currentStatus === "Available" ? "Unpublished" : "Available";
    await updateEbook(id, { status: newStatus });
    setLoadingId(null);
  }

  async function handleDelete(id) {
    if (confirm("Are you sure you want to delete this ebook from Fable?")) {
      setLoadingId(id);
      await deleteEbook(id);
      setLoadingId(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="w-full bg-[#0b0b0f] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-zinc-400">
            <thead>
              <tr className="border-b border-white/5 text-zinc-500 font-semibold bg-white/[0.01]">
                <th className="py-5 px-6">Ebook Title</th>
                <th className="py-5 px-6">Genre</th>
                <th className="py-5 px-6">Price</th>
                <th className="py-5 px-6">Status</th>
                <th className="py-5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {currentItems.map((book) => (
                <tr
                  key={book._id}
                  className="hover:bg-white/[0.01] transition-colors"
                >
                  <td className="py-4 px-6 font-semibold text-white whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 aspect-[3/4] rounded-lg overflow-hidden relative bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 shrink-0">
                        {book.coverImage && (
                          <img
                            src={book.coverImage}
                            className="absolute inset-0 w-full h-full object-cover"
                            alt="Cover"
                          />
                        )}
                      </div>
                      <span className="truncate max-w-xs">{book.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">{book.genre}</td>
                  <td className="py-4 px-6 font-semibold text-amber-500">
                    ${parseFloat(book.price).toFixed(2)}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                        book.status === "Available"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : book.status === "Sold"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right font-medium">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/dashboard/writer/edit/${book._id}`}
                        className="text-zinc-400 hover:text-amber-400 transition"
                      >
                        Edit
                      </Link>
                      {book.status !== "Sold" && (
                        <button
                          disabled={loadingId === book._id}
                          onClick={() =>
                            handleToggleStatus(book._id, book.status)
                          }
                          className="text-zinc-400 hover:text-amber-400 transition pl-3 border-l border-white/5"
                        >
                          {book.status === "Available"
                            ? "Unpublish"
                            : "Publish"}
                        </button>
                      )}
                      <button
                        disabled={loadingId === book._id}
                        onClick={() => handleDelete(book._id)}
                        className="text-red-500 hover:text-red-400 transition pl-3 border-l border-white/5"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-zinc-500 px-2 pt-2 select-none">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-zinc-300 disabled:opacity-30 disabled:pointer-events-none transition"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-zinc-300 disabled:opacity-30 disabled:pointer-events-none transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
