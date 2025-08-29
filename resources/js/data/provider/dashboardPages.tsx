import {Home, Activity, Briefcase, Settings, LogOut, List} from "lucide-react";
import type { Page } from "@/types";

export const dashboardPages: Page[] = [
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
        name: 'Liste prestataires',
        href: 'dashboard.provider',
        icon: <List />,
        showOnDesktop: true,
        method: 'get'
    },
    {
        name: 'Paramètres',
        href: 'dashboard.provider.settings',
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
