'use client';

import React, { useEffect, useState } from "react";
import AttendanceClassModal from "@/modals/classAttendance";
import { api } from "@/Backend/axiosClientInstance";

export default function AttendanceTab() {
  const [grades, setGrades] = useState<any[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load grades
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

  // Fetch students of a grade
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

  // Toggle attendance locally
  const toggleAttendance = (id: string) => {
    setStudents(prev =>
      prev.map(student =>
        student._id === id
          ? { ...student, status: student.status === "Present" ? "Absent" : "Present" }
          : student
      )
    );
  };

  // Save attendance
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
      alert("Attendance Saved");
      setIsOpen(false);
    } catch (err) {
      console.error("Attendance error", err);
    }
  };

  return (
    <div className="animate-fadeIn space-y-8">

      {/* Grade Table */}
      <div className="dash-card overflow-hidden">
        <div className="px-6 py-5 border-b dash-border">
          <h3 className="font-bold">Grades</h3>
        </div>

        <table className="w-full dash-table">
          <thead>
            <tr className="text-left text-xs uppercase border-b dash-border">
              <th className="px-6 py-4">Class</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {grades.map((grade) => (
              <tr key={grade._id} className="hover:bg-dash-surface-2/50">
                {/* Combined Grade & Section */}
                <td className="px-6 py-4 font-bold">
                  {grade.grade} {grade.section ? `- ${grade.section}` : ""}
                </td>

                {/* Button to see students */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => fetchStudents(grade)}
                    className="px-4 py-1 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700"
                  >
                    See Students
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for student attendance */}
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
