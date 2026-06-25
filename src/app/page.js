import Hero from "@/components/Hero";
import FeaturedEbooks from "@/components/FeaturedEbooks";
import EbookGenres from "@/components/EbookGenres";
import TopWriters from "@/components/TopWriters";
import { getEbooks, getTopWriters } from "@/lib/api/ebooks";
import { getUserSession } from "@/lib/core/session";

export default async function Home() {
  const { ebooks } = (await getEbooks("perPage=6")) || { ebooks: [] };
  const writers = (await getTopWriters()) || [];
  const user = await getUserSession();

  return (
    <div className="bg-[#050508] overflow-x-hidden">
      <Hero />
      <FeaturedEbooks ebooks={ebooks || []} user={user} />
      <EbookGenres />
      <TopWriters writers={writers} />
    </div>
  );
}
