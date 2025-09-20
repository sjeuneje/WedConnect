import {Head} from "@inertiajs/react";
import React, {useState} from "react";
import CoupleDashboardLayout from "@/layouts/couple-dashboard";
import {dashboardWeddingPages} from "@/data/couple/dashboardWeddingPages";
import DashboardSettingsNavigation from "@/components/dashboard/settings/navigation";
import WeddingInfosTab from "@/components/dashboard/wedding/wedding-infos-tab";
import {SuccessBanner} from "@/components/ui/success-banner";
import WeddingBookmarksTab from "@/components/dashboard/wedding/wedding-bookmarks-tab";

type Tab = {
    id: string;
    href: string;
    name: string;
    disabled: boolean;
    desc: string;
}

export default function WeddingCouple({ user, currentRoute, errors, flash, bookmarks }) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams);

    const [selectedTab, setSelectedTab] = useState(
        params?.selectedTab ? params?.selectedTab : 'wedding'
    );

    const getCurrentTab = (): Tab => {
        return dashboardWeddingPages.find((page) => page.id === selectedTab)!;
    }

    const currentTab: Tab = getCurrentTab();

    return (
        <>
            <Head title="Notre mariage" />
            <CoupleDashboardLayout currentRoute={currentRoute} parametersHref={route('dashboard.couple.settings')}>
                <SuccessBanner key={user?.couple?.updated_at} message={flash?.success} />
                <h1 className="text-[14px] font-semibold mb-2">{currentTab.name}</h1>
                <p className="text-[12px] text-gray-500 max-w-[500px] mb-4">{currentTab.desc}</p>
                <DashboardSettingsNavigation pages={dashboardWeddingPages} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                {currentTab.id === 'wedding' && <WeddingInfosTab user={user} errors={errors} />}
                {currentTab.id === 'bookmarks' && <WeddingBookmarksTab user={user} bookmarks={bookmarks} />}
            </CoupleDashboardLayout>
        </>
    )
}
