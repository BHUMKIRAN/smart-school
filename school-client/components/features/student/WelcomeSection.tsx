'use client';

import { useSelector } from 'react-redux';
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Star, 
  CalendarCheck,
  LayoutDashboard 
} from 'lucide-react';

export default function WelcomeSection({ assignments = [] }: { assignments?: any[] }) {
  // Pull user data from Redux
  const user = useSelector((state: any) => state.auth.user);
  
  // Dynamic Greeting based on time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  // Mock Attendance (Replace with real logic if available in Redux/API)
  const attendance = "94.5%";
  
  // Calculate stats from user object/props
  const coursesCount = user?.grade?.subjects?.length || 6;
  const pendingHomework = assignments.length || 0;

  const stats = [
    {
      icon: <CalendarCheck className="w-4 h-4" />,
      label: 'Attendance',
      value: attendance,
      color: 'text-[var(--primary)]',
      bg: 'bg-[var(--secondary)]',
      border: 'border-[var(--dash-border)]'
    },
    {
      icon: <BookOpen className="w-4 h-4" />,
      label: 'Courses',
      value: coursesCount.toString(),
      color: 'text-[var(--accent)]',
      bg: 'bg-[color-mix(in_srgb,var(--accent)_12%,var(--secondary))]',
      border: 'border-[var(--dash-border)]'
    },
    {
      icon: <Clock className="w-4 h-4" />,
      label: 'Pending',
      value: pendingHomework.toString(),
      color: 'text-[var(--primary)]',
      bg: 'bg-[var(--secondary)]',
      border: 'border-[var(--dash-border)]'
    },
    {
      icon: <Star className="w-4 h-4" />,
      label: 'GPA',
      value: '3.8',
      color: 'text-[var(--accent)]',
      bg: 'bg-[color-mix(in_srgb,var(--accent)_12%,var(--secondary))]',
      border: 'border-[var(--dash-border)]'
    },
  ];

  return (
    <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative overflow-hidden rounded-[2rem] bg-[var(--dash-surface)] border border-[var(--dash-border)] p-6 md:p-10 shadow-sm">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] rounded-full blur-3xl opacity-60"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-1 w-8 bg-[var(--primary)] rounded-full"></div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--primary)]/70">
                  Student Dashboard
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--dash-text)]">
                {greeting}, {user?.name}
              </h2>
              <p className="text-[var(--dash-text-muted)] mt-2 font-medium">
                You have <span className="text-[var(--dash-text)] font-bold">{pendingHomework} tasks</span> to complete today. Keep up the great work!
              </p>
            </div>
            
            <div className="hidden lg:flex items-center gap-4 bg-[var(--secondary)] p-2 rounded-2xl border border-[var(--dash-border)]">
              <div className="w-12 h-12 rounded-xl bg-[var(--dash-surface)] flex items-center justify-center shadow-sm">
                <GraduationCap className="text-[var(--primary)] w-6 h-6" />
              </div>
              <div className="pr-4">
                <p className="text-[10px] uppercase font-bold text-[var(--dash-text-muted)] leading-none mb-1">Grade</p>
                <p className="text-sm font-bold text-[var(--dash-text)]">{user?.grade?.grade || 'Not Assigned'}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`p-5 rounded-[1.5rem] border ${stat.border} ${stat.bg} group/stat transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--primary)]/10`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-[var(--dash-surface)] shadow-sm flex items-center justify-center ${stat.color} transition-transform group-hover/stat:rotate-12`}>
                    {stat.icon}
                  </div>
                  <span className="text-[11px] uppercase tracking-widest font-black text-[var(--dash-text-muted)]">
                    {stat.label}
                  </span>
                </div>
                
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-black tracking-tighter text-[var(--dash-text)]">
                    {stat.value}
                  </p>
                  <div className="h-2 w-12 bg-[var(--dash-surface)]/60 rounded-full overflow-hidden">
                    <div className={`h-full ${stat.color.replace('text', 'bg')} opacity-40 w-2/3`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
