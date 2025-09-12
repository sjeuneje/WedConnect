import {Head, router, useForm} from "@inertiajs/react";
import React from "react";
import DashboardLayout from "@/layouts/dashboard";
import ShowService from "@/components/dashboard/services/show-service";
import PrimaryButton from "@/components/ui/buttons/primary";
import SecondaryButton from "@/components/ui/buttons/secondary";
import {SuccessBanner} from "@/components/ui/success-banner";
import DangerButton from "@/components/ui/buttons/danger";

export default function ActivityProvider({ user, currentRoute, billingUnits, flash }) {
    const provider = user?.provider;

    const isProfileComplete =
        provider?.logo &&
        provider?.description &&
        provider?.city &&
        provider?.zipcode &&
        user?.phone_number &&
        user?.contact_email &&
        provider?.services?.length > 0;

    const changePublishActivityState = () => {
        router.patch(route('dashboard.provider.activity.publish'), {
            isPublished: user?.provider?.published_at ? false : true
        });
    }

    return (
        <>
            <Head title="Mon activité" />
            <DashboardLayout currentRoute={currentRoute}>
                <SuccessBanner key={flash.success} message={flash.success} />

                <h1 className="text-[14px] font-semibold mb-2">Visualisez le profil de votre activité</h1>
                <p className="text-[12px] text-gray-500 max-w-[500px] mb-4">
                    Cette vue vous servira à visualiser comment les futurs mariés verront votre profil dans leur liste.
                    Vous pouvez également visualiser les informations que vous avez entrer de manière plus globale.
                </p>

                <div className="relative group w-fit h-fit">
                    {user?.provider?.published_at ?
                        <>
                            <DangerButton onClick={changePublishActivityState}>
                                Dépublier mon profil
                            </DangerButton>
                            <span className="absolute z-[9999] top-12 left-1/2 -translate-x-1/2 rounded-md bg-gray-800 px-3 py-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity w-full whitespace-normal break-words">
                                Lorsque vous dépubliez votre profil, il ne sera plus visible par tous les mariés parcourant la liste de prestataires publiés sur notre plateforme.
                            </span>
                        </>
                        :
                        <>
                            <PrimaryButton
                                disabled={!isProfileComplete}
                                onClick={changePublishActivityState}
                            >
                                Publier mon profil
                            </PrimaryButton>
                            <span className="absolute z-[9999] top-12 left-1/2 -translate-x-1/2 rounded-md bg-gray-800 px-3 py-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity w-full whitespace-normal break-words">
                                {isProfileComplete
                                    ? "Lorsque vous publiez votre profil, il sera visible par tous les mariés parcourant la liste de prestataires publiés sur notre plateforme."
                                    : "⚠️ Vous devez compléter toutes les informations (logo, description, contact et au moins un service) avant de pouvoir publier votre profil."
                                }
                            </span>
                        </>
                    }
                </div>

                <div className="flex flex-col py-4 mt-4 border-t border-b border-gray-100 w-full gap-y-8">
                    {(!provider?.logo || !provider?.description) && (
                        <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-[12px] text-yellow-700">
                            ⚠️ Complétez les informations de présentation de votre activité
                        </div>
                    )}
                    <div className="flex flex-col gap-y-4 w-full md:w-[800px]">
                        {provider?.logo && (
                            <img
                                src={`/storage/${provider.logo}`}
                                alt="logo du prestataire"
                                className="size-[100px] md:size-[150px] border rounded-xl"
                            />
                        )}
                        {provider?.company_name && (
                            <div className="flex flex-col justify-center gap-y-2">
                                <h2 className="text-[13px] font-semibold">{provider.company_name}</h2>
                                {provider?.description && (
                                    <p className="text-[12px] text-gray-500">{provider.description}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col pb-4 mt-4 border-b border-gray-100 w-full gap-y-2">
                    {(!provider?.city || !provider?.zipcode || !user?.phone_number || !user?.contact_email) && (
                        <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-[12px] text-yellow-700">
                            ⚠️ Complétez les informations de contact
                        </div>
                    )}
                    <h2 className="text-[13px] font-semibold">Informations de l'activité</h2>
                    {provider?.city && provider?.zipcode && (
                        <p className="flex items-center gap-x-1">
                            <span className="text-[13px]">Localisation:</span>
                            <span className="text-[12px] text-gray-500">{provider.city}, {provider.zipcode}</span>
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
                    {(!provider?.facebook_url && !provider?.instagram_url && !provider?.website_url) && (
                        <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-[12px] text-yellow-700">
                            ⚠️ Ajoutez vos réseaux sociaux pour plus de visibilité
                        </div>
                    )}
                    <h2 className="text-[13px] font-medium">Réseaux sociaux</h2>
                    <div className="flex flex-col gap-y-1">
                        {provider?.facebook_url && (
                            <a target="_blank" rel="noopener noreferrer" href={provider.facebook_url} className="flex items-center gap-x-1">
                                <span className="text-[13px]">Lien</span>
                                <span className="text-[12px] text-gray-500">Facebook</span>
                            </a>
                        )}
                        {provider?.instagram_url && (
                            <a target="_blank" rel="noopener noreferrer" href={provider.instagram_url} className="flex items-center gap-x-1">
                                <span className="text-[13px]">Lien</span>
                                <span className="text-[12px] text-gray-500">Instagram</span>
                            </a>
                        )}
                        {provider?.website_url && (
                            <a target="_blank" rel="noopener noreferrer" href={provider.website_url} className="flex items-center gap-x-1">
                                <span className="text-[13px]">Lien</span>
                                <span className="text-[12px] text-gray-500">Site web</span>
                            </a>
                        )}
                    </div>
                </div>

                <div className="flex flex-col mt-4 w-full gap-y-4">
                    {!provider?.services?.length && (
                        <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-[12px] text-yellow-700">
                            ⚠️ Ajoutez au moins un service pour apparaître dans les résultats
                        </div>
                    )}
                    <h2 className="text-[13px] font-semibold">Services disponibles</h2>
                    <div className="flex flex-col">
                        {provider?.services?.map((service) => (
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
