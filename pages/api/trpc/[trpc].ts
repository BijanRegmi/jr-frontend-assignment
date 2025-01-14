import { createNextApiHandler } from "@trpc/server/adapters/next"
import { createContext } from "@/server/context"
import { appRouter } from "@/server/routers/_app"

export default createNextApiHandler({
    router: appRouter,
    createContext,
    onError(opts) {
        const { error } = opts
        console.error("Error:", error)
    },
})
