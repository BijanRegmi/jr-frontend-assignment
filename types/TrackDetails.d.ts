import { IImages, TrackArtist } from "./chartTrack"

export interface TrackDetails {
    type: string
    key: string
    title: string
    subtitle: string
    images: IImages
    hub: { actions?: { uri?: string }[] }
    url: string
    artists: TrackArtist[]
    genres: { primary: string }
    albumadamid: string
    sections: Section[]
}

export interface Section {
    type: string
    metapages?: { image: string; caption: string }
    tabname: string
    metadata?: { title: string; text: string }[]
    text?: string[]
    footer?: string
    youtubeurl?: Youtubeurl
}

export interface Youtubeurl {
    caption: string
    image: { dimensions: { width: number; height: number }; url: string }
    actions: { name: string; type: string; uri: string }[]
}
