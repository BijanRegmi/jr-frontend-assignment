"use client"
import { ChartList } from "@/types/chartList"
import classNames from "classnames"
import { ChangeEvent } from "react"
import { AiOutlinePlayCircle, AiOutlineCaretDown } from "react-icons/ai"
import { useRecoilState } from "recoil"
import { chartFilterState } from "./state"
import useOnClickOutside from "@/lib/useClikOutside"

export const ChartFilter = ({ chartList }: { chartList: ChartList }) => {
    const [state, setState] = useRecoilState(chartFilterState)

    const setSearchCountry = (e: ChangeEvent<HTMLInputElement>) =>
        setState(o => ({ ...o, searchCountry: e.target.value }))
    const setSearchCity = (e: ChangeEvent<HTMLInputElement>) =>
        setState(o => ({ ...o, searchCity: e.target.value }))

    const toggleCountryDropDown = () =>
        setState(o => ({ ...o, countryDropDown: !o.countryDropDown }))
    const toggleGenreDropDown = () =>
        setState(o => ({ ...o, genreDropDown: !o.genreDropDown }))
    const toggleCityDropDown = () =>
        setState(o => ({ ...o, cityDropDown: !o.cityDropDown }))

    const countryRef = useOnClickOutside<HTMLDivElement>({
        handler: () => {
            if (state.countryDropDown)
                setState(o => ({ ...o, countryDropDown: false }))
        },
    })
    const cityRef = useOnClickOutside<HTMLDivElement>({
        handler: () => {
            if (state.cityDropDown)
                setState(o => ({ ...o, cityDropDown: false }))
        },
    })
    const genreRef = useOnClickOutside<HTMLDivElement>({
        handler: () => {
            if (state.genreDropDown)
                setState(o => ({ ...o, genreDropDown: false }))
        },
    })

    const switchToTop = () =>
        setState(o => ({ ...o, cityIdx: -1, genreIdx: -1 }))

    return (
        <div className="flex flex-col bg-orange-100 rounded-lg pt-8 gap-6 chartfilter">
            <div
                className={classNames(
                    "px-4 w-48 border-orange-400 shadow-orange-300 bg-orange-200 text-orange-900 border-l-0 border-2 shadow-md rounded-r-lg py-4 flex justify-between items-center relative cursor-pointer hover:border-orange-500",
                    {
                        "rounded-b-none": state.countryDropDown,
                        "shadow-one": state.countryDropDown,
                    }
                )}
                onClick={toggleCountryDropDown}
                ref={countryRef}
            >
                <span className="font-mono font-semibold truncate">
                    {state.global
                        ? "GLOBAL"
                        : chartList.countries[state.countryIdx]?.name}
                </span>
                <AiOutlineCaretDown className="w-6 h-6 rounded-md hover:text-orange-200 hover:bg-orange-900" />
                {state.countryDropDown && (
                    <div className="px-4 w-48 border-inherit shadow-inherit bg-inherit text-inherit border-l-0 border-t-0 border-2 shadow-md rounded-br-lg py-4 top-full left-0 absolute max-h-48 overflow-scroll z-50">
                        <input
                            autoFocus
                            className="w-full h-full bg-transparent rounded-sm outline-none mb-1 placeholder:text-inherit border-b border-orange-50"
                            onChange={setSearchCountry}
                            value={state.searchCountry}
                            placeholder="Search Country"
                            type="text"
                        />
                        {"global".includes(
                            state.searchCountry.toLowerCase()
                        ) && (
                            <span
                                className="truncate py-1 cursor-pointer hover:font-semibold block"
                                onClick={() =>
                                    setState(o => ({
                                        ...o,
                                        global: true,
                                        countryIdx: -1,
                                        cityIdx: -1,
                                        genreIdx: -1,
                                        countryDropDown: false,
                                        searchCountry: "",
                                    }))
                                }
                            >
                                Global
                            </span>
                        )}
                        {chartList.countries.map(
                            (c, idx) =>
                                c.name
                                    .toLowerCase()
                                    .includes(
                                        state.searchCountry.toLowerCase()
                                    ) && (
                                    <span
                                        key={c.id}
                                        className="truncate py-1 cursor-pointer hover:font-semibold block"
                                        onClick={() =>
                                            setState(o => ({
                                                ...o,
                                                global: false,
                                                countryIdx: idx,
                                                cityIdx: -1,
                                                genreIdx: -1,
                                                searchCountry: "",
                                            }))
                                        }
                                    >
                                        {c.name}
                                    </span>
                                )
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-row items-center cursor-default">
                <div className="px-4">
                    <AiOutlinePlayCircle className="text-6xl" />
                </div>
                <div>
                    <h2 className="font-semibold text-2xl">
                        {state.global
                            ? "GLOBAL"
                            : chartList.countries[state.countryIdx]?.name}
                    </h2>
                    <h1 className="text-6xl font-bold">
                        {state.global
                            ? `Top ${
                                  chartList.global.genres[state.genreIdx]
                                      ?.count || "200"
                              }`
                            : chartList.countries[state.countryIdx]?.genres[
                                  state.genreIdx
                              ]?.name || "Top 200"}
                    </h1>
                    <h3 className="text-xl font-medium">
                        {state.global
                            ? chartList.global.genres[state.genreIdx]?.name ||
                              "All"
                            : chartList.countries[state.countryIdx]?.genres[
                                  state.genreIdx
                              ]?.name || "All"}
                    </h3>
                </div>
            </div>

            <div className="w-full rounded-b-lg flex flex-row items-end pl-20 gap-10">
                <div
                    onClick={switchToTop}
                    className={classNames(
                        "px-4 py-2 rounded-t-md flex justify-between items-center border-b-0 border-2 shadow-lg cursor-pointer",
                        {
                            "bg-orange-200 text-orange-900 border-orange-400 hover:border-orange-500":
                                state.global
                                    ? state.genreIdx == -1
                                    : state.cityIdx == -1 &&
                                      state.genreIdx == -1,

                            "bg-white text-orange-400 border-orange-300 hover:border-orange-400":
                                state.global
                                    ? state.genreIdx != -1
                                    : state.cityIdx != -1 ||
                                      state.genreIdx != -1,
                        }
                    )}
                >
                    <span className="font-mono font-semibold">Top 200</span>
                </div>

                {!state.global && (
                    <div
                        className={classNames(
                            "px-4 w-36 py-2 rounded-t-md flex justify-between items-center border-b-0 border-2 shadow-lg relative cursor-pointer",
                            {
                                "bg-orange-200 text-orange-900 border-orange-400 hover:border-orange-500":
                                    state.cityIdx != -1,
                                "bg-white text-orange-400 border-orange-300 hover:border-orange-400":
                                    state.cityIdx == -1,
                            }
                        )}
                        onClick={toggleCityDropDown}
                        ref={cityRef}
                    >
                        <span className="font-mono font-semibold truncate">
                            {chartList.countries[state.countryIdx]?.cities[
                                state.cityIdx
                            ]?.name || "City"}
                        </span>
                        <AiOutlineCaretDown
                            className={classNames("w-6 h-6 rounded-md", {
                                "hover:bg-orange-900 hover:text-orange-200":
                                    state.cityIdx != -1,
                                "hover:bg-orange-400 hover:text-white":
                                    state.cityIdx == -1,
                            })}
                        />

                        {state.cityDropDown && (
                            <div className="px-4 w-36 py-2 rounded-b-md border-t-0 border-2 border-inherit shadow-lg absolute top-full -left-0.5 bg-inherit max-h-48 overflow-scroll z-50 text-inherit">
                                <input
                                    autoFocus
                                    className="w-full h-full border-b border-inherit bg-transparent rounded-sm outline-none mb-1 placeholder:text-inherit"
                                    onChange={setSearchCity}
                                    value={state.searchCity}
                                    placeholder="Search City"
                                    type="text"
                                />
                                {chartList.countries[
                                    state.countryIdx
                                ].cities.map(
                                    (c, idx) =>
                                        c.name
                                            .toLowerCase()
                                            .includes(
                                                state.searchCity.toLowerCase()
                                            ) && (
                                            <span
                                                key={c.id}
                                                className="truncate py-1 cursor-pointer hover:font-semibold block"
                                                onClick={() =>
                                                    setState(o => ({
                                                        ...o,
                                                        cityIdx: idx,
                                                        genreIdx: -1,
                                                        searchCity: "",
                                                    }))
                                                }
                                            >
                                                {c.name}
                                            </span>
                                        )
                                )}
                            </div>
                        )}
                    </div>
                )}
                {(state.global ||
                    (!state.global &&
                        state.countryIdx >= 0 &&
                        chartList.countries[state.countryIdx].genres.length >
                            0)) && (
                    <div
                        className={classNames(
                            "px-4 w-36 py-2 rounded-t-md flex justify-between items-center border-b-0 border-2 shadow-lg relative cursor-pointer",
                            {
                                "bg-orange-200 text-orange-900 border-orange-400 hover:border-orange-500":
                                    state.genreIdx != -1,
                                "bg-white text-orange-400 border-orange-300 hover:border-orange-400":
                                    state.genreIdx == -1,
                            }
                        )}
                        ref={genreRef}
                        onClick={toggleGenreDropDown}
                    >
                        <span className="font-mono font-semibold truncate">
                            {state.global
                                ? chartList.global.genres[state.genreIdx]
                                      ?.name || "Genre"
                                : chartList.countries[state.countryIdx]?.genres[
                                      state.genreIdx
                                  ]?.name || "Genre"}
                        </span>
                        <AiOutlineCaretDown
                            className={classNames("w-6 h-6 rounded-md", {
                                "hover:bg-orange-900 hover:text-orange-200":
                                    state.genreIdx != -1,
                                "hover:bg-orange-400 hover:text-white":
                                    state.genreIdx == -1,
                            })}
                        />
                        {state.genreDropDown && (
                            <div className="px-4 w-36 py-2 rounded-b-md border-t-0 border-2 border-inherit shadow-lg absolute top-full -left-0.5 bg-inherit max-h-48 overflow-scroll z-50 text-inherit">
                                {(state.global
                                    ? chartList.global
                                    : chartList.countries[state.countryIdx]
                                ).genres.map((g, idx) => (
                                    <span
                                        key={g.id}
                                        className="truncate py-1 cursor-pointer hover:font-semibold block"
                                        onClick={() =>
                                            setState(o => ({
                                                ...o,
                                                cityIdx: -1,
                                                genreIdx: idx,
                                            }))
                                        }
                                    >
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
