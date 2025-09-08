import Input from "@/components/ui/input";
import NewServiceRatesForm from "@/components/dashboard/services/new-service-rates-form";
import NewServiceOptionsForm from "@/components/dashboard/services/new-service-options-form";
import {ServiceFormData, ServiceRate, ServiceOption, BillingUnit} from "@/types/service";

type Props = {
    service: ServiceFormData;
    billingUnits: BillingUnit;
    errors: Record<string, string>;
    setService: (data: ServiceFormData) => void;
};

export default function EditServiceFormContent({ service, billingUnits, errors, setService }: Props) {
    const updateField = (field: keyof ServiceFormData, value: any) => {
        setService({ ...service, [field]: value });
    };

    return (
        <div className="flex flex-col gap-y-6">
            <Input
                label="Nom du service"
                id="name"
                type="text"
                placeholder="Photographe mariage"
                value={service.name || ""}
                error={errors?.name}
                onChange={(e) => updateField("name", e.target.value)}
            />

            <Input.TextArea
                label="Description du service"
                id="description"
                className="h-[100px]"
                placeholder="Capturez vos moments magiques..."
                value={service.description || ""}
                error={errors?.description}
                onChange={(e) => updateField("description", e.target.value)}
            />

            <NewServiceRatesForm
                billingUnits={billingUnits}
                rates={service.rates || []}
                setRates={(rates: ServiceRate[]) => updateField("rates", rates)}
                errors={errors}
            />

            <NewServiceOptionsForm
                billingUnits={billingUnits}
                options={service.options || []}
                setOptions={(options: ServiceOption[]) => updateField("options", options)}
                errors={errors}
            />
        </div>
    );
}
