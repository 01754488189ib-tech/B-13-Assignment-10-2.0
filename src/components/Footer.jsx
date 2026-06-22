import Link from "next/link";
import { LogoFacebook, LogoLinkedin, LogoGithub } from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#030305] text-zinc-400">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
                <span className="text-lg font-serif font-black text-white">
                  F
                </span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Fable
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-7 text-zinc-500">
              A curated digital playground connecting ebook enthusiasts,
              collectors, and talented indie writers.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.02] border border-white/5 text-zinc-400 hover:bg-amber-500 hover:text-black transition duration-200"
              >
                <LogoFacebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.02] border border-white/5 text-zinc-400 hover:bg-amber-500 hover:text-black transition duration-200"
              >
                <LogoGithub className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.02] border border-white/5 text-zinc-400 hover:bg-amber-500 hover:text-black transition duration-200"
              >
                <LogoLinkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold tracking-wider text-white uppercase">
              Platform
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/browse"
                  className="hover:text-amber-400 transition"
                >
                  Browse Catalog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-400 transition">
                  Top Authors
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-400 transition">
                  Special Editions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold tracking-wider text-white uppercase">
              Help & Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-amber-400 transition">
                  Fulfillment Support
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-400 transition">
                  Privacy Strategy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold tracking-wider text-white uppercase">
              Newsletter
            </h3>
            <p className="text-xs text-zinc-500 mb-4">
              Get notified of fresh editorial drops and community events.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-amber-500 outline-none"
              />
              <button className="rounded-xl bg-amber-500 px-4 text-xs font-semibold text-black hover:bg-amber-400 transition">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-zinc-600 md:flex-row">
          <p>
            © {new Date().getFullYear()} Fable Platform. Developed with
            alignment and eye-pleasing spacing.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-zinc-400 transition">
              Terms
            </Link>
            <Link href="#" className="hover:text-zinc-400 transition">
              Privacy Guidelines
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
