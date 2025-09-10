import { useForm } from "@inertiajs/react";
import Input from "@/components/ui/input";
import PrimaryButton from "@/components/ui/buttons/primary";
import SecondaryButton from "@/components/ui/buttons/secondary";
import NewServiceRatesForm from "@/components/dashboard/services/new/new-service-rates-form";
import NewServiceOptionsForm from "@/components/dashboard/services/new/new-service-options-form";
import { ServiceFormData, ServiceRate, ServiceOption } from "@/types/service";
import NewServicePhotosForm from "@/components/dashboard/services/new/new-service-photos-form";

type Props = {
    setShowNewServiceForm: (show: boolean) => void;
    billingUnits: { label: string; value: string }[];
};

export default function NewServiceForm({ setShowNewServiceForm, billingUnits, errors }: Props) {
    const form = useForm<ServiceFormData>({
        name: "",
        description: "",
        rates: [
            { amount: "", billing_unit: billingUnits[0]?.value || "hour", custom_label: "" },
        ],
        options: [],
        photos: [],
    });

    const createService = () => {
        const savePhotos = form.data.photos;

        form.data.photos = form.data.photos?.map(p => p.file) ?? [];

        form.post(route("dashboard.provider.services.store"), {
            forceFormData: true,
            onSuccess: () => setShowNewServiceForm(false),
            onError: () => form.data.photos = savePhotos,
        });
    };

    return (
        <>
            <div className="flex flex-col mt-4 pt-4 border-t border-t-gray-100 w-full">
                <h3 className="text-[13.5px] font-semibold mb-4">Nouveau service</h3>
                <div className="flex flex-col gap-y-6">
                    <div className="flex flex-col md:flex-row gap-y-6 md:gap-y-0 gap-x-12 items-start">
                        <div className="w-full md:w-[400px] flex flex-col">
                            <Input
                                label="Nom du service"
                                id="name"
                                type="text"
                                placeholder="Photographe mariage"
                                value={form.data.name}
                                error={errors?.name}
                                onChange={(e) => form.setData("name", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-y-6 md:gap-y-0 gap-x-12 items-start">
                        <div className="w-full md:w-[400px] max-w-[850px] flex flex-col">
                            <Input.TextArea
                                label="Description du service"
                                id="description"
                                className="h-[100px]"
                                placeholder="Capturez vos moments magiques..."
                                value={form.data.description}
                                error={errors?.description}
                                onChange={(e) => form.setData("description", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <NewServicePhotosForm
                        photos={form.data.photos}
                        setPhotos={(photos) => form.setData("photos", photos)}
                        errors={errors}
                    />

                    <NewServiceRatesForm
                        billingUnits={billingUnits}
                        rates={form.data.rates}
                        setRates={(rates: ServiceRate[]) => form.setData("rates", rates)}
                        errors={errors}
                    />

                    <NewServiceOptionsForm
                        options={form.data.options}
                        setOptions={(options: ServiceOption[]) => form.setData("options", options)}
                        billingUnits={billingUnits}
                        errors={errors}
                    />
                </div>
            </div>

            <div className="flex gap-x-4 mt-4">
                <PrimaryButton onClick={createService}>Confirmer</PrimaryButton>
                <SecondaryButton onClick={() => setShowNewServiceForm(false)}>Annuler</SecondaryButton>
            </div>
        </>
    );
}
