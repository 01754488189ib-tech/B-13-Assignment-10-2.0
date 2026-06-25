export default function Loading() {
  return (
    <div className="min-h-[85vh] bg-[#050508] px-6 py-12 max-w-7xl mx-auto space-y-12">
      <div className="space-y-3">
        <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
        <div className="h-10 w-64 bg-white/5 rounded-lg animate-pulse" />
        <div className="h-4 w-96 bg-white/5 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="border border-white/5 bg-[#0b0b0f] p-4 rounded-[20px] space-y-4"
          >
            <div className="aspect-[3/4] w-full bg-white/5 rounded-xl animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-white/5 rounded w-1/2 animate-pulse" />
            </div>
            <div className="pt-3 border-t border-white/5 flex justify-between items-center">
              <div className="h-5 bg-white/5 rounded w-16 animate-pulse" />
              <div className="h-4 bg-white/5 rounded w-12 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
