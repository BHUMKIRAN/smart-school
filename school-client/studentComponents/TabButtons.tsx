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
    <div className="flex gap-2 border-b border-purple-500/20 pb-2 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`tab-btn px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-400 border border-purple-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="mr-2">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
