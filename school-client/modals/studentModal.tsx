'use client';

import React, { useEffect, useState } from "react";
import { X, User, Mail, Lock, GraduationCap, Image as ImageIcon } from "lucide-react";
import { useCreateStudent, useUpdateStudent } from "@/hooks/useStudent";
import { api } from "@/Backend/axiosClientInstance";
import Logo from "@/components/shared/logo";

interface Grade {
  _id: string;
  grade: number;
  section: string;
}

interface Student {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  grade: string | { _id: string; grade: number; section?: string };
  image?: string;
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
  const createStudent = useCreateStudent();
  const updateStudent = useUpdateStudent();
  const [grades, setGrades] = useState<Grade[]>([]);

  const initialState: Student = {
    name: "",
    email: "",
    password: "",
    grade: "",
    image: "",
  };

  const [formData, setFormData] = useState<Student>(initialState);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await api.get(`/grades`);
        setGrades(res.data);
      } catch (err) {
        console.error("Error fetching grades:", err);
      }
    };
    if (isOpen) fetchGrades();
  }, [isOpen]);

  useEffect(() => {
    if (mode === "edit" && studentData) {
      setFormData({
        name: studentData.name || "",
        email: studentData.email || "",
        password: "",
        grade: typeof studentData.grade === "string" ? studentData.grade : studentData.grade?._id || "",
        image: studentData.image || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [mode, studentData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        await createStudent.mutateAsync(formData);
      } else if (mode === "edit" && studentData?._id) {
        const payload = { ...formData };
        if (!payload.password) delete payload.password;
        await updateStudent.mutateAsync({
          id: studentData._id,
          data: payload,
        });
      }
      refreshStudents();
      onClose();
    } catch (err) {
      console.error("Student submit error:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="dash-card w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--dash-border)] bg-primary-dark">
          <div>
            <Logo/>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {mode === "create" ? "Enroll New Student" : "Update Student Profile"}
            </h2>
            <p className="text-xs text-white mt-1">
              {mode === "create" ? "Register a student to a specific grade and section" : `Editing record for ${studentData?.name}`}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[var(--muted-bg)] rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5">
          <div className="grid grid-cols-1 gap-5">
            
            {/* FULL NAME */}
            <div>
              <label className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                <User className="w-4 h-4 text-[var(--primary)]" /> Full Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="dash-input w-full"
                placeholder="e.g. Ayush Shrestha"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--primary)]" /> Email Address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="dash-input w-full"
                placeholder="student@example.com"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                <Lock className="w-4 h-4 text-[var(--primary)]" /> 
                Password {mode === "edit" && <span className="text-[var(--dash-text-muted)] font-normal">(leave blank to keep current)</span>}
              </label>
              <input
                name="password"
                type="password"
                value={formData.password || ""}
                onChange={handleChange}
                className="dash-input w-full"
                placeholder="••••••••"
                required={mode === "create"}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {/* GRADE SELECTION */}
              <div>
                <label className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[var(--primary)]" /> Grade
                </label>
                <select
                  name="grade"
                  value={typeof formData.grade === "string" ? formData.grade : formData.grade?._id || ""}
                  onChange={handleChange}
                  className="dash-input w-full appearance-none"
                  required
                >
                  <option value="">Select Grade</option>
                  {grades.map((g) => (
                    <option key={g._id} value={g._id}>
                      Grade {g.grade} {g.section ? `- ${g.section}` : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* IMAGE URL */}
              <div>
                <label className="text-sm font-semibold mb-1.5 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[var(--primary)]" /> Profile URL
                </label>
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="dash-input w-full"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-[var(--dash-border)]">
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
              {mode === "create" ? "Enroll Student" : "Update Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;