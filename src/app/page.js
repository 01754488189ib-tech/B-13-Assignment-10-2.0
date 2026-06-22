import Hero from "@/components/Hero";
import FeaturedEbooks from "@/components/FeaturedEbooks";
import EbookGenres from "@/components/EbookGenres";
import TopWriters from "@/components/TopWriters";

export default function Home() {
  return (
    <div className="bg-[#050508] overflow-x-hidden">
      <Hero />
      <FeaturedEbooks />
      <EbookGenres />
      <TopWriters />
    </div>
  );
}
