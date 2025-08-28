import { Head } from "@inertiajs/react";
import PrimaryLinkButton from "@/components/ui/buttons/primary";
import SecondaryLinkButton from "@/components/ui/buttons/secondary";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Bienvenue"></Head>
            <div className="flex min-h-screen flex-col text-center items-center justify-center text-[#1b1b18] gap-y-2 md:gap-y-3 opacity-100 transition-opacity duration-750 grow starting:opacity-0 px-1 md:px-0">
                <h1 className="font-bold text-2xl md:text-5xl">Bienvenue sur WedConnect</h1>
                <p className="text-sm md:text-xl">Plateforme de mise en relation entre futurs mariés et prestataires.</p>
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-1">
                    {!auth?.user ?
                        <>
                            <PrimaryLinkButton href={route('register.country')}>
                                Nouveau compte
                            </PrimaryLinkButton>
                            <SecondaryLinkButton href={route('login.create')}>
                                J'ai un compte
                            </SecondaryLinkButton>
                        </>
                        :
                        <>
                            <PrimaryLinkButton href={route(auth.user.role === 'provider' ? 'dashboard.provider' : 'dashboard.couple')}>
                                Vers mon tableau de bord
                            </PrimaryLinkButton>
                        </>
                    }
                </div>
            </div>
        </>
    );
}
