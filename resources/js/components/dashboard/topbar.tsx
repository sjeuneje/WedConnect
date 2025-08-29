import React from "react";
import AccountMenu from "@/components/dashboard/account-menu";
import {Link} from "@inertiajs/react";
import {AlignJustify} from "lucide-react";
import {Page} from "@/types";

type Props = {
    currentPage: Page,
    showSidebar: boolean,
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Topbar({ currentPage, showSidebar, setShowSidebar }: Props) {
    return (
        <div className="fixed top-0 left-0 md:left-[250px] right-0 h-[75px] border-b border-gray-200 bg-[#FDFDFC] p-4 text-sm font-medium opacity-100 transition-opacity duration-750 grow starting:opacity-0">
            <div className="flex justify-between items-center h-full">
                <Link href={route(currentPage.href)} className="flex items-center gap-x-2 text-slate-700 font-semibold">
                    {React.cloneElement(currentPage.icon, { className: "w-4 h-4" })}
                    <span className="mt-[1px]">{currentPage.name}</span>
                </Link>
                <div className="block md:hidden p-1" onClick={() => setShowSidebar(!showSidebar)}>
                    <AlignJustify className="size-4 text-black" />
                </div>
                <AccountMenu show={showSidebar} />
            </div>
        </div>
    )
}
