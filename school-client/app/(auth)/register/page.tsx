'use client';

import { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  GraduationCap, 
  Users, 
  Phone,
  ArrowLeft 
} from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  // Admin हटाइएको छ, Student र Teacher मात्र बाँकी छ
  const [role, setRole] = useState<'Student' | 'Teacher'>('Student');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-[500px] space-y-8">
        
        {/* Logo Section */}
        <div className="flex justify-center">
          <Logo />
        </div>

        {/* Register Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-2xl shadow-blue-500/5">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white nepali-text">
              नयाँ दर्ता गर्नुहोस्
            </h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">कृपया आफ्नो सही विवरण भर्नुहोस्</p>
          </div>

          {/* Role Switcher (Only Student & Teacher) */}
          <div className="flex gap-3 p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl mb-8">
            <button
              onClick={() => setRole('Student')}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl transition-all duration-300 ${
                role === 'Student' 
                  ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' 
                  : 'text-slate-400 opacity-60'
              }`}
            >
              <GraduationCap size={20} />
              <span className="text-xs font-black nepali-text uppercase">विद्यार्थी</span>
            </button>
            <button
              onClick={() => setRole('Teacher')}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl transition-all duration-300 ${
                role === 'Teacher' 
                  ? 'bg-white dark:bg-slate-700 shadow-sm text-emerald-600' 
                  : 'text-slate-400 opacity-60'
              }`}
            >
              <Users size={20} />
              <span className="text-xs font-black nepali-text uppercase">शिक्षक</span>
            </button>
          </div>

          {/* Registration Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 ml-1 uppercase tracking-widest">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={17} />
                  <input type="text" placeholder="पूरा नाम" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm font-medium" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 ml-1 uppercase tracking-widest">Phone</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={17} />
                  <input type="tel" placeholder="98XXXXXXXX" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm font-medium" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 ml-1 uppercase tracking-widest">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={17} />
                <input type="email" placeholder="email@example.com" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm font-medium" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 ml-1 uppercase tracking-widest">Create Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={17} />
                <input type="password" placeholder="••••••••" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm font-medium" />
              </div>
            </div>

            <button className={`w-full py-4 mt-4 text-white rounded-2xl font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2 group ${
              role === 'Student' ? 'bg-blue-600 shadow-blue-500/20' : 'bg-emerald-600 shadow-emerald-500/20'
            }`}>
              <span className="nepali-text text-base">
                {role === 'Student' ? 'भर्ना आवेदन दिनुहोस्' : 'दर्ता गर्नुहोस्'}
              </span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Back to Login */}
        <Link href="/login" className="flex items-center justify-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors">
          <ArrowLeft size={16} />
          <span className="text-sm">लगइन पेजमा जानुहोस्</span>
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