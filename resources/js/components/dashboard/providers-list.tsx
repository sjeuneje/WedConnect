import {Service} from "@/types/service";
import React from "react";

export default function ProvidersList({ providers }) {
    return (
        <div className="flex flex-col py-8 mt-4 border-t border-gray-100 w-full gap-y-8">
            {providers.map((provider, key) => {
                const providerInfos = provider.provider ?? provider;
                const services = providerInfos?.services;
                const colors = [
                    "bg-blue-100 text-blue-800",
                    "bg-green-100 text-green-800",
                    "bg-yellow-100 text-yellow-800",
                ];

                return (
                    <a
                        href={route('dashboard.listing-providers.show', provider.id)}
                        key={key}
                        className="flex flex-col w-full md:w-[300px] xl:w-[650px] rounded-xl border border-gray-200 h-[300px] xl:h-[200px] shadow-md hover:shadow-xl duration-300"
                    >
                        <div className="relative w-full h-[75px] rounded-t-xl border-b border-b-gray-100 bg-slate-700">
                            <img
                                src={`/storage/${providerInfos.logo}`}
                                className="shadow absolute left-4 xl:left-8 top-14 size-[100px] md:size-[100px] border-[1px] border-gray-100 rounded-xl"
                            />
                            <h2 className="absolute left-32 xl:left-36 top-[5.5rem] text-[13px] font-semibold">{providerInfos.company_name}</h2>
                            <p className="absolute left-32 xl:left-36 top-[6.7rem] text-[12px] text-gray-500">{providerInfos.city}, {providerInfos.zipcode}</p>
                            <div className="flex justify-start xl:justify-end flex-wrap items-start xl:items-end absolute xl:right-8 top-44 xl:top-28 max-w-[300px] xl:w-[300px] h-[60px] gap-x-1 gap-y-2 px-4 xl:px-0">
                                {services?.slice(0, 3).map((service: Service, index) => (
                                    <div
                                        key={service.id ?? index}
                                        className={`rounded-lg px-4 py-1 text-[11px] max-w-[150px] truncate ${
                                            colors[index % colors.length]
                                        }`}
                                    >
                                        {service.name}
                                    </div>
                                ))}

                                {services && services.length > 3 && (
                                    <div className="bg-gray-100 rounded-lg px-4 py-1 text-[11px] w-fit h-fit">
                                        +{services.length - 3} autre{services.length - 3 > 1 ? "s" : ""} service
                                        {services.length - 3 > 1 ? "s" : ""}
                                    </div>
                                )}
                            </div>
                        </div>
                    </a>
                )
            })}
        </div>
    )
}
