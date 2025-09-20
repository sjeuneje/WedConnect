import {Head, Link, router} from "@inertiajs/react";
import React from "react";
import CoupleDashboardLayout from "@/layouts/couple-dashboard";
import ShowService from "@/components/dashboard/services/show-service";
import {ArrowLeft, Heart} from "lucide-react";
import {SuccessBanner} from "@/components/ui/success-banner";

export default function ProviderProfile({ user, billingUnits, flash }) {
    const bookmark = (providerId) => {
        router.post(route('dashboard.couple.providers.favorite'), {
            provider_id: providerId
        });
    }

    const removeBookmark = (providerId) => {
        router.delete(route('dashboard.couple.providers.favorite'), {
            data: {
                provider_id: providerId
            }
        });
    }

    return (
        <>
            <Head title="Liste des prestataires" />
            <CoupleDashboardLayout currentRoute={'dashboard.listing-providers.index'} parametersHref={route('dashboard.couple.settings')}>
                {flash?.success && (
                    <SuccessBanner key={flash.success} message={flash.success} />
                )}

                <Link
                    className="flex items-center gap-x-1 text-[13px] text-gray-500 hover:underline duration-300"
                    onClick={() => {
                        history.back();
                    }}
                >
                    <ArrowLeft className="size-4" />
                    Retour
                </Link>

                <div>
                    <div className="flex flex-col py-4 border-b border-gray-100 w-full gap-y-8">
                        <div className="flex flex-col gap-y-4 w-full">
                            <div className="w-fit">
                                <img
                                    src={`/storage/${user?.provider?.logo}`}
                                    alt="logo du prestataire"
                                    className="size-[120px] md:size-[150px] border rounded-xl object-cover"
                                />
                            </div>

                            {user?.provider?.is_favorite_tagged ?
                                <div
                                    className="flex gap-x-2"
                                    onClick={() => removeBookmark(user?.provider?.id)}
                                >
                                    <div className="relative cursor-pointer group w-fit h-fit">
                                        <button
                                            className="cursor-pointer flex justify-center items-center rounded-full border border-slate-700 bg-slate-700 hover:bg-white/80 size-8"
                                            aria-label="Enlever des favoris"
                                        >
                                            <Heart className="size-5 text-white group-hover:text-slate-700 duration-500" />
                                        </button>

                                        <span className="absolute -top-7 -right-20 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                            Enlever des favoris
                                        </span>
                                    </div>
                                </div>
                                :
                                <div
                                    className="flex gap-x-2"
                                    onClick={() => bookmark(user?.provider?.id)}
                                >
                                    <div className="relative cursor-pointer group w-fit h-fit">
                                        <button
                                            className="cursor-pointer flex justify-center items-center rounded-full border border-slate-700 bg-white/80 hover:bg-slate-700 size-8"
                                            aria-label="Ajouter aux favoris"
                                        >
                                            <Heart className="size-5 text-slate-700 group-hover:text-white duration-500" />
                                        </button>

                                        <span className="absolute -top-7 -right-20 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        Mettre en favoris
                                    </span>
                                    </div>
                                </div>
                            }

                            {user?.provider?.company_name && (
                                <div className="flex flex-col justify-center gap-y-2 max-w-4xl">
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

                    <div className="flex flex-col mt-6 w-full gap-y-4 max-w-4xl">
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
