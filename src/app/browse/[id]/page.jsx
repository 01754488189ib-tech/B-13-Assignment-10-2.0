import Link from "next/link";
import { Card } from "@heroui/react";
import {
  Calendar,
  CircleDollar,
  ArrowLeft,
  ChevronRight,
  Sparkles,
} from "@gravity-ui/icons";
import { getEbookById, getBookmarks } from "@/lib/api/ebooks";
import { getUserSession } from "@/lib/core/session";
import EbookActions from "@/components/browse/EbookActions";

export default async function EbookDetailsPage({ params }) {
  const { id } = await params;
  const ebook = await getEbookById(id);

  if (!ebook) {
    return (
      <div className="w-full min-h-screen bg-[#050508] flex flex-col justify-center items-center text-white p-6">
        <p className="text-zinc-500 text-base">
          The requested manuscript could not be found or is inactive.
        </p>
        <Link href="/browse" className="text-amber-500 mt-4 hover:underline">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const user = await getUserSession();
  const isWriter = user && user.id === ebook.writerId;
  const isSold = ebook.status === "Sold";
  const isAdmin = user?.role === "admin";

  let initialBookmarked = false;
  if (user) {
    const bookmarks = (await getBookmarks()) || [];
    initialBookmarked = bookmarks.some((b) => b.ebookId === ebook._id);
  }

  const formattedDate = new Date(ebook.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#050508] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-8 select-none">
          <Link href="/" className="hover:text-zinc-300 transition">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <Link href="/browse" className="hover:text-zinc-300 transition">
            Browse
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <span className="text-zinc-400 font-medium truncate max-w-[200px]">
            {ebook.title}
          </span>
        </div>

        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Ebook Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <Card className="relative aspect-[3/4] w-full rounded-[32px] bg-gradient-to-br from-zinc-900 to-black p-8 flex flex-col justify-between overflow-hidden border border-white/5 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              <div
                className={`w-full h-full rounded-2xl bg-gradient-to-br ${ebook.coverGradient || "from-blue-600 to-purple-800"} p-8 flex flex-col justify-between relative shadow-2xl overflow-hidden border border-white/10`}
              >
                {ebook.coverImage ? (
                  <img
                    src={ebook.coverImage}
                    alt={ebook.title}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:20px_20px]" />
                )}
                <div className="flex justify-between items-start z-10">
                  <span className="rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                    {ebook.genre}
                  </span>
                  <span className="rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Fable Original
                  </span>
                </div>
                <div className="z-10">
                  <span className="text-[11px] font-semibold text-white/50 tracking-widest uppercase block mb-1">
                    Exquisite Manuscript
                  </span>
                  <h2 className="text-3xl font-bold font-serif leading-tight text-white tracking-tight line-clamp-3">
                    {ebook.title}
                  </h2>
                </div>
              </div>
            </Card>

            <div className="bg-[#0b0b0f] border border-white/5 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                <span className="text-zinc-500">Language</span>
                <span className="font-semibold text-zinc-300">
                  English (US)
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                <span className="text-zinc-500">Format</span>
                <span className="font-semibold text-zinc-300">
                  Digital EPUB / PDF
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500">Security</span>
                <span className="font-semibold text-zinc-300">
                  Stripe Encrypted
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="rounded-full bg-amber-500/10 text-amber-400 px-3 py-1 text-xs font-bold uppercase tracking-wider border border-amber-500/10">
                  {ebook.genre}
                </span>
                <span className="rounded-full bg-white/[0.02] text-zinc-400 border border-white/5 px-3 py-1 text-xs">
                  EPUB Edition
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {ebook.title}
              </h1>
              <p className="text-sm text-zinc-400">
                Created by{" "}
                <Link
                  href={`/browse?search=${ebook.writerName}`}
                  className="font-semibold text-amber-400 hover:underline transition"
                >
                  {ebook.writerName}
                </Link>
              </p>
            </div>

            <hr className="border-white/5" />

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
                Synopsis
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line bg-[#0b0b0f] border border-white/5 p-6 rounded-2xl shadow-inner">
                {ebook.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-amber-500" />
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase font-bold">
                    Uploaded
                  </span>
                  <span className="text-xs font-medium text-zinc-300">
                    {formattedDate}
                  </span>
                </div>
              </div>
              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                <CircleDollar className="w-5 h-5 text-amber-500" />
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase font-bold">
                    Pricing Tier
                  </span>
                  <span className="text-xs font-medium text-zinc-300">
                    Standard Tier
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#0b0b0f] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex justify-between items-baseline gap-4 flex-wrap">
                <div>
                  <span className="text-xs text-zinc-500 block uppercase tracking-wider font-semibold mb-1">
                    Book Price
                  </span>
                  <span className="text-4xl font-black text-white tracking-tight">
                    ${ebook.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs text-zinc-400 font-medium">
                    Digital asset available instantly
                  </span>
                </div>
              </div>

              <EbookActions
                ebookId={ebook._id}
                isWriter={isWriter}
                isSold={isSold}
                user={user}
                initialBookmarked={initialBookmarked}
              />

              {(isSold || isAdmin) && (
                <div className="p-4 bg-emerald-950/20 border border-emerald-500/10 rounded-xl text-xs text-emerald-400 leading-relaxed">
                  <strong>Access Granted:</strong> Thank you for supporting
                  independent literature.
                  {isAdmin
                    ? " As a System Administrator, you have unrestricted reading bypass access to review this manuscript's content."
                    : " You have unlocked this ebook and can read its full content freely inside your personal bookshelf."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
