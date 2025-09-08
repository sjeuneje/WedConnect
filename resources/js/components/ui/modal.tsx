import { ReactNode } from 'react'
import PrimaryButton from "@/components/ui/buttons/primary";
import SecondaryButton from "@/components/ui/buttons/secondary";

type ModalProps = {
    isOpen: boolean
    title: string
    children: ReactNode
    onConfirm: () => void
    onCancel: () => void
}

export default function Modal({ isOpen, title, children, onConfirm, onCancel }: ModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onCancel}
            ></div>

            <div className="relative bg-white rounded-xl shadow-lg max-w-lg w-full z-10 p-6">
                <div className="flex items-start justify-between mb-4">
                    <h2 className="text-[14px] font-semibold text-gray-900">{title}</h2>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600 cursor-pointer"
                        onClick={onCancel}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="text-[13px] mb-6">{children}</div>

                <div className="flex justify-end gap-3">
                    <SecondaryButton onClick={onCancel}>
                        Annuler
                    </SecondaryButton>
                    <PrimaryButton onClick={onConfirm}>
                        Confirmer
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
}
