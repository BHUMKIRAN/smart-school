'use client';

import { useEffect, useState } from "react";
import { StatCard } from "@/components/ui/card/Card";
import { fetcher } from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";

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
  isOpen?: boolean;
  onClose?: () => void;
  refreshStudents?: () => void;
}

export default function StudentsTab({ isOpen, onClose, refreshStudents }: StudentsTabProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const data = await fetcher(ENDPOINTS.STUDENTS);
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

  const stats = {
    total: students.length,
    active: students.filter(s => s.status?.toLowerCase() === "active").length,
    new: students.filter(s => s.status?.toLowerCase() === "new").length,
    pending: students.filter(s => s.status?.toLowerCase() === "pending").length,
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="dash-text-muted animate-pulse">Loading students data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<UsersIcon className="w-6 h-6 text-indigo-500" />}
          value={stats.total}
          label="Total Students"
          className="hover:border-indigo-200 transition-all"
        />
        <StatCard
          icon={<CheckBadgeIcon className="w-6 h-6 text-emerald-500" />}
          value={stats.active}
          label="Active Students"
          className="hover:border-emerald-200 transition-all"
        />
        <StatCard
          icon={<UserPlusIcon className="w-6 h-6 text-amber-500" />}
          value={stats.new}
          label="New Admissions"
          className="hover:border-amber-200 transition-all"
        />
        <StatCard
          icon={<ClockIcon className="w-6 h-6 text-blue-500" />}
          value={stats.pending}
          label="Pending Apps"
          className="hover:border-blue-200 transition-all"
        />
      </div>

      {/* Table Section */}
      <div className="dash-card overflow-hidden shadow-sm border border-dash-border">
        <div className="p-5 border-b border-dash-border flex justify-between items-center bg-dash-surface-2">
          <h3 className="font-bold dash-text">Student Directory</h3>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full border border-indigo-100 uppercase tracking-wider">
            {students.length} Records
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="dash-table w-full">
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
                  <tr key={student._id} className="group hover:bg-slate-50 transition-colors">
                    <td className="whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-110 transition-transform">
                          {student.name?.charAt(0).toUpperCase() || "S"}
                        </div>
                        <div>
                          <p className="text-sm font-bold dash-text">{student.name}</p>
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">ID: {student._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>

                    <td className="font-medium text-slate-600">{student.grade || "N/A"}</td>
                    <td className="text-slate-500 italic">{student.email || "N/A"}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${Number(student.attendance) > 85 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            style={{ width: `${student.attendance || 0}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600">
                          {student.attendance !== undefined ? `${student.attendance}%` : "N/A"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${Number(student.gpa) > 3.5 ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-500'}`}>
                        {student.gpa !== undefined ? student.gpa.toFixed(2) : "N/A"}
                      </span>
                    </td>

                    <td className="text-right">
                      <button className="px-4 py-2 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-600 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95">
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-12 dash-text-muted">
                    <div className="flex flex-col items-center justify-center space-y-2 opacity-50">
                      <UsersIcon className="w-12 h-12 mb-2" />
                      <p className="font-medium">No students found.</p>
                      <p className="text-xs italic">When you add students, they will appear here.</p>
                    </div>
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
// ICONS
// ===============================
function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function CheckBadgeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function UserPlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
