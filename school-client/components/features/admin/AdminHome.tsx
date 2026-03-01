'use client';

import React from "react";
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from "recharts";
import { Users, GraduationCap, CheckCircle, TrendingUp, ArrowUpRight } from "lucide-react";

// Professional Mock Data
const data = [
  { month: "Jan", students: 400 },
  { month: "Feb", students: 520 },
  { month: "Mar", students: 480 },
  { month: "Apr", students: 610 },
  { month: "May", students: 750 },
  { month: "Jun", students: 890 },
];

export default function AdminHome() {
  const stats = [
    { label: "Total Students", value: "1,240", icon: <Users className="w-4 h-4" />, grow: "+12%" },
    { label: "Active Faculty", value: "84", icon: <GraduationCap className="w-4 h-4" />, grow: "Stable" },
    { label: "Attendance", value: "94.2%", icon: <CheckCircle className="w-4 h-4" />, grow: "+2.1%" },
  ];

  return (
    <div className="animate-fadeIn space-y-10">
      
      {/* 1. Minimal Stat Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 rounded-xl">
                {stat.icon}
              </div>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> {stat.grow}
              </span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* 2. Focused Area Chart */}
      <div className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm">
        <div className="flex items-center justify-between mb-10">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              Enrollment Growth
            </h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Student registration trends for the current semester</p>
          </div>
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Last 6 Months
          </div>
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}}
                dy={15}
              />
              <YAxis hide />
              <Tooltip 
                cursor={{ stroke: '#6366f1', strokeWidth: 2 }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '12px' }}
                itemStyle={{ color: '#6366f1', fontWeight: 900, fontSize: '14px' }}
                labelStyle={{ display: 'none' }}
              />
              <Area 
                type="monotone" 
                dataKey="students" 
                stroke="#6366f1" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#chartGradient)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}