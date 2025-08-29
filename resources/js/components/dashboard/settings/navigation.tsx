export default function DashboardSettingsNavigation({ pages, selectedTab, setSelectedTab }) {
    return (
        <div className="flex border-1 w-fit rounded-2xl overflow-hidden">
            {pages.map((page, key) => (
                <button
                    type="button"
                    onClick={() => {
                        setSelectedTab(page.id);

                        const params = new URLSearchParams(window.location.search);
                        params.set('selectedTab', page.id);
                        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
                    }}
                    disabled={page.disabled}
                    key={key}
                    className={`
                        px-4 py-2 text-[12px] font-medium transition cursor-pointer
                        ${selectedTab === page.id ? "bg-slate-700 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}
                        ${key === 0 ? "rounded-l-2xl" : ""}
                        ${key === pages.length - 1 ? "rounded-r-2xl" : ""}
                        ${key !== 0 && key !== pages.length - 1 ? "border-l border-r border-gray-200" : ""}
                    `}
                >
                    {page.name}
                </button>
            ))}
        </div>
    )
}
