export default function AttendanceTab() {
  const attendance = [
    { class: 'Grade 10-A', present: 28, absent: 2, total: 30, percentage: 93 },
    { class: 'Grade 10-B', present: 26, absent: 4, total: 30, percentage: 87 },
    { class: 'Grade 11-A', present: 29, absent: 1, total: 30, percentage: 97 },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="dash-card p-6">
          <h3 className="text-3xl font-bold text-green-500 mb-1">92.3%</h3>
          <p className="text-sm dash-text-muted">Overall Attendance</p>
        </div>
        <div className="dash-card p-6">
          <h3 className="text-3xl font-bold dash-text mb-1">784</h3>
          <p className="text-sm dash-text-muted">Present Today</p>
        </div>
        <div className="dash-card p-6">
          <h3 className="text-3xl font-bold text-red-500 mb-1">72</h3>
          <p className="text-sm dash-text-muted">Absent Today</p>
        </div>
      </div>

      <div className="dash-card overflow-hidden">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Total</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((item, i) => (
              <tr key={i}>
                <td className="font-medium">{item.class}</td>
                <td className="text-green-500">{item.present}</td>
                <td className="text-red-500">{item.absent}</td>
                <td>{item.total}</td>
                <td>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">{item.percentage}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
