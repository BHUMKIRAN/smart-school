'use client';

import React, { useState, useMemo } from 'react';
import { 
  Check, 
  X, 
  Users2, 
  ChevronRight, 
  Search, 
  RotateCcw, 
  CheckCircle2,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';

export default function ClassesTab() {
  const [selectedGrade, setSelectedGrade] = useState(10);
  const [selectedSection, setSelectedSection] = useState('A');
  const [attendance, setAttendance] = useState<Record<string, string>>({});

  const grades = Array.from({ length: 10 }, (_, i) => i + 1);
  const sections = ['A', 'B', 'C', 'D'];

  // Simulated Database
  const studentsData: Record<string, any[]> = {
    '10-A': [
      { id: '10A1', name: 'Emma Wilson', roll: '01' },
      { id: '10A2', name: 'James Miller', roll: '02' },
      { id: '10A3', name: 'Sophia Brown', roll: '03' },
    ],
    '10-B': [
      { id: '10B1', name: 'Liam Johnson', roll: '01' },
      { id: '10B2', name: 'Noah Smith', roll: '02' },
    ],
  };

  const activeKey = `${selectedGrade}-${selectedSection}`;
  const currentList = useMemo(() => studentsData[activeKey] || [], [activeKey]);

  const handleStatus = (id: string, status: string) => {
    setAttendance(prev => ({ ...prev, [id]: prev[id] === status ? '' : status }));
  };

  const handleFinalSubmit = () => {
    toast.success(`Class ${activeKey} Register Saved`, {
      description: `${Object.keys(attendance).length} marks recorded successfully.`
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 1. Header & Selectors */}
      <div className="bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 rounded-[2.5rem] p-8 shadow-sm">
        <div className="flex flex-col xl:flex-row justify-between gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Attendance Register</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Manage daily presence</p>
            </div>

            <div className="flex flex-wrap gap-6">
              {/* Grade Scroll */}
              <div className="space-y-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Grade Level</span>
                <div className="flex gap-1.5 p-1.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-x-auto max-w-[320px] scrollbar-hide">
                  {grades.map((g) => (
                    <button
                      key={g}
                      onClick={() => { setSelectedGrade(g); setAttendance({}); }}
                      className={`min-w-[40px] h-10 rounded-xl text-xs font-black transition-all ${
                        selectedGrade === g 
                        ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section Pills */}
              <div className="space-y-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Section</span>
                <div className="flex gap-1.5 p-1.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                  {sections.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setSelectedSection(s); setAttendance({}); }}
                      className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                        selectedSection === s 
                        ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <button 
              onClick={handleFinalSubmit}
              className="group flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:bg-indigo-600 dark:hover:bg-indigo-500 shadow-xl shadow-indigo-500/10 active:scale-95"
            >
              Submit Register
              <CheckCircle2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. List Area */}
      <div className="bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 rounded-[2.5rem] overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-900 flex items-center justify-between bg-slate-50/30 dark:bg-slate-900/20">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
              <Users2 className="w-5 h-5 text-indigo-500" />
            </div>
            <p className="text-sm font-bold tracking-tight">Grade {activeKey} <span className="text-slate-400 font-medium ml-2">— {currentList.length} Students</span></p>
          </div>
          <button onClick={() => setAttendance({})} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-50 dark:border-slate-900">
                <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Roll</th>
                <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Student</th>
                <th className="px-8 py-4 text-center text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Mark Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
              {currentList.length > 0 ? (
                currentList.map((student) => (
                  <tr key={student.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="px-8 py-5">
                      <span className="text-xs font-mono font-bold text-slate-400 tracking-tighter">#{student.roll}</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500 uppercase">
                          {student.name.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200 tracking-tight">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-3">
                        {/* Present */}
                        <button 
                          onClick={() => handleStatus(student.id, 'P')}
                          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            attendance[student.id] === 'P'
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                            : 'bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-emerald-500'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" strokeWidth={3} />
                          Present
                        </button>
                        {/* Absent */}
                        <button 
                          onClick={() => handleStatus(student.id, 'A')}
                          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            attendance[student.id] === 'A'
                            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                            : 'bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-rose-500'
                          }`}
                        >
                          <X className="w-3.5 h-3.5" strokeWidth={3} />
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-3 opacity-20">
                      <Filter className="w-10 h-10" />
                      <p className="text-xs font-black uppercase tracking-widest">No students found for Class {activeKey}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}