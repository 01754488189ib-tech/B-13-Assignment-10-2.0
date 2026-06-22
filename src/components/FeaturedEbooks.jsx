"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Card, Button } from "@heroui/react";
import { Eye, ArrowUpRight } from "@gravity-ui/icons";

const mockEbooks = [
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
];

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

export default function FeaturedEbooks() {
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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {mockEbooks.map((book) => (
          <motion.div key={book.id} variants={cardVariants}>
            <Card className="group relative overflow-hidden border border-white/5 bg-[#0b0b0f] p-5 rounded-[24px] transition-all hover:border-white/10 shadow-2xl">
              {/* Ebook Graphic Representation */}
              <div
                className={`relative aspect-[3/4] w-full rounded-2xl bg-gradient-to-br ${book.coverGradient} p-6 flex flex-col justify-between overflow-hidden shadow-inner`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]" />
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

                {/* Book Title styled for maximum visual alignment */}
                <div className="relative z-10">
                  <span className="block text-[11px] font-semibold text-white/60 tracking-wider uppercase mb-1">
                    Fable original
                  </span>
                  <h3 className="text-xl font-bold font-serif leading-tight text-white line-clamp-2">
                    {book.title}
                  </h3>
                </div>
              </div>

              {/* Information Row */}
              <div className="mt-5 flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-zinc-100 line-clamp-1">
                    {book.title}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1">
                    By{" "}
                    <span className="hover:text-amber-400 transition cursor-pointer font-medium">
                      {book.writer}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="block text-xs text-zinc-500 uppercase tracking-widest">
                    Price
                  </span>
                  <span className="text-base font-bold text-amber-400">
                    ${book.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Card Footer Interaction Bar */}
              <div className="mt-6 flex items-center gap-2 border-t border-white/5 pt-4">
                <Button
                  as={Link}
                  href={`/browse/${book.id}`}
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
        ))}
      </motion.div>
    </section>
  );
}
