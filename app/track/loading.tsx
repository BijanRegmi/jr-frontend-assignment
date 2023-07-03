export default function Loading() {
    return (
        <div className="h-full w-full max-h-full overflow-scroll relative">
            <div className="w-full h-1/5 bg-shade-100 animate-pulse" />
            <div className="bg-blue-200 rounded-3xl border-white border-4 h-1/5 aspect-square absolute left-1/2 top-[10%] -translate-x-1/2 animate-pulse" />
            <div className="w-full h-4/5 flex flex-col py-4"></div>
        </div>
    )
}
