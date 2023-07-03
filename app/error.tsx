"use client"

import { useEffect } from "react"

export default function Error({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <h2>Something went wrong!</h2>
            <button
                className="px-4 py-2 bg-shade-100 rounded-md"
                onClick={reset}
            >
                Try again
            </button>
        </div>
    )
}
