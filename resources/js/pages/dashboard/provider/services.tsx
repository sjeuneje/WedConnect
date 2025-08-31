import {Head} from "@inertiajs/react";
import DashboardLayout from "@/layouts/dashboard";
import {SuccessBanner} from "@/components/ui/success-banner";
import PrimaryButton from "@/components/ui/buttons/primary";
import NewServiceForm from "@/components/dashboard/services/new-service-form";
import {useState} from "react";

export default function ServicesProvider({ services, user, currentRoute, billingUnits }) {
    const [showNewServiceForm, setShowNewServiceForm] = useState<boolean>(false);
    // console.log(services);
    // console.log(errors);

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
                <>
                    {services.map((service, key) => {
                        return (
                            <div
                                key={key}
                                className="flex flex-col mt-4 pt-4 border-t border-t-gray-100 w-full"
                            >
                                <h3 className="text-[13.5px] font-semibold mb-2">{service.name}</h3>
                                <p className="text-xs text-gray-500 max-w-[500px] mb-4">{service.description}</p>

                                <h3 className="text-[13px] font-semibold mb-2">Tarifs</h3>
                                <div className="flex flex-col gap-y-2 mb-4">
                                    <>
                                        {service.rates.map((rate, key) => {
                                            const getBillingUnit = (billingUnit) => {
                                                return billingUnits.find(u => u.value === billingUnit);
                                            }

                                            const billingUnit = getBillingUnit(rate.billing_unit);

                                            return (
                                                <p
                                                    key={key}
                                                    className="text-xs text-gray-500 max-w-[500px]"
                                                >
                                                    {
                                                        !rate.custom_label ?
                                                            rate.amount + '€ - ' + billingUnit.label
                                                            :
                                                            rate.amount + '€ - ' + billingUnit.custom_label
                                                    }
                                                </p>
                                            )
                                        })}
                                    </>
                                </div>

                                {service.options &&
                                    <>
                                        <h3 className="text-[13px] font-semibold mb-2">Options</h3>
                                        <div className="flex flex-col gap-y-2">
                                            <>
                                                {service.options.map((option, key) => {

                                                    console.log(option);

                                                    return (
                                                        <p
                                                            key={key}
                                                            className="text-xs text-gray-500 max-w-[500px]"
                                                        >
                                                            yay
                                                        </p>
                                                    )
                                                })}
                                            </>
                                        </div>
                                    </>
                                }
                            </div>
                        )
                    })}
                </>
            </DashboardLayout>
        </>
    )
}
