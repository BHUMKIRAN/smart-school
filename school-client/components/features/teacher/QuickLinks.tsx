export default function QuickLinks() {
  const links = [
    {
      title: 'Lesson Planner',
      gradient: 'from-blue-500/20 to-blue-600/20',
      border: 'border-blue-500/30',
      hoverBorder: 'hover:border-blue-500/50',
      icon: (
        <svg className="w-8 h-8 text-blue-400 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      ),
    },
    {
      title: 'Performance Reports',
      gradient: 'from-purple-500/20 to-purple-600/20',
      border: 'border-purple-500/30',
      hoverBorder: 'hover:border-purple-500/50',
      icon: (
        <svg className="w-8 h-8 text-purple-400 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      ),
    },
    {
      title: 'Student Directory',
      gradient: 'from-green-500/20 to-green-600/20',
      border: 'border-green-500/30',
      hoverBorder: 'hover:border-green-500/50',
      icon: (
        <svg className="w-8 h-8 text-green-400 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      ),
    },
    {
      title: 'Help & Support',
      gradient: 'from-amber-500/20 to-amber-600/20',
      border: 'border-amber-500/30',
      hoverBorder: 'hover:border-amber-500/50',
      icon: (
        <svg className="w-8 h-8 text-amber-400 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="dash-card p-6">
      <h3 className="text-xl font-bold dash-text mb-4">Quick Links</h3>
      <div className="grid grid-cols-2 gap-3">
        {links.map((link, index) => (
          <button
            key={index}
            className={`p-4 bg-gradient-to-br ${link.gradient} border ${link.border} rounded-lg ${link.hoverBorder} transition-all text-left group`}
          >
            {link.icon}
            <p className="text-sm font-semibold dash-text">{link.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
