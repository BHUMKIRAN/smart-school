'use client';

import { useState } from "react";
import {
  UserPlus, Users, Search,
  Edit3, Trash2, GraduationCap,
  Check, X, Mail, Eye, Loader2, UploadCloud
} from "lucide-react";

import TeacherModal from "@/modals/teacherModals";
import { useTeachers, useDeleteTeacher } from "@/hooks/useTeacher";
import { useMarkTeacherAttendance } from "@/hooks/useAdmin";
import { api } from "@/Backend/axiosClientInstance";
import { toast } from "sonner";

export interface Teacher {
  _id: string;
  name: string;
  subject: string;
  email: string;
  status?: string;
  phone?: string;
  department?: string;
  salary?: string;
  profilePic?: string;
}

type TeacherModalViewState = {
  type: "teacher" | "student" | "view" | null;
  data?: Teacher | null;
};

interface teachertabProps {
  setmodalView: (view: TeacherModalViewState) => void;
}

export default function TeachersTab({ setmodalView }: teachertabProps) {
  const { data, isLoading, isError } = useTeachers();
  const teachers = data ?? [];
  const deleteTeacher = useDeleteTeacher();
  const { mutate: markAttendance } = useMarkTeacherAttendance();

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const handleOpenModal = (teacher: Teacher | null, mode: "create" | "edit") => {
    setSelectedTeacher(teacher);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleUpload = async (teacherId: string) => {
    if (!pdfFile) return toast.error("Select a PDF file first");
    const formData = new FormData();
    formData.append("teacherId", teacherId);
    formData.append("file", pdfFile);

    try {
      await api.post(`/schedule/schedule`, formData);
      toast.success("Schedule updated successfully");
      setPdfFile(null);
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  const filteredTeachers = teachers.filter((t: Teacher) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-[var(--primary)] animate-spin" />
        <p className="text-[var(--dash-text-muted)] font-black text-sm uppercase tracking-widest">
          Loading Faculty Records...
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn space-y-8 pb-10">
      
      {/* ================= KPI SECTION (Larger Numbers) ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="dash-card p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[var(--primary)]/10 shrink-0">
            <Users className="w-7 h-7 text-[var(--primary)]" />
          </div>
          <div>
            <p className="text-xs font-black uppercase text-[var(--dash-text-muted)] tracking-wider">Staff</p>
            <h3 className="text-2xl font-black text-[var(--dash-text)] leading-none mt-1">{teachers.length}</h3>
          </div>
        </div>

        <div className="dash-card p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[var(--success)]/10 shrink-0">
            <GraduationCap className="w-7 h-7 text-[var(--success)]" />
          </div>
          <div>
            <p className="text-xs font-black uppercase text-[var(--dash-text-muted)] tracking-wider">Active</p>
            <h3 className="text-2xl font-black text-[var(--dash-text)] leading-none mt-1">{teachers.length}</h3>
          </div>
        </div>

        <button 
          onClick={() => handleOpenModal(null, "create")}
          className="dash-card p-6 flex items-center gap-5 hover:border-[var(--primary)] transition-all group text-left active:scale-95"
        >
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[var(--primary)] text-white group-hover:scale-110 transition-transform shrink-0 shadow-lg shadow-blue-500/20">
            <UserPlus className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-black uppercase text-[var(--dash-text-muted)] tracking-wider">HR Dept</p>
            <h3 className="text-lg font-bold text-[var(--primary)] uppercase">Add Teacher</h3>
          </div>
        </button>

        <div className="dash-card p-6 flex items-center gap-3 relative">
          <Search className="w-5 h-5 text-[var(--dash-text-muted)] absolute left-10" />
          <input
            type="text"
            placeholder="Search faculty..."
            className="dash-input w-full pl-12 py-3 text-base border-none bg-[var(--dash-surface-2)] font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ================= DATA TABLE (Larger Body Text) ================= */}
      <div className="dash-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--dash-surface-2)] border-b border-[var(--dash-border)]">
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-[var(--dash-text-muted)]">Faculty Member</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-[var(--dash-text-muted)] hidden md:table-cell">Schedule</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-[var(--dash-text-muted)] text-center">Attendance</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-[var(--dash-text-muted)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--dash-border)]">
              {filteredTeachers.map((teacher: Teacher) => (
                <tr key={teacher._id} className="hover:bg-[var(--dash-sidebar-hover)] transition-colors group">
                  
                  {/* PROFILE - Larger Names */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border-2 border-[var(--dash-border)] bg-[var(--dash-bg)] overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
                        {teacher.profilePic ? (
                          <img src={teacher.profilePic} alt={teacher.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-bold text-[var(--primary)] text-lg">{teacher.name.charAt(0)}</span>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-[var(--dash-text)] text-base md:text-lg truncate tracking-tight">{teacher.name}</span>
                        <span className="text-sm text-[var(--dash-text-muted)] font-medium truncate md:hidden">{teacher.subject}</span>
                        <span className="text-xs text-[var(--dash-text-muted)] hidden md:flex items-center gap-1.5 font-medium">
                          <Mail className="w-3.5 h-3.5" /> {teacher.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* SCHEDULE - Larger Upload button */}
                  <td className="px-6 py-5 hidden md:table-cell">
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer p-2 rounded-lg bg-[var(--dash-bg)] border border-[var(--dash-border)] hover:bg-[var(--dash-surface-2)] transition shadow-sm">
                        <UploadCloud className="w-5 h-5 text-[var(--dash-text-muted)]" />
                        <input type="file" className="hidden" accept=".pdf" onChange={e => e.target.files && setPdfFile(e.target.files[0])} />
                      </label>
                      <button 
                        onClick={() => handleUpload(teacher._id)}
                        className="text-xs font-black text-[var(--primary)] uppercase tracking-wider hover:text-[var(--primary-dark)]"
                      >
                        Push Schedule
                      </button>
                    </div>
                  </td>

                  {/* ATTENDANCE - Larger Touch Targets */}
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => markAttendance({ teacherId: teacher._id, status: "Present" })}
                        className="p-2.5 rounded-xl bg-[var(--success)]/10 text-[var(--success)] hover:bg-[var(--success)] hover:text-white transition-all shadow-sm"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => markAttendance({ teacherId: teacher._id, status: "Absent" })}
                        className="p-2.5 rounded-xl bg-[var(--error)]/10 text-[var(--error)] hover:bg-[var(--error)] hover:text-white transition-all shadow-sm"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </td>

                  {/* ACTIONS - Larger Icons */}
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2 sm:gap-3">
                      <button onClick={() => setmodalView({ type: "view", data: teacher })} className="p-2 text-[var(--info)] rounded-lg hover:bg-[var(--info)]/10 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleOpenModal(teacher, "edit")} className="p-2 text-[var(--primary)] rounded-lg hover:bg-[var(--primary)]/10 transition-colors">
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button onClick={() => deleteTeacher.mutate(teacher._id)} className="p-2 text-[var(--error)] rounded-lg hover:bg-[var(--error)]/10 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        teacherData={selectedTeacher || undefined}
      />
    </div>
  );
}