export default function ApplicationsTab() {
  const applications = [
    { name: 'Robert Martinez', initial: 'R', type: 'Leave Application', date: '2024-03-14', priority: 'Normal', status: 'Pending' },
    { name: 'Sophie Anderson', initial: 'S', type: 'Certificate Request', date: '2024-03-14', priority: 'High', status: 'Pending' },
  ];

  return (
    <div className="dash-card overflow-hidden">
      <table className="dash-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Type</th>
            <th>Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, i) => (
            <tr key={i}>
              <td className="whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">{app.initial}</div>
                  <span className="text-sm font-medium">{app.name}</span>
                </div>
              </td>
              <td>{app.type}</td>
              <td className="dash-text-muted">{app.date}</td>
              <td>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.priority === 'High' ? 'bg-red-500/20 text-red-500' : 'bg-gray-500/20 dash-text-muted'}`}>{app.priority}</span>
              </td>
              <td>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-500">{app.status}</span>
              </td>
              <td className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <button className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-500 rounded-lg text-xs font-medium">Approve</button>
                  <button className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg text-xs font-medium">Reject</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
