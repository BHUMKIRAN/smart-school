'use client';

import React, { useEffect, useState } from "react";
import { X, GraduationCap, Mail, Percent, Star, Activity, User } from "lucide-react";

interface Student {
  _id?: string;
  name: string;
  grade: string;
  email: string;
  attendance?: number;
  gpa?: number;
  status?: string;
}

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  studentData?: Student;
  refreshStudents: () => void;
}

const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  mode,
  studentData,
  refreshStudents,
}) => {
  const [formData, setFormData] = useState<Student>({
    name: "",
    grade: "",
    email: "",
    attendance: undefined,
    gpa: undefined,
    status: "Active",
  });

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && studentData) {
        setFormData({ ...studentData });
      } else {
        setFormData({
          name: "",
          grade: "",
          email: "",
          attendance: undefined,
          gpa: undefined,
          status: "Active",
        });
      }
    }
  }, [mode, studentData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = mode === "create"
        ? "http://localhost:8080/students"
        : `http://localhost:8080/students/${studentData?._id}`;

      const response = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save");
      refreshStudents();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden animate-scaleIn">
        
        {/* Header Section */}
        <div className="relative p-8 pb-4 text-center">
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:rotate-90 transition-transform text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="mx-auto w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/30 mb-4">
            <GraduationCap className="text-white w-8 h-8" />
          </div>
          
          <h2 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white uppercase">
            {mode === "create" ? "Enroll Student" : "Update Student"}
          </h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Academic Records</p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {/* Name - Full Width */}
            <div className="col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  name="name" value={formData.name} onChange={handleChange} 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none" 
                  placeholder="Enter student name..." required 
                />
              </div>
            </div>

            {/* Email - Full Width */}
            <div className="col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  name="email" type="email" value={formData.email} onChange={handleChange} 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none" 
                  placeholder="student@school.com" required 
                />
              </div>
            </div>

            {/* Grade */}
            <div className="col-span-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Grade / Class</label>
              <input 
                name="grade" value={formData.grade} onChange={handleChange} 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none" 
                placeholder="e.g. 10th" required 
              />
            </div>

            {/* Status */}
            <div className="col-span-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Status</label>
              <div className="relative">
                <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select 
                  name="status" value={formData.status} onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm appearance-none focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="New">New</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Attendance */}
            <div className="col-span-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Attendance %</label>
              <div className="relative">
                <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input 
                  name="attendance" type="number" value={formData.attendance || ""} onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none" 
                  placeholder="95" 
                />
              </div>
            </div>

            {/* GPA */}
            <div className="col-span-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Current GPA</label>
              <div className="relative">
                <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  name="gpa" type="number" step="0.01" value={formData.gpa || ""} onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none font-mono" 
                  placeholder="4.0" 
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.98] uppercase text-xs tracking-widest mt-2"
          >
            {mode === "create" ? "Confirm Enrollment" : "Update Student Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;