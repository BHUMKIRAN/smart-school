export default function AttendanceTab() {
  const attendance = [
    { class: 'Grade 10-A', present: 28, absent: 2, total: 30, percentage: 93 },
    { class: 'Grade 10-B', present: 26, absent: 4, total: 30, percentage: 87 },
    { class: 'Grade 11-A', present: 29, absent: 1, total: 30, percentage: 97 },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
          <h3 className="text-3xl font-bold text-green-400 mb-1">92.3%</h3>
          <p className="text-sm text-slate-400">Overall Attendance</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
          <h3 className="text-3xl font-bold text-slate-100 mb-1">784</h3>
          <p className="text-sm text-slate-400">Present Today</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
          <h3 className="text-3xl font-bold text-red-400 mb-1">72</h3>
          <p className="text-sm text-slate-400">Absent Today</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900/50 border-b border-amber-500/20">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase">Class</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase">Present</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase">Absent</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase">Total</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase">Percentage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {attendance.map((item, i) => (
              <tr key={i} className="hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-200">{item.class}</td>
                <td className="px-6 py-4 text-sm text-green-400">{item.present}</td>
                <td className="px-6 py-4 text-sm text-red-400">{item.absent}</td>
                <td className="px-6 py-4 text-sm text-slate-300">{item.total}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">{item.percentage}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
