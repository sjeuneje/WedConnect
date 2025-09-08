import Input from "@/components/ui/input";
import { ServiceOption, ServiceRate } from "@/types/service";

type Props = {
    options: ServiceOption[];
    setOptions: (options: ServiceOption[]) => void;
    billingUnits: { label: string; value: string }[];
};

export default function NewServiceOptionsForm({ options, setOptions, billingUnits, errors }: Props) {
    const addOption = () => {
        const incompleteOption = options.some(o => !o.name.trim() || !o.description?.trim());
        if (incompleteOption) return;

        setOptions([
            ...options,
            {
                name: "",
                description: "",
                rate: { amount: "", billing_unit: billingUnits[0]?.value || "hour", custom_label: "" },
            },
        ]);
    };

    const removeOption = (index: number) => {
        setOptions(options.filter((_, i) => i !== index));
    };

    const updateOption = (index: number, field: keyof ServiceOption, value: string) => {
        const updatedOptions = [...options];
        updatedOptions[index] = { ...updatedOptions[index], [field]: value };
        setOptions(updatedOptions);
    };

    const updateRate = (index: number, field: keyof ServiceRate, value: string) => {
        const updatedOptions = [...options];
        updatedOptions[index].rate = { ...updatedOptions[index].rate!, [field]: value };
        setOptions(updatedOptions);
    };

    return (
        <div className="flex flex-col border-t-gray-100 w-full">
            <h3 className={`text-[13.5px] font-semibold ${options.length > 0 ? 'mb-4' : ''}`}>Options</h3>

            <div className="flex flex-col gap-y-4">
                {options.map((option, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-y-6 border p-4 rounded-md relative"
                    >
                        <div className="flex flex-col gap-x-12 gap-y-4">
                            <div className="w-full md:w-[250px] flex flex-col">
                                <Input
                                    label="Nom"
                                    type="text"
                                    placeholder="Ex: Album photo, Retouche avancée"
                                    value={option.name}
                                    error={errors[`options.${index}.name`]}
                                    onChange={(e) => updateOption(index, "name", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="w-full md:w-[400px] flex flex-col">
                                <Input.TextArea
                                    label="Description"
                                    placeholder="Ex: Ajout de 20 photos retouchées supplémentaires..."
                                    className="h-[80px]"
                                    value={option.description}
                                    error={errors[`options.${index}.description`]}
                                    onChange={(e) => updateOption(index, "description", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {option.rate && (
                            <div className="flex flex-col md:flex-row gap-x-6 gap-y-4 mt-2 items-start border p-2 rounded-md">
                                <div className="w-full md:w-[150px]">
                                    <Input
                                        label="Prix (€)"
                                        type="number"
                                        value={option.rate.amount}
                                        error={errors[`options.${index}.rate.amount`]}
                                        onChange={(e) => updateRate(index, "amount", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="w-full md:w-[200px]">
                                    <Input.Select
                                        label="Unité de facturation"
                                        value={option.rate.billing_unit}
                                        error={errors[`options.${index}.rate.billing_unit`]}
                                        onChange={(e) => updateRate(index, "billing_unit", e.target.value)}
                                        required
                                    >
                                        <>
                                            {billingUnits.map((unit, key) => (
                                                <option key={key} value={unit.value}>{unit.label}</option>
                                            ))}
                                        </>
                                    </Input.Select>
                                </div>
                                {option.rate.billing_unit === "custom" && (
                                    <div className="w-full md:w-[200px]">
                                        <Input
                                            label="Label personnalisé"
                                            type="text"
                                            value={option.rate.custom_label}
                                            error={errors[`options.${index}.rate.custom_label`]}
                                            onChange={(e) => updateRate(index, "custom_label", e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {options.length >= 1 && (
                            <button
                                type="button"
                                className="absolute top-2 right-2 text-red-500 text-[12px] cursor-pointer hover:underline"
                                onClick={() => removeOption(index)}
                            >
                                Supprimer
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <p
                className="text-[12px] mt-2 mb-6 text-slate-700 font-medium cursor-pointer hover:underline w-fit"
                onClick={addOption}
            >
                + Ajouter une option
            </p>
        </div>
    );
}
