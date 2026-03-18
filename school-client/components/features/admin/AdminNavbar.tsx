'use client';

import React from "react";
import { 
  LayoutGrid, 
  GraduationCap, 
  Users, 
  Bell, 
  AlertTriangle, 
  ClipboardCheck,
  Folder 
} from "lucide-react";

interface AdminNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminNavbar({
  activeTab,
  setActiveTab,
}: AdminNavbarProps) {

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutGrid className="w-4 h-4 md:w-5 md:h-5" /> },
    { id: 'teachers', label: 'Teachers', icon: <GraduationCap className="w-4 h-4 md:w-5 md:h-5" /> },
    { id: 'students', label: 'Students', icon: <Users className="w-4 h-4 md:w-5 md:h-5" /> },
    { id: 'notices', label: 'Notices', icon: <Bell className="w-4 h-4 md:w-5 md:h-5" /> },
    { id: 'emergency', label: 'Emergency', icon: <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" /> },
    { id: 'attendance', label: 'Class Attendance', icon: <ClipboardCheck className="w-4 h-4 md:w-5 md:h-5" /> },
    { id: 'applications', label: 'Applications', icon: <Folder className="w-4 h-4 md:w-5 md:h-5" /> },
  ];

  return (
    <div className="w-full bg-[var(--dash-surface)] border-b border-[var(--dash-border)] sticky top-[64px] z-30 transition-all">
      <div className="max-w-[100vw] overflow-x-auto no-scrollbar">
        <nav className="flex items-center min-w-max px-4 md:px-8 h-14 md:h-16 gap-1 md:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  flex items-center gap-2 py-2 px-3 md:px-5 rounded-lg md:rounded-xl 
                  transition-all duration-300 whitespace-nowrap group
                  ${isActive 
                    ? 'tab-active shadow-md shadow-blue-500/20' 
                    : 'tab-button hover:bg-[var(--dash-sidebar-hover)] hover:text-[var(--dash-text)]'
                  }
                `}
              >
                <div className={`
                  ${isActive ? 'text-white' : 'text-[var(--dash-text-muted)] group-hover:text-[var(--primary)]'} 
                  transition-colors
                `}>
                  {item.icon}
                </div>
                
                <span className={`
                  font-bold text-[10px] md:text-[11px] uppercase tracking-wider
                  ${isActive ? 'text-white' : 'text-[var(--dash-text-muted)] group-hover:text-[var(--dash-text)]'}
                `}>
                  {item.label}
                </span>

                {/* Active Indicator Bar (Mobile Friendly) */}
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-white rounded-t-full hidden md:block" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Custom CSS for hidden scrollbar while maintaining functionality */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}