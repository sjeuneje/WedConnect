import {Head, router, useForm} from "@inertiajs/react";
import DashboardLayout from "@/layouts/dashboard";
import PrimaryButton from "@/components/ui/buttons/primary";
import NewServiceForm from "@/components/dashboard/services/new-service-form";
import React, {useState} from "react";
import ShowService from "@/components/dashboard/services/show-service";
import Modal from "@/components/ui/modal";
import EditServiceFormContent from "@/components/dashboard/services/edit-service-form.jsx";
import {SuccessBanner} from "@/components/ui/success-banner";

type DeleteServicePayload = {
    provider_id: number,
    service_id: number
}

export default function ServicesProvider({
    services,
    user,
    currentRoute,
    billingUnits,
    errors,
    flash
}) {
    const [showNewServiceForm, setShowNewServiceForm] = useState<boolean>(false);
    const [showDeleteServiceModal, setShowDeleteServiceModal] = useState<boolean>(false);
    const [selectedService, setSelectedService] = useState(-1);
    const [editServiceForm, setEditServiceForm] = useState(null);

    const deleteService = () => {
        const payload: DeleteServicePayload = {
            provider_id: user.provider.id,
            service_id: selectedService,
        }

        router.delete(route('dashboard.provider.services.delete'), {
            data: payload
        });

        setShowDeleteServiceModal(false);
    }

    const handleUpdateService = (editServiceForm) => {
        router.post(
            route("dashboard.provider.services.update", editServiceForm.id),
            editServiceForm,
            {
                forceFormData: true,
                onSuccess: () => setEditServiceForm(null),
            }
        );
    };

    return (
        <>
            <Head title="Services" />
            <DashboardLayout currentRoute={currentRoute}>
                {flash?.success && (
                    <SuccessBanner key={flash.success} message={flash.success} />
                )}
                <Modal
                    isOpen={!!editServiceForm}
                    title="Modifier le service"
                    onCancel={() => setEditServiceForm(null)}
                    onConfirm={() => handleUpdateService(editServiceForm)}
                >
                    {editServiceForm && (
                        <EditServiceFormContent
                            service={editServiceForm}
                            setService={setEditServiceForm}
                            billingUnits={billingUnits}
                            errors={errors}
                        />
                    )}
                </Modal>
                <Modal
                    isOpen={showDeleteServiceModal}
                    title="Supprimer le service ?"
                    onCancel={() => setShowDeleteServiceModal(false)}
                    onConfirm={() => deleteService()}
                    isDangerAction
                >
                    <p>Cette action est irréversible. Voulez-vous continuer ?</p>
                </Modal>
                <h1 className="text-[14px] font-semibold mb-2">Gérez vos services et tarifs proposés aux mariés</h1>
                <p className="text-[12px] text-gray-500 max-w-[500px] mb-4">Ajoutez, modifiez ou supprimez vos services, définissez vos tarifs principaux et options, et téléchargez des photos pour mieux présenter votre activité.</p>
                <PrimaryButton onClick={() => setShowNewServiceForm(true)}>
                    Ajouter un service
                </PrimaryButton>
                {showNewServiceForm &&
                    <NewServiceForm
                        setShowNewServiceForm={setShowNewServiceForm}
                        billingUnits={billingUnits}
                        errors={errors}
                    />
                }
                <div className="mt-4">
                    {services.map((service) => (
                        <ShowService
                            key={service.id}
                            service={service}
                            billingUnits={billingUnits}
                            setShowDeleteServiceModal={setShowDeleteServiceModal}
                            setSelectedService={setSelectedService}
                            setEditServiceForm={setEditServiceForm}
                        />
                    ))}
                </div>
            </DashboardLayout>
        </>
    )
}
