export default function TeachersTab() {
  const stats = [
    {
      icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path></svg>,
      value: '24',
      label: 'Total Teachers',
      change: '+2 this month',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path></svg>,
      value: '22',
      label: 'Active Teachers',
      change: '91.7% active',
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path></svg>,
      value: '2',
      label: 'On Leave',
      change: 'this week',
      gradient: 'from-amber-500 to-amber-600',
    },
    {
      icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path></svg>,
      value: '40',
      label: 'Avg. Students',
      change: 'per teacher',
      gradient: 'from-purple-500 to-purple-600',
    },
  ];

  const teachers = [
    {
      name: 'Dr. Sarah Johnson',
      initial: 'D',
      subject: 'Mathematics',
      email: 'sarah.j@school.com',
      status: 'Active',
      statusColor: 'green',
      students: 45,
    },
    {
      name: 'Prof. Michael Chen',
      initial: 'P',
      subject: 'Physics',
      email: 'michael.c@school.com',
      status: 'Active',
      statusColor: 'green',
      students: 38,
    },
    {
      name: 'Ms. Emily Davis',
      initial: 'M',
      subject: 'English',
      email: 'emily.d@school.com',
      status: 'On Leave',
      statusColor: 'amber',
      students: 42,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/40 transition-all">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <h3 className="text-3xl font-bold text-slate-100 mb-1">{stat.value}</h3>
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="text-xs text-amber-400 mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50 border-b border-amber-500/20">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase tracking-wider">Students</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-amber-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {teachers.map((teacher, index) => (
                <tr key={index} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 font-bold">
                        {teacher.initial}
                      </div>
                      <span className="text-sm font-medium text-slate-200">{teacher.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{teacher.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{teacher.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${teacher.statusColor}-500/20 text-${teacher.statusColor}-400 border border-${teacher.statusColor}-500/30`}>
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{teacher.students}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                        <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
