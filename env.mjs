// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
    server: {
        RAPIDAPI_KEY: z.string(),
        RAPIDAPI_HOST: z.string(),
    },
    client: {
        DEMO: z.preprocess(v => v == "true", z.boolean()),
    },
    runtimeEnv: {
        RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
        RAPIDAPI_HOST: process.env.RAPIDAPI_HOST,
        DEMO: process.env.DEMO,
    },
})
