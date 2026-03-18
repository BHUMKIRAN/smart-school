'use client';

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X, CheckCircle2, XCircle, Users, Save, CalendarDays } from "lucide-react";

export default function AttendanceClassModal({
  isOpen,
  onClose,
  grade,
  students,
  toggleAttendance,
  saveAttendance
}: any) {

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
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
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
            <Dialog.Panel className="dash-card w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
              
              {/* HEADER */}
              <div className="p-6 border-b border-[var(--dash-border)] bg-[var(--dash-surface-2)] flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[var(--primary)] text-white rounded-xl shadow-lg shadow-blue-500/20">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <Dialog.Title className="text-xl font-black tracking-tight">
                      Grade {grade?.grade} - {grade?.section}
                    </Dialog.Title>
                    <div className="flex items-center gap-2 text-[var(--dash-text-muted)] text-sm font-medium">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-[var(--muted-bg)] rounded-full transition-colors text-[var(--dash-text-muted)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* TABLE AREA */}
              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-[var(--dash-surface)] z-10 shadow-sm">
                    <tr className="border-b border-[var(--dash-border)] text-[var(--dash-text-muted)] text-xs uppercase tracking-widest font-bold">
                      <th className="px-6 py-4">Student Name</th>
                      <th className="px-6 py-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--dash-border)]">
                    {students.map((student: any) => (
                      <tr 
                        key={student._id} 
                        className="hover:bg-[var(--dash-surface-2)] transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[var(--muted-bg)] flex items-center justify-center text-xs font-bold text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                              {student.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-[var(--dash-text)]">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => toggleAttendance(student._id)}
                            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border-2 ${
                              student.status === "Present"
                                ? "bg-green-500/10 border-green-500 text-green-600 dark:text-green-400"
                                : "bg-red-500/10 border-red-500 text-red-600 dark:text-red-400"
                            }`}
                          >
                            {student.status === "Present" ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                            {student.status}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* FOOTER */}
              <div className="p-6 border-t border-[var(--dash-border)] bg-[var(--dash-surface-2)] flex justify-between items-center">
                <div className="text-sm text-[var(--dash-text-muted)] font-medium">
                  Total Students: <span className="text-[var(--dash-text)] font-bold">{students.length}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 border border-[var(--dash-border)] rounded-xl font-bold hover:bg-[var(--muted-bg)] transition-all text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveAttendance}
                    className="btn-primary px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 text-sm shadow-lg shadow-blue-500/20"
                  >
                    <Save className="w-4 h-4" />
                    Save Attendance
                  </button>
                </div>
              </div>

            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}