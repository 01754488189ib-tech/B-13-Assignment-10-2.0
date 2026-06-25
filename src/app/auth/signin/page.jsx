"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Button } from "@heroui/react";
import { At, ShieldKeyhole, Eye, EyeSlash } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const triggerEasyLogin = async (targetEmail, targetPassword) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const { error } = await authClient.signIn.email({
        email: targetEmail,
        password: targetPassword,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "Failed to log in easy login user.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setErrorMessage("System network communication error.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(
          error.message || "Invalid credentials. Please try again.",
        );
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setErrorMessage("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setErrorMessage("Could not initialize Google authentication.");
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-[#050508] px-4 py-16">
      <div className="absolute top-1/4 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      <Card className="w-full max-w-md p-6 sm:p-8 bg-[#0b0b0f] border border-white/5 rounded-3xl shadow-2xl">
        <div className="flex flex-col items-center justify-center gap-1.5 pb-6 border-b border-white/5 mb-6 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="text-xs text-zinc-500">
            Enter your email and password to access your Fable bookshelf
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3.5 text-xs font-semibold rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            {errorMessage}
          </div>
        )}

        <div className="mb-6 space-y-2">
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-2">
            Demo Portal Access
          </span>
          <div className="flex flex-row gap-2 w-full justify-between">
            <Button
              onClick={() => triggerEasyLogin("reader@fable.com", "Reader@123")}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white text-[11px] font-bold py-2 rounded-xl border border-white/5 h-10 px-2"
            >
              As Reader
            </Button>
            <Button
              onClick={() => triggerEasyLogin("writer@fable.com", "Writer@123")}
              className="flex-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-[11px] font-bold py-2 rounded-xl border border-amber-500/10 h-10 px-2"
            >
              As Writer
            </Button>
            <Button
              onClick={() => triggerEasyLogin("admin@fable.com", "Admin@123")}
              className="flex-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-[11px] font-bold py-2 rounded-xl border border-purple-500/10 h-10 px-2"
            >
              As Admin
            </Button>
          </div>
        </div>

        <Button
          onClick={handleGoogleLogin}
          variant="bordered"
          className="w-full h-12 border-white/5 bg-white/[0.01] hover:bg-white/[0.04] text-zinc-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 mb-4 transition"
        >
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </Button>

        <div className="relative flex py-4 items-center select-none">
          <div className="flex-grow border-t border-white/5"></div>
          <span className="flex-shrink mx-4 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
            or
          </span>
          <div className="flex-grow border-t border-white/5"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-400">
              Email Address
            </label>
            <div className="relative flex items-center bg-white/[0.02] border border-white/5 rounded-xl px-3.5 h-12 focus-within:border-amber-500/50 transition">
              <At className="text-zinc-500 shrink-0 mr-3" />
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-white placeholder-zinc-700 text-sm outline-none w-full h-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-400">
              Password
            </label>
            <div className="relative flex items-center bg-white/[0.02] border border-white/5 rounded-xl px-3.5 h-12 focus-within:border-amber-500/50 transition">
              <ShieldKeyhole className="text-zinc-500 shrink-0 mr-3" />
              <input
                type={isVisible ? "text" : "password"}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-white placeholder-zinc-700 text-sm outline-none w-full h-full"
              />
              <button
                type="button"
                onClick={toggleVisibility}
                className="text-zinc-500 hover:text-zinc-300 transition shrink-0 ml-3 outline-none"
              >
                {isVisible ? (
                  <EyeSlash className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm mt-4 shadow-xl shadow-amber-500/5 transition-transform hover:-translate-y-0.5"
          >
            Sign In
          </Button>

          <div className="text-center pt-4 border-t border-white/5 mt-4 text-xs text-zinc-500">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-bold text-amber-500 hover:text-amber-400 transition"
            >
              Sign up today
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
