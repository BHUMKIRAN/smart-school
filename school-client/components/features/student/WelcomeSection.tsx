'use client';

import { useSelector } from 'react-redux';
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Star, 
  CalendarCheck,
  Zap,
  ChevronRight
} from 'lucide-react';

export default function WelcomeSection({ assignments = [] }: { assignments?: any[] }) {
  const user = useSelector((state: any) => state.auth.user);
  
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  const attendance = "94.5%";
  const coursesCount = user?.grade?.subjects?.length || 6;
  const pendingHomework = assignments.length || 0;

  const stats = [
    {
      icon: <CalendarCheck className="w-4 h-4" />,
      label: 'Attendance',
      value: attendance,
      color: 'text-[var(--success)]',
      accent: 'bg-[var(--success)]',
    },
    {
      icon: <BookOpen className="w-4 h-4" />,
      label: 'Courses',
      value: coursesCount.toString(),
      color: 'text-[var(--primary)]',
      accent: 'bg-[var(--primary)]',
    },
    {
      icon: <Clock className="w-4 h-4" />,
      label: 'Pending',
      value: pendingHomework.toString(),
      color: 'text-[var(--error)]',
      accent: 'bg-[var(--error)]',
    },
    {
      icon: <Star className="w-4 h-4" />,
      label: 'GPA',
      value: '3.8',
      color: 'text-[var(--accent)]',
      accent: 'bg-[var(--accent)]',
    },
  ];

  return (
    <div className="mb-6 animate-fadeIn">
      <div className="dash-card overflow-hidden border-[var(--dash-border)] relative shadow-md">
        
        {/* Top Branding Bar */}
        <div className="bg-[var(--dash-surface-2)] px-6 py-2 border-b border-[var(--dash-border)] flex justify-between items-center">
          <div className="flex items-center gap-2">
           
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--dash-text-muted)]">
              Student Overview
            </span>
          </div>
          <div className="flex items-center gap-2 bg-[var(--dash-surface)] px-2 py-0.5 rounded border border-[var(--dash-border)]">
             <GraduationCap className="w-3 h-3 text-[var(--primary)]" />
             <span className="text-[10px] font-bold text-[var(--dash-text)] uppercase">{user?.grade?.grade || 'Grade X'}</span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[var(--dash-text)]">
                {greeting}, <span className="text-[var(--primary)]">{user?.name?.split(' ')[0]}</span>
              </h2>
              <p className="text-xs md:text-sm text-[var(--dash-text-muted)] mt-1 font-medium flex items-center gap-2">
                You have <span className="text-[var(--dash-text)] font-bold underline decoration-[var(--primary)]/30">{pendingHomework} tasks</span> pending for today.
                <ChevronRight className="w-3 h-3" />
              </p>
            </div>
            
            <div className="hidden md:block text-right">
               <p className="text-[10px] font-black text-[var(--dash-text-muted)] uppercase tracking-widest mb-1">Current Status</p>
               <div className="px-3 py-1 bg-[var(--success)]/10 text-[var(--success)] text-[10px] font-bold rounded-full border border-[var(--success)]/20 inline-block">
                 Active Student
               </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group p-4 rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface-2)] hover:border-[var(--primary)]/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-[var(--dash-surface)] border border-[var(--dash-border)] ${stat.color} group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <span className="text-[9px] font-black text-[var(--dash-text-muted)] uppercase tracking-tighter">
                    {stat.label}
                  </span>
                </div>
                
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-black tracking-tighter text-[var(--dash-text)]">
                    {stat.value}
                  </p>
                  {/* Subtle Progress Bar */}
                  <div className="h-1 w-10 bg-[var(--dash-border)] rounded-full overflow-hidden mb-2">
                    <div className={`h-full ${stat.accent} opacity-60 w-3/4`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle Decorative Background */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-32 h-32 bg-[var(--primary)]/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </div>
  );
}