import BaseButton from "@/components/ui/buttons/base";

export default function DangerButton(props) {
    const classes =
        "cursor-pointer border-2 border-red-400 text-red-400 bg-white text-[12px] px-4 py-2 rounded font-medium hover:bg-red-100 focus:bg-red-200 duration-500";
    return <BaseButton {...props} className={classes} />;
}
