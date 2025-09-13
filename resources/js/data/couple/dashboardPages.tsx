import {Home, Settings, LogOut, List, ClipboardList} from "lucide-react";
import type { Page } from "@/types";

export const dashboardPages: Page[] = [
    {
        name: 'Tableau de bord',
        href: 'dashboard.couple',
        icon: <Home />,
        showOnDesktop: true,
        method: 'get'
    },
    {
        name: 'Mon mariage',
        href: 'dashboard.couple',
        icon: <ClipboardList />,
        showOnDesktop: true,
        method: 'get'
    },
    {
        name: 'Liste prestataires',
        href: 'dashboard.couple',
        icon: <List />,
        showOnDesktop: true,
        method: 'get'
    },
    {
        name: 'Paramètres',
        href: 'dashboard.couple.settings',
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
