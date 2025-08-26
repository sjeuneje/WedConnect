import { Link } from "@inertiajs/react";
import { MouseEventHandler, ReactNode } from "react";

// type Props = {
//     children: ReactNode;
//     href?: string;
//     onClick?: MouseEventHandler<HTMLButtonElement>;
//     type?: "button" | "submit" | "reset";
//     className: string;
// };

export default function BaseButton({
   children,
   href,
   onClick,
   type = "button",
   className,
}) {
    if (href) {
        return (
            <Link href={href} className={className}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={className}>
            {children}
        </button>
    );
}
