"use client";

import React, { useState } from "react";
import { updateEbook, deleteEbook } from "@/lib/actions/ebooks";

export default function AdminEbooksTable({ ebooks }) {
  const [loadingId, setLoadingId] = useState(null);

  async function handleToggleStatus(id, currentStatus) {
    setLoadingId(id);
    const newStatus =
      currentStatus === "Available" ? "Unpublished" : "Available";
    await updateEbook(id, { status: newStatus });
    setLoadingId(null);
  }

  async function handleDelete(id) {
    if (confirm("Are you sure you want to delete this ebook?")) {
      setLoadingId(id);
      await deleteEbook(id);
      setLoadingId(null);
    }
  }

  return (
    <div className="w-full bg-[#0b0b0f] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs text-zinc-400">
          <thead>
            <tr className="border-b border-white/5 text-zinc-500 font-semibold bg-white/[0.01]">
              <th className="py-5 px-6">Ebook Title</th>
              <th className="py-5 px-6">Author</th>
              <th className="py-5 px-6">Genre</th>
              <th className="py-5 px-6">Price</th>
              <th className="py-5 px-6">Status</th>
              <th className="py-5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02]">
            {ebooks.map((book) => (
              <tr
                key={book._id}
                className="hover:bg-white/[0.01] transition-colors"
              >
                <td className="py-4 px-6 font-semibold text-white truncate max-w-xs">
                  {book.title}
                </td>
                <td className="py-4 px-6 text-zinc-400">{book.writerName}</td>
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
                    {book.status !== "Sold" && (
                      <button
                        disabled={loadingId === book._id}
                        onClick={() =>
                          handleToggleStatus(book._id, book.status)
                        }
                        className="text-zinc-400 hover:text-amber-400 transition"
                      >
                        {book.status === "Available" ? "Unpublish" : "Publish"}
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
  );
}
