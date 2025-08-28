import { Head } from '@inertiajs/react';
import DashboardLayout from "@/layouts/dashboard";
import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import {Activity, Briefcase, Home, LogOut, LucideIcon, Settings} from "lucide-react";
import {JSX, useEffect, useState} from "react";

export type Provider = {
    id: number;
    user_id: number;
    company_name: string;
    logo: string | null;
    city: string | null;
    zipcode: string | null;
    description: string | null;
    facebook_url: string | null;
    instagram_url: string | null;
    trial_end_at: string | null;
    published_at: string | null;
    created_at: string;
    updated_at: string;
};

export type User = {
    id: number;
    email: string;
    country: string;
    phone_number: string;
    phone_verified: boolean | 0 | 1;
    role: 'provider';
    created_at: string;
    updated_at: string;
    provider: Provider;
};

type Props = {
    user: User,
    currentRoute: string
}

export type Page = {
    name: string,
    href: string,
    icon: JSX.Element,
    showOnDesktop: boolean,
    method: string
}

const pages: Page[] = [
    {
        name: 'Tableau de bord',
        href: 'dashboard.provider',
        icon: <Home />,
        showOnDesktop: true,
        method: 'get'
    },
    {
        name: 'Mon activité',
        href: 'dashboard.provider',
        icon: <Activity />,
        showOnDesktop: true,
        method: 'get'
    },
    {
        name: 'Mes services',
        href: 'dashboard.provider',
        icon: <Briefcase />,
        showOnDesktop: true,
        method: 'get'
    },
    {
        name: 'Paramètres',
        href: 'dashboard.provider',
        icon: <Settings />,
        showOnDesktop: true,
        method: 'get'
    },
    {
        name: 'Se déconnecter',
        href: 'logout',
        icon: <LogOut />,
        showOnDesktop: false,
        method: 'post'
    }
];

export default function DashboardProvider({ user, currentRoute }: Props) {
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
            <Head title="Tableau de bord" />
            <Topbar currentPage={currentPage} showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <Sidebar show={showSidebar} setShow={setShowSidebar} logoHref={route('dashboard.provider')} pages={pages} />
            <DashboardLayout>
                <h1 className="text-sm">Bonjour <span className="font-semibold">{user.provider.company_name}</span>.</h1>
            </DashboardLayout>
        </>
    );
}
