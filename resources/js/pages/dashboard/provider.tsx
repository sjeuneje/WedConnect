import { Head } from '@inertiajs/react';
import DashboardLayout from "@/layouts/dashboard";
import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import {Activity, Briefcase, Home, LucideIcon, Settings} from "lucide-react";
import {JSX} from "react";

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

type Page = {
    name: string,
    href: string,
    icon: JSX.Element
}

const pages: Page[] = [
    {
        name: 'Tableau de bord',
        href: 'dashboard.provider',
        icon: <Home />
    },
    {
        name: 'Mon activité',
        href: 'dashboard.provider',
        icon: <Activity />
    },
    {
        name: 'Mes services',
        href: 'dashboard.provider',
        icon: <Briefcase />
    },
    {
        name: 'Paramètres',
        href: 'dashboard.provider',
        icon: <Settings />
    }
];

export default function DashboardProvider({ user, currentRoute }: Props) {
    const getCurrentPage = (): Page => {
        return pages.find(page => page.href === currentRoute)!;
    };

    const currentPage = getCurrentPage();

    return (
        <>
            <Head title="Tableau de bord" />
            <Topbar currentPage={currentPage} />
            <Sidebar logoHref={route('dashboard.provider')} pages={pages} />
            <DashboardLayout>
                <h1 className="text-sm">Bonjour <span className="font-semibold">{user.provider.company_name}</span>.</h1>
            </DashboardLayout>
        </>
    );
}
