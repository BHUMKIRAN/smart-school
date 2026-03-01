'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, GraduationCap, Users, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [role, setRole] = useState<'Student' | 'Teacher' | 'Admin'>('Student');
  const [showPassword, setShowPassword] = useState(false);

  const roles = [
    { id: 'Student', name: 'विद्यार्थी', icon: <GraduationCap size={20} />, color: 'blue' },
    { id: 'Teacher', name: 'शिक्षक', icon: <Users size={20} />, color: 'emerald' },
    { id: 'Admin', name: 'प्रशासक', icon: <ShieldCheck size={20} />, color: 'rose' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-[450px] space-y-8">
        
        {/* Logo Section */}
        <div className="flex justify-center">
          <Logo />
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-2xl shadow-blue-500/5">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white nepali-text">
              स्वागत छ!
            </h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">अगाडि बढ्न आफ्नो विवरण भर्नुहोस्</p>
          </div>

          {/* Role Switcher */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl mb-8">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id as any)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all duration-300 ${
                  role === r.id 
                    ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 scale-100' 
                    : 'text-slate-400 hover:text-slate-600 opacity-60 scale-95'
                }`}
              >
                {r.icon}
                <span className="text-[10px] font-black nepali-text uppercase">{r.name}</span>
              </button>
            ))}
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-widest">Email / Username</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input 
                  type="text"
                  placeholder="example@school.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[11px] font-bold text-blue-600 hover:underline">बिर्सनुभयो?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-sm"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
              <span className="nepali-text text-base">लगइन गर्नुहोस्</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center text-slate-500 text-sm font-medium">
          खाता छैन? <button className="text-blue-600 font-bold hover:underline">नयाँ भर्ना आवेदन दिनुहोस्</button>
        </p>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="group flex flex-col items-center gap-4 cursor-pointer">
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-blue-600 blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
        
        {/* Logo Box */}
        <div className="relative w-20 h-20 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center shadow-xl border border-white/20 transform group-hover:rotate-[5deg] transition-transform duration-500">
          <span className="text-white font-black text-3xl nepali-text drop-shadow-md">
            श्री
          </span>
          {/* Subtle Glass Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-[2rem]"></div>
        </div>
      </div>

      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight nepali-text tracking-tighter">
          श्री पञ्चावती विद्यालय
        </h1>
        
        <div className="flex items-center gap-2 mt-1">
          <div className="h-[1px] w-4 bg-slate-300 dark:bg-slate-700"></div>
          <span className="text-[10px] uppercase font-black tracking-[0.25em] text-slate-400 dark:text-slate-500">
            आधारभूत विद्यालय
          </span>
          <div className="h-[1px] w-4 bg-slate-300 dark:bg-slate-700"></div>
        </div>

        <p className="text-[9px] font-bold text-blue-600/60 dark:text-blue-400/60 tracking-widest uppercase mt-1">
          Bhadure, Nepal • Est. 2059 BS
        </p>
      </div>
    </div>
  );
}