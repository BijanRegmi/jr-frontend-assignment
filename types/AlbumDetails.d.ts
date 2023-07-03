import { Album } from "./ArtistSummary"
import { Song } from "./ArtistSummary"

export interface AlbumDetailResponse {
    data: AlbumDetail[]
}

export interface AlbumDetail extends Album {
    relationships: { tracks: { data: Song[] } }
}
