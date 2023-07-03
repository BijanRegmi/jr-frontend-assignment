import { formatString } from "@/lib/utils"
import { ArtistSummary } from "@/types/ArtistSummary"
import Image from "next/image"
import { AudioPlayer } from "./AudioPlayer"
import Link from "next/link"
import classNames from "classnames"
import { ComponentProps } from "react"

export const SongCard = ({
    song,
    className = "",
}: {
    song: ArtistSummary["songs"][string]
    className?: ComponentProps<"div">["className"]
}) => {
    const genreList = song.attributes.genreNames.map(formatString).join(", ")
    const audioUrl = song.attributes.previews.find(p => !!p.url)?.url
    return (
        <div
            className={classNames(
                "h-20 flex items-center w-full gap-2 shadow-md rounded-md border border-l-0 border-orange-300 hover:border-orange-400 hover:shadow-lg",
                className
            )}
        >
            <div className="rounded-l-md h-full aspect-square relative">
                <Image
                    src={song.attributes.artwork.url
                        .replace("{w}", "400")
                        .replace("{h}", "400")}
                    alt="Icon"
                    fill
                    className="w-full aspect-square rounded-l-md"
                />
            </div>
            <Link
                prefetch={false}
                href={`/track?${new URLSearchParams({
                    id: song.id,
                }).toString()}`}
                className="truncate group transition duration-300 cursor-pointer"
            >
                <h1
                    className="text-xl font-semibold truncate text-primary-300 max-w-fit"
                    title={song.attributes.name}
                >
                    {song.attributes.name}
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-[1px] bg-shade-800" />
                </h1>
                <h2
                    className="truncate text-base text-shade-700"
                    title={genreList}
                >
                    {genreList}
                </h2>
                <h3 className="text-sm text-shade-400 font-semibold">
                    {song.attributes.releaseDate.toString()}
                </h3>
            </Link>
            {audioUrl != undefined && (
                <div className="ml-auto h-2/3 text-inherit">
                    <AudioPlayer audioUrl={audioUrl} />
                </div>
            )}
        </div>
    )
}
