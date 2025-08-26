type Props = {
    title: string,
    description: string
}

export default function StepInfo({ title, description }: Props) {
    return (
        <>
            <h1 className="mt-3 font-semibold text-md">{title}</h1>
            <p className="text-sm mt-3 max-w-[400px]">{description}</p>
        </>
    )
}
