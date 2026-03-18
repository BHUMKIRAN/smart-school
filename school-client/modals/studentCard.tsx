'use client';

import { Dialog, DialogBackdrop, DialogPanel, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X, Mail, GraduationCap, Hash, User, Circle } from 'lucide-react';

interface StudentCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    _id: string;
    name: string;
    email: string;
    grade: string | { _id: string; grade: number; section?: string };
    attendance?: {
      status?: string;
    };
  } | null;
}

export default function StudentCardModal({
  isOpen,
  onClose,
  student
}: StudentCardModalProps) {

  if (!student) return null;

  const getGradeLabel = (grade: StudentCardModalProps["student"]["grade"] | null | undefined) => {
    if (!grade) return "Not Assigned";
    if (typeof grade === "string") return grade;
    return `Grade ${grade.grade}${grade.section ? ` - ${grade.section}` : ""}`;
  };

  const isPresent = student.attendance?.status?.toLowerCase() === "present";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        
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
            <DialogPanel className="dash-card w-full max-w-md shadow-2xl overflow-hidden border-[var(--dash-border)]">
              
              {/* HEADER WITH STATUS BANNER */}
              <div className="relative h-28 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] p-6">
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-4 mt-4">
                   <div className="w-16 h-16 rounded-2xl bg-[var(--dash-surface)] border-4 border-[var(--dash-surface)] shadow-xl flex items-center justify-center text-[var(--primary)] text-2xl font-black">
                    {student.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-white">
                    <h3 className="text-xl font-bold leading-tight">{student.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Circle className={`w-2.5 h-2.5 fill-current ${isPresent ? 'text-green-400' : 'text-red-400'}`} />
                      <span className="text-xs font-medium opacity-90 uppercase tracking-wider">
                        {student.attendance?.status || "Absent Today"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BODY / INFO LIST */}
              <div className="p-6 pt-10 space-y-1">
                <InfoRow 
                  icon={<Hash className="w-4 h-4" />} 
                  label="Student ID" 
                  value={student._id.slice(-8).toUpperCase()} 
                />
                <InfoRow 
                  icon={<Mail className="w-4 h-4" />} 
                  label="Email" 
                  value={student.email} 
                />
                <InfoRow 
                  icon={<GraduationCap className="w-4 h-4" />} 
                  label="Assigned" 
                  value={getGradeLabel(student.grade)} 
                />
                <InfoRow 
                  icon={<User className="w-4 h-4" />} 
                  label="Role" 
                  value="Student" 
                />
              </div>

              {/* FOOTER */}
              <div className="p-6 bg-[var(--dash-surface-2)] border-t border-[var(--dash-border)] flex justify-end">
                <button
                  onClick={onClose}
                  className="btn-primary px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20"
                >
                  Close Profile
                </button>
              </div>

            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

/* SUB-COMPONENT FOR DATA ROWS */
function InfoRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl hover:bg-[var(--muted-bg)] transition-colors group">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[var(--dash-surface-2)] text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
          {icon}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--dash-text-muted)]">
          {label}
        </span>
      </div>
      <span className="text-sm font-semibold text-[var(--dash-text)] break-all ml-4">
        {value}
      </span>
    </div>
  );
}