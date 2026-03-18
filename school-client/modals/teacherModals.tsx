'use client';

import React, { useEffect, useState } from "react";
import { X, Check, User, Mail, Phone, BookOpen, Building2, Banknote, GraduationCap } from "lucide-react";
import { useCreateTeacher, useEditTeacher } from "@/hooks/useTeacher";
import { useCreateTeacherAttendance } from "@/hooks/useTeacherAttendance";
import { api } from "@/Backend/axiosClientInstance";
import Logo from "@/components/shared/logo";

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  teacherData?: any;
}

const TeacherModal: React.FC<TeacherModalProps> = ({
  isOpen,
  onClose,
  mode,
  teacherData,
}) => {
  const createTeacher = useCreateTeacher();
  const editTeacher = useEditTeacher();
  const markAttendance = useCreateTeacherAttendance();

  const [grades, setGrades] = useState<any[]>([]);
  const [tab, setTab] = useState<"info" | "att">("info");
  const [status, setStatus] = useState<"present" | "absent">("present");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    subject: "",
    department: "",
    salary: "",
    gradeId: "",
  });

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await api.get(`/grades`);
        setGrades(res.data);
      } catch (err) {
        console.error("Failed to fetch grades", err);
      }
    };
    if (isOpen) fetchGrades();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && teacherData) {
        setForm({
          name: teacherData.name || "",
          email: teacherData.email || "",
          password: "",
          phone: teacherData.phone || "",
          subject: teacherData.subject || "",
          department: teacherData.department || "",
          salary: teacherData.salary || "",
          gradeId: teacherData.grades?.[0]?._id || "",
        });
        setTab("info");
      } else {
        setForm({
          name: "", email: "", password: "", phone: "",
          subject: "", department: "", salary: "", gradeId: "",
        });
        setTab("info");
      }
    }
  }, [teacherData, mode, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let savedTeacher;
      if (mode === "create") {
        savedTeacher = await createTeacher.mutateAsync(form);
      } else {
        savedTeacher = await editTeacher.mutateAsync({
          ...form,
          _id: teacherData?._id,
        });
      }

      if (tab === "att") {
        const targetId = mode === "create" ? savedTeacher?._id : teacherData?._id;
        await markAttendance.mutateAsync({
          teacherId: targetId,
          status,
          date: new Date().toISOString().split("T")[0],
        });
      }
      onClose();
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="dash-card w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--dash-border)] bg-primary-dark">
          <div>
            <Logo/>
            <h2 className="text-xl text-white font-bold tracking-tight">
              {mode === "create" ? "Add New Faculty" : "Faculty Management"}
            </h2>
            <p className="text-xs text-white mt-1">
              {mode === "create" ? "Register a new teacher to the system" : `Managing: ${teacherData?.name}`}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[var(--muted-bg)]  rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* TABS (Only shown in Edit mode) */}
        {mode === "edit" && (
          <div className="px-6 pt-4 flex gap-2 bg-[var(--dash-surface)]">
            <button
              onClick={() => setTab("info")}
              className={`tab-button flex items-center gap-2 ${tab === "info" ? "tab-active" : "hover:bg-[var(--dash-sidebar-hover)]"}`}
            >
              <User className="w-4 h-4" /> General Info
            </button>
            <button
              onClick={() => setTab("att")}
              className={`tab-button flex items-center gap-2 ${tab === "att" ? "tab-active" : "hover:bg-[var(--dash-sidebar-hover)]"}`}
            >
              <Check className="w-4 h-4" /> Attendance
            </button>
          </div>
        )}

        {/* FORM CONTENT */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {tab === "info" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* NAME */}
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                  <User className="w-4 h-4 text-[var(--primary)]" /> Full Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="dash-input w-full"
                  placeholder="e.g. Dr. Jane Doe"
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[var(--primary)]" /> Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="dash-input w-full"
                  placeholder="jane.doe@school.edu"
                  required
                />
              </div>

              {/* PASSWORD (Create Only) */}
              {mode === "create" && (
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold mb-1.5 block">Default Password</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="dash-input w-full"
                    required
                  />
                </div>
              )}

              {/* PHONE */}
              <div>
                <label className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[var(--primary)]" /> Phone
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="dash-input w-full"
                />
              </div>

              {/* SUBJECT */}
              <div>
                <label className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[var(--primary)]" /> Subject
                </label>
                <input
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="dash-input w-full"
                />
              </div>

              {/* DEPARTMENT */}
              <div>
                <label className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[var(--primary)]" /> Department
                </label>
                <input
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="dash-input w-full"
                />
              </div>

              {/* SALARY */}
              <div>
                <label className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-[var(--primary)]" /> Monthly Salary
                </label>
                <input
                  value={form.salary}
                  onChange={(e) => setForm({ ...form, salary: e.target.value })}
                  className="dash-input w-full"
                  type="number"
                />
              </div>

              {/* GRADE SELECT */}
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[var(--primary)]" /> Primary Grade Assignment
                </label>
                <select
                  value={form.gradeId}
                  onChange={(e) => setForm({ ...form, gradeId: e.target.value })}
                  className="dash-input w-full appearance-none bg-no-repeat bg-right pr-10"
                  required
                >
                  <option value="">Choose a grade...</option>
                  {grades.map((g) => (
                    <option key={g._id} value={g._id}>
                      Grade {g.grade} {g.section ? `- ${g.section}` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            /* ATTENDANCE TAB */
            <div className="py-6 space-y-8">
              <div className="text-center p-6 bg-[var(--dash-surface-2)] rounded-2xl border border-[var(--dash-border)]">
                <p className="text-xs uppercase tracking-widest text-[var(--dash-text-muted)] font-bold mb-1">Today's Entry</p>
                <h3 className="text-2xl font-bold">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h3>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStatus("present")}
                  className={`flex-1 p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all
                  ${status === "present"
                      ? "border-[var(--success)] bg-green-500/10 text-[var(--success)]"
                      : "border-[var(--dash-border)] text-[var(--dash-text-muted)] opacity-60 hover:opacity-100"
                    }`}
                >
                  <div className={`p-3 rounded-full ${status === 'present' ? 'bg-[var(--success)] text-white' : 'bg-[var(--muted-bg)]'}`}>
                    <Check className="w-8 h-8" />
                  </div>
                  <span className="font-bold">Mark Present</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus("absent")}
                  className={`flex-1 p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all
                  ${status === "absent"
                      ? "border-[var(--error)] bg-red-500/10 text-[var(--error)]"
                      : "border-[var(--dash-border)] text-[var(--dash-text-muted)] opacity-60 hover:opacity-100"
                    }`}
                >
                  <div className={`p-3 rounded-full ${status === 'absent' ? 'bg-[var(--error)] text-white' : 'bg-[var(--muted-bg)]'}`}>
                    <X className="w-8 h-8" />
                  </div>
                  <span className="font-bold">Mark Absent</span>
                </button>
              </div>
            </div>
          )}

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-[var(--dash-border)]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 font-medium border border-[var(--dash-border)] rounded-xl hover:bg-[var(--muted-bg)] transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary px-8 py-2.5 rounded-xl shadow-lg shadow-blue-500/20"
            >
              {tab === "info" ? "Save Details" : "Confirm Attendance"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherModal;