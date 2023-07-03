import { SongCard } from "@/components/SongCard"
import { env } from "@/env.mjs"
import { API } from "@/lib/Api"
import { formatString } from "@/lib/utils"
import { AlbumDetailResponse } from "@/types/AlbumDetails"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"

// Cache the page indefinitely
export const revalidate = false

const TrackPage = async ({
    searchParams,
}: {
    searchParams: { id?: string }
}) => {
    if (!searchParams.id) redirect("/")

    const album = await API<AlbumDetailResponse>({
        endpoint: "/albums/get-details",
        demo: env.DEMO,
        revalidate: false,
        filepath: "responses/albumDetails.json",
        params: { id: searchParams.id },
    }).then(d => d?.data[0])
    if (!album) return notFound()

    const bg = album.attributes.artwork.bgColor
    const fg = album.attributes.artwork.textColor1

    return (
        <div className="h-full w-full max-h-full overflow-scroll relative">
            <div
                className="w-full h-1/5"
                style={{ backgroundColor: `#${bg}` }}
            />
            <div
                className="rounded-3xl border-white border-4 h-1/5 aspect-square absolute left-1/2 top-[10%] -translate-x-1/2 flex items-center gap-4"
                style={{ backgroundColor: `#${bg}`, color: `#${fg}` }}
            >
                <div className="rounded-l-3xl h-full aspect-square relative">
                    <Image
                        src={album.attributes.artwork.url
                            .replace("{w}", "400")
                            .replace("{h}", "400")}
                        alt="Icon"
                        fill
                        className="w-full aspect-square rounded-l-3xl"
                    />
                </div>
                <div className="max-w-full truncate text-inherit">
                    <h2 className="font-semibold text-2xl truncate">
                        {album.attributes.artistName}
                    </h2>
                    <h1 className="text-4xl font-bold max-w-full truncate">
                        {album.attributes.name}
                    </h1>
                    <h3 className="text-xl font-medium truncate">
                        {album.attributes.genreNames
                            .map(formatString)
                            .join(", ")}
                    </h3>
                </div>
            </div>
            <div className="w-full h-[10%]" />
            <div className="w-full h-4/5 flex flex-col py-4 gap-4 p-8">
                <h1 className="text-4xl py-4 font-medium cursor-default">
                    Featured Songs
                </h1>
                <ul className="grid grid-cols-3 gap-y-4 gap-x-8">
                    {album.relationships.tracks.data.map(song => (
                        <SongCard
                            key={song.id}
                            song={song}
                            className="h-48 w-full text-4xl"
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TrackPage
