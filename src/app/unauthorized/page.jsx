"use client";

import Link from "next/link";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center bg-[#050508] px-4 text-center">
      <div className="max-w-md w-full space-y-6">
        {/* Animated Badge & Icon */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="rounded-2xl bg-amber-500/10 p-5 text-amber-500 border border-amber-500/20 shadow-lg shadow-amber-500/5">
            <ShieldAlert className="h-12 w-12" />
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-white mt-4">
            401
          </h1>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Restricted Core Access
          </h2>
        </div>

        {/* Action description */}
        <p className="text-sm text-zinc-500 leading-relaxed">
          Your active credentials do not have the required permissions to
          navigate into this creator space. Please sign in with an authorized
          writer or admin account to proceed.
        </p>

        {/* Interactivity elements */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            href="/auth/signin"
            className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-xs font-bold text-black hover:bg-amber-400 shadow-xl shadow-amber-500/5 transition duration-200"
          >
            <LogIn className="h-4 w-4" />
            Switch Account
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/[0.01] px-6 py-3 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/[0.03] transition duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
