"use client"

import classNames from "classnames"
import {
    ComponentProps,
    useEffect,
    useRef,
    useState,
} from "react"
import { CiPlay1, CiPause1 } from "react-icons/ci"

export const AudioPlayer = ({
    audioUrl,
    className = "",
}: {
    audioUrl: string
    className?: ComponentProps<"div">["className"]
}) => {
    const ref = useRef<HTMLAudioElement>(null)
    const [state, setState] = useState({
        playing: false,
        currentTime: 0,
        duration: 1,
    })

    useEffect(() => {
        if (!ref.current) return
        ref.current.ontimeupdate = () =>
            setState(o => ({
                ...o,
                currentTime: ref.current?.currentTime || 0,
                duration: ref.current?.duration || 0,
            }))
        ref.current.onplay = () => setState(o => ({ ...o, playing: true }))
        ref.current.onpause = () => setState(o => ({ ...o, playing: false }))
    }, [ref])

    return (
        <>
            <audio
                src={audioUrl}
                className={`hidden ${state.playing ? "playing" : "paused"}`}
                ref={ref}
            />
            <div className={classNames("aspect-square h-full p-2", className)}>
                <div
                    className="relative h-full w-full rounded-full flex items-center justify-center"
                    style={{
                        background: `conic-gradient(#e37b5a ${
                            (state.currentTime / state.duration) * 360
                        }deg, #f1f1f1 ${
                            (state.currentTime / state.duration) * 360
                        }deg)`,
                    }}
                >
                    <div className="absolute bg-white z-40 w-[90%] h-[90%] rounded-full grid items-center cursor-pointer">
                        {state.playing ? (
                            <CiPause1
                                className="w-full"
                                onClick={() => {
                                    ref.current?.pause()
                                }}
                            />
                        ) : (
                            <CiPlay1
                                className="w-full"
                                onClick={() => ref.current?.play()}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
