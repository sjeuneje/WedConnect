import Logo from "@/components/logo";
import {JSX} from "react";

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
            <div className="p-4">
                {/* navigation */}
            </div>
        </div>
    )
}
