export default function Loading() {
    return (
        <div className="h-full w-full p-4 max-h-full overflow-scroll">
            <div className="flex flex-col bg-shade-100 rounded-lg pt-8 gap-6 animate-pulse chartfilter text-transparent">
                <div className="border-2 border-transparent rounded-r-lg py-4 flex justify-between items-center relative ">
                    <span className="w-6 h-6">.</span>
                </div>

                <div className="flex flex-row items-center cursor-default">
                    <div className="px-4">
                        <span className="text-6xl">.</span>
                    </div>
                    <div>
                        <h2 className="text-2xl">.</h2>
                        <h1 className="text-6xl">.</h1>
                        <h3 className="text-xl">.</h3>
                    </div>
                </div>

                <div className="w-full rounded-b-lg flex flex-row items-end pl-20 gap-10">
                    <div className="px-4 py-2">
                        <span>.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
