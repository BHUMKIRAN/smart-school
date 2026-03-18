'use client';

import React from 'react';
import { X, Mail, Phone, Banknote, Building2, BookOpen, Calendar, User } from 'lucide-react';

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="dash-card w-full max-w-md shadow-2xl overflow-hidden relative animate-modalSlideIn">
        
        {/* HEADER / COVER AREA */}
        <div className="h-24 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] w-full" />
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PROFILE SECTION */}
        <div className="px-6 pb-6">
          <div className="relative -mt-12 flex flex-col items-center">
            {teacher.profilePic ? (
              <img
                src={teacher.profilePic}
                alt={teacher.name}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-[var(--dash-surface)] shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-[var(--primary)] border-4 border-[var(--dash-surface)] flex items-center justify-center text-white shadow-lg">
                <User className="w-12 h-12" />
              </div>
            )}
            <h2 className="mt-4 text-2xl font-bold text-[var(--dash-text)]">{teacher.name}</h2>
            <p className="text-[var(--primary)] font-medium text-sm">
              {teacher.subject || "Faculty Member"}
            </p>
          </div>

          {/* DETAILS LIST */}
          <div className="mt-8 space-y-1">
            <DetailRow 
              icon={<Mail className="w-4 h-4" />} 
              label="Email" 
              value={teacher.email} 
            />
            <DetailRow 
              icon={<Phone className="w-4 h-4" />} 
              label="Phone" 
              value={teacher.phone || "Not Provided"} 
            />
            <DetailRow 
              icon={<Building2 className="w-4 h-4" />} 
              label="Department" 
              value={teacher.department || "General"} 
            />
            <DetailRow 
              icon={<Banknote className="w-4 h-4" />} 
              label="Salary" 
              value={teacher.salary ? ` रू ${teacher.salary}` : "Not Assigned"} 
            />
            <DetailRow 
              icon={<Calendar className="w-4 h-4" />} 
              label="Schedule" 
              value={teacher.schedule || "Regular Shift"} 
            />
          </div>

          {/* ACTION BUTTON */}
          <div className="mt-8">
            <button
              onClick={onClose}
              className="w-full btn-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* HELPER COMPONENT FOR ROWS */
function DetailRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--dash-surface-2)] transition-colors border-b border-[var(--dash-border)] last:border-0">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[var(--muted-bg)] text-[var(--primary)]">
          {icon}
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--dash-text-muted)]">
          {label}
        </span>
      </div>
      <span className="text-sm font-semibold text-[var(--dash-text)] text-right">
        {value}
      </span>
    </div>
  );
}