export default function ApplicationsTab() {
  const applications = [
    { name: 'Robert Martinez', initial: 'R', type: 'Leave Application', date: '2024-03-14', priority: 'Normal', status: 'Pending' },
    { name: 'Sophie Anderson', initial: 'S', type: 'Certificate Request', date: '2024-03-14', priority: 'High', status: 'Pending' },
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-900/50 border-b border-amber-500/20">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase">Student</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase">Type</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase">Date</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase">Priority</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-amber-400 uppercase">Status</th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-amber-400 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {applications.map((app, i) => (
            <tr key={i} className="hover:bg-slate-700/20 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-slate-900 font-bold">{app.initial}</div>
                  <span className="text-sm font-medium text-slate-200">{app.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-300">{app.type}</td>
              <td className="px-6 py-4 text-sm text-slate-400">{app.date}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-slate-500/20 text-slate-400'}`}>{app.priority}</span>
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400">{app.status}</span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-xs font-medium">Approve</button>
                  <button className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-xs font-medium">Reject</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
