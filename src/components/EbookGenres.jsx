"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Rocket,
  Compass,
  Flame,
  LayoutHeaderCells,
  Key,
  Bookmark,
} from "@gravity-ui/icons";

const genres = [
  {
    name: "Sci-Fi",
    icon: Rocket,
    count: "142 books",
    bg: "hover:border-blue-500/30 hover:bg-blue-950/10",
  },
  {
    name: "Fantasy",
    icon: Compass,
    count: "189 books",
    bg: "hover:border-purple-500/30 hover:bg-purple-950/10",
  },
  {
    name: "Romance",
    icon: Flame,
    count: "210 books",
    bg: "hover:border-rose-500/30 hover:bg-rose-950/10",
  },
  {
    name: "Mystery",
    icon: Key,
    count: "95 books",
    bg: "hover:border-amber-500/30 hover:bg-amber-950/10",
  },
  {
    name: "Horror",
    icon: LayoutHeaderCells,
    count: "78 books",
    bg: "hover:border-red-500/30 hover:bg-red-950/10",
  },
  {
    name: "Fiction",
    icon: Bookmark,
    count: "312 books",
    bg: "hover:border-teal-500/30 hover:bg-teal-950/10",
  },
];

export default function EbookGenres() {
  return (
    <section className="py-24 bg-[#030305] border-y border-white/5 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-amber-500 uppercase">
            Curated Categories
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1 sm:text-4xl">
            Explore Ebook Genres
          </h2>
          <p className="text-sm text-zinc-500 mt-2">
            Dive directly into your favorite literature realms with instant
            filter criteria.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {genres.map((genre) => {
            const IconComponent = genre.icon;
            return (
              <Link key={genre.name} href={`/browse?genre=${genre.name}`}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`flex flex-col items-center justify-center p-6 bg-[#0b0b0f] border border-white/5 rounded-2xl transition-colors duration-250 cursor-pointer ${genre.bg}`}
                >
                  <div className="h-12 w-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-300">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mt-4">
                    {genre.name}
                  </h3>
                  <span className="text-xs text-zinc-600 mt-1">
                    {genre.count}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
