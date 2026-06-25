"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { Sun, Moon } from "@gravity-ui/icons";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const pathname = usePathname();

  const { data: session, isPending } = useSession();
  const user = session?.user;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.className = nextTheme;
  };

  const handleSignOut = async () => {
    await signOut({
      callbackURL: "/",
    });
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Ebooks", href: "/browse" },
  ];

  const dashboardLinks = {
    user: "/dashboard/user",
    writer: "/dashboard/writer",
    admin: "/dashboard/admin",
  };

  if (user) {
    navLinks.push({
      label: "Dashboard",
      href: dashboardLinks[user.role] || "/dashboard/user",
    });
  }

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#050508]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-orange-500/20 transition group-hover:scale-105">
            <span className="text-xl font-serif font-black text-white">F</span>
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white">
              Fable
            </span>
            <span className="block text-[10px] text-amber-500 font-medium tracking-widest uppercase">
              Ebooks
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.02] p-1.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
                    isActive(link.href)
                      ? "bg-amber-500/10 text-amber-400"
                      : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="h-6 w-px bg-white/10" />

          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white transition"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center relative shrink-0">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-amber-500">
                        {user.name ? user.name[0].toUpperCase() : "U"}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-zinc-300">
                    Hi,{" "}
                    <span className="font-semibold text-white">
                      {user.name}
                    </span>
                  </span>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="flat"
                  className="bg-white/5 text-xs text-zinc-300 hover:bg-white/10 rounded-xl"
                  size="sm"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-amber-500 hover:text-amber-400 transition"
                >
                  Sign In
                </Link>
                <Button
                  as={Link}
                  href="/auth/signup"
                  className="bg-amber-500 text-sm font-semibold text-black hover:bg-amber-400 rounded-xl"
                >
                  Create Account
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white transition"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-white transition hover:bg-white/10"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/5 bg-[#050508] md:hidden">
          <div className="space-y-3 px-4 py-6">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition ${
                      isActive(link.href)
                        ? "bg-amber-500/10 text-amber-400"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="border-t border-white/5 pt-4">
              {user ? (
                <div className="space-y-3 px-4">
                  <p className="text-sm text-zinc-400">
                    Signed in as{" "}
                    <span className="font-semibold text-white">
                      {user.email}
                    </span>
                  </p>
                  <Button
                    onClick={handleSignOut}
                    className="w-full bg-white/5 text-white"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-4">
                  <Link
                    href="/auth/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-center rounded-xl py-3 text-sm font-semibold text-amber-500 hover:bg-white/5"
                  >
                    Sign In
                  </Link>
                  <Button
                    as={Link}
                    href="/auth/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-amber-500 text-black font-semibold"
                  >
                    Create Account
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
