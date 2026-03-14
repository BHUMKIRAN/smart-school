'use client';

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useCreateStudent, useUpdateStudent } from "@/hooks/useStudent";
import { API_BASE_URL } from "@/lib/endpoints";

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
  grade: string; // stores Grade _id
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

  // Fetch grades from backend
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/grades`); // make sure route exists
        if (!res.ok) throw new Error("Failed to fetch grades");
        const data = await res.json();
        setGrades(data);
      } catch (err) {
        console.error("Error fetching grades:", err);
      }
    };

    fetchGrades();
  }, []);

  // Prefill form in edit mode
  useEffect(() => {
    if (mode === "edit" && studentData) {
      setFormData({
        name: studentData.name || "",
        email: studentData.email || "",
        password: "",
        grade: studentData.grade || "",
        image: studentData.image || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [mode, studentData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === "create") {
        await createStudent.mutateAsync(formData);
      }

      if (mode === "edit" && studentData?._id) {
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="dash-card w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--dash-border)]">
          <h2 className="text-xl font-bold">
            {mode === "create" ? "Add New Student" : "Edit Student"}
          </h2>
          <button onClick={onClose} className="text-[var(--dash-text-muted)] hover:text-[var(--primary)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium mb-1 block">Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="dash-input w-full"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="dash-input w-full"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Password {mode === "edit" && "(optional)"}
            </label>
            <input
              name="password"
              type="password"
              value={formData.password || ""}
              onChange={handleChange}
              className="dash-input w-full"
              required={mode === "create"}
            />
          </div>

          {/* Grade Dropdown */}
          <div>
            <label className="text-sm font-medium mb-1 block">Grade</label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="dash-input w-full"
              required
            >
              <option value="">Select Grade</option>
              {grades.map((g) => (
                <option key={g._id} value={g._id}>
                  Grade {g.grade} - {g.section}
                </option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="text-sm font-medium mb-1 block">Image URL</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="dash-input w-full"
              placeholder="https://image-url.com"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--dash-border)]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-[var(--dash-border)]"
            >
              Cancel
            </button>

            <button type="submit" className="btn-primary px-6 py-2">
              {mode === "create" ? "Enroll Student" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;