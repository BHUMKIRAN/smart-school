'use client';

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  teacherData?: any;
  refreshTeachers: () => void;
}

const TeacherModal: React.FC<TeacherModalProps> = ({
  isOpen,
  onClose,
  mode,
  teacherData,
  refreshTeachers
}) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    department: "",
    salary: "",
  });

  // ✅ Autofill when editing
  useEffect(() => {
    if (mode === "edit" && teacherData) {
      setFormData({
        name: teacherData.name || "",
        email: teacherData.email || "",
        phone: teacherData.phone || "",
        subject: teacherData.subject || "",
        department: teacherData.department || "",
        salary: teacherData.salary || "",
      });
    }
  }, [teacherData, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Single Submit Function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url =
        mode === "create"
          ? "http://localhost:8080/teachers"
          : `http://localhost:8080/teachers/${teacherData._id}`;

      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save teacher");

      alert(
        mode === "create"
          ? "Teacher created successfully"
          : "Teacher updated successfully"
      );

      refreshTeachers();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white text-black rounded-xl shadow-lg w-full max-w-md p-6 relative">

        <button
          className="absolute top-1 right-1"
          onClick={onClose}
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {mode === "create" ? "Add Teacher" : "Edit Teacher"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" required />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded" required />
          <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className="w-full p-2 border rounded" required />
          <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" className="w-full p-2 border rounded" required />
          <input name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" className="w-full p-2 border rounded" required />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            {mode === "create" ? "Add Teacher" : "Update Teacher"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherModal;