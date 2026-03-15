interface TabButtonsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabButtons({ activeTab, setActiveTab }: TabButtonsProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'homework', label: 'Homework' },
    { id: 'applications', label: 'Applications' },
  ];

  return (
    <div className="flex justify-center w-full mb-6">
      <div className="flex w-[500px] p-1.5 bg-[var(--dash-surface)] border border-[var(--dash-border)] rounded-2xl shadow-sm">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex justify-center items-center px-4 py-2.5 rounded-xl
                text-sm font-semibold transition-all duration-300 relative
                ${isActive
                  ? 'text-white shadow-lg shadow-[var(--primary)]/20'
                  : 'text-[var(--dash-text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]'
                }
              `}
            >
              {/* Active background */}
              {isActive && (
                <div className="absolute inset-0 hero-gradient rounded-xl animate-fadeIn -z-0" />
              )}
              
              {/* Label */}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}