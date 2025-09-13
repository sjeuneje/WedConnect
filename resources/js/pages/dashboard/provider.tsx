import { Head } from '@inertiajs/react';
import DashboardLayout from "@/layouts/dashboard";
import type { User } from "@/types";

type Props = { user: User, currentRoute: string }

export default function DashboardProvider({ user, currentRoute }: Props) {
    return (
        <>
            <Head title="Tableau de bord" />
            <DashboardLayout currentRoute={currentRoute} parametersHref={route('dashboard.provider.settings')}>
                <h1 className="text-[14px]">Bonjour <span className="font-semibold">{user.provider.company_name}</span>.</h1>
            </DashboardLayout>
        </>
    );
}
