export default function StatsCards() {
  const stats = [
    {
      icon: (
        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      ),
      title: 'Total Students',
      value: '156',
      change: '+12 this semester',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      ),
      title: 'Active Classes',
      value: '8',
      change: '3 today',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      title: 'Avg Attendance',
      value: '94.2%',
      change: '+2.3% from last week',
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
        </svg>
      ),
      title: 'Pending Tasks',
      value: '7',
      change: '2 due today',
      gradient: 'from-amber-500 to-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="glass-effect rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all group">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.gradient} bg-opacity-20`}>
              {stat.icon}
            </div>
            <span className="text-xs px-2 py-1 bg-slate-800/50 rounded-full text-slate-400">
              Live
            </span>
          </div>
          <h3 className="text-sm font-medium text-slate-400 mb-1">{stat.title}</h3>
          <p className="text-3xl font-bold text-slate-100 mb-2">{stat.value}</p>
          <p className="text-xs text-green-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
            {stat.change}
          </p>
        </div>
      ))}
    </div>
  );
}
