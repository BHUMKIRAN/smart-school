'use client';

import React, { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import { useCreateTeacher, useEditTeacher } from "@/hooks/useTeacher";
import { useCreateTeacherAttendance } from "@/hooks/useTeacherAttendance";
import { api } from "@/Backend/axiosClientInstance";

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  teacherData?: any;
}

const TeacherModal: React.FC<TeacherModalProps> = ({
  isOpen,
  onClose,
  mode,
  teacherData,
}) => {

  const createTeacher = useCreateTeacher();
  const editTeacher = useEditTeacher();
  const markAttendance = useCreateTeacherAttendance();

  const [grades, setGrades] = useState<any[]>([]);
  const [tab, setTab] = useState<"info" | "att">("info");
  const [status, setStatus] = useState<"present" | "absent">("present");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    subject: "",
    department: "",
    salary: "",
    gradeId: "",
  });

  // Fetch grades
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await api.get(`/grades`);
        setGrades(res.data);
      } catch (err) {
        console.error("Failed to fetch grades", err);
      }
    };

    if (isOpen) {
      fetchGrades();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && teacherData) {
        setForm({
          name: teacherData.name || "",
          email: teacherData.email || "",
          password: "",
          phone: teacherData.phone || "",
          subject: teacherData.subject || "",
          department: teacherData.department || "",
          salary: teacherData.salary || "",
          gradeId: teacherData.grades?.[0]?._id || "",
        });
        setTab("info");
      } else {
        setForm({
          name: "",
          email: "",
          password: "",
          phone: "",
          subject: "",
          department: "",
          salary: "",
          gradeId: "",
        });
        setTab("info");
      }
    }
  }, [teacherData, mode, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let savedTeacher;

      if (mode === "create") {
        savedTeacher = await createTeacher.mutateAsync(form);
      } else {
        savedTeacher = await editTeacher.mutateAsync({
          ...form,
          _id: teacherData?._id,
        });
      }

      if (tab === "att") {
        const targetId =
          mode === "create" ? savedTeacher?._id : teacherData?._id;

        await markAttendance.mutateAsync({
          teacherId: targetId,
          status,
          date: new Date().toISOString().split("T")[0],
        });
      }

      onClose();

    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="dash-card w-full max-w-lg shadow-2xl overflow-hidden rounded-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--dash-border)]">
          <h2 className="text-xl font-bold">
            {mode === "create" ? "Add New Faculty" : "Faculty Management"}
          </h2>

          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TABS */}
        {mode === "edit" && (
          <div className="px-6 mt-4 flex gap-2">
            <button
              onClick={() => setTab("info")}
              className={`tab-button ${tab === "info" ? "tab-active" : ""}`}
            >
              General Info
            </button>

            <button
              onClick={() => setTab("att")}
              className={`tab-button ${tab === "att" ? "tab-active" : ""}`}
            >
              Attendance
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {tab === "info" ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* NAME */}
              <div className="sm:col-span-2">
                <label className="text-sm font-medium mb-1 block">Name</label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="dash-input w-full"
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="sm:col-span-2">
                <label className="text-sm font-medium mb-1 block">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="dash-input w-full"
                  required
                />
              </div>

              {/* PASSWORD */}
              {mode === "create" && (
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium mb-1 block">Password</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="dash-input w-full"
                    required
                  />
                </div>
              )}

              {/* PHONE */}
              <div>
                <label className="text-sm font-medium mb-1 block">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="dash-input w-full"
                />
              </div>

              {/* SUBJECT */}
              <div>
                <label className="text-sm font-medium mb-1 block">Subject</label>
                <input
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  className="dash-input w-full"
                />
              </div>

              {/* DEPARTMENT */}
              <div>
                <label className="text-sm font-medium mb-1 block">Department</label>
                <input
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                  }
                  className="dash-input w-full"
                />
              </div>

              {/* SALARY */}
              <div>
                <label className="text-sm font-medium mb-1 block">Salary</label>
                <input
                  value={form.salary}
                  onChange={(e) =>
                    setForm({ ...form, salary: e.target.value })
                  }
                  className="dash-input w-full"
                />
              </div>

              {/* GRADE SELECT */}
              <div className="sm:col-span-2">
                <label className="text-sm font-medium mb-1 block">
                  Assign Grade
                </label>

                <select
                  value={form.gradeId}
                  onChange={(e) =>
                    setForm({ ...form, gradeId: e.target.value })
                  }
                  className="dash-input w-full"
                  required
                >
                  <option value="">Select Grade</option>

                  {grades.map((g) => (
                    <option key={g._id} value={g._id}>
                      Grade {g.grade}
                      {g.section ? ` - ${g.section}` : ""}
                    </option>
                  ))}
                </select>
              </div>

            </div>

          ) : (

            <div className="py-4 space-y-6">

              <div className="text-center p-4 bg-[var(--muted-bg)] rounded-xl border">
                <p className="text-xs uppercase">Today's Date</p>
                <h3 className="text-lg font-bold">
                  {new Date().toDateString()}
                </h3>
              </div>

              <div className="flex gap-4">

                <button
                  type="button"
                  onClick={() => setStatus("present")}
                  className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-2
                  ${status === "present"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                    }`}
                >
                  <Check className="w-6 h-6" />
                  <span>Present</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus("absent")}
                  className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-2
                  ${status === "absent"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                    }`}
                >
                  <X className="w-6 h-6" />
                  <span>Absent</span>
                </button>

              </div>

            </div>
          )}

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-4 border-t">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button type="submit" className="btn-primary px-5 py-2">
              {tab === "info"
                ? "Save Details"
                : "Confirm Attendance"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default TeacherModal;
