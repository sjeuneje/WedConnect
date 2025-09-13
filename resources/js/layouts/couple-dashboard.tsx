import Topbar from "@/components/dashboard/topbar";
import Sidebar from "@/components/dashboard/sidebar";
import {dashboardPages} from "@/data/couple/dashboardPages";
import {Page} from "@/types";
import {useEffect, useState} from "react";

export default function CoupleDashboardLayout({ currentRoute, children }) {
    const pages = dashboardPages;

    const getCurrentPage = (): Page => {
        return pages.find(page => page.href === currentRoute)!;
    };

    const currentPage = getCurrentPage();

    const [showSidebar, setShowSidebar] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setShowSidebar(window.innerWidth >= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <Topbar currentPage={currentPage} showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <Sidebar show={showSidebar} setShow={setShowSidebar} logoHref={route('dashboard.couple')} currentPage={currentPage} pages={pages} />
            <main className="ml-0 md:ml-[250px] mt-[75px] h-[calc(100vh-100px)] overflow-auto p-4 bg-[#FDFDFC] opacity-100 transition-opacity duration-750 grow starting:opacity-0">
                {children}
            </main>
        </>
    )
}
