'use client';

import Logo from "@/components/shared/logo";
import { useSelector } from "react-redux";
import { Bell, ChevronDown } from "lucide-react"; // Recommended: npm install lucide-react

interface StudentHeaderProps {
  toggleLogout: (value: boolean) => void;
}

export default function StudentHeader({ toggleLogout }: StudentHeaderProps) {
  const user = useSelector((state: any) => state.auth.user);

  const getInitials = (name: string) => {
    if (!name) return 'ST';
    const parts = name.trim().split(' ');
    return parts.length > 1
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--dash-border)] bg-[var(--dash-glass)] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Branding */}
          <div className="flex items-center gap-8">
            <Logo />
            {/* Optional: Desktop Navigation links could go here */}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            
            {/* Grade Badge */}
            {user?.grade?.grade && (
              <div className="hidden md:flex items-center px-3 py-1 rounded-full shadow-sm bg-[var(--secondary)] border border-[var(--dash-border)]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--dash-text-muted)] mr-1.5">Grade</span>
                <span className="text-sm font-semibold text-[var(--primary)]">{user.grade.grade}</span>
              </div>
            )}

            {/* Notification Bell */}
            <button className="relative p-2 text-[var(--dash-text-muted)] hover:text-[var(--primary)] hover:bg-[var(--secondary)] rounded-xl transition-all group">
              <Bell className="w-5 h-5 transition-transform group-hover:rotate-12" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--dash-surface)]"></span>
            </button>

            {/* Vertical Divider */}
            <div className="h-6 w-[1px] bg-[var(--dash-border)] hidden sm:block"></div>

            {/* Profile Trigger */}
            <button
              onClick={() => toggleLogout(true)}
              className="flex items-center gap-2 p-1 pr-3 rounded-full border border-[var(--dash-border)] hover:border-[var(--primary)] hover:bg-[var(--secondary)] transition-all group"
            >
              <div className="w-8 h-8 rounded-full hero-gradient flex items-center justify-center text-white text-xs font-bold shadow-inner ring-2 ring-transparent group-hover:ring-[var(--secondary)] transition-all">
                {getInitials(user?.name || '')}
              </div>
              
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-[var(--dash-text)] leading-tight">
                  {user?.name || 'Student'}
                </p>
                <p className="text-[10px] text-[var(--dash-text-muted)] leading-tight">View Profile</p>
              </div>

              <ChevronDown className="w-4 h-4 text-[var(--dash-text-muted)] group-hover:text-[var(--dash-text)] transition-colors" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
