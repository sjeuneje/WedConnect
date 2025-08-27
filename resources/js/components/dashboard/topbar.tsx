import React, {JSX} from "react";
import AccountMenu from "@/components/dashboard/account-menu";
import {Link} from "@inertiajs/react";

type Page = {
    name: string,
    href: string,
    icon: JSX.Element
}

type Props = {
    currentPage: Page
}

export default function Topbar({ currentPage }: Props) {
    return (
        <div className="fixed top-0 left-[250px] right-0 h-[75px] border-b border-gray-200 bg-[#FDFDFC] p-4 text-[14px] font-medium">
            <div className="flex justify-between items-center h-full">
                <Link href={route(currentPage.href)} className="flex items-center gap-x-2 text-slate-700 font-semibold">
                    {React.cloneElement(currentPage.icon, { className: "w-4 h-4" })}
                    <span className="mt-[1px]">{currentPage.name}</span>
                </Link>
                <AccountMenu />
            </div>
        </div>
    )
}
