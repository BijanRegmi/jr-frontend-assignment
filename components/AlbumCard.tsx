import { formatString } from "@/lib/utils"
import { ArtistSummary } from "@/types/ArtistSummary"
import Image from "next/image"
import Link from "next/link"

export const AlbumCard = ({
    album,
}: {
    album: ArtistSummary["albums"][string]
}) => {
    const genreList = album.attributes.genreNames.map(formatString).join(", ")
    return (
        <div className="h-20 flex items-center w-full gap-2 shadow-md rounded-md border border-l-0 border-orange-300 hover:border-orange-400 hover:shadow-lg">
            <div className="rounded-l-md h-full aspect-square relative">
                <Image
                    src={album.attributes.artwork.url
                        .replace("{w}", "400")
                        .replace("{h}", "400")}
                    alt="Icon"
                    fill
                    className="w-full aspect-square rounded-l-md"
                />
            </div>
            <Link
                prefetch={false}
                href={`/album?${new URLSearchParams({
                    id: album.id,
                }).toString()}`}
                className="cursor-pointer group transition duration-300 truncate"
            >
                <h1
                    className="text-xl font-semibold truncate text-primary-300 max-w-fit"
                    title={album.attributes.name}
                >
                    {album.attributes.name}
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-[1px] bg-shade-800" />
                </h1>
                <h2 className="truncate text-shade-700" title={genreList}>
                    {genreList}
                </h2>
                <h3 className="text-sm text-shade-400 font-semibold">
                    {album.attributes.releaseDate.toString()}
                </h3>
            </Link>
        </div>
    )
}
