import { getEbooks } from "@/lib/api/ebooks";
import BrowseListingContainer from "@/components/browse/BrowseListingContainer";

export default async function BrowsePage({ searchParams }) {
  const filters = await searchParams;

  const queryParams = new URLSearchParams();
  if (filters.search) queryParams.set("search", filters.search);
  if (filters.genre) queryParams.set("genre", filters.genre);
  if (filters.minPrice) queryParams.set("minPrice", filters.minPrice);
  if (filters.maxPrice) queryParams.set("maxPrice", filters.maxPrice);
  if (filters.status) queryParams.set("status", filters.status);
  if (filters.sort) queryParams.set("sort", filters.sort);
  if (filters.page) queryParams.set("page", filters.page);

  // Load from database via Express REST
  const { total, ebooks } = await getEbooks(queryParams.toString());

  return (
    <div className="w-full min-h-screen bg-[#050508] py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <span className="text-xs font-semibold tracking-wider text-amber-500 uppercase">
          Ebook Catalog
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mt-1">
          Explore Ebooks
        </h1>
        <p className="text-zinc-500 mt-2 text-sm">
          Discover original digital manuscripts published by creators worldwide.
        </p>
      </div>

      <BrowseListingContainer
        ebooks={ebooks || []}
        filters={filters}
        total={total || 0}
      />
    </div>
  );
}
