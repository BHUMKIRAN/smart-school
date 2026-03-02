'use client';

import { useEffect, useState } from "react";
import { StatCard } from "@/components/ui/card/Card";
import { ENDPOINTS } from "@/lib/endpoints";
import StudentModal from "@/modals/studentModal"; // Path corrected to your modal location
import axios from "axios";

export interface Student {
  _id: string;
  name: string;
  grade: string;
  email: string;
  attendance?: number;
  gpa?: number;
  status?: string;
}

export default function StudentsTab() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // MODAL STATES
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await axios.get(ENDPOINTS.STUDENTS);
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this student record?")) return;
    try {
      await fetcher(`${ENDPOINTS.STUDENTS}/${id}`, { method: 'DELETE' });
      // Optimized state update: remove immediately from UI
      setStudents(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      alert("Failed to delete student. Please try again.");
    }
  };

  const handleOpenModal = (student: Student | null = null) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleSuccess = () => {
    setShowModal(false);
    fetchStudents(); // Refresh list after CRUD operation
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: students.length,
    active: students.filter(s => s.status?.toLowerCase() === "active").length,
    highGPA: students.filter(s => (s.gpa || 0) >= 3.5).length,
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="dash-text-muted font-medium animate-pulse">Synchronizing Student Database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard 
          label="Total Students" 
          value={stats.total} 
          icon={<UsersIcon className="w-6 h-6 text-primary" />} 
        />
        <StatCard 
          label="Active Status" 
          value={stats.active || stats.total} 
          icon={<CheckBadgeIcon className="w-6 h-6 text-success" />} 
        />
        <StatCard 
          label="Honor Roll (3.5+)" 
          value={stats.highGPA} 
          icon={<UserPlusIcon className="w-6 h-6 text-warning" />} 
        />
      </div>

      {/* 2. Management Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-dash-surface-2 p-4 rounded-2xl border dash-border">
        <div className="relative w-full md:w-96">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dash-text-muted">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            type="text"
            placeholder="Search by name or grade..."
            className="dash-input w-full pl-11 bg-dash-surface-1 shadow-inner"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button 
          onClick={() => handleOpenModal(null)}
          className="w-full md:w-auto px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Add New Student
        </button>
      </div>

      {/* 3. Students Table */}
      <div className="dash-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dash-surface-2 border-b dash-border">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest dash-text-muted">Student Details</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest dash-text-muted">Grade</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest dash-text-muted">Academic Perf.</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest dash-text-muted">Attendance</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest dash-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y dash-border">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student._id} className="group hover:bg-dash-surface-2/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-primary-dark flex items-center justify-center text-white font-bold shadow-sm">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold dash-text">{student.name}</p>
                          <p className="text-xs dash-text-muted">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-dash-surface-2 rounded-lg border dash-border text-xs font-bold dash-text">
                        {student.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`text-sm font-bold ${Number(student.gpa) >= 3.5 ? 'text-warning' : 'dash-text'}`}>
                          {student.gpa?.toFixed(2) || "0.00"} GPA
                        </span>
                        <div className="w-20 h-1 bg-dash-border rounded-full overflow-hidden">
                           <div className="bg-warning h-full transition-all duration-500" style={{ width: `${((student.gpa || 0) / 4) * 100}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <span className={Number(student.attendance) < 80 ? 'text-error' : 'text-success'}>
                        {student.attendance || 0}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenModal(student)}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="Edit Student"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(student._id)}
                          className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                          title="Delete Student"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-20 text-center dash-text-muted italic">
                    No student records match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. MODAL COMPONENT */}
      <StudentModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        initialData={editingStudent} 
        onSuccess={handleSuccess}
      />
    </div>
  );
}

// Icons
function UsersIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
}
function CheckBadgeIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
}
function UserPlusIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>;
} 