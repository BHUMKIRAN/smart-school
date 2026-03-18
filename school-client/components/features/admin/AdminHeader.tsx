'use client';

import React from "react";
import { LogOut } from "lucide-react";
import Logo from "@/components/shared/logo";
import { useSelector } from "react-redux";

interface AdminHeaderProps {
  title: string;
  subtitle: string;
  setLogout: (logout: boolean) => void;
}

export default function AdminHeader({
  setLogout,
  title,
  subtitle,
}: AdminHeaderProps) {
  // Get admin data from Redux
  const admin = useSelector((state: any) => state.auth.user);

  // Logic for the fallback character (First letter of name or 'A' for Admin)
  const initial = admin?.name ? admin.name.charAt(0).toUpperCase() : "A";

  return (
    <header className="p-3 border-b border-slate-100 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-around gap-4">
        <div>
          <Logo />
        </div>
        
        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none">
            {title}
          </h1>
          <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50">
          {/* Avatar Logic */}
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black overflow-hidden">
            {admin?.image ? (
              <img 
                src={admin.image} 
                alt={admin.name} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <span>{initial}</span>
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-xs font-black text-slate-800 dark:text-slate-100 truncate uppercase tracking-tight">
              {admin?.name || "Admin User"}
            </p>
            <button
              onClick={() => setLogout(true)}
              className="text-[10px] text-rose-500 font-black uppercase tracking-widest hover:text-rose-600 flex items-center gap-1.5 transition-colors"
            >
              Sign Out <LogOut className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}