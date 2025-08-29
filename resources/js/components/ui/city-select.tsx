import { useState } from "react";
import { Combobox } from "@headlessui/react";
import {extractCities} from "@/lib/json-utils";
import belgiumData from "@/data/be-cities-zipcodes.json";

const belgianCities: string[] = [];

type Props = {
    value?: string;
    onChange: (value: string) => void;
};

export default function SelectCityAutocomplete({ value, onChange }: Props) {
    const [query, setQuery] = useState("");

    const filteredCities =
        query === ""
            ? belgianCities
            : belgianCities.filter((city) =>
                city.toLowerCase().includes(query.toLowerCase())
            );

    return (
        <Combobox value={value} onChange={onChange}>
            <div className="relative">
                <Combobox.Input
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-[12px] focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 shadow-sm"
                    displayValue={(city: string | null | undefined) => city ?? ""}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Rechercher une ville..."
                />
                {filteredCities.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                        <>
                            {filteredCities.map((city: string, key: number) => (
                                <Combobox.Option
                                    key={key}
                                    value={city}
                                    className={({ active }) =>
                                        `cursor-pointer select-none px-4 py-2 text-[12px] ${
                                            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                        }`
                                    }
                                >
                                    {city}
                                </Combobox.Option>
                            ))}
                        </>
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    );
}
