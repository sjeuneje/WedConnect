import { Head } from "@inertiajs/react";
import React from "react";
import DashboardLayout from "@/layouts/dashboard";
import ShowService from "@/components/dashboard/services/show-service";

export default function ActivityProvider({ user, currentRoute, billingUnits }) {
    return (
        <>
            <Head title="Mon activité" />
            <DashboardLayout currentRoute={currentRoute}>
                <h1 className="text-[14px] font-semibold mb-2">Visualisez le profil de votre activité</h1>
                <p className="text-[12px] text-gray-500 max-w-[500px] mb-4">
                    Cette vue vous servira à visualiser comment les futurs mariés verront votre profil dans leur liste.
                    Vous pouvez également visualiser les informations que vous avez entrer de manière plus globale.
                </p>

                <div className="flex flex-col py-4 mt-4 border-t border-b border-gray-100 w-full gap-y-8">
                    {(!user?.provider?.logo || !user?.provider?.description) && (
                        <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-[12px] text-yellow-700">
                            ⚠️ Complétez les informations de présentation de votre activité
                        </div>
                    )}

                    <div className="flex flex-col gap-y-4 w-full md:w-[800px]">
                        {user?.provider?.logo && (
                            <img
                                src={`/storage/${user?.provider?.logo}`}
                                alt="logo du prestataire"
                                className="size-[100px] md:size-[150px] border rounded-xl"
                            />
                        )}
                        {user?.provider?.company_name && (
                            <div className="flex flex-col justify-center gap-y-2">
                                <h2 className="text-[13px] font-semibold">{user?.provider?.company_name}</h2>
                                {user?.provider?.description && (
                                    <p className="text-[12px] text-gray-500">{user?.provider?.description}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col pb-4 mt-4 border-b border-gray-100 w-full gap-y-2">
                    {(!user?.provider?.city || !user?.provider?.zipcode || !user?.phone_number || !user?.contact_email) && (
                        <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-[12px] text-yellow-700">
                            ⚠️ Complétez les informations de contact
                        </div>
                    )}

                    <h2 className="text-[13px] font-semibold">Informations de l'activité</h2>
                    {user?.provider?.city && user?.provider?.zipcode && (
                        <p className="flex items-center gap-x-1">
                            <span className="text-[13px]">Localisation:</span>
                            <span className="text-[12px] text-gray-500">{user.provider.city}, {user.provider.zipcode}</span>
                        </p>
                    )}
                    {user?.phone_number && (
                        <p className="flex items-center gap-x-1">
                            <span className="text-[13px]">Numéro de téléphone:</span>
                            <span className="text-[12px] text-gray-500">{user.phone_number}</span>
                        </p>
                    )}
                    {user?.contact_email && (
                        <p className="flex items-center gap-x-1">
                            <span className="text-[13px]">Email de contact:</span>
                            <span className="text-[12px] text-gray-500">{user.contact_email}</span>
                        </p>
                    )}
                </div>

                <div className="flex flex-col pb-4 mt-4 border-b border-gray-100 w-full gap-y-2">
                    {(!user?.provider?.facebook_url && !user?.provider?.instagram_url && !user?.provider?.website_url) && (
                        <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-[12px] text-yellow-700">
                            ⚠️ Ajoutez vos réseaux sociaux pour plus de visibilité
                        </div>
                    )}

                    <h2 className="text-[13px] font-medium">Réseaux sociaux</h2>
                    <div className="flex flex-col gap-y-1">
                        {user?.provider?.facebook_url && (
                            <a target="_blank" rel="noopener noreferrer" href={user.provider.facebook_url} className="flex items-center gap-x-1">
                                <span className="text-[13px]">Lien</span>
                                <span className="text-[12px] text-gray-500">Facebook</span>
                            </a>
                        )}
                        {user?.provider?.instagram_url && (
                            <a target="_blank" rel="noopener noreferrer" href={user.provider.instagram_url} className="flex items-center gap-x-1">
                                <span className="text-[13px]">Lien</span>
                                <span className="text-[12px] text-gray-500">Instagram</span>
                            </a>
                        )}
                        {user?.provider?.website_url && (
                            <a target="_blank" rel="noopener noreferrer" href={user.provider.website_url} className="flex items-center gap-x-1">
                                <span className="text-[13px]">Lien</span>
                                <span className="text-[12px] text-gray-500">Site web</span>
                            </a>
                        )}
                    </div>
                </div>

                <div className="flex flex-col mt-4 w-full gap-y-4">
                    {!user?.provider?.services?.length && (
                        <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-[12px] text-yellow-700">
                            ⚠️ Ajoutez au moins un service pour apparaître dans les résultats
                        </div>
                    )}
                    <h2 className="text-[13px] font-semibold">Services disponibles</h2>
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
            </DashboardLayout>
        </>
    )
}
