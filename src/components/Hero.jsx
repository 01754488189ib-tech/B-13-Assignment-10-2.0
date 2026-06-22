"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "motion/react";
import { ArrowRight, BookOpen } from "@gravity-ui/icons";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#050508] py-20 px-6 sm:px-12">
      {/* Decorative radial background light */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-amber-500/10 to-orange-600/5 blur-[120px]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="mx-auto max-w-5xl text-center">
        {/* Animated Little Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5 text-xs font-semibold text-amber-400"
        >
          <BookOpen className="h-3.5 w-3.5" />
          The Indie Ebook Revolution
        </motion.div>

        {/* Tagline Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Discover & Read <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Original Ebooks
          </span>
        </motion.h1>

        {/* Subtext description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg"
        >
          Connect with visionary writers, trade digital manuscripts safely via
          Stripe, and expand your private library shelf in our premium digital
          ecosystem.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            as={Link}
            href="/browse"
            size="lg"
            className="h-14 bg-amber-500 px-8 text-sm font-bold text-black hover:bg-amber-400 rounded-2xl shadow-xl shadow-amber-500/10 transition-transform hover:-translate-y-0.5"
          >
            Browse Ebooks
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button
            as={Link}
            href="/auth/signup"
            size="lg"
            variant="bordered"
            className="h-14 border-white/10 px-8 text-sm font-semibold text-white hover:bg-white/5 rounded-2xl transition-transform hover:-translate-y-0.5"
          >
            Become a Writer
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
