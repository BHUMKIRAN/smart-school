'use client';

import React from "react";
import { Plus, ArrowRight } from "lucide-react";

export default function SimpleTeacherHeader() {
  const stats = [
    { label: "Active Now", value: "Math 101-A" },
    { label: "Attendance", value: "94%" },
    { label: "To-do", value: "6 Tasks" },
  ];

  return (
    <div className="w-full py-8">
      {/* Top Row: Greeting & Action */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-1">
     
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Welcome back, Prof. Miller
          </h1>
        </div>
        
     
      </div>

      {/* Bottom Row: Simple Stats Strip */}
      <div className="flex flex-wrap items-center gap-x-12 gap-y-6 py-6 border-y border-slate-100 dark:border-slate-800/60">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {stat.label}
            </span>
            <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              {stat.value}
            </span>
          </div>
        ))}
        
        {/* Simple Link */}
        <button className="ml-auto flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:gap-2 transition-all uppercase tracking-wider">
          View Schedule <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}