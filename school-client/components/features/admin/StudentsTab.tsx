'use client';

import { toast } from "sonner";
import { useState } from "react";
import {
  UserPlus, Users, Search,
  Edit3, Trash2, Check, Mail, Eye, Loader2
} from "lucide-react";

import StudentModal from "@/modals/studentModal";
import { useStudents, useDeleteStudent } from "@/hooks/useStudent";

export interface Student {
  _id: string;
  name: string;
  grade: string | { _id: string; grade: number; section?: string };
  email: string;
  image?: string;
  attendance?: {
    status?: string;
  };
}

interface studenttabProps {
  setmodalStudentView?: any;
}

export default function StudentsTab({ setmodalStudentView }: studenttabProps) {
  const { data, isLoading, isError } = useStudents();
  const students = data ?? [];
  const { mutate: deleteStudent } = useDeleteStudent();

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const getGradeLabel = (grade: Student["grade"] | null | undefined) => {
    if (!grade) return "-";
    if (typeof grade === "string") return grade;
    return `${grade.grade}${grade.section ? `-${grade.section}` : ""}`;
  };

  const handleOpenModal = (student: Student | null, mode: "create" | "edit") => {
    setSelectedStudent(student);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const filteredStudents = students.filter((s: Student) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getGradeLabel(s.grade).toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-[var(--primary)] animate-spin" />
        <p className="text-[var(--dash-text-muted)] font-black text-sm uppercase tracking-widest">
          Loading Registry...
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn space-y-8 pb-10">
      
      {/* ================= KPI SECTION (Larger Fonts) ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="dash-card p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[var(--primary)]/10 shrink-0">
            <Users className="w-7 h-7 text-[var(--primary)]" />
          </div>
          <div>
            <p className="text-xs font-black uppercase text-[var(--dash-text-muted)] tracking-wider">Total</p>
            <h3 className="text-2xl font-black text-[var(--dash-text)] leading-none mt-1">{students.length}</h3>
          </div>
        </div>

        <div className="dash-card p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[var(--success)]/10 shrink-0">
            <Check className="w-7 h-7 text-[var(--success)]" />
          </div>
          <div>
            <p className="text-xs font-black uppercase text-[var(--dash-text-muted)] tracking-wider">Present</p>
            <h3 className="text-2xl font-black text-[var(--dash-text)] leading-none mt-1">
               {students.filter((s) => s.attendance?.status?.toLowerCase() === "present").length}
            </h3>
          </div>
        </div>

        <button 
          onClick={() => handleOpenModal(null, "create")}
          className="dash-card p-6 flex items-center gap-5 hover:border-[var(--primary)] transition-all group active:scale-95 text-left"
        >
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[var(--primary)] text-white group-hover:rotate-12 transition-transform shrink-0 shadow-lg shadow-blue-500/20">
            <UserPlus className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-black uppercase text-[var(--dash-text-muted)] tracking-wider">Registration</p>
            <h3 className="text-lg font-bold text-[var(--primary)] uppercase">Add Student</h3>
          </div>
        </button>

        <div className="dash-card p-6 flex items-center gap-3 relative">
          <Search className="w-5 h-5 text-[var(--dash-text-muted)] absolute left-10" />
          <input
            type="text"
            placeholder="Search records..."
            className="dash-input w-full pl-12 py-3 text-base border-none bg-[var(--dash-surface-2)] font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ================= DATA TABLE (Larger Content) ================= */}
      <div className="dash-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[var(--dash-surface-2)] border-b border-[var(--dash-border)]">
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-[var(--dash-text-muted)]">Profile</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-[var(--dash-text-muted)]">Grade</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-[var(--dash-text-muted)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--dash-border)]">
              {filteredStudents.map((student: Student) => (
                <tr key={student._id} className="hover:bg-[var(--dash-sidebar-hover)] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      {/* Student Image */}
                      <div className="w-12 h-12 rounded-full border-2 border-[var(--dash-border)] bg-[var(--dash-bg)] overflow-hidden shrink-0 shadow-sm">
                        {student.image ? (
                          <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[var(--primary)] font-bold text-xl bg-[var(--primary)]/5">
                            {student.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-[var(--dash-text)] text-base md:text-lg tracking-tight truncate">{student.name}</span>
                        <span className="text-xs text-[var(--dash-text-muted)] flex items-center gap-1.5 font-medium truncate">
                          <Mail className="w-3.5 h-3.5" /> {student.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1.5 rounded-lg bg-[var(--dash-bg)] border border-[var(--dash-border)] text-xs font-black text-[var(--dash-text)] uppercase tracking-tight">
                      {getGradeLabel(student.grade)}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2 sm:gap-3">
                      {setmodalStudentView && (
                        <button
                          onClick={() => setmodalStudentView({ type: "view", data: student })}
                          className="p-2.5 text-[var(--info)] hover:bg-[var(--info)]/10 rounded-xl transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleOpenModal(student, "edit")}
                        className="p-2.5 text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-xl transition-colors"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          if (!confirm("Delete this student record?")) return;
                          deleteStudent(student._id);
                          toast.success("Entry removed");
                        }}
                        className="p-2.5 text-[var(--error)] hover:bg-[var(--error)]/10 rounded-xl transition-colors"
                      >
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

      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        studentData={selectedStudent || undefined}
        refreshStudents={() => window.location.reload()}
      />
    </div>
  );
}