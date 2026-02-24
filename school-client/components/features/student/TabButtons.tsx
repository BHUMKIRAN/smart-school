interface TabButtonsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabButtons({ activeTab, setActiveTab }: TabButtonsProps) {
  const tabs = [
    { id: 'homework', label: 'Homework', icon: '📚' },
    { id: 'grades', label: 'Grades', icon: '📊' },
    { id: 'applications', label: 'Applications', icon: '📝' },
    { id: 'support', label: 'Support', icon: '🎯' },
  ];

  return (
    <div className="flex gap-2 border-b pb-2 overflow-x-auto" style={{ borderColor: 'var(--dash-border)' }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`dash-tab whitespace-nowrap ${activeTab === tab.id
              ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-500 border border-purple-500/30'
              : 'hover:opacity-80'
            }`}
        >
          <span className="mr-2">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
