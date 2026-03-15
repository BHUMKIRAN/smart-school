'use client';

import React, { useState } from 'react';
import { CheckCircle2, Calendar, Fingerprint, ArrowUpRight, Loader2 } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { useCreateTeacherAttendance } from "@/hooks/useTeacherAttendance"; 
import { useSelector } from 'react-redux';

export default function MarkAttendance() {
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const monthlyProgress = 88; 
  const createTeacherAttendance = useCreateTeacherAttendance();

  // Get teacher info from Redux store
  const teacher = useSelector((state: any) => state.auth.user); // adjust path if needed
  const teacherId = teacher?.id;

  const handleMarkAttendance = async () => {
    const trimmedCode = code.trim();

    if (!teacherId) {
      toast.error('User not found', { description: 'Please login first.' });
      return;
    }

    if (trimmedCode.length !== 6) {
      toast.error('Invalid Code', {
        description: 'Please enter the 6-digit code for this session.',
      });
      return;
    }

    setIsSubmitting(true);

    // Call your mutation with proper callbacks
    createTeacherAttendance.mutate(
      {
        code: trimmedCode,
        status: "Present",
        teacherId: teacherId,
      },
      {
        onSuccess: (data) => {
          setIsSubmitting(false);
          toast.success('Attendance Marked', {
            description: 'Your presence has been successfully recorded.',
            icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
          });
          setCode('');
        },
        onError: (error: any) => {
          setIsSubmitting(false);
          toast.error(
            error?.response?.data?.message || 'Failed to mark attendance'
          );
        },
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 p-4 ">
      <Toaster position="top-center" richColors />

      {/* Action Card */}
      <div className="md:col-span-7 bg-accent dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-100 dark:border-emerald-900/20">
            <Fingerprint className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-primary dark:text-slate-100 uppercase tracking-tight">
              Mark Your Attendance
            </h2>
            <p className="text-xs text-primary font-medium">
              Confirm your presence for today&apos;s session
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-primary uppercase tracking-[0.15em] ml-1">
              Session Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="••••••"
              maxLength={6}
              className="w-full h-16 px-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-3xl font-mono tracking-[0.4em] focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-200 dark:placeholder:text-slate-800 text-emerald-600 dark:text-emerald-500"
            />
          </div>

          <button 
            onClick={handleMarkAttendance}
            disabled={isSubmitting}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>Complete Check-in <CheckCircle2 className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}