export default function DashboardLayout({ children }) {
    return (
        <div className="ml-0 md:ml-[250px] mt-[75px] h-[calc(100vh-100px)] overflow-auto p-4 bg-[#FDFDFC] opacity-100 transition-opacity duration-750 grow starting:opacity-0">
            {children}
        </div>
    )
}
