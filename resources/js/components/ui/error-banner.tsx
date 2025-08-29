import { CheckCircle2, X } from "lucide-react";
import { useState, useEffect } from "react";

type Props = {
    message: string;
    duration?: number;
};

function ErrorBanner({ message, duration = 5000 }: Props) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (message && duration > 0) {
            const timer = setTimeout(() => setVisible(false), duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration]);

    if (!message || !visible) return null;

    return (
        <div className="absolute top-0 left-0 w-full z-50 border-b border-green-400 bg-green-50 px-4 py-3 text-green-700 shadow-sm flex justify-between items-center gap-2">
            <div className="flex items-center gap-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-xs font-medium">{message}</span>
            </div>
            <X className="text-xs font-medium cursor-pointer" onClick={() => setVisible(false)} />
        </div>
    );
}

export { SuccessBanner };
