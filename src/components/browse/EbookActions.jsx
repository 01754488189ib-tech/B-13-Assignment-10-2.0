"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Bookmark } from "@gravity-ui/icons";

export default function EbookActions({ ebookId, isWriter, isSold, user }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="flex gap-3 flex-wrap sm:flex-nowrap">
      {/* Bookmark Toggle */}
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

      {/* Stripe Checkout Form Wrapper */}
      <form action="/api/checkout_sessions" method="POST" className="w-full">
        <input type="hidden" name="checkout_type" value="purchase" />
        <input type="hidden" name="ebook_id" value={ebookId} />

        {isSold ? (
          <Button
            disabled
            className="w-full h-14 rounded-2xl text-sm font-bold bg-zinc-800 text-zinc-500 border border-zinc-700/50 cursor-not-allowed"
          >
            Already Purchased
          </Button>
        ) : isWriter ? (
          <Button
            disabled
            className="w-full h-14 rounded-2xl text-sm font-bold bg-zinc-800 text-zinc-500 border border-zinc-700/50 cursor-not-allowed"
          >
            Cannot Buy Your Own Book
          </Button>
        ) : !user ? (
          <Button
            as="a"
            href={`/auth/signin?redirect=/browse/${ebookId}`}
            className="w-full h-14 rounded-2xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-black shadow-xl shadow-amber-500/10 hover:-translate-y-0.5 flex items-center justify-center"
          >
            Sign In to Purchase
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full h-14 rounded-2xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-black shadow-xl shadow-amber-500/10 hover:-translate-y-0.5"
          >
            Purchase Manuscript
          </Button>
        )}
      </form>
    </div>
  );
}
