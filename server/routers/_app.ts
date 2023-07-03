import { publicProcedure, router } from "../trpc"
import { z } from "zod"
import { ISearchResponse, ISearchResultResponse } from "@/types/searchResponse"
import { ITrack } from "@/types/chartTrack"
import { API } from "@/lib/Api"
import { env } from "@/env.mjs"

export const appRouter = router({
    autocomplete: publicProcedure
        .input(z.object({ term: z.string() }))
        .mutation(async ({ input }) => {
            const response = await API<ISearchResponse>({
                endpoint: "/auto-complete",
                demo: env.DEMO,
                revalidate: false,
                filepath: "responses/autoComplete.json",
                params: { term: input.term },
            })

            return response
        }),

    getTracks: publicProcedure
        .input(
            z.object({
                listId: z.string(),
                cursor: z.number().nullish(),
            })
        )
        .query(async ({ input }) => {
            const LIMIT = 20

            const params: { [key: string]: string } = {
                pageSize: LIMIT.toString(),
                startFrom: (input.cursor || 0).toString(),
            }

            if (input.listId) params["listId"] = input.listId

            const response = await API<{
                properties: {}
                tracks: ITrack[]
            }>({
                endpoint: "/charts/track",
                params,
                revalidate: 86400,
                demo: env.DEMO,
                filepath: "responses/charts_track.json",
            })

            const nextCursor =
                (response?.tracks.length || 0) < LIMIT
                    ? undefined
                    : (response?.tracks.length || 0) + (input.cursor || 0)

            return { tracks: response?.tracks, nextCursor }
        }),

    getSearchResults: publicProcedure
        .input(
            z.object({
                term: z.string(),
                prefetched: z.number().default(0),
                cursor: z.number().nullish(),
            })
        )
        .query(async ({ input }) => {
            const LIMIT = 5

            const tracks = await API<ISearchResultResponse>({
                endpoint: "/search",
                demo: env.DEMO,
                revalidate: false,
                filepath: "responses/search.json",
                params: {
                    term: input.term,
                    limit: LIMIT.toString(),
                    offset: ((input.cursor || 0) + input.prefetched).toString(),
                },
            }).then(res => res?.tracks.hits.map(h => h.track))

            const nextCursor =
                (tracks?.length || 0) < LIMIT
                    ? undefined
                    : (tracks?.length || 0) + (input.cursor || 0)

            return { tracks, nextCursor }
        }),
})

export type AppRouter = typeof appRouter
