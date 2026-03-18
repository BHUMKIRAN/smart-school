'use client';

import React, { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";

import {
  Users, GraduationCap, CheckCircle,
  TrendingUp, ArrowUpRight, Bell,
  UserPlus, ClipboardCheck
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

  const handleGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGrade(event.target.value);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSection(event.target.value);
  };

  const createGrade = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!grade) {
      alert("Grade is required");
      return;
    }

    try {
      const response = await api.post(`/grades`, {
        grade: Number(grade),
        section: section || null,
      });

      if (response.status === 201) {
        alert("Grade created successfully");
        setGrade("");
        setSection("");
        setOpen(false);
      } else {
        console.error("Failed to create grade", response.data);
      }
    } catch (error) {
      console.error("Error creating grade:", error);
    }
  };

  const stats = [
    { label: "Students", value: "1,240", icon: <Users className="w-4 h-4" />, grow: "+12%" },
    { label: "Teachers", value: "84", icon: <GraduationCap className="w-4 h-4" />, grow: "+3%" },
    { label: "Attendance", value: "94.2%", icon: <CheckCircle className="w-4 h-4" />, grow: "+2.1%" },
    { label: "Notices", value: "18", icon: <Bell className="w-4 h-4" />, grow: "Live" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
            <div className="flex justify-between mb-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 rounded-lg">
                {stat.icon}
              </div>
              <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                {stat.grow}
              </span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">{stat.value}</h3>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
          <h3 className="text-sm font-black mb-5">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              className="p-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-bold flex items-center gap-2"
              onClick={() => setOpen(true)}
            >
              <UserPlus className="w-4 h-4" />
              Add Grade
            </button>

            {open && (
              <form onSubmit={createGrade} className="col-span-2 flex flex-col gap-2 mt-2">
                <input
                  type="number"
                  placeholder="Grade Number"
                  className="p-2 border rounded"
                  value={grade}
                  onChange={handleGradeChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Section (optional)"
                  className="p-2 border rounded"
                  value={section}
                  onChange={handleSectionChange}
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-indigo-600 text-white font-bold"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>

        {/* CHART + ATTENDANCE */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                Enrollment Growth
              </h3>
              <span className="text-[10px] font-bold text-slate-400">
                Last 6 Months
              </span>
            </div>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#chartGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Attendance Snapshot */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
            <h3 className="text-sm font-black mb-6 flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-indigo-500" />
              Today's Attendance
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Present</span>
                <span className="font-black text-emerald-600">892</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Absent</span>
                <span className="font-black text-red-500">43</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Late</span>
                <span className="font-black text-amber-500">21</span>
              </div>
            </div>
          </div>
        </div>


        {/* Recent Activity */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
          <h3 className="text-sm font-black mb-5">Recent Activity</h3>
          <div className="space-y-3 text-sm">
            <p className="text-slate-600">
              New student <span className="font-bold">Ramesh Sharma</span> registered
            </p>
            <p className="text-slate-600">
              Notice posted for <span className="font-bold">Exam Schedule</span>
            </p>
            <p className="text-slate-600">
              Teacher <span className="font-bold">Ms. Karki</span> marked attendance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
