import {Head} from "@inertiajs/react";
import CoupleDashboardLayout from "@/layouts/couple-dashboard";

export default function DashboardCouple({ user, currentRoute }) {
    console.log(user);
    return (
        <>
            <Head title="Mon tableau de bord" />
            <CoupleDashboardLayout currentRoute={currentRoute} parametersHref={route('dashboard.couple.settings')}>
                <h1 className="text-[14px]">Bonjour <span className="font-semibold">{user?.couple?.name}</span>.</h1>
            </CoupleDashboardLayout>
        </>
    )
}
