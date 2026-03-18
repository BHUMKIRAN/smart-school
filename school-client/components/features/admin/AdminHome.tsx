'use client';

import React, { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";

import {
  Users, GraduationCap, CheckCircle,
  TrendingUp, ArrowUpRight, Bell,
  PlusCircle, ClipboardCheck, History, X
} from "lucide-react";
import { api } from "@/Backend/axiosClientInstance";

const data = [
  { month: "Jan", students: 400 },
  { month: "Feb", students: 520 },
  { month: "Mar", students: 480 },
  { month: "Apr", students: 610 },
  { month: "May", students: 750 },
  { month: "Jun", students: 890 },
];

const AdminHome = () => {
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [open, setOpen] = useState(false);

  const stats = [
    { label: "Students", value: "1,240", icon: <Users className="w-5 h-5" />, grow: "+12%" },
    { label: "Teachers", value: "84", icon: <GraduationCap className="w-5 h-5" />, grow: "+3%" },
    { label: "Attendance", value: "94.2%", icon: <CheckCircle className="w-5 h-5" />, grow: "+2.1%" },
    { label: "Notices", value: "18", icon: <Bell className="w-5 h-5" />, grow: "Live" },
  ];

  const createGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!grade) { alert("Grade is required"); return; }
    try {
      const response = await api.post(`/grades`, { grade: Number(grade), section: section || null });
      if (response.status === 201) {
        setGrade(""); setSection(""); setOpen(false);
      }
    } catch (error) { console.error("Error creating grade:", error); }
  };

  return (
    <div className="p-6 space-y-8 animate-fadeIn">
      
      {/* STATS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="dash-card p-5 relative overflow-hidden group hover:border-[var(--primary)] transition-colors">
            <div className="flex justify-between items-start relative z-10">
              <div className="p-3 rounded-xl bg-[var(--muted-bg)] text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-300">
                {stat.icon}
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--success)]/10 text-[var(--success)] text-[10px] font-bold">
                <ArrowUpRight className="w-3 h-3" />
                {stat.grow}
              </div>
            </div>
            <div className="mt-4 relative z-10">
              <p className="text-[11px] font-bold text-[var(--dash-text-muted)] uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-3xl font-black text-[var(--dash-text)] mt-1">{stat.value}</h3>
            </div>
            {/* Subtle background decoration */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
               {React.cloneElement(stat.icon as React.ReactElement, { size: 100 })}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* CHART SECTION */}
        <div className="lg:col-span-2 dash-card p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
                Enrollment Analytics
              </h3>
              <p className="text-xs text-[var(--dash-text-muted)] mt-1">Student registration trends for the current year</p>
            </div>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-[var(--dash-sidebar-hover)] rounded-full text-[10px] font-bold text-[var(--dash-text-muted)]">MONTHLY</span>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="enrollGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--dash-border)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 600, fill: 'var(--dash-text-muted)' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 600, fill: 'var(--dash-text-muted)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--dash-surface)', 
                    borderColor: 'var(--dash-border)',
                    borderRadius: '12px',
                    color: 'var(--dash-text)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="students" 
                  stroke="var(--primary)" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#enrollGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SIDE ACTIONS & SNAPSHOT */}
        <div className="space-y-6">
          
          {/* Quick Actions Card */}
          <div className="dash-card p-6 border-l-4 border-l-[var(--primary)]">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2 uppercase tracking-tighter">
              <PlusCircle className="w-4 h-4" /> Management
            </h3>
            
            {!open ? (
              <button 
                onClick={() => setOpen(true)}
                className="w-full btn btn-primary flex items-center justify-center gap-2 text-sm"
              >
                Add New Grade
              </button>
            ) : (
              <form onSubmit={createGrade} className="space-y-3 animate-fadeIn">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-[var(--dash-text-muted)]">CREATE CLASS</span>
                  <X className="w-4 h-4 cursor-pointer text-red-500" onClick={() => setOpen(false)} />
                </div>
                <input
                  type="number"
                  placeholder="Grade (e.g. 10)"
                  className="dash-input w-full text-sm"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Section (e.g. A)"
                  className="dash-input w-full text-sm"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                />
                <button type="submit" className="w-full btn btn-primary py-2 text-sm">
                  Save Grade
                </button>
              </form>
            )}
          </div>

          {/* Attendance Snapshot */}
          <div className="dash-card p-6">
            <h3 className="text-sm font-bold mb-5 flex items-center gap-2 uppercase tracking-tighter">
              <ClipboardCheck className="w-4 h-4 text-[var(--primary)]" /> Attendance Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--success)]"></div>
                  <span className="text-xs font-medium text-[var(--dash-text-muted)]">Present</span>
                </div>
                <span className="text-sm font-black">892</span>
              </div>
              <div className="w-full bg-[var(--muted-bg)] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[var(--success)] h-full w-[85%]"></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--error)]"></div>
                  <span className="text-xs font-medium text-[var(--dash-text-muted)]">Absent</span>
                </div>
                <span className="text-sm font-black">43</span>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="dash-card p-6">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2 uppercase tracking-tighter">
              <History className="w-4 h-4" /> Activity
            </h3>
            <div className="space-y-4">
              {[
                { user: "Admin", action: "Updated Notice", time: "2m ago" },
                { user: "System", action: "Backup Complete", time: "1h ago" }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start border-b border-[var(--dash-border)] pb-3 last:border-0 last:pb-0">
                  <div className="w-7 h-7 rounded-lg bg-[var(--dash-sidebar-hover)] flex items-center justify-center text-[10px] font-bold">
                    {item.user[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[var(--dash-text)]">{item.action}</p>
                    <p className="text-[10px] text-[var(--dash-text-muted)]">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminHome;