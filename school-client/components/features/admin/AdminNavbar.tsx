'use client';

import React from "react";
import { 
  LayoutGrid, 
  GraduationCap, 
  Users, 
  Bell, 
  AlertTriangle, 
  ClipboardCheck, 
 
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
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutGrid className="w-5 h-5" /> },
    { id: 'teachers', label: 'Teachers', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'students', label: 'Students', icon: <Users className="w-5 h-5" /> },
    { id: 'notices', label: 'Notices', icon: <Bell className="w-5 h-5" /> },
    { id: 'emergency', label: 'Emergency', icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 'attendance', label: 'Attendance', icon: <ClipboardCheck className="w-5 h-5" /> },
  ];

  return (
    <div className="flex  justify-center mt-2">
      {/* Horizontal Navbar */}
      <nav
        className="flex items-center bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 overflow-x-auto transition-all duration-300 h-16 px-4"
      >
        {/* Navigation Items */}
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 py-2 px-4 rounded-xl transition-all duration-200 whitespace-nowrap ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20'
                    : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-600'
                }`}
              >
                <div className={`${isActive ? 'text-white' : 'text-slate-400'} transition-colors`}>
                  {item.icon}
                </div>
                <span className="font-bold text-[12px] uppercase tracking-wider">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>
       
      </nav>
    </div>
  );
}