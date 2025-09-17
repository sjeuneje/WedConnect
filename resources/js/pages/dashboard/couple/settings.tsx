import {Head, usePage} from "@inertiajs/react";
import CoupleDashboardLayout from "@/layouts/couple-dashboard";
import {useState} from "react";
import {dashboardSettingsPages} from "@/data/provider/dashboardSettingsPages";
import SettingsUserTabProvider from "@/pages/dashboard/settings/user";

type Tab = {
    id: string;
    href: string;
    name: string;
    disabled: boolean;
    desc: string;
}

export default function SettingsCouple({ user, currentRoute, errors }) {
    const { flash } = usePage().props;
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
            <CoupleDashboardLayout currentRoute={currentRoute} parametersHref={route('dashboard.couple.settings')}>
                <h1 className="text-[14px] font-semibold mb-2">Gestion des paramètres <span className="text-gray-500">({currentTab.name})</span></h1>
                <p className="text-[12px] text-gray-500 max-w-[500px] mb-4">{currentTab.desc}</p>
                {currentTab.id === 'user' && <SettingsUserTabProvider user={user} errors={errors} />}
            </CoupleDashboardLayout>
        </>
    )
}
