export default function StudentsTab() {
  const students = [
    { name: 'Emma Wilson', id: 'STU2024001', class: 'Math 101-A', attendance: 96, grade: 'A', avatar: 'EW' },
    { name: 'James Miller', id: 'STU2024002', class: 'Math 101-A', attendance: 92, grade: 'A-', avatar: 'JM' },
    { name: 'Sophia Brown', id: 'STU2024003', class: 'Math 101-B', attendance: 88, grade: 'B+', avatar: 'SB' },
    { name: 'Michael Davis', id: 'STU2024004', class: 'Advanced Calculus', attendance: 94, grade: 'A', avatar: 'MD' },
  ];

  return (
    <div className="tab-content">
      <div className="mb-4 flex gap-3">
        <input
          type="text"
          placeholder="Search students..."
          className="dash-input flex-1"
        />
        <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-500 rounded-lg font-medium transition-all">
          Filter
        </button>
      </div>

      <div className="space-y-3">
        {students.map((student, index) => (
          <div key={index} className="dash-card p-4 hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                {student.avatar}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold dash-text">{student.name}</h4>
                <p className="text-xs dash-text-muted">{student.id} • {student.class}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-xs dash-text-muted">Attendance</p>
                  <p className="text-sm font-semibold text-green-500">{student.attendance}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs dash-text-muted">Grade</p>
                  <p className="text-sm font-semibold text-blue-500">{student.grade}</p>
                </div>
                <button className="px-3 py-1 dash-card-alt hover:opacity-80 dash-text-muted rounded-lg text-sm transition-all">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
