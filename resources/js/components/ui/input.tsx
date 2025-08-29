import React, {InputHTMLAttributes, useState} from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
};

const belgianCities = [
    "Anvers",
    "Bruxelles",
    "Charleroi",
    "Gand",
    "Liège",
    "Namur",
    "Mons",
    "Louvain",
    "Bruges",
    "Hasselt",
];

function BaseInput({ label, error, className = "", required = false, ...props }: Props) {
    return (
        <div className="flex flex-col w-full">
            {label && (
                <label className="flex gap-x-[2px] text-sm font-medium mb-1 text-left" htmlFor={props.id}>
                    {label} <span className="text-red-500">{required && "*"}</span>
                </label>
            )}
            <input
                {...props}
                className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-[12px] focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 shadow-sm ${className}`}
            />
            {error && <span className="text-left text-red-500 text-xs mt-1">{error}</span>}
        </div>
    );
}

function InputFile({ text = null, label, error, className = "", required = false, ...props }: Props) {
    const [fileName, setFileName] = useState<string | null>(null);
    const [inputKey, setInputKey] = useState<number>(Date.now());

    const clearFile = () => {
        setFileName(null);
        setInputKey(Date.now());
    };

    return (
        <div className="flex flex-col w-full">
            {label && (
                <label
                    className="flex gap-x-[2px] text-sm font-medium mb-1 text-left"
                    htmlFor={props.id}
                >
                    {label} <span className="text-red-500">{required && "*"}</span>
                </label>
            )}

            <div className="flex items-center gap-2">
                <label
                    htmlFor={props.id}
                    className={`
                        flex items-center justify-between px-4 py-2 rounded-lg border
                        text-gray-700 text-[12px] cursor-pointer shadow-sm
                        hover:bg-gray-50 transition
                        focus-within:ring-1 focus-within:ring-gray-700 focus-within:border-gray-700
                        ${fileName ? "border-gray-700 bg-gray-50" : "border-gray-300"}
                        ${className}
                    `}
                >
                    <span className="truncate">
                        {!text ? (fileName ? fileName : "Sélectionner un fichier") : text}
                    </span>
                    <span className="ml-2 text-gray-500 text-xs">{fileName ? "Modifier" : ""}</span>

                    <input
                        key={inputKey}
                        type="file"
                        {...props}
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            setFileName(file ? file.name : null);
                            props.onChange?.(e);
                        }}
                    />
                </label>

                {fileName && (
                    <button
                        type="button"
                        onClick={clearFile}
                        className="px-3 py-1 text-xs rounded-lg border border-gray-300 text-gray-500 hover:text-red-600 hover:border-red-600 transition"
                    >
                        Supprimer
                    </button>
                )}
            </div>

            {error && <span className="text-left text-red-500 text-xs mt-1">{error}</span>}
        </div>
    );
}

function TextArea({ label, error, className = "", required = false, ...props }: Props) {
    return (
        <div className="flex flex-col w-full">
            {label && (
                <label
                    className="flex gap-x-[2px] text-sm font-medium mb-1 text-left"
                    htmlFor={props.id}
                >
                    {label} <span className="text-red-500">{required && "*"}</span>
                </label>
            )}
            <textarea
                {...props}
                className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-[12px] focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 shadow-sm resize-none ${className}`}
            />
            {error && <span className="text-left text-red-500 text-xs mt-1">{error}</span>}
        </div>
    );
}

const Input = Object.assign(BaseInput, { File: InputFile, TextArea: TextArea });

export default Input;
