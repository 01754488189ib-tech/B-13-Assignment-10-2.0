import Hero from "@/components/Hero";
import FeaturedEbooks from "@/components/FeaturedEbooks";
import EbookGenres from "@/components/EbookGenres";
import TopWriters from "@/components/TopWriters";
import { getEbooks, getTopWriters } from "@/lib/api/ebooks";

export default async function Home() {
  const { ebooks } = (await getEbooks("perPage=6")) || { ebooks: [] };
  const writers = (await getTopWriters()) || [];

  return (
    <div className="bg-[#050508] overflow-x-hidden">
      <Hero />
      <FeaturedEbooks ebooks={ebooks || []} />
      <EbookGenres />
      <TopWriters writers={writers} />
    </div>
  );
}
