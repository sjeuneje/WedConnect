import BaseButton from "@/components/ui/buttons/base";

export default function SecondaryButton(props) {
    const classes =
        "cursor-pointer border-2 border-slate-700 text-slate-700 bg-white text-sm md:text-md px-4 py-2 rounded font-medium hover:bg-slate-100 focus:bg-slate-200 duration-500";
    return <BaseButton {...props} className={classes} />;
}
