export default function WelcomeSection() {
  const stats = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Attendance',
      value: '94.5%',
      colorClass: 'text-success',
      bgClass: 'bg-success/10',
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      label: 'Courses',
      value: '6',
      colorClass: 'text-[var(--primary)]',
      bgClass: 'bg-[var(--primary)]/10',
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      label: 'Pending',
      value: '3',
      colorClass: 'text-error',
      bgClass: 'bg-error/10',
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      label: 'GPA',
      value: '3.8',
      colorClass: 'text-warning',
      bgClass: 'bg-warning/10',
    },
  ];

  return (
    <div className="mb-8 animate-slide-up">
      <div className="dash-card p-6 md:p-8 relative overflow-hidden group">
        {/* Subtle Brand Ambient Light */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--primary)] opacity-[0.08] rounded-full blur-3xl transition-opacity group-hover:opacity-10"></div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-1">
              Welcome back, Alex! 
            </h2>
            <p className="opacity-60 text-sm font-medium">
              Here&apos;s a quick look at your academic progress for today.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="p-4 rounded-xl border border-[var(--dash-border)] bg-[var(--background)] hover:shadow-md transition-all duration-300 group/stat"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg ${stat.bgClass} ${stat.colorClass} flex items-center justify-center transition-transform group-hover/stat:scale-110`}>
                    {stat.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-bold opacity-50">
                    {stat.label}
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}