import {Head} from "@inertiajs/react";
import CoupleDashboardLayout from "@/layouts/couple-dashboard";
import React from "react";
import ProvidersList from "@/components/dashboard/providers-list";

export default function ListingProviders({ currentRoute, providers }) {
    return (
        <>
            <Head title="Liste des prestataires" />
            <CoupleDashboardLayout currentRoute={currentRoute} parametersHref={route('dashboard.couple.settings')}>
                <h1 className="text-[14px] font-semibold mb-2">Visualisez le listing des prestataires</h1>
                <p className="text-[12px] text-gray-500 max-w-[500px] mb-4">
                    Trouvez les prestataires que vous souhaitez réserver pour votre mariage, parcourez les profils, mettez les en favoris, ...
                </p>

                <ProvidersList providers={providers} />
            </CoupleDashboardLayout>
        </>
    )
}
