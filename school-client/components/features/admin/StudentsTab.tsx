'use client';

import { useEffect, useState } from "react";

export interface Student {
  _id: string;
  name: string;
  grade: string;
  email: string;
  attendance?: number;
  gpa?: number;
  status?: string;
}

interface StudentsTabProps {
  // Optional props if you want to control modal later
  isOpen?: boolean;
  onClose?: () => void;
  refreshStudents?: () => void;
}

export default function StudentsTab({ isOpen, onClose, refreshStudents }: StudentsTabProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // FETCH STUDENTS
  // ===============================
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:8080/students");
      if (!response.ok) throw new Error("Failed to fetch students");

      const data: Student[] = await response.json();
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ===============================
  // STATS
  // ===============================
  const totalStudents = students.length;
  const activeStudents = students.filter(
    (s) => s.status?.toLowerCase() === "active"
  ).length;
  const newAdmissions = students.filter(
    (s) => s.status?.toLowerCase() === "new"
  ).length;
  const pendingApplications = students.filter(
    (s) => s.status?.toLowerCase() === "pending"
  ).length;

  if (loading) {
    return <p className="text-center p-6 dash-text-muted">Loading students...</p>;
  }

  return (
    <div className="space-y-6">
      {/* ===============================
          STATS SECTION
      =============================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard value={totalStudents} label="Total Students" />
        <StatCard value={activeStudents} label="Active Students" />
        <StatCard value={newAdmissions} label="New Admissions" />
        <StatCard value={pendingApplications} label="Pending Applications" />
      </div>

      {/* ===============================
          TABLE SECTION
      =============================== */}
      <div className="dash-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Grade</th>
                <th>Email</th>
                <th>Attendance</th>
                <th>GPA</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student._id}>
                    <td className="whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                          {student.name?.charAt(0).toUpperCase() || "S"}
                        </div>
                        <span className="text-sm font-medium">{student.name}</span>
                      </div>
                    </td>

                    <td>{student.grade || "N/A"}</td>
                    <td>{student.email || "N/A"}</td>
                    <td>{student.attendance !== undefined ? `${student.attendance}%` : "N/A"}</td>
                    <td>{student.gpa !== undefined ? student.gpa.toFixed(2) : "N/A"}</td>

                    <td className="text-right">
                      <button className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 rounded-lg text-xs font-medium transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-6 dash-text-muted">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ===============================
// STAT CARD COMPONENT
// ===============================
function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="dash-card p-6 shadow-sm">
      <h3 className="text-3xl font-bold dash-text mb-1">{value}</h3>
      <p className="text-sm dash-text-muted">{label}</p>
    </div>
  );
}