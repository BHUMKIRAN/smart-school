'use client';

import { useEffect, useState } from "react";

interface Teacher {
  _id: string;
  name: string;
  subject: string;
  email: string;
  status?: string; // optional status
}

export default function TeachersTab() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  // ==============================
  // FETCH TEACHERS
  // ==============================
  const fetchTeachers = async () => {
    try {
      const response = await fetch("http://localhost:8080/teachers");
      if (!response.ok) throw new Error("Failed to fetch teachers");
      const data: Teacher[] = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // ==============================
  // DELETE TEACHER
  // ==============================
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;

    try {
      const response = await fetch(`http://localhost:8080/teachers/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete teacher");

      // Remove deleted teacher from state
      setTeachers((prev) => prev.filter((t) => t._id !== id));

      alert("Teacher deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete teacher");
    }
  };

  // ==============================
  // STATS
  // ==============================
  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter((t) => t.status === "Active").length;
  const onLeaveTeachers = teachers.filter((t) => t.status === "On Leave").length;

  if (loading) {
    return <p className="text-center p-6">Loading teachers...</p>;
  }

  return (
    <div className="space-y-6">

      {/* ==============================
          STATS SECTION
      ============================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Teachers" value={totalTeachers} />
        <StatCard title="Active Teachers" value={activeTeachers} />
        <StatCard title="On Leave" value={onLeaveTeachers} />
      </div>

      {/* ==============================
          TABLE SECTION
      ============================== */}
      <div className="bg-white rounded-xl overflow-hidden text-black shadow">
        <div className="overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Subject</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase">Actions</th>
              </tr>
            </thead>

            <tbody>
              {teachers.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-gray-500">
                    No teachers found.
                  </td>
                </tr>
              )}

              {teachers.map((teacher) => (
                <tr key={teacher._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{teacher.name}</td>
                  <td className="px-6 py-4">{teacher.subject}</td>
                  <td className="px-6 py-4">{teacher.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        teacher.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : teacher.status === "On Leave"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {teacher.status || "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => alert("Edit feature coming next")}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(teacher._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==============================
// STAT CARD COMPONENT
// ==============================
function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
}