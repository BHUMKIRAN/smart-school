'use client';

import { LayoutDashboard, BookOpen, FileText } from 'lucide-react';

interface TabButtonsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabButtons({ activeTab, setActiveTab }: TabButtonsProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'homework', label: 'Homework', icon: BookOpen },
    { id: 'applications', label: 'Applications', icon: FileText },
  ];

  return (
    <div className="flex justify-center w-full mb-8 px-4">
      <div className="flex w-full max-w-md p-1 bg-[var(--dash-surface)] border border-[var(--dash-border)] rounded-xl shadow-sm relative">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                text-xs font-bold transition-all duration-300 relative z-10
                ${isActive 
                  ? 'text-white' 
                  : 'text-[var(--dash-text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/5'
                }
              `}
            >
              {/* Active Background Pill */}
              {isActive && (
                <div className="absolute inset-0 hero-gradient rounded-lg shadow-md shadow-[var(--primary)]/20 animate-fadeIn -z-10" />
              )}
              
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : ''}`} />
              <span className="hidden sm:inline-block tracking-wide uppercase">
                {tab.label}
              </span>
              <span className="sm:hidden">
                {tab.label === 'Dashboard' ? 'Home' : tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}