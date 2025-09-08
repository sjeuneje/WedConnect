import React from "react";

export default function ShowService({
    service,
    billingUnits,
    deleteService
}) {
    const getBillingUnit = (billingUnit) => {
        return billingUnits.find(u => u.value === billingUnit);
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
            {/* Titre + description */}
            <div className="flex w-full justify-between align-top">
                <div>
                    <h3 className="text-[13px] font-semibold text-gray-900 mb-2">
                        {service.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-3 mb-4">
                        {service.description}
                    </p>
                </div>

                <div className="flex gap-x-2">
                    <div className="relative group w-fit h-fit">
                        <button
                            type="button"
                            className="w-fit h-fit text-slate-800 text-[12px] cursor-pointer hover:underline"
                            onClick={() => console.log(service)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[20px] font-medium">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </button>

                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            Modifier
                        </span>
                    </div>

                    <div className="relative group w-fit h-fit">
                        <button
                            type="button"
                            className="w-fit h-fit text-red-500 text-[12px] cursor-pointer hover:underline"
                            onClick={() => deleteService(service)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-[20px]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                            </svg>
                        </button>

                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            Supprimer
                        </span>
                    </div>
                </div>
            </div>

            {/* Tarifs */}
            {service.rates?.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-[13px] font-medium text-gray-800 mb-2">Tarifs</h4>
                    <div className="flex flex-wrap gap-2">
                        {service.rates.map((rate, idx) => {
                            const billingUnit = getBillingUnit(rate.billing_unit)
                            const label = rate.custom_label || billingUnit.label

                            return (
                                <span
                                    key={idx}
                                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                                >
                                                    {rate.amount}€ – {label}
                                                </span>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Options */}
            {service.options?.length > 0 && (
                <div className="mt-4">
                    <details className="group">
                        <summary className="cursor-pointer text-[13px] font-medium text-gray-800 mb-2">
                            Options disponibles
                        </summary>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {service.options.map((option, idx) => {
                                const billingUnit = getBillingUnit(option.rate.billing_unit)
                                const label =
                                    billingUnit.value !== 'custom'
                                        ? billingUnit.label
                                        : option.rate.custom_label

                                return (
                                    <div
                                        key={idx}
                                        className="border border-gray-100 rounded-xl p-3 bg-gray-50"
                                    >
                                        <h5 className="text-[12.5px] font-semibold text-gray-900 mb-1">
                                            {option.name}{' '}
                                            <span className="text-gray-500 text-xs font-normal">
                                                              ({option.rate.amount}€ – {label})
                                                            </span>
                                        </h5>
                                        <p className="text-xs text-gray-500 line-clamp-3">
                                            {option.description}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </details>
                </div>
            )}
        </div>
    )
}
