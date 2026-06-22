"use client";

import { motion } from "motion/react";
import { Card } from "@heroui/react";
import { Star } from "@gravity-ui/icons";

const topWriters = [
  {
    name: "Alina Vance",
    sales: 1482,
    genre: "Sci-Fi & Cyberpunk",
    avatarInitial: "AV",
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    name: "Evelyn Thorne",
    sales: 1245,
    genre: "Modern Fantasy",
    avatarInitial: "ET",
    gradient: "from-rose-500 to-orange-500",
  },
  {
    name: "Jasper Finch",
    sales: 984,
    genre: "Neo-noir Mystery",
    avatarInitial: "JF",
    gradient: "from-amber-500 to-yellow-600",
  },
];

export default function TopWriters() {
  return (
    <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-semibold tracking-wider text-amber-500 uppercase">
          Elite Creators
        </span>
        <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1 sm:text-4xl">
          Top Literary Pioneers
        </h2>
        <p className="text-sm text-zinc-500 mt-2">
          Recognizing the platform's leading writers based on total volume of
          book transactions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topWriters.map((writer, index) => (
          <motion.div
            key={writer.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="flex flex-row items-center gap-5 p-6 bg-[#0b0b0f] border border-white/5 rounded-[24px] hover:border-white/10 transition-all shadow-xl">
              {/* Writer Avatar */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${writer.gradient} text-white font-bold text-lg shadow-md shrink-0`}
              >
                {writer.avatarInitial}
              </div>

              {/* Writer Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-white truncate">
                  {writer.name}
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5 truncate">
                  {writer.genre}
                </p>
                <div className="flex items-center gap-1.5 mt-2 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-lg w-fit">
                  <Star className="h-3 w-3 text-amber-500" />
                  <span className="text-[11px] font-semibold text-zinc-400">
                    {writer.sales.toLocaleString()} Sales
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
