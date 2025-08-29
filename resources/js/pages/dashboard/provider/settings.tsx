import {Head} from "@inertiajs/react";
import DashboardLayout from "@/layouts/dashboard";
import DashboardSettingsNavigation from "@/components/dashboard/settings/navigation";
import {dashboardSettingsPages} from "@/data/provider/dashboardSettingsPages";
import {useState} from "react";
import SettingsUserTabProvider from "@/pages/dashboard/provider/settings/user";
import SettingsActivityTabProvider from "@/pages/dashboard/provider/settings/activity";

type Tab = {
    id: string;
    href: string;
    name: string;
    disabled: boolean;
    desc: string;
}

export default function SettingsProvider({ user, currentRoute }) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams);

    const [selectedTab, setSelectedTab] = useState(
        params?.selectedTab ? params?.selectedTab : 'user'
    );

    const getCurrentTab = (): Tab => {
        return dashboardSettingsPages.find((page) => page.id === selectedTab)!;
    }

    const currentTab: Tab = getCurrentTab();

    return (
        <>
            <Head title="Paramètres" />
            <DashboardLayout currentRoute={currentRoute}>
                <h1 className="text-[14px] font-semibold mb-2">Gestion du compte <span className="text-gray-500">({currentTab.name})</span></h1>
                <p className="text-[12px] text-gray-500 max-w-[500px] mb-4">{currentTab.desc}</p>
                <DashboardSettingsNavigation pages={dashboardSettingsPages} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                {currentTab.id === 'user' && <SettingsUserTabProvider user={user} />}
                {currentTab.id === 'activity' && <SettingsActivityTabProvider user={user} />}
            </DashboardLayout>
        </>
    )
}
