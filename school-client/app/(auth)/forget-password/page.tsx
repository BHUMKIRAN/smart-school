'use client';

import { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-[450px] space-y-8">
        
        {/* Logo Section */}
        <div className="flex justify-center">
          <Logo />
        </div>

        {/* Forgot Password Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-2xl shadow-blue-500/5">
          
          {!emailSent ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                  <KeyRound size={32} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white nepali-text">
                  पासवर्ड बिर्सनुभयो?
                </h2>
                <p className="text-slate-500 text-sm mt-2 font-medium">
                  तपाईंको रजिस्टर्ड इमेल भर्नुहोस्, हामी रिसेट लिङ्क पठाउनेछौं।
                </p>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setEmailSent(true); }}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 ml-1 uppercase tracking-widest">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                    <input 
                      type="email" 
                      required
                      placeholder="example@school.com" 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-sm" 
                    />
                  </div>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
                  <span className="nepali-text text-base">लिङ्क पठाउनुहोस्</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-4 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white nepali-text">इमेल पठाइयो!</h2>
              <p className="text-slate-500 text-sm mt-3 font-medium leading-relaxed">
                हामीले पासवर्ड रिसेट गर्ने निर्देशन तपाईंको इमेलमा पठाएका छौं। कृपया इनबक्स चेक गर्नुहोस्।
              </p>
              <button 
                onClick={() => setEmailSent(false)}
                className="mt-8 text-sm font-bold text-blue-600 hover:underline"
              >
                इमेल प्राप्त भएन? पुनः पठाउनुहोस्
              </button>
            </div>
          )}
        </div>

        {/* Back to Login */}
        <Link href="/login" className="flex items-center justify-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">लगइन पेजमा फिर्ता जानुहोस्</span>
        </Link>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="group flex flex-col items-center gap-4 cursor-pointer">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-600 blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <div className="relative w-20 h-20 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center shadow-xl border border-white/20 transform group-hover:rotate-[5deg] transition-transform duration-500">
          <span className="text-white font-black text-3xl nepali-text drop-shadow-md">श्री</span>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-[2rem]"></div>
        </div>
      </div>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight nepali-text tracking-tighter">
          श्री पञ्चावती विद्यालय
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-[1px] w-4 bg-slate-300 dark:bg-slate-700"></div>
          <span className="text-[10px] uppercase font-black tracking-[0.25em] text-slate-400 dark:text-slate-500">आधारभूत विद्यालय</span>
          <div className="h-[1px] w-4 bg-slate-300 dark:bg-slate-700"></div>
        </div>
        <p className="text-[9px] font-bold text-blue-600/60 dark:text-blue-400/60 tracking-widest uppercase mt-1">
          Bhadure, Nepal • Est. 2059 BS
        </p>
      </div>
    </div>
  );
}