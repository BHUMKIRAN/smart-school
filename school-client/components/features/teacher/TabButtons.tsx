'use client';

import React from "react";
import { ClipboardCheck, BookOpen, Users } from "lucide-react";

interface TabButtonsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabButtons({ activeTab, setActiveTab }: TabButtonsProps) {
  const tabs = [
    { id: 'attendance', label: 'Attendance', icon: <ClipboardCheck className="w-3.5 h-3.5" /> },
    { id: 'classes', label: 'Classes', icon: <BookOpen className="w-3.5 h-3.5" /> },
    
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-slate-100/50 dark:bg-slate-900/50 w-fit rounded-2xl border border-slate-200/60 dark:border-slate-800/60">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300
              ${isActive 
                ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm ring-1 ring-slate-200/50 dark:ring-slate-700/50' 
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }
            `}
          >
            <span className={`${isActive ? 'text-indigo-500' : 'text-slate-400'}`}>
              {tab.icon}
            </span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}