'use client';

import { Dialog, DialogPanel, DialogBackdrop, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X, Users, Save, CheckCircle2, XCircle, Hash } from "lucide-react";

interface Student {
  id?: string;
  _id?: string;
  name: string;
  roll?: number | string;
  gradeId?: string;
  status: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  grade: { grade: number; section?: string; _id?: string } | null;
  students: Student[];
  toggleAttendance: (id: string) => void;
  saveAttendance: () => void;
}

export default function AttendanceClassModal({
  isOpen,
  onClose,
  grade,
  students,
  toggleAttendance,
  saveAttendance,
}: Props) {

  if (!grade) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-[100]">
        
        {/* BACKDROP */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <DialogPanel className="dash-card w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              
              {/* HEADER */}
              <div className="p-6 border-b border-[var(--dash-border)] bg-[var(--dash-surface-2)] flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[var(--primary)] text-white rounded-xl shadow-lg shadow-blue-500/20">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-[var(--dash-text)]">
                      Grade {grade.grade} {grade.section ? `- ${grade.section}` : ""}
                    </h3>
                    <p className="text-xs text-[var(--dash-text-muted)] font-medium uppercase tracking-wider">
                      Student Attendance Registry
                    </p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-[var(--muted-bg)] rounded-full transition-colors text-[var(--dash-text-muted)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* TABLE BODY */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-[var(--dash-surface)] z-10 shadow-sm">
                    <tr className="border-b border-[var(--dash-border)] text-[var(--dash-text-muted)] text-[10px] uppercase tracking-[0.15em] font-bold">
                      <th className="px-6 py-4 w-20">Roll</th>
                      <th className="px-6 py-4">Student Name</th>
                      <th className="px-6 py-4 text-center">Current Status</th>
                      <th className="px-6 py-4 text-right">Toggle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--dash-border)]">
                    {students.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-20 text-center text-[var(--dash-text-muted)] italic">
                          No students enrolled in this grade yet.
                        </td>
                      </tr>
                    ) : (
                      students.map((student) => {
                        const isPresent = student.status === "Present";
                        return (
                          <tr key={student.id || student._id} className="hover:bg-[var(--dash-surface-2)] transition-colors group">
                            <td className="px-6 py-4 font-mono text-xs text-[var(--dash-text-muted)]">
                              #{student.roll ?? student._id?.slice(-4).toUpperCase()}
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-bold text-[var(--dash-text)] text-sm">{student.name}</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${
                                isPresent 
                                  ? "bg-green-500/10 text-green-600" 
                                  : "bg-red-500/10 text-red-600"
                              }`}>
                                {isPresent ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                {student.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => toggleAttendance(student.id || student._id || "")}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                                  isPresent 
                                    ? "border-green-500 bg-green-500 text-white shadow-md shadow-green-500/20" 
                                    : "border-[var(--dash-border)] bg-[var(--dash-surface)] text-[var(--dash-text-muted)]"
                                }`}
                              >
                                {isPresent ? "Mark Absent" : "Mark Present"}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* FOOTER */}
              <div className="p-6 border-t border-[var(--dash-border)] bg-[var(--dash-surface-2)] flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4 text-sm font-medium">
                  <span className="text-[var(--dash-text-muted)]">
                    Total: <b className="text-[var(--dash-text)]">{students.length}</b>
                  </span>
                  <span className="text-green-600">
                    Present: <b>{students.filter(s => s.status === "Present").length}</b>
                  </span>
                </div>
                
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-6 py-2.5 border border-[var(--dash-border)] rounded-xl font-bold text-sm hover:bg-[var(--muted-bg)] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveAttendance}
                    className="flex-1 sm:flex-none btn-primary px-8 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-500/20"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>

            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}