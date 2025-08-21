import MultiSelect from "@/components/ui/multi-select";
import Logo from "@/components/logo";
import {Head} from "@inertiajs/react";
import StepInfo from "@/components/register/step-info";
import UserRegisterLayout from "@/layouts/user-register";
import {useState} from "react";
import StepNavigation from "@/components/register/step-navigation";

type Props = {
    countries: object[],
    totalSteps: number,
    currentStep: number,
    nextStepHref: string,
    previousStepHref: string
}

export default function RegisterCountry({
    countries,
    totalSteps,
    currentStep,
    nextStepHref,
    previousStepHref
}: Props) {
    const [selectedCountries, setSelectedCountries] = useState<string[]>(
        countries.length > 0 ? [countries[0].value] : []
    );

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
                    <MultiSelect
                        countries={countries}
                        selected={selectedCountries}
                        onChange={setSelectedCountries}
                    />
                </div>
                <div className="flex justify-center items-center mt-8">
                    <StepNavigation
                        showSteps={true}
                        totalSteps={totalSteps}
                        previousStepText="Retour&nbsp;"
                        previousStepHref={route(previousStepHref)}
                        nextStepText="Suivant"
                        nextStepHref={route(nextStepHref)}
                        currentStep={currentStep}
                    />
                </div>
            </UserRegisterLayout>
        </>
    )
}
