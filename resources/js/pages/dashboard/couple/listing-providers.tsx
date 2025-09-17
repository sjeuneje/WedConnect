import {Head} from "@inertiajs/react";
import CoupleDashboardLayout from "@/layouts/couple-dashboard";

export default function ListingProviders({ user, currentRoute }) {
    return (
        <>
            <Head title="Liste des prestataires" />
            <CoupleDashboardLayout currentRoute={currentRoute} parametersHref={route('dashboard.provider.settings')}>

            </CoupleDashboardLayout>
        </>
    )
}
