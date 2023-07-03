import { formatArtistName } from "@/lib/utils"
import Image from "next/image"
import { ITrack } from "@/types/chartTrack"
import Link from "next/link"
import { AudioPlayer } from "./AudioPlayer"

export const TrackCard = ({ track }: { track: ITrack }) => {
    const hasArtisist = !!track.artists?.some(t => t.alias)
    const hasSubtitle = !!track.subtitle
    let h2Str: string

    if (hasArtisist) {
        const arts = track.artists?.filter(a => a.alias != undefined)
        h2Str = arts?.map(a => formatArtistName(a.alias)).join(", ") || ""
    } else if (hasSubtitle) h2Str = track.subtitle
    else h2Str = ""

    const audioUrl = track.hub.actions?.find(a => !!a.uri)?.uri

    return (
        <div className="p-4 border border-orange-400 rounded-md shadow-lg w-48 aspect-square cursor-pointer hover:shadow-lg">
            <div className="rounded-md w-full aspect-square relative mb-1">
                <Image
                    src={
                        track.images?.coverarthq ||
                        track.images?.background ||
                        "https://discussions.apple.com/content/attachment/592590040"
                    }
                    alt={track.title}
                    fill
                    className="w-full aspect-square rounded-md"
                />
                {audioUrl != undefined && (
                    <div className="absolute inset-0 rounded-md bg-shade-800 bg-opacity-80 opacity-0 hover:opacity-100 p-8 audiolayer">
                        <AudioPlayer audioUrl={audioUrl} className="text-4xl" />
                    </div>
                )}
            </div>
            <Link
                prefetch={false}
                href={`/track?${new URLSearchParams({
                    id: track.key,
                }).toString()}`}
                className="mt-2 w-full group transition duration-300"
            >
                <h1
                    className="font-semibold text-lg text-shade-900 truncate max-w-fit"
                    title={track.title}
                >
                    {track.title}
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-[1px] bg-shade-800" />
                </h1>
                <h2 className="text-shade-800 truncate w-full" title={h2Str}>
                    {h2Str}
                </h2>
            </Link>
        </div>
    )
}

export const TrackCardSkeleton = () => {
    return (
        <div className="p-4 border border-transparent rounded-md shadow-lg w-48 aspect-square cursor-pointer text-transparent animate-pulse">
            <div className="rounded-md w-full aspect-square relative mb-1">
                <Image
                    src="https://discussions.apple.com/content/attachment/592590040"
                    alt="Track cover"
                    fill
                    className="w-full aspect-square rounded-md"
                />
            </div>
            <div className="mt-2 w-full">
                <h1 className="text-lg rounded-md bg-shade-200 animate-pulse">
                    .
                    <span className="block max-w-0 h-0.5" />
                </h1>
                <h2 className="w-full">.</h2>
            </div>
        </div>
    )
}
