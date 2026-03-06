'use client';

import React, { useEffect, useState } from "react";
import { X, Check, X as CloseIcon } from "lucide-react";
import { useCreateTeacher, useEditTeacher, } from "@/hooks/useTeacher";
import { useCreateTeacherAttendance } from "@/hooks/useTeacherAttendance";

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  teacherData?: any;
  refreshTeachers: () => void;
}

const TeacherModal: React.FC<TeacherModalProps> = ({ isOpen, onClose, mode, teacherData, refreshTeachers }) => {
  const createTeacher = useCreateTeacher();
  const editTeacher = useEditTeacher()
  const markAttendance = useCreateTeacherAttendance();

  const [tab, setTab] = useState<"info" | "att">("info");
  const [status, setStatus] = useState<"present" | "absent">("present");
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", department: "", salary: "" });

  const createTeachers = useCreateTeacher()

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

    try {
      let savedTeacher;

      // 1. Handle Teacher Creation/Update
      if (mode === "create") {
        savedTeacher = await createTeacher.mutateAsync(form);
      } else {
        savedTeacher = await editTeacher.mutateAsync({
          ...form,
          _id: teacherData?._id
        });
      }

      // 2. Handle Attendance Mutation
      if (tab === "att") {
        // Use the newly created ID or the existing one
        const targetId = mode === "create" ? savedTeacher?._id : teacherData?._id;

        await markAttendance.mutateAsync({
          teacherId: targetId,
          status,
          date: new Date().toISOString().split('T')[0],
        });
      }

      // 3. UI Cleanup
      // No need for refreshTeachers() because TanStack Query invalidates the cache automatically
      onClose();

    } catch (error) {
      // Errors are already toasted by your hook's onError, 
      // but catching here prevents the modal from closing on failure.
      console.error("Submission failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="dash-card w-full max-w-lg shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--dash-border)]">
          <h2 className="text-xl font-bold">
            {mode === "create" ? "Add New Faculty" : "Faculty Management"}
          </h2>
          <button onClick={onClose} className="text-[var(--dash-text-muted)] hover:text-[var(--primary)] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation (Using global tab classes) */}
        {mode === "edit" && (
          <div className="px-6 mt-4 flex gap-2">
            <button
              onClick={() => setTab("info")}
              className={`tab-button ${tab === 'info' ? 'tab-active' : ''}`}
            >
              General Info
            </button>
            <button
              onClick={() => setTab("att")}
              className={`tab-button ${tab === 'att' ? 'tab-active' : ''}`}
            >
              Attendance
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {tab === "info" ? (
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(form).filter(k => !['_id', '__v', 'status'].includes(k)).map((key) => (
                <div key={key} className={key === "name" || key === "email" ? "col-span-2" : "col-span-1"}>
                  <label className="text-sm font-medium mb-1.5 block capitalize">{key}</label>
                  <input
                    value={(form as any)[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={`Enter ${key}...`}
                    className="dash-input w-full"
                    required
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-4 space-y-6">
              <div className="text-center p-4 bg-[var(--muted-bg)] rounded-xl border border-[var(--dash-border)]">
                <p className="text-xs text-[var(--muted-text)] font-semibold uppercase tracking-wider">Today's Date</p>
                <h3 className="text-lg font-bold">{new Date().toDateString()}</h3>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStatus("present")}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${status === 'present' ? 'border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)]' : 'border-[var(--dash-border)] opacity-50 grayscale'}`}
                >
                  <Check className="w-6 h-6" />
                  <span className="font-bold text-sm">Present</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("absent")}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${status === 'absent' ? 'border-[var(--error)] bg-[var(--error)]/10 text-[var(--error)]' : 'border-[var(--dash-border)] opacity-50 grayscale'}`}
                >
                  <X className="w-6 h-6" />
                  <span className="font-bold text-sm">Absent</span>
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--dash-border)]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-[var(--dash-border)] text-[var(--dash-text-muted)] hover:bg-[var(--dash-sidebar-hover)] transition-all"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary px-6 py-2">
              {tab === "info" ? "Save Details" : "Confirm Attendance"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherModal;