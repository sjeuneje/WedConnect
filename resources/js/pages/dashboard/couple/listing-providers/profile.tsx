import {Head, Link} from "@inertiajs/react";
import React from "react";
import CoupleDashboardLayout from "@/layouts/couple-dashboard";
import ShowService from "@/components/dashboard/services/show-service";
import PrimaryButton from "@/components/ui/buttons/primary";
import {ArrowLeft} from "lucide-react";

export default function ProviderProfile({ user, billingUnits }) {
    console.log(user);
    return (
        <>
            <Head title="Liste des prestataires" />
            <CoupleDashboardLayout currentRoute={'dashboard.listing-providers.index'} parametersHref={route('dashboard.couple.settings')}>
                <Link
                    className="flex items-center gap-x-1 text-[13px] text-gray-500 hover:underline duration-300"
                    href={route('dashboard.listing-providers.index')}
                >
                    <ArrowLeft className="size-4" />
                    Retour
                </Link>

                <div className="max-w-4xl">
                    <div className="flex flex-col py-4 border-b border-gray-100 w-full gap-y-8">
                        <div className="flex flex-col gap-y-4 w-full">
                            {user?.provider?.logo && (
                                <img
                                    src={`/storage/${user?.provider?.logo}`}
                                    alt="logo du prestataire"
                                    className="size-[120px] md:size-[150px] border rounded-xl object-cover"
                                />
                            )}
                            {user?.provider?.company_name && (
                                <div className="flex flex-col justify-center gap-y-2">
                                    <h1 className="text-[13px] font-semibold">{user?.provider?.company_name}</h1>
                                    {user?.provider?.description && (
                                        <p className="text-[12px] text-gray-600 leading-relaxed">
                                            {user?.provider?.description}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col pb-4 mt-6 border-b border-gray-100 w-full gap-y-2">
                        <h2 className="text-[13px] font-semibold">Informations de contact</h2>
                        {user?.provider?.city && user?.provider?.zipcode && (
                            <p className="flex items-center gap-x-1 text-[12px] text-gray-700">
                                📍 {user?.provider?.city}, {user?.provider?.zipcode}
                            </p>
                        )}
                        {user?.phone_number && (
                            <p className="flex items-center gap-x-1 text-[12px] text-gray-700">
                                📞 {user.phone_number}
                            </p>
                        )}
                        {user?.contact_email && (
                            <p className="flex items-center gap-x-1 text-[12px] text-gray-700">
                                ✉️ {user.contact_email}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col pb-4 mt-6 border-b border-gray-100 w-full gap-y-2">
                        <h2 className="text-[13px] font-semibold">Réseaux sociaux</h2>
                        <div className="flex flex-col gap-y-1">
                            {user?.provider?.facebook_url && (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={user?.provider?.facebook_url}
                                    className="text-[12px] text-blue-600 hover:underline w-fit"
                                >
                                    Facebook
                                </a>
                            )}
                            {user?.provider?.instagram_url && (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={user?.provider?.instagram_url}
                                    className="text-[12px] text-pink-800 hover:underline w-fit"
                                >
                                    Instagram
                                </a>
                            )}
                            {user?.provider?.website_url && (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={user?.provider?.website_url}
                                    className="text-[12px] text-gray-800 hover:underline w-fit"
                                >
                                    Site web
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col mt-6 w-full gap-y-4">
                        <h2 className="text-[13px] font-semibold">Services proposés</h2>
                        <div className="flex flex-col">
                            {user?.provider?.services?.map((service) => (
                                <ShowService
                                    key={service.id}
                                    service={service}
                                    billingUnits={billingUnits}
                                    showActionButtons={false}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </CoupleDashboardLayout>
        </>
    )
}
