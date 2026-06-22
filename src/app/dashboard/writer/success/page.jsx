import Link from "next/link";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { createTransaction } from "@/lib/actions/transactions";
import { CircleCheckFill, Envelope, ArrowLeft } from "@gravity-ui/icons";

export default async function WriterSuccessPage({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error(
      "Missing Stripe checkout session ID verification parameter",
    );
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.status === "open") {
    return redirect("/dashboard/writer");
  }

  if (session.status === "complete") {
    const txInfo = {
      transactionId: session.id,
      type: "publishing fee",
      buyerEmail: session.metadata.buyerEmail,
      amount: parseFloat(session.metadata.amount),
    };

    // Register transaction record and set verifiedWriter: true in DB
    await createTransaction(txInfo);

    return (
      <div className="w-full min-h-screen bg-[#050508] text-zinc-100 flex flex-col justify-center items-center p-6 select-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <section className="relative max-w-md w-full bg-[#0b0b0f] border border-white/5 rounded-3xl p-8 shadow-2xl text-center overflow-hidden">
          <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/20 shadow-[0_0_24px_rgba(245,158,11,0.1)]">
            <CircleCheckFill className="w-8 h-8 text-amber-500" />
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">
            Verification Complete!
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Congratulations! Your lifetime publishing fee has processed
            successfully. Your account is verified and ready to distribute
            manuscripts.
          </p>

          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 text-left space-y-3.5 text-xs mb-8">
            <div className="flex items-start gap-2.5">
              <Envelope className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold text-zinc-400 mb-0.5">
                  Confirmation Email
                </span>
                <span className="text-zinc-200 break-all">
                  {session.customer_details?.email}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/dashboard/writer"
              className="block w-full text-center text-xs font-bold px-4 py-3 bg-amber-500 hover:bg-amber-400 text-black rounded-xl transition duration-200 shadow-lg"
            >
              Go to Writer Console
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 py-1 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Homepage
            </Link>
          </div>
        </section>
      </div>
    );
  }
}
