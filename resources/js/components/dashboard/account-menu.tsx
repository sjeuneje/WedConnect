import { useState, useEffect, useRef } from "react";
import {ChevronDown, LogOut} from "lucide-react";
import {Link, router} from "@inertiajs/react";

export default function AccountMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <div
                className="cursor-pointer flex items-center gap-x-1 text-slate-700 font-semibold"
                onClick={() => setIsOpen(!isOpen)}
            >
                Mon compte
                <ChevronDown className="size-4" />
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden z-50">
                    <Link href="" className="text-left block px-4 py-2 hover:bg-gray-100">
                        Paramètres
                    </Link>
                    <Link
                        method="post"
                        href={route('logout')}
                        as="button"
                        className="cursor-pointer text-left block px-4 py-2 hover:bg-gray-100 w-full"
                    >
                        Se déconnecter
                    </Link>
                </div>
            )}
        </div>
    );
}
