'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, Bell, LogOut, BookOpen } from 'lucide-react';
import { useSelector } from 'react-redux';
import Logo from '@/components/shared/logo';

interface TeacherNavProps {
  setLogout: (logout: boolean) => void;
}

export default function TeacherNav({ setLogout }: TeacherNavProps) {
  const [currentDate, setCurrentDate] = useState('');

  // Get logged-in teacher from Redux
  const teacher = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    };
    setCurrentDate(new Date().toLocaleDateString('en-US', dateOptions));
  }, []);

  // Generate initials from name
  const getInitials = (name: string) => {
    if (!name) return '';
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/60 px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
     
     <Logo/>

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

          {/* Profile Section */}
          <div className="flex items-center gap-3 pl-6 border-l border-slate-100 dark:border-slate-800">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-black text-slate-800 dark:text-slate-100 leading-none">
                {teacher?.name || 'Guest'}
              </p>
              {teacher && (
                <button 
                  onClick={() => setLogout(true)}
                  className="text-[9px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-600 transition-colors flex items-center justify-end gap-1 mt-1"
                >
                  Sign Out <LogOut className="w-2.5 h-2.5" />
                </button>
              )}
            </div>

            {/* Profile Image or Initials */}
            {teacher?.profileImage ? (
              <img 
                src={teacher.profileImage}
                alt={teacher.name}
                className="w-9 h-9 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
              />
            ) : (
              <div className="w-9 h-9 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-black text-xs border border-slate-200 dark:border-slate-700">
                {getInitials(teacher?.name || '') || 'NA'}
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}