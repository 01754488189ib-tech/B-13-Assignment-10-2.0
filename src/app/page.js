import Hero from "@/components/Hero";
import FeaturedEbooks from "@/components/FeaturedEbooks";
import EbookGenres from "@/components/EbookGenres";
import TopWriters from "@/components/TopWriters";
import { getEbooks } from "@/lib/api/ebooks";

export default async function Home() {
  // Query only the latest 6 ebook manuscripts from our Express server API
  const { ebooks } = (await getEbooks("perPage=6")) || { ebooks: [] };

  return (
    <div className="bg-[#050508] overflow-x-hidden">
      <Hero />
      <FeaturedEbooks ebooks={ebooks || []} />
      <EbookGenres />
      <TopWriters />
    </div>
  );
}
