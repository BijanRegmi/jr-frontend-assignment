import Link from "next/link"
import { AiOutlineSearch, AiOutlineHome } from "react-icons/ai"
import { FiRadio } from "react-icons/fi"
import { BiTrendingUp } from "react-icons/bi"
import { SlEvent } from "react-icons/sl"

export const Sidebar = () => {
    const links = [
        { title: "Home", icon: AiOutlineHome, href: "/" },
        { title: "Browse", icon: AiOutlineSearch, href: "/" },
        { title: "Radio", icon: FiRadio, href: "/" },
        { title: "Trending", icon: BiTrendingUp, href: "/" },
        { title: "Events", icon: SlEvent, href: "/" },
    ]

    return (
        <div className="w-52 h-full overflow-scroll border-r border-shade-300 shrink-0">
            <ul className="flex flex-col justify-around gap-4 bg-shade-0 text-shade-900 rounded-md py-8">
                {links.map((link, idx) => (
                    <li
                        key={idx}
                        className="flex gap-4 items-center cursor-pointer px-2"
                    >
                        <link.icon className="h-10 w-10 p-2" />
                        <Link href={link.href} className="grow font-semibold">
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
