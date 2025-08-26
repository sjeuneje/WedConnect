import {Head, router} from "@inertiajs/react";
import Logo from "@/components/logo";
import StepInfo from "@/components/auth/step-info";
import UserRegisterLayout from "@/layouts/user-register";
import StepNavigation from "@/components/auth/step-navigation";
import Input from "@/components/ui/input";
import {useState} from "react";
import PrimaryButton from "@/components/ui/buttons/primary";

export default function RegisterUserCouple({
   totalSteps,
   currentStep,
   previousStepHref,
   errors
}) {
    const [email, setEmail] = useState<string>();

    const [password, setPassword] = useState<string>();

    const [passwordConfirm, setPasswordConfirm] = useState<string>();

    const createUser = () => {
        const params = Object.fromEntries(new URLSearchParams(window.location.search));

        const user = {
            email: email,
            password: password,
            password_confirmation: passwordConfirm,
            ...params
        }

        router.post(route('register'), user);
    }

    const goPrevious = () => {
        const params = new URLSearchParams(window.location.search);
        router.visit(route(previousStepHref, Object.fromEntries(params)));
    };

    return (
        <>
            <Head title="Nouveau compte"></Head>
            <UserRegisterLayout>
                <Logo />
                <div className="mx-auto w-[200px] h-[1px] bg-gray-200 mt-2 shadow-lg"></div>
                <StepInfo
                    title="Informations de connexion"
                    description="Veuillez remplir les informations ci-dessous afin de finaliser la création de votre compte."
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
                    <Input
                        label="Confirmation du mot de passe"
                        id="confirm_password"
                        type="password"
                        placeholder="*********"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        error={errors.password_confirm}
                        required
                    />
                    <PrimaryButton className="w-full" onClick={createUser}>
                        Créer le compte
                    </PrimaryButton>
                </div>
                <div className="flex justify-center items-center mt-8">
                    <StepNavigation
                        showSteps={true}
                        totalSteps={totalSteps}
                        previousStepText="Retour&nbsp;"
                        nextStepText="Suivant"
                        currentStep={currentStep}
                        actionAfterPreviousStep={goPrevious}
                        showNextStepBtn={false}
                    />
                </div>
            </UserRegisterLayout>
        </>
    )
}
