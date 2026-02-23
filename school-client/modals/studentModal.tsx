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
    if (mode === "edit" && studentData) {
      setFormData({
        name: studentData.name || "",
        grade: studentData.grade || "",
        email: studentData.email || "",
        attendance: studentData.attendance,
        gpa: studentData.gpa,
        status: studentData.status || "Active",
      });
    } else {
      setFormData({
        name: "",
        grade: "",
        email: "",
        attendance: undefined,
        gpa: undefined,
        status: "Active",
      });
    }
  }, [mode, studentData, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url =
        mode === "create"
          ? "http://localhost:8080/students"
          : `http://localhost:8080/students/${studentData?._id}`;

      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save student");

      alert(mode === "create" ? "Student added!" : "Student updated!");
      refreshStudents();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white text-black rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-5">
          {mode === "create" ? "Add New Student" : "Edit Student"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            placeholder="Grade"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="attendance"
            type="number"
            value={formData.attendance || ""}
            onChange={handleChange}
            placeholder="Attendance %"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="gpa"
            type="number"
            step="0.01"
            value={formData.gpa || ""}
            onChange={handleChange}
            placeholder="GPA"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="New">New</option>
            <option value="Pending">Pending</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            {mode === "create" ? "Add Student" : "Update Student"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;