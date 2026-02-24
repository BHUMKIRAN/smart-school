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
    <div className="flex gap-2 border-b pb-2" style={{ borderColor: 'var(--dash-border)' }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`dash-tab ${activeTab === tab.id
              ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-500 border border-blue-500/30'
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
