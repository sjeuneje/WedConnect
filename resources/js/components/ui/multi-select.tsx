type Country = {
    id: number;
    label: string;
    value: string;
    created_at?: string;
    updated_at?: string;
};

type Props = {
    countries: Country[];
    selected: string[];
    onChange: (selected: string[]) => void;
};

export default function CountryMultiSelect({ countries = [], selected, onChange }: Props) {
    const toggle = (value: string) => {
        if (selected.includes(value)) return;
        onChange([value]);
    };

    return (
        <div className="flex flex-wrap gap-2">
            {countries.map(country => (
                <div
                    key={country.value}
                    onClick={() => toggle(country.value)}
                    className={`text-sm cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border ${
                        selected.includes(country.value)
                            ? 'border-gray-700'
                            : 'border-gray-300'
                    }`}
                >
                    <span
                        className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${
                            selected.includes(country.value)
                                ? 'bg-white'
                                : 'bg-white border-gray-400'
                        }`}
                    >
                        {selected.includes(country.value) && (
                            <span className="w-2 h-2 rounded-full bg-gray-700" />
                        )}
                    </span>

                    <span>{country.label}</span>
                </div>
            ))}
        </div>
    );
}

