'use client';

import { useState } from "react";
import {
  UserPlus, Users, Search,
  Edit3, Trash2, GraduationCap,
  Check, X, Mail
} from "lucide-react";

import TeacherModal from "@/modals/teacherModals";
import { useTeachers, useDeleteTeacher } from "@/hooks/useTeacher";
import { useMarkTeacherAttendance, useTeacherAttendance } from "@/hooks/useAdmin";

export interface Teacher {
  _id: string;
  name: string;
  subject: string;
  email: string;
  status?: string;
  phone?: string;
  department?: string;
  salary?: string;
}

export default function TeachersTab() {

  // ✅ GET teachers
  const { data: teachers = [], isLoading, isError } = useTeachers();
  const deleteTeacher = useDeleteTeacher();

  // ✅ Attendance hooks
  const teacherAttendance = useMarkTeacherAttendance(); // mutate function for marking attendance
  const attendanceList = useTeacherAttendance(); // optional, if you want to fetch attendance separately

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  // ----------------------------
  // OPEN MODAL
  // ----------------------------
  const handleOpenModal = (teacher: Teacher | null, mode: "create" | "edit") => {
    setSelectedTeacher(teacher);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  // ----------------------------
  // QUICK ATTENDANCE
  // ----------------------------
  const markQuickAttendance = (teacherId: string, status: "Present" | "Absent") => {
    teacherAttendance.mutate({ teacherId, status }); // ✅ send object matching your mutation
  };

  // ----------------------------
  // FILTERING
  // ----------------------------
  const filteredTeachers = teachers.filter((t: Teacher) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ----------------------------
  // LOADING STATE
  // ----------------------------
  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold text-xs uppercase">
          Accessing Faculty Database...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Failed to load teachers
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">

      {/* ================= KPIs ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-3xl border flex items-center gap-5">
          <Users className="w-6 h-6 text-indigo-600" />
          <div>
            <p className="text-xs font-bold uppercase text-slate-400">Total Faculty</p>
            <h3 className="text-2xl font-black">{teachers.length}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border flex items-center gap-5">
          <GraduationCap className="w-6 h-6 text-emerald-600" />
          <div>
            <p className="text-xs font-bold uppercase text-slate-400">Active Today</p>
            <h3 className="text-2xl font-black">{teachers.length}</h3>
          </div>
        </div>

        <div
          onClick={() => handleOpenModal(null, "create")}
          className="bg-white p-6 rounded-3xl border flex items-center gap-5 cursor-pointer hover:border-indigo-500 transition"
        >
          <UserPlus className="w-6 h-6 text-indigo-600" />
          <div>
            <p className="text-xs font-bold uppercase text-slate-400">New Hire</p>
            <h3 className="text-sm font-bold">Add Entry</h3>
          </div>
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name or subject..."
          className="pl-10 pr-4 py-2 border rounded-xl w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-3xl border overflow-hidden">
        <table className="w-full">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="text-left px-6 py-4 text-xs uppercase text-slate-400">Faculty</th>
              <th className="text-center px-6 py-4 text-xs uppercase text-slate-400">Subject</th>
              <th className="text-center px-6 py-4 text-xs uppercase text-slate-400">Attendance</th>
              <th className="text-right px-6 py-4 text-xs uppercase text-slate-400">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTeachers.map((teacher: Teacher) => (
              <tr key={teacher._id} className="border-b">

                {/* NAME */}
                <td className="px-6 py-4">
                  <p className="font-bold">{teacher.name}</p>
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {teacher.email}
                  </p>
                </td>

                {/* SUBJECT */}
                <td className="text-center px-6 py-4">{teacher.subject}</td>

                {/* ATTENDANCE */}
                <td className="text-center px-6 py-4 space-x-2">
                  <button
                    onClick={() => markQuickAttendance(teacher._id, "Present")}
                    className="p-2 bg-emerald-100 rounded-lg"
                  >
                    <Check className="w-4 h-4 text-emerald-600" />
                  </button>

                  <button
                    onClick={() => markQuickAttendance(teacher._id, "Absent")}
                    className="p-2 bg-rose-100 rounded-lg"
                  >
                    <X className="w-4 h-4 text-rose-600" />
                  </button>
                </td>

                {/* ACTIONS */}
                <td className="text-right px-6 py-4 space-x-2">
                  <button onClick={() => handleOpenModal(teacher, "edit")}>
                    <Edit3 className="w-4 h-4 text-indigo-600" />
                  </button>

                  <button onClick={() => deleteTeacher.mutate(teacher._id)}>
                    <Trash2 className="w-4 h-4 text-rose-600" />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      <TeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        teacherData={selectedTeacher || undefined}
      />
    </div>
  );
}