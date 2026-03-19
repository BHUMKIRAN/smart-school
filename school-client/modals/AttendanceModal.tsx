'use client';

import { useEffect, useState } from 'react';
import { X, Users, GraduationCap, Clock, UsersRound } from 'lucide-react';
import socket from "@/lib/socket";
import { api } from "@/Backend/axiosClientInstance";

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AttendanceState {
  total: number;
  present: number;
  absent: number;
  rate: number;
}

export default function AttendanceModal({ isOpen, onClose }: AttendanceModalProps) {
  const [studentData, setStudentData] = useState<AttendanceState>({ total: 0, present: 0, absent: 0, rate: 0 });
  const [teacherData, setTeacherData] = useState<AttendanceState>({ total: 0, present: 0, absent: 0, rate: 0 });
  const [currentTime, setCurrentTime] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  /* ---------------- CLOCK ---------------- */
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  /* ---------------- LOAD ATTENDANCE ---------------- */
  const loadAttendance = async () => {
    try {
      // Fetch total counts
      const [studentsRes, teachersRes] = await Promise.all([
        api.get('/students'),
        api.get('/teachers')
      ]);

      const totalStudent = studentsRes.data.length;
      const totalTeacher = teachersRes.data.length;

      // Fetch today's attendance
      const [studentRes, teacherRes] = await Promise.all([
        api.get(`/attendance/today`, { params: { role: "Student" } }),
        api.get(`/attendance/today`, { params: { role: "Teacher" } }),
      ]);

      // ✅ FIXED FUNCTION (takes total as parameter)
      const process = (data: any[], total: number) => {
        const present = data.filter((item: any) => item.status === "Present").length;

        return {
          total,
          present,
          absent: total - present,
          rate: total ? Math.round((present / total) * 100) : 0
        };
      };

      // ✅ PASS TOTALS CORRECTLY
      setStudentData(process(studentRes.data, totalStudent));
      setTeacherData(process(teacherRes.data, totalTeacher));

    } catch (err) {
      console.error("Attendance load error", err);
    }
  };

  useEffect(() => {
    if (isOpen) loadAttendance();
  }, [isOpen]);

  /* ---------------- SOCKET LIVE UPDATE ---------------- */
  useEffect(() => {
    if (!isOpen) return;

    const handleUpdate = () => {
      setIsUpdating(true);
      loadAttendance();
      setTimeout(() => setIsUpdating(false), 800);
    };
 
    socket.on("attendanceUpdate", handleUpdate);
    return () => {
      socket.off("attendanceUpdate", handleUpdate);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="dash-card bg-[var(--dash-surface)] relative w-full max-w-md border-[var(--dash-border)] overflow-hidden shadow-2xl rounded-3xl animate-modalSlideIn">
        
        {/* HEADER */}
        <div className="hero-gradient p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all z-50 group"
          >
            <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <UsersRound className={`w-7 h-7 ${isUpdating ? "animate-bounce text-green-300" : "text-white"}`} />
            </div>
            <div>
              <h2 className="text-2xl text-white font-bold nepali-text">आजको उपस्थिति</h2>
              <div className="flex items-center gap-2 text-xs text-white/80 mt-1 font-mono">
                <Clock className="w-3 h-3" />
                <span>लाइभ अपडेट: {currentTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-5">
          
          {/* STUDENTS */}
          <div className="p-5 rounded-2xl border border-[var(--dash-border)] bg-[var(--dash-surface-2)]">
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-blue-500" />
                <h3 className="font-bold nepali-text">विद्यार्थी</h3>
              </div>
              <span className="text-3xl font-black text-blue-500">{studentData.rate}%</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <StatBox label="कुल" value={studentData.total} color="var(--dash-text)" />
              <StatBox label="उपस्थित" value={studentData.present} color="var(--success)" />
              <StatBox label="अनुपस्थित" value={studentData.absent} color="var(--error)" />
            </div>
          </div>

          {/* TEACHERS */}
          <div className="p-5 rounded-2xl border border-[var(--dash-border)] bg-[var(--dash-surface-2)]">
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-green-500" />
                <h3 className="font-bold nepali-text">शिक्षक</h3>
              </div>
              <span className="text-3xl font-black text-green-500">{teacherData.rate}%</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <StatBox label="कुल" value={teacherData.total} color="var(--dash-text)" />
              <StatBox label="उपस्थित" value={teacherData.present} color="var(--success)" />
              <StatBox label="अनुपस्थित" value={teacherData.absent} color="var(--error)" />
            </div>
          </div>

          {/* BUTTON */}
          <button 
            onClick={onClose}
            className="w-full btn-primary py-4 rounded-2xl font-bold nepali-text"
          >
            बन्द गर्नुहोस्
          </button>
        </div>
      </div>
    </div>
  );
}

/* STAT BOX */
function StatBox({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="bg-[var(--dash-surface)] py-3 rounded-2xl text-center border border-[var(--dash-border)]">
      <p className="text-xl font-black" style={{ color }}>{value}</p>
      <p className="text-[10px] font-bold nepali-text text-[var(--dash-text-muted)]">
        {label}
      </p>
    </div>
  );
}
