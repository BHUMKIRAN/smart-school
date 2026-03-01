'use client';

import React from "react";
import { LayoutGrid } from "lucide-react"; // Corrected import

interface AdminHeaderProps {
  title: string;
  subtitle: string;
}

export default function AdminHeader({
  title,
  subtitle,
}: AdminHeaderProps) {
  return (
    <header className="px-8 py-5 mb-6 border-b border-slate-100 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Side: Modern Typography */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500/80">
              System Active
            </span>
          </div>
          
          <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none">
            {title}
          </h1>
          <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">
            {subtitle}
          </p>
        </div>

        {/* Right Side: Subtle Status Info */}
        <div className="flex items-center gap-4 border-l border-slate-100 dark:border-slate-800/60 pl-6 hidden sm:flex">
          <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <LayoutGrid className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-tight">Data Integrity</p>
            <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Verified</p>
          </div>
        </div>

      </div>
    </header>
  );
}