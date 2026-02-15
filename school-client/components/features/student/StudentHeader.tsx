interface StudentHeaderProps {
  toggleLogout: (value: boolean) => void;
}

export default function StudentHeader({toggleLogout}: StudentHeaderProps) {
 
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-purple-950"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Student Portal</h1>
              <p className="text-xs text-slate-400">Grade 10 - Section A</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="relative p-2 glass-card rounded-lg hover:bg-purple-500/10 transition-all">
              <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-pink-500 rounded-full animate-pulse"></span>
            </button>
            
            <div className="hidden md:flex items-center gap-3 glass-card px-4 py-2 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                AT
              </div>
              <button onClick={()=>toggleLogout(true)}>
                <p className="text-sm font-semibold text-slate-200">Alex Thompson</p>
                <p className="text-xs text-slate-400">ID: 2024-10-A-001</p>
              </button>
         
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
