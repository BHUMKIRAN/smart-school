interface TabButtonsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabButtons({ activeTab, setActiveTab }: TabButtonsProps) {
  const tabs = [
    { 
      id: 'homework', 
      label: 'Homework', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ) 
    },
 
    { 
      id: 'applications', 
      label: 'Applications', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ) 
    },
    { 
      id: 'support', 
      label: 'Support', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) 
    },
  ];

  return (
    <div className="w-full mb-6 p-1.5 bg-[var(--dash-surface)] border border-[var(--dash-border)] rounded-2xl shadow-sm">
      <div className="flex flex-row items-center w-full gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                text-sm font-semibold transition-all duration-300 relative
                ${isActive 
                  ? 'text-white shadow-lg shadow-[var(--primary)]/20' 
                  : 'text-[var(--dash-text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]'
                }
              `}
            >
              {/* Active Background Slide Effect */}
              {isActive && (
                <div className="absolute inset-0 hero-gradient rounded-xl animate-fadeIn -z-0" />
              )}
              
              <span className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                {tab.icon}
              </span>
              <span className="relative z-10 hidden sm:block">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}