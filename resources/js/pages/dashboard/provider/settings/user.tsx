import Input from "@/components/ui/input";
import PrimaryButton from "@/components/ui/buttons/primary";
import {router, useForm} from "@inertiajs/react";

type FormData = {
    phone_number?: string;
    password?: string;
    password_confirmation?: string;
};

export default function SettingsUserTabProvider({ user }) {
    const form = useForm<FormData>({
        phone_number: user.phone_number,
        password: '',
        password_confirmation: ''
    });

    const updateUser = () => {
        router.patch(route('dashboard.provider.settings.user'), form.data);
    }

    return (
        <>
            <div className="flex flex-col mt-4 pt-4 border-t border-t-gray-100 w-full gap-y-8">
                <div className="w-[400px]">
                    <h2 className="text-[13px] font-semibold mb-2">Numéro de téléphone</h2>
                    <p className="text-xs text-gray-500 max-w-[500px] mb-4">Modifiez votre numéro de téléphone, cette action peut mener à une nouvelle confirmation de celui-ci.</p>
                    <Input
                        id="phone_number"
                        type="tel"
                        placeholder={user?.phone_number ? '' : '+32 XXX XX XX XX'}
                        value={form.data.phone_number}
                        onChange={(e) => form.setData('phone_number' as keyof FormData, e.target.value)}
                        required
                    />
                </div>

                <div className="w-[400px]">
                    <h2 className="text-[13px] font-semibold mb-2">Mot de passe</h2>
                    <p className="text-xs text-gray-500 max-w-[500px] mb-4">Modifiez votre mot de passe, cette action peut mener à une nouvelle confirmation de celui-ci.</p>
                    <div className="flex flex-col gap-y-2">
                        <Input
                            id="password"
                            type="password"
                            placeholder="Mot de passe"
                            value={form.data.password}
                            onChange={(e) => form.setData('password' as keyof FormData, e.target.value)}
                            required
                        />
                        <Input
                            id="password_confirmation"
                            type="password"
                            placeholder="Confirmation du mot de passe"
                            value={form.data.password_confirmation}
                            onChange={(e) => form.setData('password_confirmation' as keyof FormData, e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="w-[400px] mt-8">
                <PrimaryButton onClick={updateUser}>
                    Sauvegarder les changements
                </PrimaryButton>
            </div>
        </>
    )
}
