import {CountryMultiSelect} from "@/components/ui/multi-select";
import Logo from "@/components/logo";
import {Head, router} from "@inertiajs/react";
import StepInfo from "@/components/auth/step-info";
import UserRegisterLayout from "@/layouts/user-register";
import {useState} from "react";
import StepNavigation from "@/components/auth/step-navigation";

type Country = {
    id: number;
    label: string;
    value: string;
    created_at?: string;
    updated_at?: string;
};

type Props = {
    countries: Country[],
    totalSteps: number,
    currentStep: number,
    nextStepHref: string,
    previousStepHref: string
};

export default function RegisterCountry({
    countries,
    totalSteps,
    currentStep,
    nextStepHref,
    previousStepHref
}: Props) {
    const [selectedCountry, setSelectedCountry] = useState<string>(
        countries.length > 0 ? countries[0].value : ''
    );

    const saveData = () => {
        const params = Object.fromEntries(new URLSearchParams(window.location.search));
        params.country = selectedCountry;
        router.visit(route(nextStepHref, params));
    };

    const goPrevious = () => {
        router.visit(route(previousStepHref));
    }

    return (
        <>
            <Head title="Nouveau compte"></Head>
            <UserRegisterLayout>
                <Logo />
                <div className="mx-auto w-[200px] h-[1px] bg-gray-200 mt-2 shadow-lg"></div>
                <StepInfo
                    title="D'où venez-vous ?"
                    description="Veuillez sélectionner dans quel pays vous résidez actuellement."
                />
                <div className="flex justify-center items-center mt-4">
                    <CountryMultiSelect
                        countries={countries}
                        selected={selectedCountry}
                        onChange={setSelectedCountry}
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
