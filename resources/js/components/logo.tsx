import {Link} from "@inertiajs/react";

export default function Logo() {
    return (
        <Link href="/" className="flex justify-center items-center gap-x-1">
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000" strokeWidth="1.5"><rect x="16" y="3" width="5" height="18" rx="2" fill="#000000"></rect><rect x="9.5" y="9" width="5" height="12" rx="2" fill="#000000"></rect><rect x="3" y="16" width="5" height="5" rx="2" fill="#000000"></rect></svg>
            <h1 className="font-bold text-2xl md:text-2xl">WedConnect</h1>
        </Link>
    )
}
