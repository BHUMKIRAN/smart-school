'use client';

import { X } from 'lucide-react';

interface TeacherCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: {
    name: string;
    email: string;
    phone?: string;
    salary?: string;
    department?: string;
    subject?: string;
    schedule?: string;
    profilePic?: string;
  };
}

export default function TeacherCardModal({ isOpen, onClose, teacher }: TeacherCardModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white dark:bg-slate-950 rounded-2xl w-full max-w-md relative p-6 shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5 text-slate-600 dark:text-slate-200" />
        </button>

        {/* Profile */}
        <div className="flex flex-col items-center gap-3 mb-6">
          {teacher.profilePic ? (
            <img
              src={teacher.profilePic}
              alt={teacher.name}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-3xl">
              {teacher.name.charAt(0).toUpperCase()}
            </div>
          )}
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">{teacher.name}</h2>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between">
            <span className="text-xs uppercase text-slate-400 font-bold">Email</span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{teacher.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-xs uppercase text-slate-400 font-bold">Phone</span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {teacher.phone || "Not Provided"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-xs uppercase text-slate-400 font-bold">Salary</span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {teacher.salary || "Not Assigned"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-xs uppercase text-slate-400 font-bold">Department</span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {teacher.department || "Not Assigned"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-xs uppercase text-slate-400 font-bold">Subject</span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {teacher.subject || "Not Assigned"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-xs uppercase text-slate-400 font-bold">Schedule</span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {teacher.schedule || "Not Assigned"}
            </span>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}