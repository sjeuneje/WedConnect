import Input from "@/components/ui/input";
import PrimaryButton from "@/components/ui/buttons/primary";
import {useState} from "react";
import {useForm} from "@inertiajs/react";

type FormData = {
  company_name: string | null;
  logo: File | null;
  city: string | null;
  zipcode: string | null;
  description: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  website_url: string | null;
};

export default function SettingsActivityTabProvider({ user }) {
    const form = useForm<FormData>({
        company_name: user?.provider?.company_name,
        logo: user?.provider?.logo,
        city: user?.provider?.city,
        zipcode: user?.provider?.zipcode,
        description: user?.provider?.description,
        facebook_url: user?.provider?.facebook_url,
        instagram_url: user?.provider?.instagram_url,
        website_url: user?.provider?.website_url
    });

    const updateActivity = () => {
        console.log(form.data);
    }

    return (
        <>
            <div className="flex flex-col mt-4 pt-4 border-t border-t-gray-100 w-full gap-y-8">
                <div className="flex flex-col gap-y-6">
                    <div className="flex gap-x-12 items-start">
                        <div className="w-[400px] flex flex-col">
                            <h2 className="text-[13px] font-semibold mb-2">Nom de votre activité</h2>
                            <p className="text-xs text-gray-500 mb-4">Modifiez le nom de votre activité, les changements seront visibles directement sur le profil de votre activité.</p>
                            <Input
                                id="company_name"
                                type="text"
                                value={form.data.company_name ?? ''}
                                onChange={(e) => form.setData('company_name' as keyof FormData, e.target.value)}
                            />
                        </div>
                        <div className="w-[400px] flex flex-col">
                            <h2 className="text-[13px] font-semibold mb-2">Logo <span className="text-slate-700 text-xs cursor-pointer">(voir le logo)</span></h2>
                            <p className="text-xs text-gray-500 mb-4">Modifiez votre logo, qui représente votre activité. Envoyez un fichier de bonne qualité (512×512 px recommandé).</p>
                            <Input.File
                                id="logo"
                                type="file"
                                // value={form.data.logo ?? ''}
                                onChange={(e) => form.setData('logo', e.target.files[0])}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="flex gap-x-12 items-start">
                        <div className="w-[400px] flex flex-col">
                            <h2 className="text-[13px] font-semibold mb-2">Votre ville</h2>
                            <p className="text-xs text-gray-500 mb-4">Modifiez la ville dans laquelle votre activité se base. Les informations que vous communiquez serviront à vous trouver sur notre plateforme.</p>
                            <Input
                                id="city"
                                type="text"
                                value={form.data.city ?? ''}
                                onChange={(e) => form.setData('city' as keyof FormData, e.target.value)}
                                placeholder={user?.provider?.city ? '' : 'Liège'}
                            />
                        </div>
                        <div className="w-[400px] flex flex-col">
                            <h2 className="text-[13px] font-semibold mb-2">Code postal</h2>
                            <p className="text-xs text-gray-500 mb-4">Modifiez le code postal de votre ville. Les informations que vous communiquez serviront à vous trouver sur notre plateforme.</p>
                            <Input
                                id="zipcode"
                                type="number"
                                value={form.data.zipcode ?? ''}
                                onChange={(e) => form.setData('zipcode' as keyof FormData, String(e.target.value))}
                                placeholder={user?.provider?.zipcode ? '' : '4000'}
                            />
                        </div>
                    </div>

                    <div className="flex gap-x-12 items-start">
                        <div className="w-full max-w-[850px] flex flex-col">
                            <h2 className="text-[13px] font-semibold mb-2">Description de votre activité</h2>
                            <p className="text-xs text-gray-500 mb-4">Décrivez votre activité le plus précisément possible.</p>
                            <Input.TextArea
                                id="description"
                                value={form.data.description ?? ''}
                                onChange={(e) => form.setData('description' as keyof FormData, e.target.value)}
                                className="h-[100px]"
                                placeholder="Nous proposons des services de qualité adaptés aux besoins de nos clients, avec un engagement sur la satisfaction et le professionnalisme. Découvrez notre expertise et notre savoir-faire pour répondre à vos attentes."
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-4 pt-4 border-t border-t-gray-100 w-full gap-y-8">
                <div className="flex flex-col gap-y-6">
                    <div className="flex gap-x-12 items-start">
                        <div className="w-[400px] flex flex-col">
                            <h2 className="text-[13px] font-semibold mb-2">Lien Facebook</h2>
                            <p className="text-xs text-gray-500 mb-4">Ajoutez le lien de votre page Facebook pour que vos clients puissent vous suivre et rester informés de vos actualités.</p>
                            <Input
                                id="facebook_url"
                                type="text"
                                value={form.data.facebook_url ?? ''}
                                onChange={(e) => form.setData('facebook_url' as keyof FormData, e.target.value)}
                                placeholder={user?.provider?.facebook_url ? '' : 'https://www.facebook.com/profile.php?id=61556683446474'}
                            />
                        </div>
                        <div className="w-[400px] flex flex-col">
                            <h2 className="text-[13px] font-semibold mb-2">Lien Instagram</h2>
                            <p className="text-xs text-gray-500 mb-4">Partagez le lien de votre profil Instagram pour mettre en avant vos publications et votre univers visuel.</p>
                            <Input
                                id="instagram_url"
                                type="text"
                                value={form.data.instagram_url ?? ''}
                                onChange={(e) => form.setData('instagram_url' as keyof FormData, e.target.value)}
                                placeholder={user?.provider?.instagram_url ? '' : 'https://www.instagram.com/bintary_be/'}
                            />
                        </div>
                    </div>
                    <div className="flex gap-x-12 items-start">
                        <div className="w-[400px] flex flex-col">
                            <h2 className="text-[13px] font-semibold mb-2">Lien de votre site web</h2>
                            <p className="text-xs text-gray-500 mb-4">Indiquez l’URL de votre site web pour que vos clients accèdent directement à vos services et informations en ligne.</p>
                            <Input
                                id="website_url"
                                type="text"
                                value={form.data.website_url ?? ''}
                                onChange={(e) => form.setData('website_url' as keyof FormData, e.target.value)}
                                placeholder={user?.provider?.website_url ? '' : 'https://bintary.be/'}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[400px] mt-8">
                <PrimaryButton onClick={updateActivity}>
                    Sauvegarder les changements
                </PrimaryButton>
            </div>
        </>
    )
}
