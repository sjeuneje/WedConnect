import {Head, router} from "@inertiajs/react";
import Logo from "@/components/logo";
import StepInfo from "@/components/auth/step-info";
import UserRegisterLayout from "@/layouts/user-register";
import Input from "@/components/ui/input";
import PrimaryButton from "@/components/ui/buttons/primary";
import {useState} from "react";
import SuccessBanner from "@/components/ui/success-banner";

export default function Login({ flash, errors }) {
    const [email, setEmail] = useState<string>();

    const [password, setPassword] = useState<string>();

    const login = () => {
        const credentials = {
            email: email,
            password: password
        }

        router.post(route('login'), credentials);
    }

    return (
        <>
            <SuccessBanner message={flash?.success} />
            <Head title="Nouveau compte"></Head>
            <UserRegisterLayout>
                <Logo />
                <div className="mx-auto w-[200px] h-[1px] bg-gray-200 mt-2 shadow-lg"></div>
                <StepInfo
                    title="Connexion à votre compte"
                    description="Veuillez remplir les champs suivants afin de vous connecter."
                />
                <div className="flex flex-col gap-y-5 justify-center items-center mt-4">
                    <Input
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="johndoe@mail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        required
                    />
                    <Input
                        label="Mot de passe"
                        id="password"
                        type="password"
                        placeholder="*********"
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        required
                    />
                    <PrimaryButton className="w-full" onClick={login}>
                        Se connecter
                    </PrimaryButton>
                </div>
            </UserRegisterLayout>
        </>
    )
}
