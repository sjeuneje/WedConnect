import Input from "@/components/ui/input";
import {router, useForm} from "@inertiajs/react";
import PrimaryButton from "@/components/ui/buttons/primary";

type FormData = {
    name: string;
}

export default function WeddingInfosTab({ user, errors }) {
    const form = useForm<FormData>({
        name: user?.couple?.name ?? ''
    });

    const updateCouple = () => {
        form.patch(route('dashboard.couple.wedding.update'));
    }

    return (
        <>
            <div className="flex flex-col mt-4 pt-4 border-t border-t-gray-100 w-full gap-y-8">
                <div className="w-full md:w-[400px]">
                    <h2 className="text-[13px] font-semibold mb-2">Nom de votre couple</h2>
                    <p className="text-xs text-gray-500 max-w-[500px] mb-4">Si vous le souhaitez, vous pouvez modifier, personnaliser le nom de votre couple sur l'application.</p>
                    <Input
                        id="name"
                        type="email"
                        placeholder={user?.couple?.name ? '' : 'X & X'}
                        value={form.data.name}
                        onChange={(e) => form.setData('name' as keyof FormData, e.target.value)}
                        error={errors?.name ? errors.name : ''}
                        required
                    />
                </div>
            </div>

            <div className="w-full md:w-[400px] mt-8">
                <PrimaryButton onClick={updateCouple}>
                    Sauvegarder les changements
                </PrimaryButton>
            </div>
        </>
    )
}
