'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/endpoints";
import {
  Check,
  X,
  Users2,
  RotateCcw,
  CheckCircle2,
  Filter
} from "lucide-react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

export default function ClassesTab() {
  const [students, setStudents] = useState<any[]>([]);
  const [grade, setGrade] = useState<any>(null);
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // Get teacher from Redux
  const user = useSelector((state: any) => state.auth.user);
  const teacherId = user?.id;

  // Fetch students assigned to this teacher
  useEffect(() => {
    if (!teacherId) return; // Wait until Redux user is loaded

    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/grades/teacher/${teacherId}/students`);
        setStudents(res.data.students || []);
        setGrade(res.data.grade || null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [teacherId]);

  // Mark attendance in state
  const handleStatus = (id: string, status: string) => {
    setAttendance(prev => ({
      ...prev,
      [id]: prev[id] === status ? "" : status
    }));
  };

  // Submit attendance
  const handleFinalSubmit = async () => {
    if (!grade) return toast.error("Grade not selected");

    try {
      const payload = {
        gradeId: grade._id,
        attendance: students.map((student) => ({
          studentId: student._id,
          status: attendance[student._id] === "P" ? "Present" : "Absent",
        })),
      };

      await axios.post(`${API_BASE_URL}/attendance/student/mark`, payload);

      toast.success("Attendance submitted successfully");
      setAttendance({});
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit attendance");
    }
  };


  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="bg-white dark:bg-slate-950 border rounded-2xl p-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-white border flex items-center justify-center">
            <Users2 className="w-5 h-5 text-indigo-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold">
              Grade {grade?.grade} {grade?.section || ""}
            </h2>
            <p className="text-xs text-slate-400">
              {students.length} Students
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setAttendance({})}
            className="p-2 text-slate-400 hover:text-rose-500"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleFinalSubmit}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest"
          >
            Submit Register
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* STUDENTS TABLE */}
      <div className="bg-white dark:bg-slate-950 border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-8 py-4 text-left text-xs">Roll</th>
              <th className="px-8 py-4 text-left text-xs">Student</th>
              <th className="px-8 py-4 text-center text-xs">Attendance</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map(student => (
                <tr key={student._id} className="border-b">
                  <td className="px-8 py-4">#{student.rollNumber || "-"}</td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold">
                        {student.name?.charAt(0)}
                      </div>
                      <span className="font-semibold">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleStatus(student._id, "P")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold
                          ${attendance[student._id] === "P" ? "bg-emerald-500 text-white" : "bg-slate-100"}
                        `}
                      >
                        <Check className="w-4 h-4" />
                        Present
                      </button>
                      <button
                        onClick={() => handleStatus(student._id, "A")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold
                          ${attendance[student._id] === "A" ? "bg-rose-500 text-white" : "bg-slate-100"}
                        `}
                      >
                        <X className="w-4 h-4" />
                        Absent
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-24 text-center">
                  <div className="flex flex-col items-center gap-3 opacity-40">
                    <Filter className="w-8 h-8" />
                    <p>No students found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
