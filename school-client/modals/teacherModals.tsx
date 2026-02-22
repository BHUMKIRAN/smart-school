'use client';

import React, { useState } from "react";
import { X } from "lucide-react";

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeacherModal: React.FC<TeacherModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    department: "",
    salary: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    alert("teacher added successfully")
      

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        department: "",
        salary: "",
      });

      onClose(); // close modal
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-4 right-1 text- text-black hover:text-gray-900 dark:hover:text-white"
          onClick={onClose}
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Add Teacher
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded text-black" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded text-black" required />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded text-black" required />
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className="w-full p-2 border rounded text-black" required />
          <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Department" className="w-full p-2 border rounded text-black" required />
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" className="w-full p-2 border rounded text-black" required />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Add Teacher
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherModal;