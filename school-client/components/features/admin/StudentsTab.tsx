'use client';

import { useState } from "react";
import { StatCard } from "@/components/ui/card/Card";
import StudentModal from "@/modals/studentModal";
import { useStudents, useDeleteStudent } from "@/hooks/useStudent";

export interface Student {
  _id: string;
  name: string;
  grade: string;
  email: string;
  attendance?: number;
  gpa?: number;
  status?: string;
}

export default function StudentsTab() {

  const { data: students = [], isLoading } = useStudents();
  const { mutate: deleteStudent } = useDeleteStudent();

  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this student record?")) return;
    deleteStudent(id);
  };

  const handleOpenModal = (student: Student | null = null) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleSuccess = () => {
    setShowModal(false);
  };

  const filteredStudents = students.filter((s: Student) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: students.length,
    active: students.filter((s: Student) => s.status?.toLowerCase() === "active").length,
    highGPA: students.filter((s: Student) => (s.gpa || 0) >= 3.5).length,
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="dash-text-muted font-medium animate-pulse">
          Synchronizing Student Database...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          label="Total Students"
          value={stats.total}
          icon={<UsersIcon className="w-6 h-6 text-primary" />}
        />
        <StatCard
          label="Active Status"
          value={stats.active || stats.total}
          icon={<CheckBadgeIcon className="w-6 h-6 text-success" />}
        />
        <StatCard
          label="Honor Roll (3.5+)"
          value={stats.highGPA}
          icon={<UserPlusIcon className="w-6 h-6 text-warning" />}
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-dash-surface-2 p-4 rounded-2xl border dash-border">
        <input
          type="text"
          placeholder="Search by name or grade..."
          className="dash-input w-full md:w-96"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
          onClick={() => handleOpenModal(null)}
          className="px-6 py-2 bg-primary text-white rounded-xl"
        >
          Add New Student
        </button>
      </div>

      {/* Students Table */}
      <div className="dash-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">

            <thead>
              <tr className="bg-dash-surface-2 border-b dash-border">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Grade</th>
                <th className="px-6 py-4">GPA</th>
                <th className="px-6 py-4">Attendance</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student: Student) => (
                  <tr key={student._id} className="hover:bg-dash-surface-2">

                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4">{student.grade}</td>

                    <td className="px-6 py-4">
                      {student.gpa?.toFixed(2) || "0.00"}
                    </td>

                    <td className="px-6 py-4">
                      {student.attendance || 0}%
                    </td>

                    <td className="px-6 py-4 text-right space-x-2">

                      <button
                        onClick={() => handleOpenModal(student)}
                        className="text-blue-500"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(student._id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-10 text-center">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      <StudentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        mode="create"
        onSuccess={handleSuccess}
      />
    </div>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" d="M12 4a4 4 0 110 8 4 4 0 010-8z" />
    </svg>
  );
}

function CheckBadgeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" d="M9 12l2 2 4-4" />
    </svg>
  );
}

function UserPlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" d="M12 6v12M6 12h12" />
    </svg>
  );
}