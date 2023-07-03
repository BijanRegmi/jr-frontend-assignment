import { ITrack } from "./chartTrack"

export interface ISearchResponse {
    hints: { term: string }[]
}

export interface ISearchResultResponse {
    tracks: { hits: { track: ITrack; snippet?: string }[] }
    artists: { hits: { artist: Artist }[] }
}

export interface Artist {
    avatar?: string
    id: string
    name: string
    verified: boolean
    weburl: string
    adamid: string
}
