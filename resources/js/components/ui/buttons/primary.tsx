import BaseButton from "@/components/ui/buttons/base";

export default function PrimaryButton(props) {
    const classes =
        "cursor-pointer border-2 border-transparent text-center bg-slate-700 text-white text-sm md:text-md px-4 py-2 rounded font-medium hover:bg-slate-500 focus:bg-slate-500 duration-500 " + props?.className;
    return <BaseButton {...props} className={classes} />;
}
