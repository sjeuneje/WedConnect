import {Head, router} from "@inertiajs/react";
import UserRegisterLayout from "@/layouts/user-register";
import Logo from "@/components/logo";
import StepInfo from "@/components/auth/step-info";
import {RoleMultiSelect} from "@/components/ui/multi-select";
import {useState} from "react";
import StepNavigation from "@/components/auth/step-navigation";

export default function RegisterRoles({
  roles,
  totalSteps,
  currentStep,
  nextStepHref,
  previousStepHref
}) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams);

    const [selectedRole, setSelectedRole] = useState<string>(
        roles.length > 0 ? (params.role ? params.role : roles[0].value) : ''
    );

    const saveData = () => {
        const params = Object.fromEntries(new URLSearchParams(window.location.search));
        params.role = selectedRole;
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
                    title="Souhaitez vous créer un compte Marié(e)s ou Prestataire ?"
                    description="Veuillez sélectionner quel type de compte vous souhaitez."
                />
                <div className="flex justify-center items-center mt-4">
                    <RoleMultiSelect
                        selected={selectedRole}
                        roles={roles}
                        onChange={setSelectedRole}
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
