export default function UserRegisterLayout({ children }) {
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-screen bg-[#FDFDFC] px-8 md:px-0">
            <div className="w-fit">
                {children}
            </div>
        </div>
    )
}
