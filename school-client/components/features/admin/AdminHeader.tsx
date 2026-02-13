interface AdminHeaderProps {
  title: string;
  subtitle: string;
}

export default function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <header className="bg-indigo-800 30 backdrop-blur-sm border-b border-amber-500/20 sticky top-0 z-40">
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
            <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-slate-800/50 border border-amber-500/20 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 w-64"
              />
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-lg font-medium hover:shadow-lg hover:shadow-amber-500/50 transition-all flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Add New
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
