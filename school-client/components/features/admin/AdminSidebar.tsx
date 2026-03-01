'use client';

import React from "react";
import Logo from "@/components/shared/logo"; // Clean import of your shared logo
import { 
  LayoutGrid, 
  GraduationCap, 
  Users, 
  Bell, 
  AlertTriangle, 
  ClipboardCheck, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setLogout: (logout: boolean) => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  setLogout,
}: AdminSidebarProps) {

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutGrid className="w-5 h-5" /> },
    { id: 'teachers', label: 'Teachers', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'students', label: 'Students', icon: <Users className="w-5 h-5" /> },
    { id: 'notices', label: 'Notices', icon: <Bell className="w-5 h-5" /> },
    { id: 'emergency', label: 'Emergency', icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 'attendance', label: 'Attendance', icon: <ClipboardCheck className="w-5 h-5" /> },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-800/60
      ${sidebarOpen ? 'w-72' : 'w-20'}`}
    >
      {/* Brand Logo Section */}
      <div className="flex items-center justify-between px-6 py-8">
        <div className={`transition-all duration-300 ${!sidebarOpen ? 'scale-0 opacity-0 w-0' : 'scale-100 opacity-100'}`}>
          <Logo /> 
        </div>
        
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100"
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Tabs */}
      <nav className="px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative
                ${isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20'
                  : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-600'
                }`}
            >
              <div className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500'} transition-colors`}>
                {item.icon}
              </div>
              
              <span className={`font-bold text-[13px] uppercase tracking-wider transition-opacity duration-300 whitespace-nowrap 
                ${!sidebarOpen ? 'opacity-0 w-0' : 'opacity-100'}`}>
                {item.label}
              </span>

              {!sidebarOpen && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 z-[60] shadow-xl">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* User / Logout Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className={`flex items-center gap-3 p-3 rounded-[1.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50
          ${!sidebarOpen && 'justify-center bg-transparent border-none'}`}
        >
          <div className="relative shrink-0">
             <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-inner">
               A
             </div>
             <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full"></span>
          </div>

          <div className={`flex-1 min-w-0 transition-all duration-300 ${!sidebarOpen ? 'w-0 opacity-0 hidden' : 'opacity-100'}`}>
            <p className="text-xs font-black text-slate-800 dark:text-slate-100 truncate uppercase tracking-tight">Admin User</p>
            <button 
              onClick={() => setLogout(true)}
              className="text-[10px] text-rose-500 font-black uppercase tracking-widest hover:text-rose-600 flex items-center gap-1.5 transition-colors"
            >
              Sign Out
              <LogOut className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}