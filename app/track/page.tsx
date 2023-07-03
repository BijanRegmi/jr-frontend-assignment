import { AlbumCard } from "@/components/AlbumCard"
import { AudioPlayer } from "@/components/AudioPlayer"
import { SongCard } from "@/components/SongCard"
import { env } from "@/env.mjs"
import { API } from "@/lib/Api"
import { ArtistSummary } from "@/types/ArtistSummary"
import { TrackDetails } from "@/types/TrackDetails"
import { notFound, redirect } from "next/navigation"
import { AiOutlinePlayCircle } from "react-icons/ai"

export const revalidate = false

const TrackPage = async ({
    searchParams,
}: {
    searchParams: { id?: string }
}) => {
    if (!searchParams.id) redirect("/")

    const track = await API<TrackDetails>({
        endpoint: "/songs/get-details",
        demo: env.DEMO,
        revalidate: false,
        filepath: "responses/trackDetails.json",
        params: { key: searchParams.id },
    })
    if (!track) return notFound()

    const summary = await API<{ resources: ArtistSummary }>({
        endpoint: "/artists/get-summary",
        demo: env.DEMO,
        revalidate: false,
        params: { id: track.artists.pop()?.adamid as string },
        filepath: "responses/artistSummary.json",
    }).then(res => res?.resources)
    if (!summary) return notFound()

    const lyrics = track.sections.find(s => s.type == "LYRICS")
    const audioUrl = track.hub.actions?.find(a => a.uri)?.uri

    return (
        <div className="h-full w-full max-h-full overflow-scroll relative">
            <div
                className="w-full h-1/5 bg-orange-50"
                style={{
                    backgroundImage: `url(${track?.images.coverarthq})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            />
            <div
                className="bg-blue-200 rounded-3xl border-white border-4 h-1/5 aspect-square absolute left-1/2 top-[10%] -translate-x-1/2"
                style={{
                    backgroundImage: `url(${
                        track.images.coverarthq || track.images.background
                    })`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            />
            <div className="w-full h-4/5 flex flex-col py-4">
                <div className="flex flex-row items-center cursor-default z-20 max-w-[45%]">
                    {audioUrl ? (
                        <AudioPlayer audioUrl={audioUrl} className="text-4xl" />
                    ) : (
                        <div className="px-4">
                            <AiOutlinePlayCircle className="text-4xl" />
                        </div>
                    )}
                    <div className="max-w-full truncate">
                        <h2 className="font-semibold text-2xl truncate">
                            {track.subtitle}
                        </h2>
                        <h1 className="text-4xl font-bold max-w-full truncate">
                            {track.title}
                        </h1>
                        <h3 className="text-xl font-medium truncate">
                            {track.genres.primary}
                        </h3>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="grow p-4">
                        <div className="w-fit p-4 border border-shade-800 rounded-md shadow-lg mb-8">
                            <h1 className="text-2xl py-4 font-medium cursor-default">
                                More By{" "}
                                {
                                    summary.artists[
                                        Object.keys(summary.artists)[0]
                                    ].attributes.name
                                }
                            </h1>
                            <ul className="grid grid-cols-3 gap-y-4 gap-x-8">
                                {Object.keys(summary.songs).map(sk => {
                                    const song = summary.songs[sk]
                                    return (
                                        <SongCard key={song.id} song={song} />
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="w-fit p-4 border border-shade-400 rounded-md shadow-lg">
                            <h1 className="text-2xl py-4 font-medium cursor-default">
                                Albums
                            </h1>
                            <ul className="grid grid-cols-3 gap-y-4 gap-x-8">
                                {Object.keys(summary.albums).map(ak => {
                                    const album = summary.albums[ak]
                                    return (
                                        <AlbumCard
                                            key={album.id}
                                            album={album}
                                        />
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="px-4 w-max basis-1/4 text-center border-l border-shade-300 shrink-0">
                        <h1 className="text-xl font-semibold mb-2">Lyrics</h1>
                        <ul>
                            {lyrics && lyrics.text ? (
                                lyrics.text.map((t, idx) =>
                                    t ? (
                                        <li key={idx}>{t}</li>
                                    ) : (
                                        <br key={idx} />
                                    )
                                )
                            ) : (
                                <li>Not available :(</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackPage
