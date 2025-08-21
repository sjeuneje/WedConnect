import { Head } from "@inertiajs/react";
import PrimaryLinkButton from "@/components/ui/buttons/links/primary";
import SecondaryLinkButton from "@/components/ui/buttons/links/secondary";

export default function Welcome() {
    return (
        <>
            <Head title="Bienvenue"></Head>
            <div className="flex min-h-screen flex-col text-center items-center justify-center text-[#1b1b18] gap-y-2 md:gap-y-3 opacity-100 transition-opacity duration-750 grow starting:opacity-0">
                <h1 className="font-bold text-2xl md:text-5xl">Bienvenue sur WedConnect</h1>
                <p className="text-sm md:text-xl">Plateforme de mise en relation entre futurs mariés et prestataires.</p>
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-1">
                    <PrimaryLinkButton
                        text="Nouveau compte"
                        href={route('register.country')}
                    />
                    <SecondaryLinkButton
                        text="J'ai un compte"
                        href="/"
                    />
                </div>
            </div>
        </>
    );
}
