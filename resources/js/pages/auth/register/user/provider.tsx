import {Head, router} from "@inertiajs/react";
import Logo from "@/components/logo";
import StepInfo from "@/components/auth/step-info";
import UserRegisterLayout from "@/layouts/user-register";
import StepNavigation from "@/components/auth/step-navigation";
import Input from "@/components/ui/input";
import {useState} from "react";

export default function RegisterUserProvider({
   totalSteps,
   currentStep,
   nextStepHref,
   previousStepHref,
   errors
}) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams);

    const [companyName, setCompanyName] = useState<string>(
        params?.company_name ? params.company_name : ''
    );
    const [phoneNumber, setPhoneNumber] = useState<string>(
        params?.phone_number ? params.phone_number : ''
    );

    const saveData = () => {
        const params = Object.fromEntries(new URLSearchParams(window.location.search));
        params.company_name = companyName;
        params.phone_number = phoneNumber;
        router.visit(route(nextStepHref, params));
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
                    title="Informations sur votre activité"
                    description="Veuillez remplir les informations ci-dessous afin de continuer la création de votre compte."
                />
                <div className="flex flex-col gap-y-5 justify-center items-center mt-4">
                    <Input
                        label="Nom de votre activité"
                        type="text"
                        placeholder="Bertrand Fleuriste"
                        onChange={(e) => setCompanyName(e.target.value)}
                        defaultValue={companyName}
                        error={errors?.company_name}
                        required
                    />
                    <Input
                        label="Numéro de téléphone"
                        type="tel"
                        placeholder="+32 123 45 67 89"
                        pattern="\+?\d{8,15}"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        defaultValue={phoneNumber}
                        error={errors?.phone_number}
                        required
                    />
                </div>
                <div className="flex justify-center items-center mt-8">
                    <StepNavigation
                        showSteps={true}
                        totalSteps={totalSteps}
                        previousStepText="Retour&nbsp;"
                        nextStepText="Suivant"
                        currentStep={currentStep}
                        actionAfterNextStep={saveData}
                        actionAfterPreviousStep={goPrevious}
                    />
                </div>
            </UserRegisterLayout>
        </>
    )
}
