import Link from "next/link";
import { Button } from "@heroui/react";

export default function NotFound() {
  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center bg-[#050508] px-4 text-center">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-8xl font-black tracking-tighter text-amber-500">
          404
        </h1>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Page Not Found
        </h2>
        <p className="text-sm text-zinc-500 leading-relaxed">
          The manuscript page you are attempting to locate does not exist in our
          system catalog.
        </p>
        <div className="pt-4">
          <Link href="/">
            <Button className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-xl px-6">
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
