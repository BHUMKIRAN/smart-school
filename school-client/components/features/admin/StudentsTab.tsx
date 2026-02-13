export default function StudentsTab() {
  const stats = [
    { value: '856', label: 'Total Students', change: '+12 this week', gradient: 'from-cyan-500 to-cyan-600' },
    { value: '812', label: 'Active Students', change: '94.9% active', gradient: 'from-green-500 to-green-600' },
    { value: '32', label: 'New Admissions', change: 'this month', gradient: 'from-blue-500 to-blue-600' },
    { value: '12', label: 'Pending Applications', change: 'awaiting review', gradient: 'from-amber-500 to-amber-600' },
  ];

  const students = [
    { name: 'Emma Wilson', initial: 'E', grade: 'Grade 10-A', email: 'emma.w@school.com', attendance: '96%', gpa: '3.8' },
    { name: 'James Miller', initial: 'J', grade: 'Grade 10-B', email: 'james.m@school.com', attendance: '92%', gpa: '3.6' },
    { name: 'Sophia Brown', initial: 'S', grade: 'Grade 11-A', email: 'sophia.b@school.com', attendance: '88%', gpa: '3.9' },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase">Student</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase">Grade</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase">Attendance</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase">GPA</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-amber-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {students.map((student, i) => (
                <tr key={i} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                        {student.initial}
                      </div>
                      <span className="text-sm font-medium text-slate-200">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.grade}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{student.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.attendance}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.gpa}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg text-xs font-medium transition-colors">View Details</button>
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
