import Input from "@/components/ui/input";
import { ServiceRate } from "@/types/service";
import React from "react";

type BillingUnit = ServiceRate["billing_unit"];

type BillingUnitOption = {
    label: string;
    value: BillingUnit;
};

type Props = {
    rates: ServiceRate[];
    setRates: (rates: ServiceRate[]) => void;
    billingUnits: BillingUnitOption[];
};

export default function NewServiceRatesForm({ rates, setRates, billingUnits }: Props) {
    const addRate = () => {
        const lastRate = rates[rates.length - 1];
        if (
            lastRate.amount === "" ||
            !lastRate.billing_unit ||
            (lastRate.billing_unit === "custom" && !lastRate.custom_label?.trim())
        ) return;

        setRates([
            ...rates,
            { amount: "", billing_unit: billingUnits[0]?.value || "hour", custom_label: "" },
        ]);
    };

    const removeRate = (index: number) => {
        setRates(rates.filter((_, i) => i !== index));
    };

    const updateRate = (index: number, field: keyof ServiceRate, value: string) => {
        const updatedRates = [...rates];
        updatedRates[index] = { ...updatedRates[index], [field]: value };
        setRates(updatedRates);
    };

    return (
        <div className="flex flex-col border-t-gray-100 w-full">
            <h3 className="text-[13.5px] font-semibold mb-4">Tarification</h3>

            <div className="flex flex-col gap-y-4">
                {rates.map((rate, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-y-6 md:flex-row md:gap-x-12 items-start border p-4 rounded-md relative"
                    >
                        <div className="w-full md:w-[200px] flex flex-col">
                            <Input
                                label="Prix (€)"
                                type="number"
                                placeholder="50"
                                value={rate.amount}
                                onChange={(e) => updateRate(index, "amount", e.target.value)}
                                required
                            />
                        </div>

                        <div className="w-full md:w-[250px] flex flex-col">
                            <Input.Select
                                label="Unité de facturation"
                                value={rate.billing_unit}
                                onChange={(e) => updateRate(index, "billing_unit", e.target.value as BillingUnit)}
                                required
                            >
                                {billingUnits.map((unit, key) => (
                                    <option key={key} value={unit.value}>
                                        {unit.label}
                                    </option>
                                ))}
                            </Input.Select>
                        </div>

                        {rate.billing_unit === "custom" && (
                            <div className="w-full md:w-[250px] flex flex-col">
                                <Input
                                    label="Label personnalisé"
                                    type="text"
                                    placeholder="ex: Par couple, Par prestation"
                                    value={rate.custom_label}
                                    onChange={(e) => updateRate(index, "custom_label", e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        {rates.length > 1 && (
                            <button
                                type="button"
                                className="absolute top-2 right-2 text-red-500 text-[12px] cursor-pointer hover:underline"
                                onClick={() => removeRate(index)}
                            >
                                Supprimer
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <p
                className="text-[12px] mt-2 text-slate-700 font-medium cursor-pointer hover:underline w-fit"
                onClick={addRate}
            >
                + Ajouter un nouveau tarif
            </p>
        </div>
    );
}
