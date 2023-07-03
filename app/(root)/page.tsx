import { ChartFilter } from "@/components/ChartFilter"
import { Charts } from "@/components/Charts"
import { env } from "@/env.mjs"
import { API } from "@/lib/Api"
import { ChartList } from "@/types/chartList"
import { notFound } from "next/navigation"

// Incremental static generation
// with an interval of one day
export const revalidate = 86400

export default async function Home() {
    const response = await API<ChartList>({
        endpoint: "/charts/list",
        demo: env.DEMO,
        revalidate: 86400,
        filepath: "responses/charts_list.json",
    })
    if (!response) return notFound()

    return (
        <div className="h-full w-full p-4 max-h-full overflow-scroll">
            <ChartFilter chartList={response} />
            <Charts chartList={response} />
        </div>
    )
}
