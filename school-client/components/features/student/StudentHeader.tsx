interface StudentHeaderProps {
  toggleLogout: (value: boolean) => void;
}

export default function StudentHeader({ toggleLogout }: StudentHeaderProps) {
  return (
    <header className="navbar border-b border-[var(--dash-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Branding */}
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer">
              <div className="w-9 h-9 rounded-lg hero-gradient flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-[var(--background)]"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight text-[var(--foreground)]">Student Portal</h1>
              <p className="text-[10px] uppercase tracking-wider font-semibold opacity-60">Grade 10 • Sec A</p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="p-2 rounded-full hover:bg-[var(--secondary)] transition-colors relative">
              <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--primary)] rounded-full border-2 border-[var(--background)]"></span>
            </button>

            {/* Profile Trigger */}
            <button 
              onClick={() => toggleLogout(true)}
              className="flex items-center gap-3 pl-3 pr-1 py-1 rounded-full border border-[var(--dash-border)] hover:bg-[var(--secondary)] transition-all"
            >
              <div className="hidden lg:block text-right">
                <p className="text-xs font-bold leading-none">Alex Thompson</p>
                <p className="text-[10px] opacity-60">ID: 001</p>
              </div>
              <div className="w-8 h-8 rounded-full hero-gradient flex items-center justify-center text-white text-xs font-bold shadow-sm">
                AT
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}