import { atom } from "recoil"

export const chartFilterState = atom({
    key: "chartfilterstate",
    default: {
        global: true,
        countryIdx: -1,
        genreIdx: -1,
        cityIdx: -1,
        countryDropDown: false,
        searchCountry: "",
        cityDropDown: false,
        searchCity: "",
        genreDropDown: false,
    },
})
