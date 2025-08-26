import React from "react";

type Country = {
    id: number;
    label: string;
    value: string;
    created_at?: string;
    updated_at?: string;
};

type Role = {
    value: string;
    label: string;
};

type CountryProps = {
    countries: Country[];
    selected: string;
    onChange: (selected: string) => void;
};

type RoleProps = {
    roles: Role[];
    selected: string;
    onChange: (selected: string) => void;
};

export function CountryMultiSelect({ countries = [], selected, onChange }: CountryProps) {
    const toggle = (value: string) => {
        if (selected === value) return;
        onChange(value);
    };

    return (
        <div className="flex flex-wrap gap-2">
            {countries.map((country) => (
                <div
                    key={country.value}
                    onClick={() => toggle(country.value)}
                    className={`text-sm cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border ${
                        selected === country.value ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-700"
                    }`}
                >
          <span
              className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${
                  selected === country.value ? "bg-white" : "bg-white border-gray-400"
              }`}
          >
            {selected === country.value && <span className="w-2 h-2 rounded-full bg-gray-700" />}
          </span>
                    <span>{country.label}</span>
                </div>
            ))}
        </div>
    );
}

export function RoleMultiSelect({ roles = [], selected, onChange }: RoleProps) {
    const toggle = (value: string) => {
        if (selected === value) return;
        onChange(value);
    };

    return (
        <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
                <div
                    key={role.value}
                    onClick={() => toggle(role.value)}
                    className={`text-sm cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border ${
                        selected === role.value ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-700"
                    }`}
                >
          <span
              className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${
                  selected === role.value ? "bg-white" : "bg-white border-gray-400"
              }`}
          >
            {selected === role.value && <span className="w-2 h-2 rounded-full bg-gray-700" />}
          </span>
                    <span>{role.label}</span>
                </div>
            ))}
        </div>
    );
}
