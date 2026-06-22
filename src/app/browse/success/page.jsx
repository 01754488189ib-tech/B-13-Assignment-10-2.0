import Link from "next/link";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { createTransaction } from "@/lib/actions/transactions";
import { CircleCheckFill, Envelope, ArrowLeft } from "@gravity-ui/icons";

export default async function BrowseSuccessPage({ searchParams }) {
  const { session_id, ebook_id } = await searchParams;

  if (!session_id) {
    throw new Error(
      "Missing Stripe checkout session ID verification parameter",
    );
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.status === "open") {
    return redirect(`/browse/${ebook_id}`);
  }

  if (session.status === "complete") {
    const txInfo = {
      transactionId: session.id,
      type: "purchase",
      ebookId: session.metadata.ebookId,
      buyerEmail: session.metadata.buyerEmail,
      writerEmail: session.metadata.writerEmail,
      amount: parseFloat(session.metadata.amount),
    };

    // Register transaction record and mark ebook as Sold in DB
    await createTransaction(txInfo);

    return (
      <div className="w-full min-h-screen bg-[#050508] text-zinc-100 flex flex-col justify-center items-center p-6 select-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <section className="relative max-w-md w-full bg-[#0b0b0f] border border-white/5 rounded-3xl p-8 shadow-2xl text-center overflow-hidden">
          <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/20 shadow-[0_0_24px_rgba(245,158,11,0.1)]">
            <CircleCheckFill className="w-8 h-8 text-amber-500" />
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">
            Purchase Successful!
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Thank you for supporting independent literature. Your transaction
            has processed and the digital manuscript is now available in your
            personal library.
          </p>

          {/* Transaction Summary Card */}
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 text-left space-y-3.5 text-xs mb-8">
            <div className="flex items-start gap-2.5">
              <Envelope className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold text-zinc-400 mb-0.5">
                  Confirmation Email
                </span>
                <span className="text-zinc-300 break-all">
                  {session.customer_details?.email}
                </span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-3 flex flex-col gap-1 text-zinc-500">
              <span>Need assistance with reading setups? contact us:</span>
              <a
                href="mailto:support@fable.com"
                className="text-amber-500 hover:text-amber-400 font-medium transition"
              >
                support@fable.com
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/dashboard/user"
              className="block w-full text-center text-xs font-bold px-4 py-3 bg-amber-500 hover:bg-amber-400 text-black rounded-xl transition duration-200 shadow-lg"
            >
              Go to Reader Bookshelf
            </Link>

            <Link
              href="/browse"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 py-1 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Catalog
            </Link>
          </div>
        </section>
      </div>
    );
  }
}
