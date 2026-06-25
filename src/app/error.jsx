"use client";

import { useEffect } from "react";
import { Button } from "@heroui/react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center bg-[#050508] px-4 text-center">
      <div className="max-w-md w-full space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-white">
          Something went wrong.
        </h2>
        <p className="text-sm text-zinc-500">
          The requested transaction or component encountered a runtime error.
        </p>
        <div className="pt-2">
          <Button
            onClick={() => reset()}
            className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-xl px-6"
          >
            Reload
          </Button>
        </div>
      </div>
    </div>
  );
}
