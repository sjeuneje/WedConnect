import React, { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
};

export default function Input({ label, error, className = "", required = false, ...props }: Props) {
    return (
        <div className="flex flex-col w-full">
            {label && (
                <label className="flex gap-x-[2px] text-sm font-medium mb-1 text-left" htmlFor={props.id}>
                    {label} <span className="text-red-500">{required && "*"}</span>
                </label>
            )}
            <input
                {...props}
                className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 shadow-sm ${className}`}
            />
            {error && <span className="text-left text-red-500 text-xs mt-1">{error}</span>}
        </div>
    );
}
