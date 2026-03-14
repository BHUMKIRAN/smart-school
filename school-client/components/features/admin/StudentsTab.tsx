'use client';

import { useState } from "react";
import {
  UserPlus, Users, Search,
  Edit3, Trash2, Check, Mail, Eye
} from "lucide-react";

import StudentModal from "@/modals/studentModal";
import { useStudents, useDeleteStudent } from "@/hooks/useStudent";

export interface Student {
  _id: string;
  name: string;
  grade: string | { _id: string; grade: number; section?: string };
  email: string;
  password: string;
  class: string;
  attendance?: {
    status?: string;
  };
}

interface studenttabProps {
  setmodalStudentView?: any;
}

export default function StudentsTab({ setmodalStudentView }: studenttabProps) {

  // GET students
  const { data: students = [], isLoading, isError } = useStudents();
  const { mutate: deleteStudent } = useDeleteStudent();

  // ----------------------------
  // State
  // ----------------------------
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const getGradeLabel = (grade: Student["grade"] | null | undefined) => {
    if (!grade) return "-";
    if (typeof grade === "string") return grade;
    return `Grade ${grade.grade}${grade.section ? `-${grade.section}` : ""}`;
  };

  // ----------------------------
  // OPEN MODAL
  // ----------------------------
  const handleOpenModal = (student: Student | null, mode: "create" | "edit") => {
    setSelectedStudent(student);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  // ----------------------------
  // Filtering
  // ----------------------------
  const filteredStudents = students.filter((s: Student) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getGradeLabel(s.grade).toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ----------------------------
  // Loading
  // ----------------------------
  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold text-xs uppercase">
          Accessing Student Database...
        </p>
      </div>
    );
  }

  // ----------------------------
  // Error
  // ----------------------------
  if (isError) {
    return (
      <div className="text-center text-red-500">
        Failed to load students
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

        {/* Total Students */}
        <div className="bg-white p-3 rounded-xl border flex items-center gap-3">
          <Users className="w-5 h-5 text-indigo-600" />
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">
              Total Students
            </p>
            <h3 className="text-lg font-black">{students.length}</h3>
          </div>
        </div>

        {/* Active Students */}
        <div className="bg-white p-3 rounded-xl border flex items-center gap-3">
          <Check className="w-5 h-5 text-emerald-600" />
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">
              Active
            </p>
            <h3 className="text-lg font-black">
              {students.filter((s) => s.attendance?.status?.toLowerCase() === "present").length}
            </h3>
          </div>
        </div>

        {/* Add Student */}
        <div
          onClick={() => handleOpenModal(null, "create")}
          className="bg-white p-3 rounded-xl border flex items-center gap-3 cursor-pointer hover:border-indigo-500 transition"
        >
          <UserPlus className="w-5 h-5 text-indigo-600" />
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">
              New Student
            </p>
            <h3 className="text-sm font-bold">Add Entry</h3>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-3 rounded-xl border flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or grade..."
            className="pl-2 pr-2 py-1 border-none outline-none w-full text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-3xl border overflow-hidden">
        <table className="w-full">

          <thead className="border-b bg-slate-50">
            <tr>
              <th className="text-left px-6 py-4 text-xs uppercase text-slate-400">
                Student
              </th>
              <th className="text-left px-6 py-4 text-xs uppercase text-slate-400">
                Grade
              </th>
              <th className="text-right px-6 py-4 text-xs uppercase text-slate-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {filteredStudents.length > 0 ? (
              filteredStudents.map((student: Student) => (

                <tr key={student._id} className="border-b">

                  {/* STUDENT */}
                  <td className="px-6 py-4 flex flex-col">
                    <p className="font-bold">{student.name}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {student.email}
                    </p>
                  </td>

                  {/* GRADE */}
                  <td className="px-6 py-4">{getGradeLabel(student.grade)}</td>

              

                  {/* ACTIONS */}
                  <td className="text-right px-6 py-4 space-x-2 flex justify-end items-center">

                    {/* VIEW */}
                    {setmodalStudentView && (
                      <button
                        onClick={() =>
                          setmodalStudentView({ type: "view", data: student })
                        }
                      >
                        <Eye className="w-4 h-4 text-sky-600" />
                      </button>
                    )}

                    {/* EDIT */}
                    <button onClick={() => handleOpenModal(student, "edit")}>
                      <Edit3 className="w-4 h-4 text-indigo-600" />
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => {
                        if (!confirm("Are you sure you want to remove this student record?")) return;
                        deleteStudent(student._id);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-rose-600" />
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

      {/* ================= MODAL ================= */}
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
