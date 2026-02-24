export default function ClassesTab() {
  const classes = [
    {
      name: 'Mathematics 101 - Section A',
      time: '9:00 AM - 10:30 AM',
      room: 'Room 204',
      students: 30,
      status: 'In Progress',
      statusColor: 'green',
    },
    {
      name: 'Mathematics 101 - Section B',
      time: '11:00 AM - 12:30 PM',
      room: 'Room 204',
      students: 28,
      status: 'Upcoming',
      statusColor: 'blue',
    },
    {
      name: 'Advanced Calculus',
      time: '2:00 PM - 3:30 PM',
      room: 'Room 305',
      students: 24,
      status: 'Upcoming',
      statusColor: 'blue',
    },
  ];

  return (
    <div className="tab-content space-y-4">
      {classes.map((classItem, index) => (
        <div key={index} className="dash-card p-6 hover:shadow-md transition-all group">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold dash-text mb-2">{classItem.name}</h3>
              <div className="flex flex-wrap gap-4 text-sm dash-text-muted">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {classItem.time}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {classItem.room}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  {classItem.students} Students
                </span>
              </div>
            </div>
            <span className={`px-3 py-1 bg-${classItem.statusColor}-500/20 text-${classItem.statusColor}-500 rounded-full text-sm font-medium`}>
              {classItem.status}
            </span>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-500 rounded-lg font-medium transition-all">
              View Details
            </button>
            <button className="flex-1 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-500 rounded-lg font-medium transition-all">
              Take Attendance
            </button>
            <button className="flex-1 px-4 py-2 dash-card-alt hover:opacity-80 dash-text-muted rounded-lg font-medium transition-all">
              Manage
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
