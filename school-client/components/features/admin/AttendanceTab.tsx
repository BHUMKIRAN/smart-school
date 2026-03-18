'use client';

import React, { useEffect, useState } from "react";
import AttendanceClassModal from "@/modals/classAttendance";
import { api } from "@/Backend/axiosClientInstance";
import { Search, Users } from "lucide-react";

export default function AttendanceTab() {
  const [grades, setGrades] = useState<any[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadGrades = async () => {
      try {
        const res = await api.get(`/grades`);
        setGrades(res.data);
      } catch (err) {
        console.error("Failed to load grades", err);
      }
    };
    loadGrades();
  }, []);

  const fetchStudents = async (grade: any) => {
    setSelectedGrade(grade);
    try {
      const res = await api.get(`/students`, { params: { grade: grade._id } });
      const studentsWithStatus = res.data.map((s: any) => ({
        ...s,
        status: "Present",
      }));
      setStudents(studentsWithStatus);
      setIsOpen(true);
    } catch (err) {
      console.error("Failed loading students", err);
    }
  };

  const toggleAttendance = (id: string) => {
    setStudents(prev =>
      prev.map(student =>
        student._id === id
          ? { ...student, status: student.status === "Present" ? "Absent" : "Present" }
          : student
      )
    );
  };

  const saveAttendance = async () => {
    try {
      const payload = {
        gradeId: selectedGrade?._id,
        attendance: students.map((student) => ({
          studentId: student._id,
          status: student.status,
        })),
      };
      await api.post(`/attendance/student/mark`, payload);
      setIsOpen(false);
    } catch (err) {
      console.error("Attendance error", err);
    }
  };

  const filteredGrades = grades.filter(g => 
    `${g.grade} ${g.section}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fadeIn space-y-4">
      
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[var(--dash-surface)] p-4 rounded-xl border border-[var(--dash-border)]">
        <h2 className="font-bold text-[var(--dash-text)] flex items-center gap-2">
          <Users className="w-5 h-5 text-[var(--primary)]" />
          Class List
        </h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dash-text-muted)]" />
          <input 
            type="text"
            placeholder="Search grade..."
            className="w-full pl-9 py-2 bg-[var(--dash-bg)] border border-[var(--dash-border)] rounded-lg text-sm outline-none focus:border-[var(--primary)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Basic Table */}
      <div className="dash-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--dash-border)] bg-[var(--dash-surface-2)]">
                <th className="px-6 py-4 text-[var(--dash-text-muted)] font-semibold text-xs uppercase">Class / Grade</th>
                <th className="px-6 py-4 text-[var(--dash-text-muted)] font-semibold text-xs uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y border-[var(--dash-border)]">
              {filteredGrades.map((grade) => (
                <tr key={grade._id} className="hover:bg-[var(--dash-sidebar-hover)] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[var(--dash-text)]">Grade {grade.grade}</span>
                      {grade.section && (
                        <span className="text-[var(--dash-text-muted)]">| Section {grade.section}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => fetchStudents(grade)}
                      className="px-4 py-1.5 bg-[var(--primary)] text-white text-xs font-bold rounded-md hover:opacity-90 transition-opacity"
                    >
                      Mark Attendance
                    </button>
                  </td>
                </tr>
              ))}
              {filteredGrades.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-6 py-10 text-center text-[var(--dash-text-muted)] text-sm">
                    No grades found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AttendanceClassModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        grade={selectedGrade}
        students={students}
        toggleAttendance={toggleAttendance}
        saveAttendance={saveAttendance}
      />
    </div>
  );
}