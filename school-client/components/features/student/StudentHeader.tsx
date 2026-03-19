'use client';

import Logo from "@/components/shared/logo";
import { useSelector } from "react-redux";
import { Bell, ChevronDown, GraduationCap, LogOut } from "lucide-react";

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
    <header className="navbar sticky top-0 z-50 w-full border-b border-[var(--dash-border)] bg-[var(--dash-glass)] backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 bg-nav-bg sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left: Branding */}
          <div className="flex items-center gap-8">
            <Logo />

          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 sm:gap-4">

            {/* Grade Badge - Swapped to use muted-bg for better contrast */}
            {user?.grade?.grade && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5  bg-[var(--muted-bg)] border border-[var(--dash-border)] shadow-sm">
                <GraduationCap className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span className="text-[10px] font-black uppercase tracking-tighter text-[var(--dash-text-muted)]">
                  Grade <span className="text-[var(--dash-text)] ml-1">{user.grade.grade}</span>
                </span>
              </div>
            )}

            {/* Notification Bell */}
            <button className="p-2 text-[var(--dash-text-muted)] hover:scale-110 active:scale-95 rounded-full transition-all duration-200 relative">
              <Bell className="w-5 h-5 text-[var(--accent)]" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-[var(--info)] animate-bounce rounded-full border-2 border-[var(--nav-bg)]"></span>
            </button>


            {/* Vertical Divider */}
            <div className="h-8 w-[1px] bg-[var(--dash-border)] hidden sm:block"></div>

            {/* Profile Trigger */}

            {/* Avatar with your hero-gradient */}
            <div className="w-9 h-9 rounded-xl hero-gradient flex items-center justify-center text-white text-xs font-black ring-2 ring-transparent group-hover:ring-[var(--primary)]/20 transition-all">
              {getInitials(user?.name || '')}
            </div>

            <div className="hidden lg:block text-left">
              <p className="text-[13px] font-bold text-white leading-none mb-0.5">
                {user?.name || 'Student'}
              </p>
             
            </div>

            <button
              onClick={() => toggleLogout(true)}
            
            >

              <LogOut className="text-red-600 cursor-pointer hover:scale-110" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}