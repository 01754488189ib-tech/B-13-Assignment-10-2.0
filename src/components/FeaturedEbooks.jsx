"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Card, Button } from "@heroui/react";
import { Eye, ArrowUpRight } from "@gravity-ui/icons";

export default function FeaturedEbooks({ ebooks = [], user }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
            Handpicked Selections
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mt-1">
            Featured Ebooks
          </h2>
          <p className="text-sm text-zinc-500 mt-2">
            Explore premium original digital manuscripts from our growing
            collection.
          </p>
        </div>
        <Link
          href="/browse"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-amber-500 hover:text-amber-400 transition"
        >
          Explore All Stories
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {ebooks.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {ebooks.map((book) => {
            const bookId = book._id || book.id;
            const isSold = book.status === "Sold";
            const isWriter =
              user && (user.id === book.writerId || user._id === book.writerId);
            const isAdmin = user?.role === "admin";

            return (
              <motion.div key={bookId} variants={cardVariants}>
                <Card className="group relative overflow-hidden border border-white/5 bg-[#0b0b0f] p-5 rounded-[24px] transition-all hover:border-white/10 hover:shadow-2xl h-full flex flex-col justify-between">
                  <div className="space-y-5">
                    <div
                      className={`relative aspect-[3/4] w-full rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 flex flex-col justify-between overflow-hidden shadow-md`}
                    >
                      {book.coverImage ? (
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="absolute inset-0 w-full h-full object-cover z-0"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:12px_12px]" />
                      )}

                      <div className="flex justify-between items-start relative z-10">
                        <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                          {book.genre}
                        </span>
                        {isSold && (
                          <span className="rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-400">
                            Sold
                          </span>
                        )}
                      </div>

                      <div className="relative z-10">
                        <span className="text-[11px] font-semibold text-white/50 tracking-widest uppercase block mb-1">
                          Fable Original
                        </span>
                        <h2 className="text-2xl font-bold font-serif leading-tight text-white tracking-tight line-clamp-3">
                          {book.title}
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-bold text-zinc-100 text-base truncate">
                        {book.title}
                      </h3>
                      <p className="text-xs text-zinc-500">
                        By {book.writerName || "Independent Author"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                        Price
                      </span>
                      <span className="text-lg font-black text-amber-500">
                        ${parseFloat(book.price).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 w-full">
                      <Link href={`/browse/${bookId}`} className="flex-1">
                        <Button
                          className="w-full bg-white/[0.03] border border-white/5 text-zinc-300 hover:bg-white/10 rounded-xl text-xs font-semibold h-10"
                          size="sm"
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          View Details
                        </Button>
                      </Link>

                      {isAdmin ? (
                        <Button
                          disabled
                          className="flex-1 bg-purple-500/10 text-purple-400 rounded-xl text-xs font-bold h-10 cursor-not-allowed border border-purple-500/20"
                          size="sm"
                        >
                          Admin
                        </Button>
                      ) : isWriter ? (
                        <Button
                          disabled
                          className="flex-1 bg-zinc-800 text-zinc-500 rounded-xl text-xs font-bold h-10 cursor-not-allowed"
                          size="sm"
                        >
                          Own Book
                        </Button>
                      ) : (
                        <form
                          action="/api/checkout_sessions"
                          method="POST"
                          className="flex-1"
                        >
                          <input
                            type="hidden"
                            name="checkout_type"
                            value="purchase"
                          />
                          <input type="hidden" name="ebook_id" value={bookId} />
                          <Button
                            type="submit"
                            className="w-full bg-amber-500 text-black hover:bg-amber-400 rounded-xl text-xs font-bold h-10"
                            size="sm"
                            disabled={isSold}
                          >
                            Buy Now
                          </Button>
                        </form>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="text-center py-16 bg-[#0b0b0f] border border-white/5 rounded-2xl">
          <p className="text-zinc-500 text-xs">
            No featured ebooks found in the catalog.
          </p>
        </div>
      )}
    </section>
  );
}
