"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Button } from "@heroui/react";
import { Eye, EyeSlash, At, ShieldKeyhole, Person } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        role,
        verifiedWriter: false,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "Registration failed. Try again.");
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
            Create an account
          </h1>
          <p className="text-xs text-zinc-500">
            Sign up to access original manuscripts or publish your own work
          </p>
        </div>

        {/* Error Alert panel */}
        {errorMessage && (
          <div className="mb-4 p-3.5 text-xs font-semibold rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-400">
              Full Name
            </label>
            <div className="relative flex items-center bg-white/[0.02] border border-white/5 rounded-xl px-3.5 h-12 focus-within:border-amber-500/50 transition">
              <Person className="text-zinc-500 shrink-0 mr-3" />
              <input
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent text-white placeholder-zinc-700 text-sm outline-none w-full h-full"
              />
            </div>
          </div>

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
                placeholder="•••••••• (Min 6 characters)"
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

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-400">
              Confirm Password
            </label>
            <div className="relative flex items-center bg-white/[0.02] border border-white/5 rounded-xl px-3.5 h-12 focus-within:border-amber-500/50 transition">
              <ShieldKeyhole className="text-zinc-500 shrink-0 mr-3" />
              <input
                type={isVisible ? "text" : "password"}
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-transparent text-white placeholder-zinc-700 text-sm outline-none w-full h-full"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-400">
              Choose your primary role
            </label>
            <div className="grid grid-cols-2 gap-2 bg-white/[0.01] border border-white/5 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`py-2.5 text-xs font-bold rounded-lg transition-all ${
                  role === "user"
                    ? "bg-amber-500 text-black shadow-md font-extrabold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Reader (User)
              </button>
              <button
                type="button"
                onClick={() => setRole("writer")}
                className={`py-2.5 text-xs font-bold rounded-lg transition-all ${
                  role === "writer"
                    ? "bg-amber-500 text-black shadow-md font-extrabold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Writer
              </button>
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm mt-4 shadow-xl shadow-amber-500/5 transition-transform hover:-translate-y-0.5"
          >
            Create Account
          </Button>

          <div className="text-center pt-4 border-t border-white/5 mt-4 text-xs text-zinc-500">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="font-bold text-amber-500 hover:text-amber-400 transition"
            >
              Sign in
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
