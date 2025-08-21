import SecondaryLinkButton from "@/components/ui/buttons/links/secondary";
import PrimaryLinkButton from "@/components/ui/buttons/links/primary";

type Props = {
    showSteps: boolean,
    totalSteps: number,
    currentStep: number,
    previousStepText: string,
    previousStepHref: string,
    nextStepText: string,
    nextStepHref: string
}

export default function StepNavigation({
   showSteps,
   totalSteps,
   currentStep,
   previousStepText,
   previousStepHref,
   nextStepText,
   nextStepHref
}: Props) {
    return (
        <div className="flex items-center justify-between gap-x-12">
            <SecondaryLinkButton
                text={previousStepText}
                href={previousStepHref}
            />
            {showSteps && <p className="text-gray-500 text-xs">Étape {currentStep} / {totalSteps}</p>}
            <PrimaryLinkButton
                text={nextStepText}
                href={nextStepHref}
            />
        </div>
    )
}
