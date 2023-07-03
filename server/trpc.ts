import { ZodError } from "zod"
import type { Context } from "./context"
import { initTRPC } from "@trpc/server"

const t = initTRPC.context<Context>().create({
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.code == "BAD_REQUEST" &&
                        error.cause instanceof ZodError
                        ? error.cause
                        : null,
            },
        }
    },
})

export const router = t.router
export const publicProcedure = t.procedure
export const middleware = t.middleware
