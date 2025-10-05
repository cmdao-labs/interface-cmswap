export default function GridSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <div
                    key={index}
                    className="h-[260px] animate-pulse rounded-3xl border border-white/5 bg-[#0a111f]/60"
                />
            ))}
        </div>
    );
}
