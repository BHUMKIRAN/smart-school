'use client';

import React from "react";
import { Check } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 max-w-sm w-full border border-slate-100 dark:border-slate-800 shadow-2xl animate-scaleIn">
        <div className="text-center">
          {/* Minimal Animated Icon Container */}
          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 relative">
             <div className="absolute inset-0 rounded-3xl border-2 border-emerald-500/20 animate-pulse"></div>
             <Check className="w-10 h-10 text-emerald-500" strokeWidth={3} />
          </div>

          <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight mb-2">
            Success!
          </h3>
          
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed mb-8 px-4">
            Attendance has been securely recorded for your session.
          </p>

          <button
            onClick={onClose}
            className="w-full py-4 bg-slate-900 dark:bg-emerald-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:shadow-emerald-500/20 transition-all active:scale-95"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}