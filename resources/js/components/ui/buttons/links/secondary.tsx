import {Link} from "@inertiajs/react";

export default function SecondaryLinkButton({ text, href }) {
    return (
        <Link
            href={href}
            className="border-2 border-slate-700 text-slate-700 text-sm md:text-md px-4 py-2 md:px-4 md:py-2 rounded font-medium duration-500 hover:text-white hover:bg-slate-700"
        >
            {text}
        </Link>
    )
}
