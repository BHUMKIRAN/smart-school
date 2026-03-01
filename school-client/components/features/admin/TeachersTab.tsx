'use client';

import { useEffect, useState } from "react";
import { 
  UserPlus, Users, CalendarCheck, Search, 
  Edit3, Trash2, GraduationCap, Check, X,
  MoreVertical, Mail, BookOpen
} from "lucide-react";
import TeacherModal from "@/modals/teacherModals"; // Path to your modal

export interface Teacher {
  _id: string;
  name: string;
  subject: string;
  email: string;
  status?: string;
  phone?: string;
  department?: string;
  salary?: string;
}

export default function TeachersTab() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [initialTab, setInitialTab] = useState<"profile" | "attendance">("profile");

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/teachers");
      const data = await response.json();
      setTeachers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleOpenModal = (teacher: Teacher | null, mode: "create" | "edit", tab: "profile" | "attendance" = "profile") => {
    setSelectedTeacher(teacher);
    setModalMode(mode);
    setInitialTab(tab);
    setIsModalOpen(true);
  };

  const markQuickAttendance = async (teacherId: string, status: "present" | "absent") => {
    try {
      const response = await fetch("http://localhost:8080/attendance/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherId,
          status,
          date: new Date().toISOString().split('T')[0]
        }),
      });
      if (response.ok) alert(`Marked ${status} successfully`);
    } catch (error) {
      alert("Failed to mark attendance");
    }
  };

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-bold tracking-tighter uppercase text-xs">Accessing Faculty Database...</p>
    </div>
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      
      {/* 1. KEY PERFORMANCE INDICATORS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Faculty</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{teachers.length}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Today</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{teachers.length}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-5 group cursor-pointer hover:border-indigo-500 transition-all" onClick={() => handleOpenModal(null, "create")}>
          <div className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-all rounded-2xl">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Hire</p>
            <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300">Add Entry</h3>
          </div>
        </div>
      </div>

      {/* 2. MANAGEMENT TOOLBAR */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-4 rounded-3xl border border-slate-200 dark:border-slate-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, subject, or ID..."
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
           <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 hover:text-indigo-600 transition-all">
             <MoreVertical className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* 3. FACULTY TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Faculty Member</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Department</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Daily Attendance</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTeachers.map((teacher) => (
                <tr key={teacher._id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all">
                  {/* Name & Email */}
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-indigo-500/20">
                        {teacher.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 dark:text-white leading-tight">{teacher.name}</p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <Mail className="w-3 h-3" /> {teacher.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Subject */}
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300 tracking-tight">{teacher.subject}</span>
                    </div>
                  </td>

                  {/* QUICK ATTENDANCE FEATURE */}
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-center gap-3">
                      <button 
                        onClick={() => markQuickAttendance(teacher._id, "present")}
                        title="Mark Present"
                        className="p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => markQuickAttendance(teacher._id, "absent")}
                        title="Mark Absent"
                        className="p-2.5 rounded-xl border border-rose-100 dark:border-rose-900/30 bg-rose-50 dark:bg-rose-900/20 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                  {/* SETTINGS */}
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => handleOpenModal(teacher, "edit", "profile")}
                        className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. MODAL INTEGRATION */}
      <TeacherModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        teacherData={selectedTeacher || undefined}
        refreshTeachers={fetchTeachers}
      />
    </div>
  );
}