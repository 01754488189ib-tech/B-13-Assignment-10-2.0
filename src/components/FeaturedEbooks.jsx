"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Card, Button } from "@heroui/react";
import { Eye, ArrowUpRight } from "@gravity-ui/icons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function FeaturedEbooks({ ebooks = [] }) {
  return (
    <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-amber-500 uppercase">
            Curated Picks
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1 sm:text-4xl">
            Featured Ebooks
          </h2>
          <p className="text-sm text-zinc-500 mt-2">
            Explore premium manuscripts selected by our editors.
          </p>
        </div>
        <Link
          href="/browse"
          className="group flex items-center gap-1 text-sm font-semibold text-amber-400 hover:text-amber-300 transition shrink-0"
        >
          View all manuscripts
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {ebooks.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {ebooks.map((book) => {
            const bookId = book._id || book.id;
            return (
              <motion.div key={bookId} variants={cardVariants}>
                <Card className="group relative overflow-hidden border border-white/5 bg-[#0b0b0f] p-5 rounded-[24px] transition-all hover:border-white/10 shadow-2xl">
                  <div
                    className={`relative aspect-[3/4] w-full rounded-2xl bg-gradient-to-br ${book.coverGradient || "from-amber-600 via-orange-700 to-red-800"} p-6 flex flex-col justify-between overflow-hidden shadow-inner`}
                  >
                    {book.coverImage ? (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="absolute inset-0 w-full h-full object-cover z-0"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]" />
                    )}
                    <div className="flex justify-between items-start relative z-10">
                      <span className="rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        {book.genre}
                      </span>
                      {book.status === "Sold" && (
                        <span className="rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/30 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-red-400">
                          Sold Out
                        </span>
                      )}
                    </div>

                    <div className="relative z-10">
                      <span className="block text-[11px] font-semibold text-white/60 tracking-wider uppercase mb-1">
                        Fable original
                      </span>
                      <h3 className="text-xl font-bold font-serif leading-tight text-white line-clamp-2">
                        {book.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-5 flex items-start justify-between">
                    <div className="min-w-0 flex-1 pr-2">
                      <h4 className="font-bold text-zinc-100 text-sm tracking-tight truncate">
                        {book.title}
                      </h4>
                      <p className="text-xs text-zinc-500 mt-1 truncate">
                        By{" "}
                        <span className="hover:text-amber-400 transition cursor-pointer font-medium">
                          {book.writerName || book.writer}
                        </span>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="block text-[10px] text-zinc-500 uppercase tracking-widest">
                        Price
                      </span>
                      <span className="text-sm font-bold text-amber-400">
                        ${parseFloat(book.price).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 border-t border-white/5 pt-4">
                    <Button
                      as={Link}
                      href={`/browse/${bookId}`}
                      className="flex-1 bg-white/[0.03] border border-white/5 text-zinc-300 hover:bg-white/10 rounded-xl text-xs font-semibold"
                      size="sm"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View Details
                    </Button>
                    <Button
                      className="bg-amber-500 text-black hover:bg-amber-400 rounded-xl text-xs font-bold"
                      size="sm"
                      disabled={book.status === "Sold"}
                    >
                      Buy Now
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="text-center py-16 border border-dashed border-white/5 rounded-2xl">
          <p className="text-zinc-500 text-sm">
            No featured manuscripts found in our catalog records.
          </p>
        </div>
      )}
    </section>
  );
}
