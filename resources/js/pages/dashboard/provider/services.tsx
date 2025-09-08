import {Head, router} from "@inertiajs/react";
import DashboardLayout from "@/layouts/dashboard";
import PrimaryButton from "@/components/ui/buttons/primary";
import NewServiceForm from "@/components/dashboard/services/new-service-form";
import React, {useState} from "react";
import ShowService from "@/components/dashboard/services/show-service";

type DeleteServicePayload = {
    provider_id: number,
    service_id: number
}

export default function ServicesProvider({ services, user, currentRoute, billingUnits }) {
    const [showNewServiceForm, setShowNewServiceForm] = useState<boolean>(false);

    const deleteService = (service) => {
        const payload: DeleteServicePayload = {
            provider_id: user.provider.id,
            service_id: service.id,
        }

        router.delete(route('dashboard.provider.services.delete'), {
            data: payload
        });
    }

    return (
        <>
            <Head title="Services" />
            <DashboardLayout currentRoute={currentRoute}>
                {/*<SuccessBanner key={user.updated_at} message={flash?.success} />*/}
                <h1 className="text-[14px] font-semibold mb-2">Gérez vos services et tarifs proposés aux mariés</h1>
                <p className="text-[12px] text-gray-500 max-w-[500px] mb-4">Ajoutez, modifiez ou supprimez vos services, définissez vos tarifs principaux et options, et téléchargez des photos pour mieux présenter votre activité.</p>
                <PrimaryButton onClick={() => setShowNewServiceForm(true)}>
                    Ajouter un service
                </PrimaryButton>
                {showNewServiceForm && <NewServiceForm setShowNewServiceForm={setShowNewServiceForm} billingUnits={billingUnits} />}
                <div className="mt-4">
                    {services.map((service) => (
                        <ShowService
                            key={service.id}
                            service={service}
                            billingUnits={billingUnits}
                            deleteService={deleteService}
                        />
                    ))}
                </div>
            </DashboardLayout>
        </>
    )
}
