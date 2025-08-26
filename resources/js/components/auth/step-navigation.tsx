import SecondaryLinkButton from "@/components/ui/buttons/secondary";
import PrimaryLinkButton from "@/components/ui/buttons/primary";

type Props = {
    showSteps: boolean,
    totalSteps: number,
    currentStep: number,
    previousStepText: string,
    nextStepText: string,
}

export default function StepNavigation({
    showSteps,
    totalSteps,
    currentStep,
    previousStepText,
    nextStepText,
    actionAfterNextStep,
    actionAfterPreviousStep,
    showNextStepBtn = true
}: Props) {
    return (
        <div className="flex items-center justify-between gap-x-12">
            <SecondaryLinkButton onClick={actionAfterPreviousStep}>
                {previousStepText}
            </SecondaryLinkButton>
            {showSteps && <p className="text-gray-500 text-xs">Étape {currentStep} / {totalSteps}</p>}
            <PrimaryLinkButton onClick={actionAfterNextStep} className={showNextStepBtn ? "visible" : "invisible"}>
                {nextStepText}
            </PrimaryLinkButton>
        </div>
    )
}
