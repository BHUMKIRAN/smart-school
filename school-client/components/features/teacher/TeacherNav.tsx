'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, Bell, LogOut, BookOpen } from 'lucide-react';

interface TeacherNavProps {
  setLogout: (logout: boolean) => void;
}

export default function TeacherNav({ setLogout }: TeacherNavProps) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    };
    setCurrentDate(new Date().toLocaleDateString('en-US', dateOptions));
  }, []);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/60 px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Brand/Identity */}
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest leading-none">
              Teacher Portal
            </h1>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">
              AY 2024 • 25
            </span>
          </div>
        </div>

        {/* Right Side: Context & Profile */}
        <div className="flex items-center gap-6">
          
          {/* Date - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <Calendar className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-widest">
              {currentDate || 'Loading...'}
            </span>
          </div>

          {/* Notification Button */}
          <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 border-2 border-white dark:border-slate-950 rounded-full"></span>
          </button>

          {/* Minimal Profile Toggle */}
          <div className="flex items-center gap-3 pl-6 border-l border-slate-100 dark:border-slate-800">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-black text-slate-800 dark:text-slate-100 leading-none">
                Dr. Sarah Johnson
              </p>
              <button 
                onClick={() => setLogout(true)}
                className="text-[9px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-600 transition-colors flex items-center justify-end gap-1 mt-1"
              >
                Sign Out <LogOut className="w-2.5 h-2.5" />
              </button>
            </div>
            <div className="w-9 h-9 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-black text-xs border border-slate-200 dark:border-slate-700">
              SJ
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}