interface TabButtonsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabButtons({ activeTab, setActiveTab }: TabButtonsProps) {
  const tabs = [
    { id: 'attendance', label: 'Attendance', icon: '📊' },
    { id: 'classes', label: 'Classes', icon: '📚' },
    { id: 'students', label: 'Students', icon: '👥' },
  ];

  return (
    <div className="flex gap-2 border-b border-slate-700 pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`tab-btn px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-500/30'
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
