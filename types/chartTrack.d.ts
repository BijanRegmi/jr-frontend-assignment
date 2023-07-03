export interface IChartTrack {
    properties: {}
    tracks: ITrack[]
}

export interface ITrack {
    layout: string
    key: string
    title: string
    subtitle: string
    images?: IImages
    hub: { actions?: { uri?: string }[] }
    artists?: TrackArtist[]
    url: string
}

export interface TrackArtist {
    alias?: string
    id: string
    adamid: string
}

export interface IImages {
    background: string
    coverart: string
    coverarthq: string
    joecolor: string
}
