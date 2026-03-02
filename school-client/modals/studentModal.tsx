'use client';

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

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
      setFormData(mode === "edit" && studentData ? { ...studentData } : {
        name: "",
        grade: "",
        email: "",
        attendance: undefined,
        gpa: undefined,
        status: "Active",
      });
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
      {/* Modal Container using .dash-card for background/border consistency */}
      <div className="dash-card w-full max-w-lg shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--dash-border)]">
          <h2 className="text-xl font-bold">
            {mode === "create" ? "Add New Student" : "Edit Student Details"}
          </h2>
          <button onClick={onClose} className="text-[var(--dash-text-muted)] hover:text-[var(--primary)] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            
            <div className="col-span-2">
              <label className="text-sm font-medium mb-1.5 block">Full Name</label>
              <input 
                name="name" value={formData.name} onChange={handleChange} 
                className="dash-input w-full" 
                placeholder="John Doe" required 
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium mb-1.5 block">Email Address</label>
              <input 
                name="email" type="email" value={formData.email} onChange={handleChange} 
                className="dash-input w-full" 
                placeholder="john@example.com" required 
              />
            </div>

            <div className="col-span-1">
              <label className="text-sm font-medium mb-1.5 block">Grade</label>
              <input 
                name="grade" value={formData.grade} onChange={handleChange} 
                className="dash-input w-full" 
                placeholder="e.g. 10" required 
              />
            </div>

            <div className="col-span-1">
              <label className="text-sm font-medium mb-1.5 block">Status</label>
              <select 
                name="status" value={formData.status} onChange={handleChange}
                className="dash-input w-full bg-transparent"
              >
                <option value="Active">Active</option>
                <option value="New">New</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div className="col-span-1">
              <label className="text-sm font-medium mb-1.5 block">Attendance %</label>
              <input 
                name="attendance" type="number" value={formData.attendance || ""} onChange={handleChange}
                className="dash-input w-full" 
                placeholder="95" 
              />
            </div>

            <div className="col-span-1">
              <label className="text-sm font-medium mb-1.5 block">GPA</label>
              <input 
                name="gpa" type="number" step="0.1" value={formData.gpa || ""} onChange={handleChange}
                className="dash-input w-full" 
                placeholder="4.0" 
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--dash-border)]">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-[var(--dash-border)] text-[var(--dash-text-muted)] hover:bg-[var(--dash-sidebar-hover)] transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary px-6 py-2"
            >
              {mode === "create" ? "Enroll Student" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;