'use client';

import { LogOut, Bell } from "lucide-react";
import Logo from "@/components/shared/logo";
import { useSelector } from "react-redux";

interface NavbarProps {
  title: string;
  subtitle: string;
  setLogout: (logout: boolean) => void;
}

export default function Navbar({
  setLogout,
}: NavbarProps) {
  // Get user data from Redux
  const user = useSelector((state: any) => state.auth.user);

  // Fallback initial
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <header className="sticky top-0 z-40 w-full py-1 md:py-3 bg-[var(--nav-bg)] border-b border-[var(--nav-border)] backdrop-blur-md transition-all duration-300">
      <div className="px-3 sm:px-6 lg:px-10">
        <div className="flex h-14 md:h-16 items-center justify-between gap-2 md:gap-4">
          
          {/* Left Section: Logo - Scaled for small screens */}
          <div className="flex items-center">
            <div className="flex-shrink-0 scale-90 md:scale-100">
              <Logo />
            </div>
          </div>

          {/* Right Section: Actions & Profile */}
          <div className="flex items-center gap-1 sm:gap-4">
            
            {/* Notification Bell - Hidden on extra small screens if space is tight */}
            <button className="p-2 text-[var(--dash-text-muted)] hover:scale-110 active:scale-95 rounded-full transition-all duration-200 relative">
              <Bell className="w-5 h-5 text-[var(--accent)]" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-[var(--info)] animate-bounce rounded-full border-2 border-[var(--nav-bg)]"></span>
            </button>

            {/* Profile Dropdown Container */}
            <div className="flex items-center gap-2 md:gap-3 pl-2 ml-1 md:ml-2 border-l border-[var(--nav-border)]">
              
              {/* Name and Role - Hidden on Mobile (sm and down), visible on md+ */}
              <div className="hidden md:flex flex-col items-end">
                <p className="text-xs font-bold text-[var(--nav-text)] uppercase tracking-tight truncate max-w-[120px]">
                  {user?.name || "Guest User"}
                </p>
                <p className="text-[9px] font-medium text-[var(--nav-text)] opacity-80 uppercase">
                  {user?.role || "Active Session"}
                </p>
              </div>

              {/* Avatar - Slightly smaller on mobile */}
              <div className="relative group cursor-pointer">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white font-bold overflow-hidden shadow-sm shadow-blue-500/20">
                  {user?.image ? (
                    <img 
                      src={user.image} 
                      alt={user.name} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <span className="text-sm md:text-base">{initial}</span>
                  )}
                </div>
              </div>

              {/* Logout Button - Constant visibility but larger touch target on mobile */}
              <button
                onClick={() => setLogout(true)}
                title="Sign Out"
                className="ml-1 p-2 text-[var(--error)] hover:bg-rose-500/10 rounded-lg transition-all active:scale-90"
              >
                <LogOut className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}