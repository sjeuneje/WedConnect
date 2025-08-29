import Logo from "@/components/logo";
import React, {useEffect, useState} from "react";
import {Link} from "@inertiajs/react";
import {X} from "lucide-react";
import {Page} from "@/types";

type Props = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    logoHref: string;
    currentPage: Page;
    pages: Page[];
};

export default function Sidebar({ show, setShow, logoHref, currentPage, pages }: Props) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className={`${show ? 'block' : 'hidden'} fixed top-0 left-0 w-full md:w-[250px] h-screen md:border-r border-r-gray-200 bg-slate-700 z-10 transition-opacity duration-750 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative flex items-center md:justify-center h-[75px] border-b border-b-gray-400 md:px-4">
                <Logo className="absolute left-4 md:relative md:left-0" href={logoHref} darkTheme />
                <X className="block md:hidden absolute right-[1rem] text-white size-4" onClick={() => setShow(!show)} />
            </div>

            <div className="p-2 mt-4">
                <ul className="flex flex-col gap-y-4">
                    {pages.map((page, key) => {
                        return (
                            <Link
                                key={key}
                                method={page.method}
                                href={route(page.href)}
                                className={`cursor-pointer ${currentPage.name === page.name ? 'bg-white/20' : 'hover:bg-white/20'} ${page.showOnDesktop ? 'flex' : 'flex md:hidden'} items-center gap-x-2 text-sm px-4 py-2 rounded-lg text-white font-semibold`}
                            >
                                {React.cloneElement(page.icon, { className: "w-4 h-4" })}
                                <span className="mt-[1px]">{page.name}</span>
                            </Link>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
