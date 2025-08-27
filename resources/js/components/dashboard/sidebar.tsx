import Logo from "@/components/logo";
import React, {JSX} from "react";
import {Link} from "@inertiajs/react";

type Page = {
    name: string,
    href: string,
    icon: JSX.Element
}

type Props = {
    logoHref: string
    pages: Page[]
}

export default function Sidebar({ logoHref, pages }: Props) {
    return (
        <div className="fixed top-0 left-0 w-[250px] h-screen border-r border-r-gray-200 bg-slate-700 z-10">
            <div className="flex items-center justify-center h-[75px] border-b border-b-gray-200">
                <Logo href={logoHref} darkTheme />
            </div>
            <div className="p-2 mt-4">
                <ul className="flex flex-col gap-y-4">
                    {pages.map((page: Page, key) => (
                        <li className="cursor-pointer hover:bg-white/20 flex items-center gap-y-12 text-[14px] px-4 py-2 rounded-lg" key={key}>
                            <Link href={route(page.href)} className="flex items-center gap-x-2 text-white font-semibold">
                                {React.cloneElement(page.icon, { className: "w-4 h-4" })}
                                <span className="mt-[1px]">{page.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
