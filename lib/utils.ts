export const formatString = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

export const formatArtistName = (str: string | undefined) =>
    str ? str.split("-").map(formatString).join(" ") : ""
