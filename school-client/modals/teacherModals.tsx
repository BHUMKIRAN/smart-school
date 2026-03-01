'use client';

import React, { useEffect, useState } from "react";
import { X, User, CalendarCheck, Check, X as CloseIcon } from "lucide-react";

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  teacherData?: any;
  refreshTeachers: () => void;
}

const TeacherModal: React.FC<TeacherModalProps> = ({ isOpen, onClose, mode, teacherData, refreshTeachers }) => {
  const [tab, setTab] = useState<"info" | "att">("info");
  const [status, setStatus] = useState<"present" | "absent">("present");
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", department: "", salary: "" });

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && teacherData) {
        setForm({ ...teacherData });
        setTab("info");
      } else {
        setForm({ name: "", email: "", phone: "", subject: "", department: "", salary: "" });
        setTab("info");
      }
    }
  }, [teacherData, mode, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = mode === "create" ? "http://localhost:8080/teachers" : `http://localhost:8080/teachers/${teacherData?._id}`;
    
    const res = await fetch(url, {
      method: mode === "create" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok && tab === "att") {
      await fetch(`http://localhost:8080/attendance/teacher`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacherId: teacherData?._id, status, date: new Date().toISOString().split('T')[0] }),
      });
    }

    if (res.ok) { refreshTeachers(); onClose(); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden animate-scaleIn">
        
        {/* Header Section */}
        <div className="relative p-8 pb-4 text-center">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:rotate-90 transition-transform">
            <CloseIcon className="w-4 h-4" />
          </button>
          <div className="mx-auto w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/30 mb-4">
            {tab === "info" ? <User className="text-white w-8 h-8" /> : <CalendarCheck className="text-white w-8 h-8" />}
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white uppercase">
            {mode === "create" ? "Add Faculty" : tab === "info" ? "Teacher Profile" : "Mark Attendance"}
          </h2>
        </div>

        {/* Tab Navigation (Only in Edit) */}
        {mode === "edit" && (
          <div className="px-8 mb-6">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <button onClick={() => setTab("info")} className={`flex-1 py-2.5 text-[10px] font-black tracking-widest rounded-xl transition-all ${tab === 'info' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400'}`}>INFO</button>
              <button onClick={() => setTab("att")} className={`flex-1 py-2.5 text-[10px] font-black tracking-widest rounded-xl transition-all ${tab === 'att' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400'}`}>ATTENDANCE</button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
          {tab === "info" ? (
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(form).filter(k => k !== '_id' && k !== '__v' && k !== 'status').map((key) => (
                <div key={key} className={key === "name" || key === "email" ? "col-span-2" : "col-span-1"}>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">{key}</label>
                  <input 
                    value={(form as any)[key]} 
                    onChange={(e) => setForm({...form, [key]: e.target.value})} 
                    placeholder={`Enter ${key}...`} 
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none" 
                    required 
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 space-y-6">
              <div className="text-center">
                <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Recording for</p>
                <h3 className="text-lg font-black">{new Date().toDateString()}</h3>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setStatus("present")} className={`flex-1 group p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${status === 'present' ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-slate-100 grayscale opacity-40'}`}>
                  <div className={`p-3 rounded-full ${status === 'present' ? 'bg-emerald-500 text-white' : 'bg-slate-200'}`}><Check className="w-6 h-6" /></div>
                  <span className="font-black text-xs uppercase tracking-tighter">Present</span>
                </button>
                <button type="button" onClick={() => setStatus("absent")} className={`flex-1 group p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${status === 'absent' ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-slate-100 grayscale opacity-40'}`}>
                  <div className={`p-3 rounded-full ${status === 'absent' ? 'bg-rose-500 text-white' : 'bg-slate-200'}`}><X className="w-6 h-6" /></div>
                  <span className="font-black text-xs uppercase tracking-tighter">Absent</span>
                </button>
              </div>
            </div>
          )}

          <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98] uppercase text-xs tracking-widest">
            {tab === "info" ? "Save Member Details" : "Confirm Attendance"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherModal;