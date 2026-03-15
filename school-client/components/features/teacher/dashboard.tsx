'use client';

import React, { useEffect, useState } from "react";
import { ArrowRight, Calendar, Clock, Download, UserCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/endpoints";
import axios from "axios";

export default function TeacherHeader() {
  const [schedulePdf, setSchedulePdf] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const user = useSelector((state: any) => state.auth.user);
  const teacherId = user?.id;

  // Live Clock Effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch teacher's PDF
  useEffect(() => {
    if (!teacherId) return;
    const fetchPdf = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/schedule/teacher/${teacherId}`);
        setSchedulePdf(res.data.pdfUrl);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPdf();
  }, [teacherId]);

  const handleViewPDF = () => {
    if (!schedulePdf) {
      toast.error("Schedule not uploaded yet");
      return;
    }
    window.open(`${API_BASE_URL}${schedulePdf}`, "_blank");
  };

  const formattedDate = currentTime.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="w-full mb-8 ">
      {/* Top Section: Greeting & Quick Info */}
      <div className="flex flex-col  lg:flex-row lg:items-center justify-between gap-6 bg-accent dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-[2rem] shadow-sm overflow-hidden relative">
        
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -mr-16 -mt-16"></div>

        <div className="flex items-center gap-5 relative z-10">
          <div className="hidden md:flex w-16 h-16 rounded-2xl bg-indigo-600 items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
            <UserCircle className="w-10 h-10" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                Faculty Member
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-primary dark:text-white tracking-tight">
              Welcome back, {user?.name?.split(' ')[0] || 'Teacher'}
            </h1>
            <p className="text-primary dark:text-slate-400 text-sm font-medium mt-1">
              Ready to inspire your students today?
            </p>
          </div>
        </div>

        {/* Right Side: Live Date/Time & Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-8 relative z-10">
          <div className="flex items-center gap-4 border-l-0 sm:border-l border-slate-200 dark:border-slate-700 sm:pl-8">
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                <Clock className="w-4 h-4" />
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <p className="text-xs text-slate-400 font-medium">{formattedDate}</p>
            </div>
          </div>

          <button
            onClick={handleViewPDF}
            className="group flex items-center gap-3 bg-primary dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl transition-all duration-300 shadow-md active:scale-95"
          >
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] font-bold opacity-70 uppercase tracking-tighter">My Routine</span>
              <span className="text-sm font-bold">Weekly Schedule</span>
            </div>
            <div className="bg-white/20 p-1.5 rounded-lg group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}