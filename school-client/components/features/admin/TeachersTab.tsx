'use client';

import { useEffect, useState } from "react";

export interface Teacher {
  _id: string;
  name: string;
  subject: string;
  email: string;
  status?: string;
}

interface TeachersTabProps {
  setisOpen?: (value: boolean) => void;
  setMode?: (mode: "create" | "edit") => void;
  setSelectedTeacher?: (teacher: Teacher) => void;
  isOpen?: boolean;
  onClose?: () => void;
  refreshTeachers?: () => void;
}

export default function TeachersTab({
  setisOpen,
  setMode,
  setSelectedTeacher,
  isOpen,
  onClose,
  refreshTeachers,
}: TeachersTabProps) {

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchTeachers = async () => {
    try {
      const response = await fetch("http://localhost:8080/teachers");
      if (!response.ok) throw new Error("Failed to fetch teachers");
      const data: Teacher[] = await response.json();
      setTeachers(data || []);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this teacher?");
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      const response = await fetch(`http://localhost:8080/teachers/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete teacher");
      setTeachers(prev => prev.filter(t => t._id !== id));
      alert("Teacher deleted successfully");
      if (refreshTeachers) refreshTeachers();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete teacher");
    } finally {
      setDeletingId(null);
    }
  };

  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter(t => t.status?.toLowerCase() === "active").length;
  const onLeaveTeachers = teachers.filter(t => t.status?.toLowerCase() === "on leave").length;

  if (loading) return <p className="text-center p-6 dash-text-muted">Loading teachers...</p>;

  return (
    <div className="space-y-6">
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Teachers" value={totalTeachers} />
        <StatCard title="Active Teachers" value={activeTeachers} />
        <StatCard title="On Leave" value={onLeaveTeachers} />
      </div>

      {/* TABLE */}
      <div className="dash-card overflow-hidden shadow-sm">
        <div className="overflow-auto">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Email</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {teachers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-6 dash-text-muted">
                    No teachers found.
                  </td>
                </tr>
              ) : (
                teachers.map((teacher) => (
                  <tr key={teacher._id}>
                    <td>{teacher.name}</td>
                    <td>{teacher.subject}</td>
                    <td>{teacher.email}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${teacher.status?.toLowerCase() === "active"
                          ? "bg-green-500/20 text-green-600"
                          : teacher.status?.toLowerCase() === "on leave"
                            ? "bg-amber-500/20 text-amber-600"
                            : "bg-gray-500/20 dash-text-muted"
                        }`}>
                        {teacher.status || "Active"}
                      </span>
                    </td>
                    <td className="text-right space-x-2">
                      <button
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                        onClick={() => {
                          if (setMode) setMode("edit");
                          if (setSelectedTeacher) setSelectedTeacher(teacher);
                          if (setisOpen) setisOpen(true);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        disabled={deletingId === teacher._id}
                        className={`px-3 py-1 text-sm text-white rounded ${deletingId === teacher._id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                          }`}
                        onClick={() => handleDelete(teacher._id)}
                      >
                        {deletingId === teacher._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="dash-card p-6 shadow-sm">
      <h3 className="text-sm dash-text-muted">{title}</h3>
      <p className="text-3xl font-bold dash-text">{value}</p>
    </div>
  );
}