'use client';

import { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/shared/logo';

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] animate-fadeIn">
        
        <div className="card overflow-hidden border-none shadow-xl mb-6">
          {/* Top Header Section - Matches Login Style */}
          <header className="bg-primary-dark py-2 flex flex-col items-center justify-center text-white text-center">
            <div className=" p-2 rounded-xl mb-3">
              <Logo />
            </div>
            <h2 className="text-xl text-accent font-bold nepali-text tracking-tight">
              {emailSent ? 'इमेल पठाइयो!' : 'पासवर्ड बिर्सनुभयो?'}
            </h2>
           
          </header>

          <div className="p-6 md:p-8">
            {!emailSent ? (
              <>
                <div className="text-center mb-6">
                  <p className="text-[var(--muted-text)] text-xs font-medium leading-relaxed">
                    तपाईंको रजिस्टर्ड इमेल भर्नुहोस्, हामी रिसेट लिङ्क पठाउनेछौं।
                  </p>
                </div>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setEmailSent(true); }}>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[var(--muted-text)] uppercase tracking-wider ml-1">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-text)]" size={16} />
                      <input 
                        type="email" 
                        required
                        placeholder="example@school.com" 
                        className="dash-input w-full pl-10 text-sm py-2.5 rounded-lg" 
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-full py-3 mt-2 flex items-center justify-center gap-2 group">
                    <span className="nepali-text">लिङ्क पठाउनुहोस्</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-2 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-[var(--muted-bg)] border border-[var(--card-border)] rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--success)]">
                  <CheckCircle2 size={32} />
                </div>
                <p className="text-[var(--muted-text)] text-xs font-medium leading-relaxed">
                  हामीले पासवर्ड रिसेट गर्ने निर्देशन तपाईंको इमेलमा पठाएका छौं। कृपया इनबक्स चेक गर्नुहोस्।
                </p>
                
                <div className="mt-8 pt-6 border-t border-[var(--card-border)]">
                   <button 
                    onClick={() => setEmailSent(false)}
                    className="text-[11px] font-bold text-[var(--primary)] hover:underline nepali-text"
                  >
                    इमेल प्राप्त भएन? पुनः पठाउनुहोस्
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back to Login Link */}
        <Link href="/login" className="flex items-center justify-center gap-2 text-[var(--muted-text)] hover:text-[var(--primary)] transition-colors group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[11px] font-bold uppercase tracking-wider">लगइन पेजमा फिर्ता जानुहोस्</span>
        </Link>

        <p className="text-center mt-8 text-[var(--muted-text)] text-[11px] font-medium opacity-60">
          &copy; {new Date().getFullYear()} School Management System
        </p>
      </div>
    </div>
  );
}