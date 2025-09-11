import {Head} from "@inertiajs/react";
import React from "react";
import DashboardLayout from "@/layouts/dashboard";

export default function ActivityProvider({ user, currentRoute }) {
    console.log(user);

    return (
        <>
            <Head title="Mon activité" />
            <DashboardLayout currentRoute={currentRoute}>
                <h1 className="text-[14px] font-semibold mb-2">Gérez vos services et tarifs proposés aux mariés</h1>
                <p className="text-[12px] text-gray-500 max-w-[500px] mb-4">Ajoutez, modifiez ou supprimez vos services, définissez vos tarifs principaux et options, et téléchargez des photos pour mieux présenter votre activité.</p>

                <div className="flex flex-col py-4 mt-4 border-t border-b border-gray-100 w-full gap-y-8">
                    <div className="flex gap-x-4 w-full md:w-[800px]">
                        <img
                            src={`/storage/${user?.provider?.logo}`}
                            alt="logo du prestataire"
                            className="size-[150px] border"
                        />
                        <div className="flex flex-col mt-4 gap-y-2">
                            <h2 className="text-[13px] font-medium">{user?.provider?.company_name}</h2>
                            <p className="text-[12px] text-gray-500">{user?.provider?.description}</p>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}
