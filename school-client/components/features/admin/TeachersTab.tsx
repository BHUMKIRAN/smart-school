'use client';

import { useState } from "react";
import {
  UserPlus, Users, Search,
  Edit3, Trash2, GraduationCap,
  Check, X, Mail,
  Eye
} from "lucide-react";

import TeacherModal from "@/modals/teacherModals";
import { useTeachers, useDeleteTeacher } from "@/hooks/useTeacher";
import { useMarkTeacherAttendance } from "@/hooks/useAdmin";
import axios from "axios";
import { API_BASE_URL } from "@/lib/endpoints";

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
interface teachertabProps {
  setmodalView: any,
}

export default function TeachersTab({setmodalView} : teachertabProps) {

  // ✅ GET teachers
  const { data: teachers = [], isLoading, isError } = useTeachers();
  const deleteTeacher = useDeleteTeacher();
  const teacherAttendance = useMarkTeacherAttendance(); // mutate function

  // ----------------------------
  // State
  // ----------------------------
  const [pdfFile, setPdfFile] = useState<File | null>(null);
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
  // Attendance
  // ----------------------------
  const markQuickAttendance = (teacherId: string, status: "Present" | "Absent") => {
    teacherAttendance.mutate({ teacherId, status });
  };

  // ----------------------------
  // Upload PDF Schedule
  // ----------------------------
  const handleUpload = async (teacherId: string) => {
    if (!pdfFile) return alert("Select a PDF file first");

    const formData = new FormData();
    formData.append("teacherId", teacherId);
    formData.append("pdf", pdfFile);

    try {
      await axios.post(`${API_BASE_URL}/schedule`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Schedule uploaded!");
      setPdfFile(null);

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };


  // ----------------------------
  // Filtering
  // ----------------------------
  const filteredTeachers = teachers.filter((t: Teacher) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ----------------------------
  // Loading / Error
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

      {/* ================= Small KPI Cards + Search ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Faculty */}
        <div className="bg-white p-3 rounded-xl border flex items-center gap-3">
          <Users className="w-5 h-5 text-indigo-600" />
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">Total Faculty</p>
            <h3 className="text-lg font-black">{teachers.length}</h3>
          </div>
        </div>

        {/* Active Today */}
        <div className="bg-white p-3 rounded-xl border flex items-center gap-3">
          <GraduationCap className="w-5 h-5 text-emerald-600" />
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">Active Today</p>
            <h3 className="text-lg font-black">{teachers.length}</h3>
          </div>
        </div>

        {/* New Hire */}
        <div
          onClick={() => handleOpenModal(null, "create")}
          className="bg-white p-3 rounded-xl border flex items-center gap-3 cursor-pointer hover:border-indigo-500 transition"
        >
          <UserPlus className="w-5 h-5 text-indigo-600" />
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">New Hire</p>
            <h3 className="text-sm font-bold">Add Entry</h3>
          </div>
        </div>

        {/* Search Card */}
        <div className="bg-white p-3 rounded-xl border flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or subject..."
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
              <th className="text-left px-6 py-4 text-xs uppercase text-slate-400">Faculty</th>
              <th className="text-left px-6 py-4 text-xs uppercase text-slate-400">Schedule</th>
              <th className="text-center px-6 py-4 text-xs uppercase text-slate-400">Subject</th>
              <th className="text-center px-6 py-4 text-xs uppercase text-slate-400">Attendance</th>
              <th className="text-right px-6 py-4 text-xs uppercase text-slate-400">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTeachers.map((teacher: Teacher) => (
              <tr key={teacher._id} className="border-b">

                {/* NAME + PROFILE PIC */}
                <td className="px-6 py-4 flex items-center gap-3">
                  {teacher.profilePic ? (
                    <img
                      src={teacher.profilePic}
                      alt={teacher.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                      {teacher.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="flex flex-col">
                    <p className="font-bold">{teacher.name}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {teacher.email}
                    </p>
                  </div>
                </td>

                {/* SCHEDULE */}
                <td className="px-6 py-4 space-y-1">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={e => e.target.files && setPdfFile(e.target.files[0])}
                    className="mb-1"
                  />
                  <button
                    onClick={() => handleUpload(teacher._id)}
                    className="bg-amber-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Upload PDF
                  </button>
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
                <td className="text-right px-6 py-4 space-x-2 flex justify-end items-center">
                  {/* View Teacher */}
                  <button onClick={() => setmodalView({ type: "view", data: teacher })}>
                    <Eye className="w-4 h-4 text-sky-600" />
                  </button>

                  {/* Edit Teacher */}
                  <button onClick={() => handleOpenModal(teacher, "edit")}>
                    <Edit3 className="w-4 h-4 text-indigo-600" />
                  </button>

                  {/* Delete Teacher */}
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