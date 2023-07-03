import { TrackCardSkeleton } from "@/components/Track"

export default function Loading() {
    return (
        <div className="h-full w-full p-4 max-h-full overflow-scroll">
            <div className="text-xl font-semibold flex items-center gap-4">
                <span>Search results for</span>
                <span className="bg-shade-400 rounded-md w-48 h-6 text-transparent animate-pulse">.</span>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,13rem)] gap-x-4 gap-y-6 items-center justify-between py-3 w-full mt-4">
                {Array.from({ length: 10 }).map((_, idx) => (
                    <TrackCardSkeleton key={idx} />
                ))}
            </div>
        </div>
    )
}
